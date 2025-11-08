import { useState, useEffect, useRef } from "react";
import { createChart, CandlestickSeries, LineSeries } from "lightweight-charts";

// Simplified indicator configurations for lightweight-charts
const FLUX_INDICATORS = {
  "Moving Average (14)": {
    name: "Moving Average (14)",
    type: "ma",
    period: 14,
    color: "#FF9800",
    description: "14-period moving average",
    category: "trend",
  },
  "Moving Average (50)": {
    name: "Moving Average (50)",
    type: "ma",
    period: 50,
    color: "#2196F3",
    description: "50-period moving average",
    category: "trend",
  },
  "Moving Average (200)": {
    name: "Moving Average (200)",
    type: "ma",
    period: 200,
    color: "#9C27B0",
    description: "200-period moving average",
    category: "trend",
  },
  "EMA (12)": {
    name: "EMA (12)",
    type: "ema",
    period: 12,
    color: "#4CAF50",
    description: "12-period exponential moving average",
    category: "trend",
  },
  "EMA (26)": {
    name: "EMA (26)",
    type: "ema",
    period: 26,
    color: "#F44336",
    description: "26-period exponential moving average",
    category: "trend",
  },
};

// Preset layouts
const PRESET_LAYOUTS = {
  "Trend Following": {
    name: "Trend Following",
    indicators: ["Moving Average (14)", "Moving Average (50)", "Moving Average (200)"],
    description: "Perfect for catching trends early",
  },
  "Momentum": {
    name: "Momentum",
    indicators: ["EMA (12)", "EMA (26)"],
    description: "Spot momentum shifts and breakouts",
  },
  "Support/Resistance": {
    name: "Support/Resistance",
    indicators: ["Moving Average (50)", "Moving Average (200)"],
    description: "Trade key levels and reversals",
  },
  "All Indicators": {
    name: "All Indicators",
    indicators: Object.keys(FLUX_INDICATORS),
    description: "See everything at once",
  },
  "Minimal": {
    name: "Minimal",
    indicators: ["Moving Average (14)"],
    description: "Clean and simple",
  },
};

// Helper function to calculate moving average
const calculateMA = (data, period) => {
  const result = [];
  for (let i = 0; i < data.length; i++) {
    if (i < period - 1) {
      result.push({ time: data[i].time, value: null });
    } else {
      let sum = 0;
      for (let j = 0; j < period; j++) {
        sum += data[i - j].close;
      }
      result.push({ time: data[i].time, value: sum / period });
    }
  }
  return result;
};

// Helper function to calculate exponential moving average
const calculateEMA = (data, period) => {
  const result = [];
  const multiplier = 2 / (period + 1);
  
  for (let i = 0; i < data.length; i++) {
    if (i === 0) {
      result.push({ time: data[i].time, value: data[i].close });
    } else {
      const prevEMA = result[i - 1].value;
      const ema = (data[i].close - prevEMA) * multiplier + prevEMA;
      result.push({ time: data[i].time, value: ema });
    }
  }
  return result;
};

// Validate and normalize candlestick data for lightweight-charts
const validateAndNormalizeData = (data) => {
  if (!Array.isArray(data) || data.length === 0) {
    return [];
  }

  const normalized = data
    .map((item) => {
      // Convert time to Unix timestamp (seconds)
      let time = item.time || item.timestamp;
      if (typeof time === 'string') {
        time = Math.floor(new Date(time).getTime() / 1000);
      } else if (time instanceof Date) {
        time = Math.floor(time.getTime() / 1000);
      } else {
        time = Math.floor(time);
      }

      // Extract OHLC values
      const open = parseFloat(item.open || item.o);
      const high = parseFloat(item.high || item.h);
      const low = parseFloat(item.low || item.l);
      const close = parseFloat(item.close || item.c);

      // Validate all values are valid numbers
      if (
        isNaN(time) ||
        isNaN(open) ||
        isNaN(high) ||
        isNaN(low) ||
        isNaN(close) ||
        time <= 0 ||
        !isFinite(open) ||
        !isFinite(high) ||
        !isFinite(low) ||
        !isFinite(close)
      ) {
        return null;
      }

      // Ensure OHLC relationships are correct
      const validHigh = Math.max(open, close, high);
      const validLow = Math.min(open, close, low);

      return {
        time: time,
        open: open,
        high: validHigh,
        low: validLow,
        close: close,
      };
    })
    .filter((item) => item !== null)
    .sort((a, b) => a.time - b.time); // Sort by time ascending

  // Remove duplicate timestamps (keep the last one)
  const seen = new Set();
  const unique = [];
  for (let i = normalized.length - 1; i >= 0; i--) {
    const item = normalized[i];
    if (!seen.has(item.time)) {
      seen.add(item.time);
      unique.unshift(item);
    }
  }

  return unique;
};

export const TradingViewChart = ({ symbol = "MNQ!", height = 800, dataUrl }) => {
  const chartContainerRef = useRef(null);
  const chartRef = useRef(null);
  const candleSeriesRef = useRef(null);
  const indicatorSeriesRef = useRef({});
  const [activeIndicators, setActiveIndicators] = useState(
    PRESET_LAYOUTS["Trend Following"].indicators
  );
  const [selectedPreset, setSelectedPreset] = useState("Trend Following");
  const [isLoading, setIsLoading] = useState(true);
  const [showIndicators, setShowIndicators] = useState(false);
  const [chartData, setChartData] = useState([]);

  // Fetch chart data
  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // If dataUrl prop is provided, use it; otherwise try default endpoints
        const url = dataUrl || `/data.json` || `https://api.example.com/data/${symbol}`;
        
        // For now, we'll generate sample data if fetch fails
        // In production, replace this with your actual data source
        try {
          const response = await fetch(url);
          if (response.ok) {
            const data = await response.json();
            // Validate and normalize data
            const formattedData = validateAndNormalizeData(data);
            if (formattedData.length > 0) {
              setChartData(formattedData);
            } else {
              throw new Error("No valid data after validation");
            }
          } else {
            throw new Error("Failed to fetch data");
          }
        } catch (error) {
          console.warn("Could not fetch data from URL, generating sample data:", error);
          // Generate sample data for demonstration
          const sampleData = generateSampleData(symbol);
          setChartData(sampleData);
        }
      } catch (error) {
        console.error("Error fetching chart data:", error);
        // Generate sample data as fallback
        const sampleData = generateSampleData(symbol);
        setChartData(sampleData);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [symbol, dataUrl]);

  // Generate sample candlestick data
  const generateSampleData = (sym) => {
    const data = [];
    const now = Math.floor(Date.now() / 1000);
    let price = 15000; // Starting price
    
    for (let i = 200; i >= 0; i--) {
      const time = now - i * 3600; // 1 hour intervals
      const change = (Math.random() - 0.5) * 100;
      const open = price;
      const close = price + change;
      const high = Math.max(open, close) + Math.random() * 50;
      const low = Math.min(open, close) - Math.random() * 50;
      
      // Ensure high >= max(open, close) and low <= min(open, close)
      const validHigh = Math.max(open, close, high);
      const validLow = Math.min(open, close, low);
      
      data.push({
        time: time,
        open: Math.round(open * 100) / 100,
        high: Math.round(validHigh * 100) / 100,
        low: Math.round(validLow * 100) / 100,
        close: Math.round(close * 100) / 100,
      });
      
      price = close;
    }
    
    // Sort by time ascending (required by lightweight-charts)
    return data.sort((a, b) => a.time - b.time);
  };

  // Initialize chart
  useEffect(() => {
    if (!chartContainerRef.current || chartData.length === 0) return;

    // Ensure container has dimensions
    const containerWidth = chartContainerRef.current.clientWidth;
    if (containerWidth === 0) {
      // Wait for next frame if container doesn't have width yet
      requestAnimationFrame(() => {
        if (chartContainerRef.current && chartContainerRef.current.clientWidth > 0) {
          // Retry initialization
          const event = new Event('resize');
          window.dispatchEvent(event);
        }
      });
      return;
    }

    // Validate data before creating chart
    const validData = chartData.filter((item) => {
      return (
        item &&
        typeof item.time === 'number' &&
        typeof item.open === 'number' &&
        typeof item.high === 'number' &&
        typeof item.low === 'number' &&
        typeof item.close === 'number' &&
        !isNaN(item.time) &&
        !isNaN(item.open) &&
        !isNaN(item.high) &&
        !isNaN(item.low) &&
        !isNaN(item.close) &&
        item.high >= Math.max(item.open, item.close) &&
        item.low <= Math.min(item.open, item.close)
      );
    });

    if (validData.length === 0) {
      console.error("No valid chart data available");
      return;
    }

    // Remove duplicate timestamps
    const seen = new Set();
    const uniqueData = [];
    for (let i = validData.length - 1; i >= 0; i--) {
      const item = validData[i];
      if (!seen.has(item.time)) {
        seen.add(item.time);
        uniqueData.unshift(item);
      }
    }

    if (uniqueData.length === 0) {
      console.error("No unique data points after deduplication");
      return;
    }

    // Clean up previous chart if it exists
    if (chartRef.current) {
      try {
        chartRef.current.remove();
      } catch (e) {
        // Ignore cleanup errors
      }
      chartRef.current = null;
    }

    // Create chart
    let chart;
    try {
      chart = createChart(chartContainerRef.current, {
        width: containerWidth || 800,
        height: height,
        layout: {
          background: { color: "#1a1a1a" },
          textColor: "#d1d5db",
        },
        grid: {
          vertLines: { color: "#2a2a2a" },
          horzLines: { color: "#2a2a2a" },
        },
        timeScale: {
          timeVisible: true,
          secondsVisible: false,
        },
      });

      chartRef.current = chart;

      // Add candlestick series
      const candleSeries = chart.addSeries(CandlestickSeries, {
        upColor: "#26a69a",
        downColor: "#ef5350",
        borderVisible: false,
        wickUpColor: "#26a69a",
        wickDownColor: "#ef5350",
      });

      candleSeries.setData(uniqueData);
      candleSeriesRef.current = candleSeries;
    } catch (error) {
      console.error("Error creating chart:", error);
      console.error("Container width:", containerWidth);
      console.error("Data sample:", uniqueData.slice(0, 5));
      if (chart) {
        try {
          chart.remove();
        } catch (e) {
          // Ignore cleanup errors
        }
      }
      return;
    }

    // Handle resize
    const handleResize = () => {
      if (chartContainerRef.current && chartRef.current) {
        chartRef.current.applyOptions({
          width: chartContainerRef.current.clientWidth,
        });
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (chartRef.current) {
        chartRef.current.remove();
        chartRef.current = null;
      }
    };
  }, [chartData, height]);

  // Update indicators when activeIndicators changes
  useEffect(() => {
    if (!chartRef.current || !candleSeriesRef.current || chartData.length === 0) return;

    // Remove all existing indicator series
    Object.values(indicatorSeriesRef.current).forEach((series) => {
      if (series) {
        chartRef.current.removeSeries(series);
      }
    });
    indicatorSeriesRef.current = {};

    // Add active indicators
    activeIndicators.forEach((indicatorName) => {
      const indicator = FLUX_INDICATORS[indicatorName];
      if (!indicator) return;

      let indicatorData = [];
      
      if (indicator.type === "ma") {
        indicatorData = calculateMA(chartData, indicator.period);
      } else if (indicator.type === "ema") {
        indicatorData = calculateEMA(chartData, indicator.period);
      }

      // Filter out null values
      const validData = indicatorData.filter((d) => d.value !== null);

      if (validData.length > 0) {
        const lineSeries = chartRef.current.addSeries(LineSeries, {
          color: indicator.color,
          lineWidth: 2,
          title: indicator.name,
        });

        lineSeries.setData(validData);
        indicatorSeriesRef.current[indicatorName] = lineSeries;
      }
    });
  }, [activeIndicators, chartData]);

  const toggleIndicator = (indicatorName) => {
    setActiveIndicators((prev) => {
      const newIndicators = prev.includes(indicatorName)
        ? prev.filter((ind) => ind !== indicatorName)
        : [...prev, indicatorName];

      // Update preset to Custom if it doesn't match any preset
      const matchesPreset = Object.values(PRESET_LAYOUTS).some(
        (preset) => JSON.stringify(preset.indicators.sort()) === JSON.stringify(newIndicators.sort())
      );
      if (!matchesPreset) {
        setSelectedPreset("Custom");
      }

      return newIndicators;
    });
  };

  const applyPreset = (presetName) => {
    const preset = PRESET_LAYOUTS[presetName];
    if (preset) {
      setActiveIndicators(preset.indicators);
      setSelectedPreset(presetName);
    }
  };

  return (
    <div className="w-full bg-gray-900 rounded-lg p-6 shadow-2xl">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
            Live Chart - {symbol}
          </h2>
        </div>
        <p className="text-gray-400">
          Toggle indicators on/off and explore preset layouts
        </p>
      </div>

      {/* Preset Layouts */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-lg font-semibold text-gray-300">Preset Layouts</h3>
          <button
            type="button"
            onClick={() => setShowIndicators((prev) => !prev)}
            className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer px-2 py-1 rounded hover:bg-gray-800"
          >
            {showIndicators ? "Hide Indicators" : "Show Indicators"}
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {Object.keys(PRESET_LAYOUTS).map((presetName) => {
            const preset = PRESET_LAYOUTS[presetName];
            const isActive = selectedPreset === presetName;
            return (
              <button
                key={presetName}
                onClick={() => applyPreset(presetName)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all transform ${
                  isActive
                    ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white hover:scale-105"
                }`}
              >
                {presetName}
                {isActive && <span className="ml-1 text-xs">✓</span>}
              </button>
            );
          })}
          {selectedPreset === "Custom" && (
            <button className="px-3 py-1.5 rounded-lg text-xs font-medium transition-all bg-gradient-to-r from-green-600 to-blue-600 text-white shadow-lg scale-105">
              Custom ✓
            </button>
          )}
        </div>
        {selectedPreset !== "Custom" && PRESET_LAYOUTS[selectedPreset] && (
          <p className="mt-2 text-xs text-gray-400 italic">
            {PRESET_LAYOUTS[selectedPreset].description}
          </p>
        )}
        {selectedPreset === "Custom" && (
          <p className="mt-2 text-xs text-gray-400 italic">
            Custom layout with {activeIndicators.length} indicator{activeIndicators.length !== 1 ? "s" : ""}
          </p>
        )}
      </div>

      {/* Indicator Toggles - Collapsible */}
      {showIndicators && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold mb-3 text-gray-300">
            Toggle Indicators ({activeIndicators.length} active)
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
            {Object.keys(FLUX_INDICATORS).map((indicatorName) => {
              const indicator = FLUX_INDICATORS[indicatorName];
              const isActive = activeIndicators.includes(indicatorName);
              return (
                <button
                  key={indicatorName}
                  onClick={() => toggleIndicator(indicatorName)}
                  className={`p-2 rounded-lg text-left transition-all ${
                    isActive
                      ? "bg-gradient-to-br from-green-600 to-blue-600 text-white shadow-lg"
                      : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-xs">{indicatorName}</span>
                    {isActive && (
                      <span className="text-xs bg-white bg-opacity-20 px-1.5 py-0.5 rounded">
                        ON
                      </span>
                    )}
                  </div>
                  <p className="text-xs mt-0.5 opacity-80 line-clamp-1">{indicator.description}</p>
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Chart Container */}
      <div className="relative bg-gray-800 rounded-lg overflow-hidden border border-gray-700 mb-4">
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-800 bg-opacity-90 z-10">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p className="text-gray-400">Loading chart...</p>
            </div>
          </div>
        )}
        <div
          ref={chartContainerRef}
          style={{ height: `${height}px`, width: "100%" }}
          className="w-full"
        />
      </div>

      {/* Info Footer */}
      <div className="mt-4 text-xs text-gray-500 text-center">
        <p>💡 Tip: Try different preset layouts or customize your own indicator combination!</p>
        <p className="mt-1">Chart powered by Lightweight Charts • Indicators by FluxTrade</p>
      </div>
    </div>
  );
};
