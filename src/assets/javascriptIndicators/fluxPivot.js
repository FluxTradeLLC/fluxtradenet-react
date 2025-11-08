/**
 * FluxPivot Indicator - JavaScript port from PineScript
 * 
 * This indicator calculates a stepped moving average based on Heikin-Ashi candles
 * and generates Flip and Add signals for long/short positions.
 * 
 * @param {Array} data - Array of candlestick data objects with {time, open, high, low, close}
 * @param {Object} options - Configuration options
 * @param {number} options.maPeriod - MA Period (default: 30)
 * @param {number} options.stepPeriod - Step Period (default: 1)
 * @param {number} options.flipStepTicks - Flip Step Ticks (default: 250)
 * @param {number} options.adxMinimum - ADX Minimum (default: 20) - Note: ADX calculation not implemented yet
 * @param {string} options.maLineColor - MA Line Color (default: "#00FFFF")
 * @param {string} options.heikinAshiColor - Heikin-Ashi Color (default: "#808080")
 * @param {number} options.mintick - Minimum tick size (default: 0.25, will be auto-detected if not provided)
 * @returns {Object} Object containing steppedMA data, flip signals, and add signals
 */
export function calculateFluxPivot(data, options = {}) {
  // Default parameters
  const maPeriod = options.maPeriod || 30;
  const stepPeriod = options.stepPeriod || 1;
  const flipStepTicks = options.flipStepTicks || 250;
  const adxMinimum = options.adxMinimum || 20;
  const maLineColor = options.maLineColor || "#00FFFF";
  const heikinAshiColor = options.heikinAshiColor || "#808080";

  // Auto-detect minimum tick size from data if not provided
  let mintick = options.mintick || 0.1;
  if (!mintick && data.length > 0) {
    // Try to detect tick size by finding the smallest price difference
    const prices = data.flatMap(d => [d.open, d.high, d.low, d.close]);
    const sortedPrices = [...new Set(prices)].sort((a, b) => a - b);
    let minDiff = Infinity;
    for (let i = 1; i < Math.min(sortedPrices.length, 100); i++) {
      const diff = sortedPrices[i] - sortedPrices[i - 1];
      if (diff > 0 && diff < minDiff) {
        minDiff = diff;
      }
    }
    mintick = minDiff > 0 && minDiff < Infinity ? minDiff : 0.25;
  } else if (!mintick) {
    mintick = 0.25; // Default fallback
  }

  // State variables (equivalent to PineScript's var declarations)
  let longEntryPrice = 0.0;
  let shortEntryPrice = 0.0;
  let longAddBarIndex = 0;
  let shortAddBarIndex = 0;
  let currentDirection = 0; // 1 for long, -1 for short, 0 for flat
  let steppedMAValue = null; // Track the stepped MA value - only updates when direction changes

  // Arrays to store results
  const steppedMAData = [];
  const flipSignals = [];
  const addSignals = [];
  const haCloses = [];

  // Calculate Heikin-Ashi values
  let haOpen = null;
  let haClose = null;
  let prevHaOpen = null;
  let prevHaClose = null;

  // Process each bar
  for (let i = 0; i < data.length; i++) {
    const bar = data[i];
    const barIndex = i;

    // Calculate Heikin-Ashi
    if (prevHaOpen === null || prevHaClose === null) {
      // First bar: use regular open/close
      haOpen = (bar.open + bar.close) / 2;
      haClose = (bar.open + bar.high + bar.low + bar.close) / 4;
    } else {
      haOpen = (prevHaOpen + prevHaClose) / 2;
      haClose = (bar.open + bar.high + bar.low + bar.close) / 4;
    }

    haCloses.push(haClose);
    prevHaOpen = haOpen;
    prevHaClose = haClose;

    // Calculate Simple Moving Average of Heikin-Ashi closes
    let ma = null;
    if (i >= maPeriod - 1) {
      let sum = 0;
      for (let j = 0; j < maPeriod; j++) {
        sum += haCloses[i - j];
      }
      ma = sum / maPeriod;
    }

    // Generate Flip and Add signals FIRST (before updating steppedMA)
    // This allows us to detect direction changes and step accordingly
    let flipSignal = 0;
    let addSignal = 0;
    
    // Use previous steppedMA value for flip detection
    const prevSteppedMA = steppedMAValue !== null ? steppedMAValue : (ma !== null ? ma : null);

    if (ma !== null && prevSteppedMA !== null) {
      // Flip Long: close > steppedMA and no long entry yet and not already long
      if (bar.close > prevSteppedMA && longEntryPrice === 0.0 && currentDirection !== 1) {
        flipSignal = 1;
        longEntryPrice = bar.close;
        shortEntryPrice = 0.0;
        currentDirection = 1;
      }
      // Flip Short: close < steppedMA and no short entry yet and not already short
      else if (bar.close < prevSteppedMA && shortEntryPrice === 0.0 && currentDirection !== -1) {
        flipSignal = -1;
        shortEntryPrice = bar.close;
        longEntryPrice = 0.0;
        currentDirection = -1;
      }
      // Add Long: close >= longEntryPrice + 100 ticks and close > open and enough bars passed
      if (
        longEntryPrice > 0 &&
        bar.close >= longEntryPrice + 100 * mintick &&
        bar.close > bar.open &&
        (longAddBarIndex === 0 || barIndex - longAddBarIndex > 10) &&
        currentDirection === 1 &&
        shortEntryPrice === 0.0
      ) {
        addSignal = 1;
        longAddBarIndex = barIndex;
      }
      // Add Short: close <= shortEntryPrice - 100 ticks and close < open and enough bars passed
      else if (
        shortEntryPrice > 0 &&
        bar.close <= shortEntryPrice - 100 * mintick &&
        bar.close < bar.open &&
        (shortAddBarIndex === 0 || barIndex - shortAddBarIndex > 10) &&
        currentDirection === -1 &&
        longEntryPrice === 0.0
      ) {
        addSignal = -1;
        shortAddBarIndex = barIndex;
      }
    }

    // Calculate Stepped MA - continuously tracks MA with offset, steps when direction changes
    // The steppedMA follows the MA trend but steps (jumps) when direction changes
    let steppedMA = null;
    if (ma !== null) {
      const offset = flipStepTicks * mintick;
      
      // Calculate steppedMA based on current direction - this tracks the MA continuously
      if (currentDirection === 1) {
        // Long: MA offset below
        steppedMA = ma - offset;
      } else if (currentDirection === -1) {
        // Short: MA offset above
        steppedMA = ma + offset;
      } else {
        // Flat/neutral: no offset
        steppedMA = ma;
      }
      
      // When direction changes, the step is created naturally by the offset switching sides
      // The step size is approximately 2 * offset (from ma - offset to ma + offset)
      if (flipSignal !== 0 && steppedMAValue !== null) {
        const stepSize = Math.abs(steppedMA - steppedMAValue);
        // Log step size for debugging
        if (stepSize > 0) {
        //   console.log(`Step detected: ${stepSize.toFixed(2)} points (flipStepTicks: ${flipStepTicks}, mintick: ${mintick.toFixed(4)}, offset: ${offset.toFixed(2)})`);
        }
      }
      
      steppedMAValue = steppedMA; // Track for next iteration
    }

    // Store results - ensure value is never undefined
    steppedMAData.push({
      time: bar.time,
      value: steppedMA !== null && steppedMA !== undefined ? steppedMA : null,
      color: currentDirection === 1 ? "#00FFFF" : currentDirection === -1 ? "#0000FF" : maLineColor,
    });

    flipSignals.push({
      time: bar.time,
      value: (flipSignal !== 0 && steppedMA !== null && steppedMA !== undefined) ? steppedMA : null,
      signal: flipSignal,
      color: flipSignal > 0 ? "#00FFFF" : flipSignal < 0 ? "#0000FF" : null,
    });

    addSignals.push({
      time: bar.time,
      value: (addSignal !== 0 && steppedMA !== null && steppedMA !== undefined) ? steppedMA : null,
      signal: addSignal,
      color: addSignal > 0 ? "#00FFFF" : addSignal < 0 ? "#0000FF" : null,
    });
  }

  return {
    steppedMA: steppedMAData,
    flipSignals: flipSignals,
    addSignals: addSignals,
    currentDirection: currentDirection,
    longEntryPrice: longEntryPrice,
    shortEntryPrice: shortEntryPrice,
  };
}

/**
 * Helper function to get indicator configuration for TradingViewChart
 * This matches the format expected by the chart component
 */
export function getFluxPivotConfig() {
  return {
    name: "FluxPivot",
    type: "fluxPivot",
    description: "FluxTrade FluxPivot indicator with stepped MA and flip/add signals",
    category: "trend",
    defaultOptions: {
      maPeriod: 30,
      stepPeriod: 1,
      flipStepTicks: 250,
      adxMinimum: 20,
      maLineColor: "#00FFFF",
      heikinAshiColor: "#808080",
    },
  };
}

