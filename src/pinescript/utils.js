/**
 * PineScript Indicator Utilities
 * 
 * This module provides utilities for managing PineScript indicator files
 * stored in the repository.
 */

/**
 * Get the list of available PineScript indicator files
 * @returns {Array<string>} Array of indicator file names
 */
export const getAvailableIndicators = () => {
  return [
    'FluxConfluence',
    'FluxPivot',
    'FluxSignal',
    'FluxTarget',
    'MarketRegime',
    'MarketPhase',
    'ParabolicRSI',
    'PreviousLevels',
    'TTMSqueeze',
    'VolatilityCycle',
    'DynamicTrend',
  ];
};

/**
 * Get the file path for a PineScript indicator
 * @param {string} indicatorName - Name of the indicator
 * @returns {string} Relative path to the PineScript file
 */
export const getPineScriptPath = (indicatorName) => {
  const fileName = indicatorName.replace(/\s+/g, '') + '.pine';
  return `/src/pinescript/indicators/${fileName}`;
};

/**
 * Load PineScript code from a file (for development/reference)
 * Note: This requires the file to be accessible at build time.
 * In production, you'll need to publish scripts on TradingView first.
 * 
 * @param {string} indicatorName - Name of the indicator
 * @returns {Promise<string>} Promise that resolves to the PineScript code
 */
export const loadPineScript = async (indicatorName) => {
  try {
    const path = getPineScriptPath(indicatorName);
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Failed to load PineScript: ${indicatorName}`);
    }
    return await response.text();
  } catch (error) {
    console.error(`Error loading PineScript ${indicatorName}:`, error);
    throw error;
  }
};

/**
 * Map indicator display name to PineScript file name
 */
export const INDICATOR_FILE_MAP = {
  'FluxConfluence': 'FluxConfluence',
  'FluxPivot': 'FluxPivot',
  'FluxSignal': 'FluxSignal',
  'FluxTarget': 'FluxTarget',
  'Market Regime': 'MarketRegime',
  'Market Phase': 'MarketPhase',
  'Parabolic RSI': 'ParabolicRSI',
  'Previous Levels': 'PreviousLevels',
  'TTM Squeeze': 'TTMSqueeze',
  'Volatility Cycle': 'VolatilityCycle',
  'Dynamic Trend': 'DynamicTrend',
};

