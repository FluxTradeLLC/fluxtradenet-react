import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Papa from "papaparse";
import { SEO } from "../components/SEO";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const BACKTEST_FILES = [
  "averageBounce.csv",
  "centauri.csv",
  "chatGpt.csv",
  "cointegratedPairs.csv",
  "donchianTurtle.csv",
  "elliotWave.csv",
  "fluxLightning.csv",
  "fluxPivotStrat.csv",
  "fluxSignalStrat.csv",
  "fluxTrident.csv",
  "futurePredictionServer.csv",
  "holyGrail.csv",
  "ICCChoCh.csv",
  "ichimokoStrat.csv",
  "keltnerStrat.csv",
  "liquiditySweep.csv",
  "lowVolatility.csv",
  "mars.csv",
  "megaBands.csv",
  "moon.csv",
  "orb.csv",
  "orms.csv",
  "pluto.csv",
  "projectGamma.csv",
  "quadConfluence.csv",
  "rileySR.csv",
  "slowAndSteady.csv",
  "stopHunter.csv",
  "superMomentum.csv",
  "trendCatcher.csv",
];

// Helper function to parse currency string like "$880.00" or "($500.00)" to number
const parseCurrency = (str) => {
  if (!str || str === "") return 0;
  const cleaned = str.replace(/[$,()]/g, "");
  const num = parseFloat(cleaned);
  return str.includes("(") ? -num : num;
};

// Helper function to format number with commas
const formatNumber = (num) => {
  if (num === null || num === undefined || isNaN(num)) return "0";
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

// Currency conversion rates (USD as base)
const CURRENCY_RATES = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 149.5,
  CAD: 1.35,
  AUD: 1.52,
  CHF: 0.88,
  CNY: 7.24,
};

// Currency symbols
const CURRENCY_SYMBOLS = {
  USD: "$",
  EUR: "€",
  GBP: "£",
  JPY: "¥",
  CAD: "C$",
  AUD: "A$",
  CHF: "CHF ",
  CNY: "¥",
};

// Helper function to extract session from time string
// Note: Session names are translated in the component, but we need to keep the English keys here
// for filtering logic. The translation happens when displaying.
const getSession = (timeStr) => {
  if (!timeStr) return "Unknown";
  try {
    // Extract hour from formats like "9:33:00 AM" or "9:33:00"
    const timeMatch = timeStr.match(/(\d{1,2}):\d{2}/);
    if (!timeMatch) return "Unknown";

    let hour = parseInt(timeMatch[1]);
    const isPM = timeStr.toUpperCase().includes("PM");

    // Convert to 24-hour format
    if (isPM && hour !== 12) hour += 12;
    if (!isPM && hour === 12) hour = 0;

    if (hour >= 9 && hour < 12) return "Morning";
    if (hour >= 12 && hour < 16) return "Afternoon";
    if (hour >= 16 && hour < 20) return "Evening";
    return "Night";
  } catch {
    return "Unknown";
  }
};

// Helper function to parse date from time string
const parseDate = (timeStr) => {
  if (!timeStr) return null;
  try {
    const date = new Date(timeStr);
    // Check if date is valid
    if (isNaN(date.getTime())) return null;
    return date;
  } catch {
    return null;
  }
};

// Helper function to convert strategy name to title case
// Handles camelCase, snake_case, and other formats
const toTitleCase = (str) => {
  if (!str || str === "All") return str;
  // Insert space before capital letters (for camelCase)
  const withSpaces = str.replace(/([a-z])([A-Z])/g, "$1 $2");
  // Split by spaces, underscores, or hyphens and capitalize each word
  return withSpaces
    .split(/[\s_-]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export const BacktestExplorerPage = () => {
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [allData, setAllData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStrategy, setSelectedStrategy] = useState("All");
  const [selectedInstrument, setSelectedInstrument] = useState("All");
  const [selectedSession, setSelectedSession] = useState("All");
  const [selectedCurrency, setSelectedCurrency] = useState("USD");

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, []);

  // Read strategy from query params and set it once data is loaded
  useEffect(() => {
    const strategyParam = searchParams.get("strategy");
    if (strategyParam && allData.length > 0) {
      // Check if the strategy exists in the available strategies
      const strategies = [...new Set(allData.map((d) => d.strategy))];
      if (strategies.includes(strategyParam)) {
        setSelectedStrategy(strategyParam);
      }
    }
  }, [searchParams, allData]);

  useEffect(() => {
    const loadAllData = async () => {
      setLoading(true);
      const promises = BACKTEST_FILES.map(async (file) => {
        try {
          const response = await fetch(`/backtests/${file}`);
          const reader = response.body.getReader();
          const result = await reader.read();
          const decoder = new TextDecoder("utf-8");
          const csv = decoder.decode(result.value);

          return new Promise((resolve) => {
            Papa.parse(csv, {
              header: true,
              complete: (results) => {
                const data = results.data
                  .filter((row) => row["Trade number"] && row["Entry time"])
                  .map((row) => ({
                    ...row,
                    strategy: file.replace(".csv", ""),
                    profit: parseCurrency(row.Profit || row["Profit"]),
                    cumProfit: parseCurrency(
                      row["Cum. net profit"] || row["Cum net profit"]
                    ),
                    entryTime: parseDate(
                      row["Entry time"] || row["Entry Time"]
                    ),
                    session: getSession(row["Entry time"] || row["Entry Time"]),
                    instrument: row.Instrument || row["Instrument"],
                  }));
                resolve(data);
              },
            });
          });
        } catch (error) {
          console.error(`Error loading ${file}:`, error);
          return [];
        }
      });

      const results = await Promise.all(promises);
      const combined = results.flat();
      setAllData(combined);
      setLoading(false);
    };

    loadAllData();
  }, []);

  // Helper function to convert and format currency
  const formatCurrency = (usdAmount) => {
    if (usdAmount === null || usdAmount === undefined || isNaN(usdAmount))
      return "0.00";
    const converted = usdAmount * CURRENCY_RATES[selectedCurrency];
    const formatted = formatNumber(converted);
    return `${CURRENCY_SYMBOLS[selectedCurrency]}${formatted}`;
  };

  // Get unique values for filters
  const strategies = useMemo(() => {
    const unique = [...new Set(allData.map((d) => d.strategy))].sort();
    return ["All", ...unique];
  }, [allData]);

  const instruments = useMemo(() => {
    const unique = [
      ...new Set(allData.map((d) => d.instrument).filter(Boolean)),
    ].sort();
    return ["All", ...unique];
  }, [allData]);

  const sessions = useMemo(() => {
    const unique = [
      ...new Set(allData.map((d) => d.session).filter(Boolean)),
    ].sort();
    return ["All", ...unique];
  }, [allData]);

  // Filter data based on selections
  const filteredData = useMemo(() => {
    return allData.filter((row) => {
      if (selectedStrategy !== "All" && row.strategy !== selectedStrategy)
        return false;
      if (selectedInstrument !== "All" && row.instrument !== selectedInstrument)
        return false;
      if (selectedSession !== "All" && row.session !== selectedSession)
        return false;
      return true;
    });
  }, [allData, selectedStrategy, selectedInstrument, selectedSession]);

  // Prepare equity curve data (cumulative profit over time)
  const equityCurveData = useMemo(() => {
    const sorted = [...filteredData]
      .filter((d) => d.entryTime && !isNaN(d.profit))
      .sort((a, b) => a.entryTime - b.entryTime);

    if (sorted.length === 0) return [];

    const curve = [];
    let runningProfit = 0;
    let peak = 0;

    sorted.forEach((row, index) => {
      // Use cumulative profit if available and valid, otherwise calculate
      if (row.cumProfit !== undefined && !isNaN(row.cumProfit)) {
        runningProfit = row.cumProfit;
      } else {
        runningProfit += row.profit;
      }

      peak = Math.max(peak, runningProfit);
      const drawdown = peak - runningProfit;

      curve.push({
        trade: index + 1,
        date: row.entryTime.toISOString().split("T")[0],
        equity: runningProfit,
        drawdown: drawdown,
        profit: row.profit,
        strategy: row.strategy,
        instrument: row.instrument,
      });
    });

    return curve;
  }, [filteredData]);

  // Calculate statistics
  const stats = useMemo(() => {
    if (filteredData.length === 0) {
      return {
        totalTrades: 0,
        winningTrades: 0,
        losingTrades: 0,
        winRate: 0,
        totalProfit: 0,
        avgWin: 0,
        avgLoss: 0,
        maxDrawdown: 0,
        profitFactor: 0,
      };
    }

    const profits = filteredData.map((d) => d.profit).filter((p) => !isNaN(p));
    const winningTrades = profits.filter((p) => p > 0);
    const losingTrades = profits.filter((p) => p < 0);
    const totalProfit = profits.reduce((sum, p) => sum + p, 0);
    const totalWins = winningTrades.reduce((sum, p) => sum + p, 0);
    const totalLosses = Math.abs(losingTrades.reduce((sum, p) => sum + p, 0));

    // const equityCurve = equityCurveData.map((d) => d.equity);
    // const _peak = Math.max(...equityCurve, 0); // Reserved for future use
    const maxDrawdown = equityCurveData.reduce(
      (max, d) => Math.max(max, d.drawdown),
      0
    );

    return {
      totalTrades: filteredData.length,
      winningTrades: winningTrades.length,
      losingTrades: losingTrades.length,
      winRate: ((winningTrades.length / filteredData.length) * 100).toFixed(2),
      totalProfit: totalProfit.toFixed(2),
      avgWin:
        winningTrades.length > 0
          ? (totalWins / winningTrades.length).toFixed(2)
          : 0,
      avgLoss:
        losingTrades.length > 0
          ? (totalLosses / losingTrades.length).toFixed(2)
          : 0,
      maxDrawdown: maxDrawdown.toFixed(2),
      profitFactor:
        totalLosses > 0 ? (totalWins / totalLosses).toFixed(2) : "N/A",
      largestWin:
        winningTrades.length > 0 ? Math.max(...winningTrades).toFixed(2) : 0,
      largestLoss:
        losingTrades.length > 0 ? Math.min(...losingTrades).toFixed(2) : 0,
    };
  }, [filteredData, equityCurveData]);

  // Prepare profit distribution data for histogram
  const profitDistribution = useMemo(() => {
    const profits = filteredData.map((d) => d.profit).filter((p) => !isNaN(p));
    if (profits.length === 0) return [];

    const min = Math.min(...profits);
    const max = Math.max(...profits);
    const range = max - min;
    const bins = 20;
    const binSize = range / bins;

    const distribution = Array(bins)
      .fill(0)
      .map((_, i) => {
        const binMin = min + i * binSize;
        const binMax = min + (i + 1) * binSize;
        const convertedMin = binMin * CURRENCY_RATES[selectedCurrency];
        const convertedMax = binMax * CURRENCY_RATES[selectedCurrency];
        const symbol = CURRENCY_SYMBOLS[selectedCurrency];
        return {
          range: `${symbol}${formatNumber(convertedMin)} - ${symbol}${formatNumber(convertedMax)}`,
          count: 0,
          midpoint: min + (i + 0.5) * binSize,
        };
      });

    profits.forEach((profit) => {
      const binIndex = Math.min(Math.floor((profit - min) / binSize), bins - 1);
      if (binIndex >= 0) distribution[binIndex].count++;
    });

    return distribution;
  }, [filteredData, selectedCurrency]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="text-xl">{t("backtestExplorer.loading")}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white px-4 sm:px-8 pt-12 pb-4 sm:pb-8">
      <SEO
        title={t("backtestExplorer.seoTitle")}
        description={t("backtestExplorer.seoDescription")}
        keywords={t("backtestExplorer.seoKeywords")}
        canonical="/backtests/explorer"
      />
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-5xl font-extrabold mb-4 text-center">
            {t("backtestExplorer.title")}
          </h1>
          <p className="text-gray-400">
            {t("backtestExplorer.subtitle")}
          </p>
        </div>

        {/* Filters */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">{t("backtestExplorer.strategy")}</label>
              <select
                value={selectedStrategy}
                onChange={(e) => {
                  const newStrategy = e.target.value;
                  setSelectedStrategy(newStrategy);
                  const newParams = new URLSearchParams(searchParams);
                  if (newStrategy === "All") {
                    newParams.delete("strategy");
                  } else {
                    newParams.set("strategy", newStrategy);
                  }
                  setSearchParams(newParams);
                }}
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:border-blue-500 focus:outline-none"
              >
                {strategies.map((strategy) => (
                  <option key={strategy} value={strategy}>
                    {strategy === "All" ? t("backtestExplorer.all") : toTitleCase(strategy)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">
                {t("backtestExplorer.instrument")}
              </label>
              <select
                value={selectedInstrument}
                onChange={(e) => setSelectedInstrument(e.target.value)}
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:border-blue-500 focus:outline-none"
              >
                {instruments.map((instrument) => (
                  <option key={instrument} value={instrument}>
                    {instrument === "All" ? t("backtestExplorer.all") : instrument}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">{t("backtestExplorer.session")}</label>
              <select
                value={selectedSession}
                onChange={(e) => setSelectedSession(e.target.value)}
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:border-blue-500 focus:outline-none"
              >
                {sessions.map((session) => (
                  <option key={session} value={session}>
                    {session === "All" ? t("backtestExplorer.all") : t(`backtestExplorer.sessions.${session}`, session)}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">{t("backtestExplorer.currency")}</label>
              <select
                value={selectedCurrency}
                onChange={(e) => setSelectedCurrency(e.target.value)}
                className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 border border-gray-600 focus:border-blue-500 focus:outline-none"
              >
                {Object.keys(CURRENCY_RATES).map((currency) => (
                  <option key={currency} value={currency}>
                    {currency}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4 mb-6">
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="text-sm text-gray-400">{t("backtestExplorer.totalTrades")}</div>
            <div className="text-2xl font-bold">
              {stats.totalTrades.toLocaleString()}
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="text-sm text-gray-400">{t("backtestExplorer.winRate")}</div>
            <div className="text-2xl font-bold text-green-400">
              {stats.winRate}%
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="text-sm text-gray-400">{t("backtestExplorer.totalProfit")}</div>
            <div
              className={`text-2xl font-bold ${parseFloat(stats.totalProfit) >= 0 ? "text-green-400" : "text-red-400"}`}
            >
              {formatCurrency(parseFloat(stats.totalProfit))}
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="text-sm text-gray-400">{t("backtestExplorer.maxDrawdown")}</div>
            <div className="text-2xl font-bold text-red-400">
              {formatCurrency(parseFloat(stats.maxDrawdown))}
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="text-sm text-gray-400">{t("backtestExplorer.profitFactor")}</div>
            <div className="text-2xl font-bold">{stats.profitFactor}</div>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="text-sm text-gray-400">{t("backtestExplorer.avgWin")}</div>
            <div className="text-xl font-bold text-green-400">
              {formatCurrency(parseFloat(stats.avgWin))}
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="text-sm text-gray-400">{t("backtestExplorer.avgLoss")}</div>
            <div className="text-xl font-bold text-red-400">
              {formatCurrency(parseFloat(stats.avgLoss))}
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="text-sm text-gray-400">{t("backtestExplorer.largestWin")}</div>
            <div className="text-xl font-bold text-green-400">
              {formatCurrency(parseFloat(stats.largestWin))}
            </div>
          </div>
          <div className="bg-gray-800 rounded-lg p-4">
            <div className="text-sm text-gray-400">{t("backtestExplorer.largestLoss")}</div>
            <div className="text-xl font-bold text-red-400">
              {formatCurrency(parseFloat(stats.largestLoss))}
            </div>
          </div>
        </div>

        {/* Charts */}
        {equityCurveData.length > 0 && (
          <>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Equity Curve */}
              <div className="bg-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">{t("backtestExplorer.equityCurve")}</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={equityCurveData}>
                    <defs>
                      <linearGradient
                        id="colorEquity"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#3b82f6"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#3b82f6"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="trade" stroke="#9ca3af" />
                    <YAxis
                      stroke="#9ca3af"
                      tickFormatter={(value) => {
                        const converted =
                          value * CURRENCY_RATES[selectedCurrency];
                        return `${CURRENCY_SYMBOLS[selectedCurrency]}${formatNumber(converted)}`;
                      }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                      }}
                      labelStyle={{ color: "#fff" }}
                      formatter={(value) => formatCurrency(value)}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="equity"
                      stroke="#3b82f6"
                      fillOpacity={1}
                      fill="url(#colorEquity)"
                      name={t("backtestExplorer.equityLabel", { currency: selectedCurrency })}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Drawdown Chart */}
              <div className="bg-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-semibold mb-4">{t("backtestExplorer.drawdown")}</h2>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={equityCurveData}>
                    <defs>
                      <linearGradient
                        id="colorDrawdown"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#ef4444"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#ef4444"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="trade" stroke="#9ca3af" />
                    <YAxis
                      stroke="#9ca3af"
                      tickFormatter={(value) => {
                        const converted =
                          value * CURRENCY_RATES[selectedCurrency];
                        return `${CURRENCY_SYMBOLS[selectedCurrency]}${formatNumber(converted)}`;
                      }}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                      }}
                      labelStyle={{ color: "#fff" }}
                      formatter={(value) => formatCurrency(value)}
                    />
                    <Legend />
                    <Area
                      type="monotone"
                      dataKey="drawdown"
                      stroke="#ef4444"
                      fillOpacity={1}
                      fill="url(#colorDrawdown)"
                      name={t("backtestExplorer.drawdownLabel", { currency: selectedCurrency })}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Profit Distribution */}
            {profitDistribution.length > 0 && (
              <div className="bg-gray-800 rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-4">
                  {t("backtestExplorer.profitDistribution")}
                </h2>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={profitDistribution}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis
                      dataKey="range"
                      stroke="#9ca3af"
                      angle={-45}
                      textAnchor="end"
                      height={100}
                    />
                    <YAxis stroke="#9ca3af" />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1f2937",
                        border: "1px solid #374151",
                        borderRadius: "8px",
                      }}
                      labelStyle={{ color: "#fff" }}
                    />
                    <Legend />
                    <Bar dataKey="count" fill="#8b5cf6" name={t("backtestExplorer.tradeCount")} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            )}
          </>
        )}

        {/* Data Table */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">{t("backtestExplorer.tradeDetails")}</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">
                    {t("backtestExplorer.tradeNumber")}
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">
                    {t("backtestExplorer.strategy")}
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">
                    {t("backtestExplorer.instrument")}
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">
                    {t("backtestExplorer.entryTime")}
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">
                    {t("backtestExplorer.session")}
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">
                    {t("backtestExplorer.profit")}
                  </th>
                  <th className="text-left py-3 px-4 text-sm font-semibold text-gray-300">
                    {t("backtestExplorer.cumProfit")}
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredData.slice(0, 100).map((row, index) => (
                  <tr
                    key={index}
                    className="border-b border-gray-700 hover:bg-gray-700"
                  >
                    <td className="py-3 px-4 text-sm">
                      {row["Trade number"] || index + 1}
                    </td>
                    <td className="py-3 px-4 text-sm">
                      {toTitleCase(row.strategy)}
                    </td>
                    <td className="py-3 px-4 text-sm">{row.instrument}</td>
                    <td className="py-3 px-4 text-sm">
                      {row.entryTime
                        ? row.entryTime.toLocaleDateString()
                        : row["Entry time"]}
                    </td>
                    <td className="py-3 px-4 text-sm">{t(`backtestExplorer.sessions.${row.session}`, row.session)}</td>
                    <td
                      className={`py-3 px-4 text-sm font-medium ${row.profit >= 0 ? "text-green-400" : "text-red-400"}`}
                    >
                      {formatCurrency(row.profit)}
                    </td>
                    <td
                      className={`py-3 px-4 text-sm font-medium ${row.cumProfit >= 0 ? "text-green-400" : "text-red-400"}`}
                    >
                      {formatCurrency(row.cumProfit)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredData.length > 100 && (
              <div className="mt-4 text-center text-gray-400 text-sm">
                {t("backtestExplorer.showingTrades", { total: filteredData.length })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
