import { Link } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { TradingViewChart } from "../components/TradingViewChart";
import { useReducedMotion } from "../hooks/useReducedMotion";
import { SEO } from "../components/SEO";
import Papa from "papaparse";

import kinetickLogo from "../assets/logos/Kinetick_Logo.png";
import ntLogo from "../assets/logos/nt_ecosystem.png";
import ntUpgrade from "../assets/logos/nt_upgrade.png";

import fluxConfluence from "../assets/indicators/FluxConfluence.PNG";
import fluxPivot from "../assets/indicators/FluxPivot.PNG";
import fluxSignal from "../assets/indicators/FluxSignal.PNG";
import marketRegime from "../assets/indicators/MarketRegime.PNG";
import parabolicRSI from "../assets/indicators/ParabolicRSI.PNG";
import previousLevels from "../assets/indicators/PreviousLevels.PNG";
import fluxTarget from "../assets/indicators/FluxTarget.PNG";
import marketPhase from "../assets/indicators/MarketPhase.PNG";
import ttmSqueeze from "../assets/indicators/TTM Squeeze.PNG";
import volatilityCycle from "../assets/indicators/VolatilityCycle.PNG";
import highLowBands from "../assets/indicators/HighLowBands.png";

import fluxLightning1 from "../assets/strategies/FluxLightning1.PNG";
import fluxLightning2 from "../assets/strategies/FluxLightning2.PNG";
import fluxPivotStrat1 from "../assets/strategies/FluxPivotStrat1.PNG";
import fluxPivotStrat2 from "../assets/strategies/FluxPivotStrat2.PNG";
import fluxSignalStrat1 from "../assets/strategies/FluxSignalStrat1.PNG";
import fluxSignalStrat2 from "../assets/strategies/FluxSignalStrat2.PNG";
import fluxTrident1 from "../assets/strategies/FluxTrident1.PNG";
import fluxTrident2 from "../assets/strategies/FluxTrident2.PNG";
import ORMS1 from "../assets/strategies/ORMS1.png";
import ORMS2 from "../assets/strategies/ORMS2.png";
import cointegratedPairs1 from "../assets/strategies/CointegratedPairs1.PNG";
import cointegratedPairs2 from "../assets/strategies/CointegratedPairs2.PNG";
import rileySR1 from "../assets/strategies/RileySR1.PNG";
import rileySR2 from "../assets/strategies/RileySR2.PNG";
import orb1 from "../assets/strategies/ORB1.PNG";
import orb2 from "../assets/strategies/ORB2.PNG";

// New strategy assets
import elliotWave1 from "../assets/strategies/ElliotWave1.PNG";
import elliotWave2 from "../assets/strategies/ElliotWave2.PNG";
import iccChoch1 from "../assets/strategies/ICCChoch1.PNG";
import iccChoch2 from "../assets/strategies/ICCChoch2.PNG";
import lowVolatility1 from "../assets/strategies/LowVolatility1.PNG";
import lowVolatility2 from "../assets/strategies/LowVolatility2.PNG";
import projectGamma1 from "../assets/strategies/ProjectGamma1.PNG";
import projectGamma2 from "../assets/strategies/ProjectGamma2.PNG";
import trendCatcher1 from "../assets/strategies/TrendCatcher.PNG";
import trendCatcher2 from "../assets/strategies/TrendCatcher2.PNG";
import holyGrail1 from "../assets/strategies/HolyGrail1.PNG";
import holyGrail2 from "../assets/strategies/HolyGrail2.PNG";
import quadConfluence1 from "../assets/strategies/QuadConfluence1.PNG";
import quadConfluence2 from "../assets/strategies/QuadConfluence2.PNG";
import futurePredictionServer1 from "../assets/strategies/FuturePredictionServer1.PNG";
import futurePredictionServer2 from "../assets/strategies/FuturePredictionServer2.PNG";

// Newly added strategy assets
import donchianTurtle1 from "../assets/strategies/DonchianTurtle1.PNG";
import donchianTurtle2 from "../assets/strategies/DonchianTurtle2.PNG";
import ichimokoStrat1 from "../assets/strategies/IchimokoStrat1.PNG";
import ichimokoStrat2 from "../assets/strategies/IchimokoStrat2.PNG";
import keltnerStrat1 from "../assets/strategies/KeltnerStrat1.PNG";
import keltnerStrat2 from "../assets/strategies/KeltnerStrat2.PNG";

// Newly added strategy assets (Liquidity Sweep, Slow and Steady, Super Momentum)
import liquiditySweep1 from "../assets/strategies/LiquiditySweep1.PNG";
import liquiditySweep2 from "../assets/strategies/LiquiditySweep2.PNG";
import slowAndSteady1 from "../assets/strategies/SlowAndSteady1.PNG";
import slowAndSteady2 from "../assets/strategies/SlowAndSteady2.PNG";
import superMomentum1 from "../assets/strategies/SuperMomentum1.PNG";
import superMomentum2 from "../assets/strategies/SuperMomentum2.PNG";

// New strategy assets (AverageBounce, MegaBands, StopHunter, ChatGPT)
import averageBounce1 from "../assets/strategies/AverageBounce1.png";
import averageBounce2 from "../assets/strategies/AverageBounce2.png";
import megaBands1 from "../assets/strategies/MegaBands1.png";
import megaBands2 from "../assets/strategies/MegaBands2.png";
import stopHunter1 from "../assets/strategies/StopHunter1.png";
import stopHunter2 from "../assets/strategies/StopHunter2.png";
import chatGpt1 from "../assets/strategies/ChatGPT1.png";
import chatGpt2 from "../assets/strategies/ChatGPT2.png";

// Prop Focused strategies assets
import centauri1 from "../assets/strategies/Centauri1.png";
import centauri2 from "../assets/strategies/Centauri2.png";
import mars1 from "../assets/strategies/Mars1.png";
import mars2 from "../assets/strategies/Mars2.png";
import moon1 from "../assets/strategies/Moon1.png";
import moon2 from "../assets/strategies/Moon2.png";
import pluto1 from "../assets/strategies/Pluto1.png";
import pluto2 from "../assets/strategies/Pluto2.png";

import previous from "../assets/video/previous.mp4";
import confluenceVideo from "../assets/video/confluence.mp4";
import pivotVideo from "../assets/video/pivot.mp4";
import signalVideo from "../assets/video/signal.mp4";

// Win images
import win1 from "../assets/images/win1.png";
import win2 from "../assets/images/win2.png";
import win3 from "../assets/images/win3.png";

import "../App.css";

// Helper function to parse currency string like "$880.00" or "($500.00)" to number
const parseCurrency = (str) => {
  if (!str || str === "") return 0;
  const cleaned = str.replace(/[$,()]/g, "");
  const num = parseFloat(cleaned);
  return str.includes("(") ? -num : num;
};

// Map backtest URL to CSV filename
const getCsvFilename = (backtestUrl) => {
  if (!backtestUrl) return null;
  const urlParts = backtestUrl.split("/");
  const strategyName = urlParts[urlParts.length - 1];

  // Map URL slugs to CSV filenames
  const urlToCsvMap = {
    orms: "orms.csv",
    "liquidity-sweep": "liquiditySweep.csv",
    "slow-and-steady": "slowAndSteady.csv",
    "super-momentum": "superMomentum.csv",
    "donchian-turtle": "donchianTurtle.csv",
    "ichimoko-strat": "ichimokoStrat.csv",
    "keltner-strat": "keltnerStrat.csv",
    "future-prediction-server": "futurePredictionServer.csv",
    "quad-confluence": "quadConfluence.csv",
    "holy-grail": "holyGrail.csv",
    "elliot-wave": "elliotWave.csv",
    "icc-choch": "ICCChoCh.csv",
    "low-volatility": "lowVolatility.csv",
    "project-gamma": "projectGamma.csv",
    "trend-catcher": "trendCatcher.csv",
    orb: "orb.csv",
    "cointegrated-pairs": "cointegratedPairs.csv",
    "riley-sr": "rileySR.csv",
    "flux-lightning": "fluxLightning.csv",
    "flux-pivot-strat": "fluxPivotStrat.csv",
    "flux-signal-strat": "fluxSignalStrat.csv",
    "flux-trident": "fluxTrident.csv",
    centauri: "centauri.csv",
    mars: "mars.csv",
    moon: "moon.csv",
    pluto: "pluto.csv",
    "average-bounce": "averageBounce.csv",
    "mega-bands": "megaBands.csv",
    "stop-hunter": "stopHunter.csv",
    "chat-gpt": "chatGpt.csv",
  };

  return urlToCsvMap[strategyName] || null;
};

// Get strategy name for explorer query param (CSV filename without .csv extension)
const getStrategyNameForExplorer = (backtestUrl) => {
  const csvFilename = getCsvFilename(backtestUrl);
  if (!csvFilename) return null;
  return csvFilename.replace(".csv", "");
};

// Calculate metrics from CSV data
const calculateMetrics = (csvData) => {
  if (!csvData || csvData.length === 0) return null;

  const profits = csvData
    .map((row) => parseCurrency(row.Profit || row["Profit"]))
    .filter((p) => !isNaN(p));

  if (profits.length === 0) return null;

  const winningTrades = profits.filter((p) => p > 0);
  const losingTrades = profits.filter((p) => p < 0);
  const winRate = ((winningTrades.length / profits.length) * 100).toFixed(1);

  // Calculate profit factor
  const totalWins = winningTrades.reduce((sum, p) => sum + p, 0);
  const totalLosses = Math.abs(losingTrades.reduce((sum, p) => sum + p, 0));
  const profitFactor =
    totalLosses > 0 ? (totalWins / totalLosses).toFixed(2) : "N/A";

  // Calculate cumulative profit for drawdown
  let runningProfit = 0;
  let peak = 0;
  let maxDrawdown = 0;

  profits.forEach((profit) => {
    runningProfit += profit;
    peak = Math.max(peak, runningProfit);
    const drawdown = peak - runningProfit;
    maxDrawdown = Math.max(maxDrawdown, drawdown);
  });

  // Calculate max drawdown as percentage of peak equity
  const maxDrawdownPercent =
    peak > 0 ? ((maxDrawdown / peak) * 100).toFixed(1) : "0.0";

  // Calculate Sharpe ratio (simplified - annualized Sharpe)
  const avgReturn = profits.reduce((sum, p) => sum + p, 0) / profits.length;
  const variance =
    profits.reduce((sum, p) => sum + Math.pow(p - avgReturn, 2), 0) /
    profits.length;
  const stdDev = Math.sqrt(variance);
  const sharpe = stdDev > 0 ? (avgReturn / stdDev).toFixed(1) : "0.0";

  return {
    winRate: `${winRate}%`,
    maxDrawdown: `${maxDrawdownPercent}%`,
    sharpe: sharpe,
    profitFactor: profitFactor,
  };
};

export function LandingPage() {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();

  // Helper function to get translated indicator name
  const getIndicatorName = (key) => {
    return t(`landing.indicators.${key}.name`, { defaultValue: key });
  };

  // Helper function to get translated indicator features
  const getIndicatorFeatures = (key) => {
    const features = t(`landing.indicators.${key}.features`, { returnObjects: true });
    return Array.isArray(features) ? features : [];
  };

  // Helper function to get translated strategy name
  const getStrategyName = (key) => {
    return t(`landing.strategies.${key}.name`, { defaultValue: key });
  };

  // Helper function to get translated strategy features
  const getStrategyFeatures = (key) => {
    const features = t(`landing.strategies.${key}.features`, { returnObjects: true });
    return Array.isArray(features) ? features : [];
  };

  // Helper function to get translated prop-focused strategy name
  const getPropStrategyName = (key) => {
    return t(`landing.propFocusedStrategies.${key}.name`, { defaultValue: key });
  };

  // Helper function to get translated prop-focused strategy features
  const getPropStrategyFeatures = (key) => {
    const features = t(`landing.propFocusedStrategies.${key}.features`, { returnObjects: true });
    return Array.isArray(features) ? features : [];
  };
  const [activeTab, setActiveTab] = useState(() => {
    const savedTab = localStorage.getItem("landingPageActiveTab");
    return savedTab || "NinjaTrader";
  });

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [openSection, setOpenSection] = useState("propFocused"); // First section open by default
  const [isPaused, setIsPaused] = useState(prefersReducedMotion); // Start paused if reduced motion
  const [progress, setProgress] = useState(0);
  const [isVideoHovered, setIsVideoHovered] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [selectedIndicatorFilters, setSelectedIndicatorFilters] = useState([]);
  // Lazy loading state - track visible items for each section
  const [visibleStrategies, setVisibleStrategies] = useState(8);
  const [visiblePropStrategies, setVisiblePropStrategies] = useState(6);
  const [visibleIndicators, setVisibleIndicators] = useState(8);
  const [imageLoadedStates, setImageLoadedStates] = useState({});
  const [strategyMetrics, setStrategyMetrics] = useState({});
  const elapsedTimeRef = useRef(0);
  const videoRef = useRef(null);
  const prevReducedMotionRef = useRef(prefersReducedMotion);

  useEffect(() => {
    localStorage.setItem("landingPageActiveTab", activeTab);
  }, [activeTab]);

  // Sync pause state when reduced motion preference is enabled
  // This ensures video pauses if user enables reduced motion while video is playing
  useEffect(() => {
    // Only pause if reduced motion was just enabled (changed from false to true)
    if (prefersReducedMotion && !prevReducedMotionRef.current && !isPaused) {
      setIsPaused(true);
    }
    prevReducedMotionRef.current = prefersReducedMotion;
  }, [prefersReducedMotion, isPaused]);

  const toggleSection = (section) => {
    const isOpening = openSection !== section;
    setOpenSection(openSection === section ? null : section);

    // Scroll to section title when opening
    if (isOpening) {
      // Use setTimeout to ensure DOM has updated before scrolling
      setTimeout(() => {
        let elementId;
        if (section === "propFocused") {
          elementId =
            activeTab === "NinjaTrader"
              ? "prop-focused-title"
              : "tv-prop-focused-title";
        } else {
          elementId = `${section}-title`;
        }

        const element = document.getElementById(elementId);
        if (element) {
          // Get header height to account for fixed header
          const header = document.querySelector("header");
          const headerHeight = header ? header.offsetHeight + 50 : 150;

          // Calculate scroll position with offset
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition =
            elementPosition + window.pageYOffset - headerHeight;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      }, 100); // Small delay to allow React to render the content
    }
  };

  // Video carousel data
  const videos = [
    {
      src: previous,
      label: t("landing.videoLabels.previousLevels"),
    },
    {
      src: confluenceVideo,
      label: t("landing.videoLabels.fluxConfluence"),
    },
    {
      src: pivotVideo,
      label: t("landing.videoLabels.fluxPivot"),
    },
    {
      src: signalVideo,
      label: t("landing.videoLabels.fluxSignal"),
    },
  ];

  const nextVideo = () => {
    setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
    setProgress(0); // Reset progress when manually changing video
  };

  const prevVideo = () => {
    setCurrentVideoIndex((prev) => (prev - 1 + videos.length) % videos.length);
    setProgress(0); // Reset progress when manually changing video
  };

  const goToVideo = (index) => {
    setCurrentVideoIndex(index);
    setProgress(0); // Reset progress when manually changing video
  };

  const togglePause = () => {
    setIsPaused((prev) => !prev);
  };

  // Filter chips configuration
  const filterOptions = [
    t("landing.filters.trend"),
    t("landing.filters.meanReversion"),
    t("landing.filters.scalping"),
    t("landing.filters.conservative"),
    t("landing.filters.propFirmSafe"),
  ];

  // Indicator filter chips configuration
  const indicatorFilterOptions = [
    t("landing.filters.trend"),
    t("landing.filters.momentum"),
    t("landing.filters.volatility"),
    t("landing.filters.levels"),
    t("landing.filters.signals"),
  ];

  // Toggle filter selection
  const toggleFilter = (filter) => {
    setSelectedFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  // Toggle indicator filter selection
  const toggleIndicatorFilter = (filter) => {
    setSelectedIndicatorFilters((prev) =>
      prev.includes(filter)
        ? prev.filter((f) => f !== filter)
        : [...prev, filter]
    );
  };

  // Filter strategies based on selected filters
  const filterStrategies = (strategyList) => {
    if (selectedFilters.length === 0) {
      return strategyList;
    }
    return strategyList.filter((strategy) => {
      const strategyCategories = strategy.categories || [];
      return selectedFilters.some((filter) =>
        strategyCategories.includes(filter)
      );
    });
  };

  // Filter indicators based on selected filters
  const filterIndicators = (indicatorList) => {
    if (selectedIndicatorFilters.length === 0) {
      return indicatorList;
    }
    return indicatorList.filter((indicator) => {
      const indicatorCategories = indicator.categories || [];
      return selectedIndicatorFilters.some((filter) =>
        indicatorCategories.includes(filter)
      );
    });
  };

  // Count strategies matching a specific filter
  const countStrategiesForFilter = (filter, strategyList) => {
    return strategyList.filter((strategy) => {
      const strategyCategories = strategy.categories || [];
      return strategyCategories.includes(filter);
    }).length;
  };

  // Count indicators matching a specific filter
  const countIndicatorsForFilter = (filter, indicatorList) => {
    return indicatorList.filter((indicator) => {
      const indicatorCategories = indicator.categories || [];
      return indicatorCategories.includes(filter);
    }).length;
  };

  // Lazy loading helpers
  const loadMoreStrategies = () => {
    setVisibleStrategies((prev) => prev + 8);
  };

  const loadMorePropStrategies = () => {
    setVisiblePropStrategies((prev) => prev + 6);
  };

  const loadMoreIndicators = () => {
    setVisibleIndicators((prev) => prev + 8);
  };

  // Reset visible counts when filters change
  useEffect(() => {
    setVisibleStrategies(8);
    setVisiblePropStrategies(6);
    setVisibleIndicators(8);
  }, [selectedFilters, selectedIndicatorFilters, activeTab]);

  // Handle image load for LQIP
  const handleImageLoad = (imageId) => {
    setImageLoadedStates((prev) => ({ ...prev, [imageId]: true }));
  };

  // Reset elapsed time and progress when video changes
  useEffect(() => {
    elapsedTimeRef.current = 0;
    setProgress(0);
    // Auto-play video when it changes (unless paused or reduced motion is enabled)
    if (videoRef.current && !isPaused && !prefersReducedMotion) {
      videoRef.current.play().catch((error) => {
        // Ignore autoplay errors
        console.log("Autoplay prevented:", error);
      });
    }
  }, [currentVideoIndex, isPaused, prefersReducedMotion]);

  // Control video playback based on pause state
  useEffect(() => {
    if (videoRef.current) {
      if (isPaused) {
        videoRef.current.pause();
      } else {
        // Only play if reduced motion is not enabled, or if user manually unpaused
        videoRef.current.play().catch((error) => {
          // Ignore autoplay errors
          console.log("Autoplay prevented:", error);
        });
      }
    }
  }, [isPaused]);

  // Handle video loaded and play if not paused and reduced motion is not enabled
  const handleVideoLoaded = () => {
    if (videoRef.current && !isPaused && !prefersReducedMotion) {
      videoRef.current.play().catch((error) => {
        // Ignore autoplay errors
        console.log("Autoplay prevented:", error);
      });
    }
  };

  // Auto-advance carousel on timer with progress tracking
  useEffect(() => {
    if (isPaused || prefersReducedMotion) {
      return;
    }

    const duration = 20000; // 20 seconds
    const updateInterval = 50; // Update progress every 50ms for smooth animation

    const progressInterval = setInterval(() => {
      elapsedTimeRef.current += updateInterval;
      const newProgress = (elapsedTimeRef.current / duration) * 100;
      setProgress(newProgress);

      if (elapsedTimeRef.current >= duration) {
        setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
        elapsedTimeRef.current = 0;
      }
    }, updateInterval);

    return () => clearInterval(progressInterval);
  }, [currentVideoIndex, isPaused, prefersReducedMotion, videos.length]); // Reset timer when video changes or pause state changes

  const indicators = [
    {
      name: "HighLowBands",
      nameKey: "highLowBands",
      image: highLowBands,
      features: [
        "High and low band detection",
        "Dynamic support and resistance levels",
        "Great for breakout and reversal trades",
      ],
      categories: ["Levels", "Trend"],
      isNew: true,
    },
    {
      name: "FluxTarget",
      nameKey: "fluxTarget",
      image: fluxTarget,
      features: [
        "Dynamic target bands",
        "Adaptive to volatility",
        "Great for exits",
      ],
      categories: ["Levels", "Trend"],
    },
    {
      name: "Market Phase",
      nameKey: "marketPhase",
      image: marketPhase,
      features: [
        "Visual market phase detection",
        "Trend and range highlighting",
        "Easy to interpret",
      ],
      categories: ["Trend", "Volatility"],
    },
    {
      name: "TTM Squeeze",
      nameKey: "ttmSqueeze",
      image: ttmSqueeze,
      features: [
        "Momentum and squeeze detection",
        "Great for breakout trades",
        "Visual histogram",
      ],
      categories: ["Momentum", "Volatility"],
    },
    {
      name: "Volatility Cycle",
      nameKey: "volatilityCycle",
      image: volatilityCycle,
      features: [
        "Volatility cycle oscillator",
        "Spot expansion and contraction",
        "Pairs well with other indicators",
      ],
      categories: ["Volatility"],
    },

    {
      name: "FluxConfluence",
      nameKey: "fluxConfluence",
      image: fluxConfluence,
      features: [
        "Trade with the trend",
        "Get multiple confluences",
        "Buy and sell signals",
      ],
      categories: ["Trend", "Signals"],
    },
    {
      name: "FluxPivot",
      nameKey: "fluxPivot",
      image: fluxPivot,
      features: [
        "Pivot between buying and selling",
        "Add into existing positions",
        "Smart pivot detection",
      ],
      categories: ["Trend", "Signals"],
    },
    {
      name: "FluxSignal",
      nameKey: "fluxSignal",
      image: fluxSignal,
      features: [
        "Understand changing markets",
        "Buy and sell signals",
        "Catch new trends as they start",
      ],
      categories: ["Trend", "Signals"],
    },
    {
      name: "Market Regime",
      nameKey: "marketRegime",
      image: marketRegime,
      features: [
        "Understand market regimes",
        "High and low volatility",
        "Sideways or trending",
      ],
      categories: ["Volatility", "Trend"],
    },
    {
      name: "Parabolic RSI",
      nameKey: "parabolicRSI",
      image: parabolicRSI,
      features: [
        "Parabolic SAR + RSI",
        "Paired with Ultimate Entry Indicator",
        "Overbought and oversold areas",
      ],
      categories: ["Momentum", "Signals"],
    },
    {
      name: "Previous Levels",
      nameKey: "previousLevels",
      image: previousLevels,
      features: [
        "Identify previous highs and lows",
        "Trade reversals and breakouts",
        "Yesterday, premarket, and opening range",
      ],
      categories: ["Levels"],
    },
  ];

  const strategies = [
    {
      name: "AverageBounce",
      nameKey: "averageBounce",
      images: [averageBounce1, averageBounce2],
      features: [
        "Mean reversion strategy",
        "Bounces off key average levels",
        "Automated entries and exits",
      ],
      backtestUrl: "/backtests/average-bounce",
      isNew: true,
      categories: ["Mean Reversion"],
    },
    {
      name: "MegaBands",
      nameKey: "megaBands",
      images: [megaBands1, megaBands2],
      features: [
        "Dynamic band-based strategy",
        "Volatility-adaptive entries",
        "Trend following with bands",
      ],
      backtestUrl: "/backtests/mega-bands",
      isNew: true,
      categories: ["Trend", "Volatility"],
    },
    {
      name: "StopHunter",
      nameKey: "stopHunter",
      images: [stopHunter1, stopHunter2],
      features: [
        "Targets stop-loss levels",
        "Liquidity sweep detection",
        "Automated entry signals",
      ],
      backtestUrl: "/backtests/stop-hunter",
      isNew: true,
      categories: ["Scalping", "Trend"],
    },
    {
      name: "ChatGPT",
      nameKey: "chatGPT",
      images: [chatGpt1, chatGpt2],
      features: [
        "AI-powered strategy signals",
        "Machine learning based entries",
        "Adaptive to market conditions",
      ],
      backtestUrl: "/backtests/chat-gpt",
      isNew: true,
      categories: ["Trend"],
    },
    {
      name: "ORMS",
      nameKey: "orms",
      images: [ORMS1, ORMS2],
      features: [
        "Momentum scalping around NY open range",
        "Uses opening range momentum shifts",
        "Tight risk with quick targets",
      ],
      backtestUrl: "/backtests/orms",
      categories: ["Scalping"],
    },
    {
      name: "Liquidity Sweep",
      nameKey: "liquiditySweep",
      images: [liquiditySweep1, liquiditySweep2],
      features: [
        "Sweep liquidity around key levels",
        "Fade and breakout modes",
        "Risk-managed entries",
      ],
      backtestUrl: "/backtests/liquidity-sweep",
      categories: ["Scalping"],
    },
    {
      name: "Slow and Steady",
      nameKey: "slowAndSteady",
      images: [slowAndSteady1, slowAndSteady2],
      features: [
        "High-probability, low-frequency setups",
        "Tight risk controls",
        "Ideal for conservative growth",
      ],
      backtestUrl: "/backtests/slow-and-steady",
      categories: ["Conservative"],
    },
    {
      name: "Super Momentum",
      nameKey: "superMomentum",
      images: [superMomentum1, superMomentum2],
      features: [
        "Momentum continuation signals",
        "Dynamic targets with trailing stops",
        "Great in strong trend days",
      ],
      backtestUrl: "/backtests/super-momentum",
      categories: ["Trend"],
    },
    {
      name: "Donchian Turtle",
      nameKey: "donchianTurtle",
      images: [donchianTurtle1, donchianTurtle2],
      features: [
        "Breakout strategy using Donchian channels",
        "Trend following with pyramiding",
        "ATR-based stops and position sizing",
      ],
      backtestUrl: "/backtests/donchian-turtle",
      categories: ["Trend"],
    },
    {
      name: "IchimokoStrat",
      nameKey: "ichimokoStrat",
      images: [ichimokoStrat1, ichimokoStrat2],
      features: [
        "Ichimoku Kinko Hyo based entries",
        "Cloud, Tenkan/Kijun crosses, and Chikou span",
        "Works across market regimes",
      ],
      backtestUrl: "/backtests/ichimoko-strat",
      categories: ["Trend"],
    },
    {
      name: "KeltnerStrat",
      nameKey: "keltnerStrat",
      images: [keltnerStrat1, keltnerStrat2],
      features: [
        "Keltner Channel breakouts and pullbacks",
        "Volatility-adaptive targets and stops",
        "Pairs well with momentum filters",
      ],
      backtestUrl: "/backtests/keltner-strat",
      categories: ["Mean Reversion", "Trend"],
    },
    {
      name: "Future Prediction Server",
      nameKey: "futurePredictionServer",
      images: [futurePredictionServer1, futurePredictionServer2],
      features: [
        "Uses machine learning for labelling and predictions",
        "Calls out to a remote server",
        "Reinforcement learning algorithm",
      ],
      backtestUrl: "/backtests/future-prediction-server",
      categories: ["Trend"],
    },
    {
      name: "Quad Confluence",
      nameKey: "quadConfluence",
      images: [quadConfluence1, quadConfluence2],
      features: [
        "Multiple entry trigger types",
        "Looks for multiple confluences",
        "Dynamic targets and stops",
      ],
      backtestUrl: "/backtests/quad-confluence",
      categories: ["Trend"],
    },
    {
      name: "Holy Grail Adaptive",
      nameKey: "holyGrailAdaptive",
      images: [holyGrail1, holyGrail2],
      features: [
        "Adaptive trend following",
        "Automated entries and exits",
        "Targets and risk controls",
      ],
      backtestUrl: "/backtests/holy-grail",
      categories: ["Trend"],
    },
    {
      name: "ElliotWave",
      nameKey: "elliotWave",
      images: [elliotWave1, elliotWave2],
      features: [
        "Automated Elliott Wave counts",
        "Identifies impulse and corrective waves",
        "Risk targets aligned with structure",
      ],
      backtestUrl: "/backtests/elliot-wave",
      categories: ["Trend"],
    },
    {
      name: "ICC ChoCh",
      nameKey: "iccChoCh",
      images: [iccChoch1, iccChoch2],
      features: [
        "Smart structure shift detection",
        "ChoCh/BOS signals for reversals",
        "Trend continuation and reversal logic",
      ],
      backtestUrl: "/backtests/icc-choch",
      categories: ["Trend"],
    },
    {
      name: "Low Volatility",
      nameKey: "lowVolatility",
      images: [lowVolatility1, lowVolatility2],
      features: [
        "Mean reversion in quiet regimes",
        "Adaptive filters and bands",
        "Captures squeeze expansions",
      ],
      backtestUrl: "/backtests/low-volatility",
      categories: ["Mean Reversion"],
    },
    {
      name: "Project Gamma",
      nameKey: "projectGamma",
      images: [projectGamma1, projectGamma2],
      features: [
        "Bullish and bearish engulfing pattern detection",
        "Volatility-aware entries and exits",
        "Great on indices and futures",
      ],
      backtestUrl: "/backtests/project-gamma",
      categories: ["Trend"],
    },
    {
      name: "TrendCatcher",
      nameKey: "trendCatcher",
      images: [trendCatcher1, trendCatcher2],
      features: [
        "Ride sustained trends",
        "Dynamic trailing stop logic",
        "Multi-timeframe confirmation",
      ],
      backtestUrl: "/backtests/trend-catcher",
      categories: ["Trend"],
    },
    {
      name: "ORB (Opening Range Break)",
      nameKey: "orb",
      images: [orb1, orb2],
      features: [
        "Classic opening range breakout",
        "Automated entries and exits",
        "Works on all timeframes",
        "Great for volatility and momentum",
      ],
      backtestUrl: "/backtests/orb",
      categories: ["Trend", "Scalping"],
    },
    {
      name: "CointegratedPairs",
      nameKey: "cointegratedPairs",
      images: [cointegratedPairs1, cointegratedPairs2],
      features: [
        "Pairs trading strategy",
        "Statistical arbitrage",
        "Dynamic Z-Score entries and exits",
      ],
      backtestUrl: "/backtests/cointegrated-pairs",
      categories: ["Mean Reversion"],
    },
    {
      name: "RileySR",
      nameKey: "rileySR",
      images: [rileySR1, rileySR2],
      features: [
        "Support/resistance breakout",
        "Multiple indicator filters",
        "Volume and RSI confirmation",
      ],
      backtestUrl: "/backtests/riley-sr",
      categories: ["Trend"],
    },
    {
      name: "FluxLightning",
      nameKey: "fluxLightning",
      images: [fluxLightning1, fluxLightning2],
      features: [
        "Fully automated strategy",
        "Great for trending markets",
        "Long and short signals",
      ],
      backtestUrl: "/backtests/flux-lightning",
      categories: ["Trend"],
    },
    {
      name: "FluxPivot Strategy",
      nameKey: "fluxPivotStrategy",
      images: [fluxPivotStrat1, fluxPivotStrat2],
      features: [
        "Automated pivot detection",
        "Trade with institutional levels",
        "Works great with FluxPivot indicator",
      ],
      backtestUrl: "/backtests/flux-pivot-strat",
      categories: ["Trend"],
    },
    {
      name: "FluxSignal Strategy",
      nameKey: "fluxSignalStrategy",
      images: [fluxSignalStrat1, fluxSignalStrat2],
      features: [
        "Uses Flux Signal for entries",
        "Catches trends early",
        "Simple to use",
      ],
      backtestUrl: "/backtests/flux-signal-strat",
      categories: ["Trend"],
    },
    {
      name: "FluxTrident",
      nameKey: "fluxTrident",
      images: [fluxTrident1, fluxTrident2],
      features: [
        "Three-step trend confirmation",
        "Powerful scalping strategy",
        "Identifies strong trend continuations",
      ],
      backtestUrl: "/backtests/flux-trident",
      categories: ["Trend", "Scalping"],
    },
  ];

  // New Prop Focused strategies (NinjaTrader only)
  const propFocusedStrategies = [
    {
      name: "Centauri",
      nameKey: "centauri",
      images: [centauri1, centauri2],
      features: [
        "Prop firm friendly risk management",
        "Designed for low drawdown and consistency",
        "Strict daily loss compliance",
      ],
      backtestUrl: "/backtests/centauri",
      isNew: true,
      categories: ["Prop-firm-safe"],
    },
    {
      name: "Mars",
      nameKey: "mars",
      images: [mars1, mars2],
      features: [
        "Momentum with disciplined risk",
        "Adaptive targets and stops",
        "Prop account scaling focus",
      ],
      backtestUrl: "/backtests/mars",
      isNew: true,
      categories: ["Prop-firm-safe", "Trend"],
    },
    {
      name: "Moon",
      nameKey: "moon",
      images: [moon1, moon2],
      features: [
        "Trend capture with tight controls",
        "High-quality signal filtering",
        "Consistent performance characteristics",
      ],
      backtestUrl: "/backtests/moon",
      isNew: true,
      categories: ["Prop-firm-safe", "Trend"],
    },
    {
      name: "Pluto",
      nameKey: "pluto",
      images: [pluto1, pluto2],
      features: [
        "Structured entries and exits",
        "Volatility-aware position sizing",
        "Prop firm objective alignment",
      ],
      backtestUrl: "/backtests/pluto",
      isNew: true,
      categories: ["Prop-firm-safe"],
    },
  ];

  // TradingView assets
  // Indicators
  const tvDynamicTrend = require("../assets/tradingview/indicators/dynamicTrend.png");
  const tvFluxConfluence = require("../assets/tradingview/indicators/fluxConfluence.png");
  const tvFluxPivot = require("../assets/tradingview/indicators/fluxPivot.png");
  const tvFluxSignal = require("../assets/tradingview/indicators/fluxsignal.png");
  const tvParabolicRSI = require("../assets/tradingview/indicators/parabolicRSI.png");
  const tvTtmSqueeze = require("../assets/tradingview/indicators/ttmSqueeze.png");
  const tvVolatilityCycle = require("../assets/tradingview/indicators/volatilityCycle.png");
  const tvFluxTarget = require("../assets/tradingview/indicators/fluxTarget.png");
  const tvMarketPhase = require("../assets/tradingview/indicators/marketPhase.png");
  const tvMarketRegime = require("../assets/tradingview/indicators/marketRegime.png");
  const tvPreviousLevels = require("../assets/tradingview/indicators/prevLevels.png");
  const tvHighLowBands = require("../assets/tradingview/indicators/highLowBands.png");

  // Strategies
  const tvDonchian = require("../assets/tradingview/strategies/donchian.png");
  const tvOrms = require("../assets/tradingview/strategies/orms.png");
  const tvFluxLightning = require("../assets/tradingview/strategies/fluxLightning.png");
  const tvFluxPivotStrat = require("../assets/tradingview/strategies/fluxPivotStrat.png");
  const tvFluxSignalStrat = require("../assets/tradingview/strategies/fluxSignalStrat.png");
  // const tvFluxSignalScalper = require("../assets/tradingview/strategies/fluxSignalScalper.png");
  // const tvFluxThunder = require("../assets/tradingview/strategies/fluxThunder.png");
  const tvFluxTrident = require("../assets/tradingview/strategies/fluxTrident.png");
  const tvIccCoch = require("../assets/tradingview/strategies/icccoch.png");
  const tvIchimoko = require("../assets/tradingview/strategies/ichimiko.png");
  const tvKeltnerStrat = require("../assets/tradingview/strategies/keltnerStrat.png");
  const tvLowVolatility = require("../assets/tradingview/strategies/lowVolatility.png");
  const tvOrb = require("../assets/tradingview/strategies/orb.png");
  const tvProjectGamma = require("../assets/tradingview/strategies/projectGamma.png");
  const tvRileySR = require("../assets/tradingview/strategies/rileySR.png");
  const tvSlowAndSteady = require("../assets/tradingview/strategies/slowAndSteady.png");
  const tvSuperMomentum = require("../assets/tradingview/strategies/superMomentum.png");
  const tvTrendCatcher = require("../assets/tradingview/strategies/trendCatcher.png");
  const liquiditySweep = require("../assets/tradingview/strategies/liquiditySweep.png");
  const tvAverageBounce = require("../assets/tradingview/strategies/averageBounce.png");
  const tvMegaBands = require("../assets/tradingview/strategies/megaBands.png");
  const tvStopHunter = require("../assets/tradingview/strategies/stopHunter.png");

  // Helper getters to reuse features/backtest info where possible
  const getIndicatorByName = (name) => indicators.find((i) => i.name === name);
  const getStrategyByName = (name) => strategies.find((s) => s.name === name);

  // TradingView Prop Focused strategy images
  const tvCentauri = require("../assets/tradingview/strategies/centauri.png");
  const tvMars = require("../assets/tradingview/strategies/mars.png");
  const tvMoon = require("../assets/tradingview/strategies/moon.png");
  const tvPluto = require("../assets/tradingview/strategies/pluto.png");

  // TradingView Prop Focused Strategies (reuse features/backtests from NT equivalents)
  const tvPropFocusedStrategies = [
    {
      name: "Centauri",
      nameKey: "centauri",
      images: [tvCentauri],
      features: propFocusedStrategies.find((s) => s.name === "Centauri")
        ?.features,
      backtestUrl: propFocusedStrategies.find((s) => s.name === "Centauri")
        ?.backtestUrl,
      categories: propFocusedStrategies.find((s) => s.name === "Centauri")
        ?.categories,
      isNew: true,
    },
    {
      name: "Mars",
      nameKey: "mars",
      images: [tvMars],
      features: propFocusedStrategies.find((s) => s.name === "Mars")?.features,
      backtestUrl: propFocusedStrategies.find((s) => s.name === "Mars")
        ?.backtestUrl,
      categories: propFocusedStrategies.find((s) => s.name === "Mars")
        ?.categories,
      isNew: true,
    },
    {
      name: "Moon",
      nameKey: "moon",
      images: [tvMoon],
      features: propFocusedStrategies.find((s) => s.name === "Moon")?.features,
      backtestUrl: propFocusedStrategies.find((s) => s.name === "Moon")
        ?.backtestUrl,
      categories: propFocusedStrategies.find((s) => s.name === "Moon")
        ?.categories,
      isNew: true,
    },
    {
      name: "Pluto",
      nameKey: "pluto",
      images: [tvPluto],
      features: propFocusedStrategies.find((s) => s.name === "Pluto")?.features,
      backtestUrl: propFocusedStrategies.find((s) => s.name === "Pluto")
        ?.backtestUrl,
      categories: propFocusedStrategies.find((s) => s.name === "Pluto")
        ?.categories,
      isNew: true,
    },
  ];

  const tradingViewIndicators = [
    {
      name: "HighLowBands",
      nameKey: "highLowBands",
      image: tvHighLowBands,
      features: getIndicatorByName("HighLowBands")?.features,
      categories: getIndicatorByName("HighLowBands")?.categories,
      isNew: true,
    },
    {
      name: "Dynamic Trend",
      nameKey: "dynamicTrend",
      image: tvDynamicTrend,
      features: [
        "Dynamic trendline",
        "Support and resistance",
        "Signals upon crosses",
      ],
      categories: ["Trend", "Levels", "Signals"],
    },
    {
      name: "FluxConfluence",
      nameKey: "fluxConfluence",
      image: tvFluxConfluence,
      features: getIndicatorByName("FluxConfluence")?.features,
      categories: getIndicatorByName("FluxConfluence")?.categories,
    },
    {
      name: "FluxPivot",
      nameKey: "fluxPivot",
      image: tvFluxPivot,
      features: getIndicatorByName("FluxPivot")?.features,
      categories: getIndicatorByName("FluxPivot")?.categories,
    },
    {
      name: "FluxSignal",
      nameKey: "fluxSignal",
      image: tvFluxSignal,
      features: getIndicatorByName("FluxSignal")?.features,
      categories: getIndicatorByName("FluxSignal")?.categories,
    },
    {
      name: "Parabolic RSI",
      nameKey: "parabolicRSI",
      image: tvParabolicRSI,
      features: getIndicatorByName("Parabolic RSI")?.features,
      categories: getIndicatorByName("Parabolic RSI")?.categories,
    },
    {
      name: "TTM Squeeze",
      nameKey: "ttmSqueeze",
      image: tvTtmSqueeze,
      features: getIndicatorByName("TTM Squeeze")?.features,
      categories: getIndicatorByName("TTM Squeeze")?.categories,
    },
    {
      name: "Volatility Cycle",
      nameKey: "volatilityCycle",
      image: tvVolatilityCycle,
      features: getIndicatorByName("Volatility Cycle")?.features,
      categories: getIndicatorByName("Volatility Cycle")?.categories,
    },
    {
      name: "FluxTarget",
      nameKey: "fluxTarget",
      image: tvFluxTarget,
      features: getIndicatorByName("FluxTarget")?.features,
      categories: getIndicatorByName("FluxTarget")?.categories,
    },
    {
      name: "Market Phase",
      nameKey: "marketPhase",
      image: tvMarketPhase,
      features: getIndicatorByName("Market Phase")?.features,
      categories: getIndicatorByName("Market Phase")?.categories,
    },
    {
      name: "Market Regime",
      nameKey: "marketRegime",
      image: tvMarketRegime,
      features: getIndicatorByName("Market Regime")?.features,
      categories: getIndicatorByName("Market Regime")?.categories,
    },
    {
      name: "Previous Levels",
      nameKey: "previousLevels",
      image: tvPreviousLevels,
      features: getIndicatorByName("Previous Levels")?.features,
      categories: getIndicatorByName("Previous Levels")?.categories,
    },
  ];

  const tradingViewStrategies = [
    {
      name: "AverageBounce",
      nameKey: "averageBounce",
      images: [tvAverageBounce],
      features: getStrategyByName("AverageBounce")?.features,
      backtestUrl: getStrategyByName("AverageBounce")?.backtestUrl,
      categories: getStrategyByName("AverageBounce")?.categories,
      isNew: true,
    },
    {
      name: "MegaBands",
      nameKey: "megaBands",
      images: [tvMegaBands],
      features: getStrategyByName("MegaBands")?.features,
      backtestUrl: getStrategyByName("MegaBands")?.backtestUrl,
      categories: getStrategyByName("MegaBands")?.categories,
      isNew: true,
    },
    {
      name: "StopHunter",
      nameKey: "stopHunter",
      images: [tvStopHunter],
      features: getStrategyByName("StopHunter")?.features,
      backtestUrl: getStrategyByName("StopHunter")?.backtestUrl,
      categories: getStrategyByName("StopHunter")?.categories,
      isNew: true,
    },
    {
      name: "ORMS",
      nameKey: "orms",
      images: [tvOrms],
      features: getStrategyByName("ORMS")?.features,
      backtestUrl: getStrategyByName("ORMS")?.backtestUrl,
      categories: getStrategyByName("ORMS")?.categories,
    },
    {
      name: "Donchian Turtle",
      nameKey: "donchianTurtle",
      images: [tvDonchian],
      features: getStrategyByName("Donchian Turtle")?.features,
      backtestUrl: getStrategyByName("Donchian Turtle")?.backtestUrl,
      categories: getStrategyByName("Donchian Turtle")?.categories,
    },
    {
      name: "FluxLightning",
      nameKey: "fluxLightning",
      images: [tvFluxLightning],
      features: getStrategyByName("FluxLightning")?.features,
      backtestUrl: getStrategyByName("FluxLightning")?.backtestUrl,
      categories: getStrategyByName("FluxLightning")?.categories,
    },
    {
      name: "FluxPivot Strategy",
      nameKey: "fluxPivotStrategy",
      images: [tvFluxPivotStrat],
      features: getStrategyByName("FluxPivot Strategy")?.features,
      backtestUrl: getStrategyByName("FluxPivot Strategy")?.backtestUrl,
      categories: getStrategyByName("FluxPivot Strategy")?.categories,
    },
    {
      name: "FluxSignal Strategy",
      nameKey: "fluxSignalStrategy",
      images: [tvFluxSignalStrat],
      features: getStrategyByName("FluxSignal Strategy")?.features,
      backtestUrl: getStrategyByName("FluxSignal Strategy")?.backtestUrl,
      categories: getStrategyByName("FluxSignal Strategy")?.categories,
    },
    // {
    //   name: 'FluxSignal Scalper',
    //   images: [tvFluxSignalScalper],
    //   features: [],
    // },
    // {
    //   name: 'Flux Thunder',
    //   images: [tvFluxThunder],
    //   features: [],
    // },
    {
      name: "FluxTrident",
      nameKey: "fluxTrident",
      images: [tvFluxTrident],
      features: getStrategyByName("FluxTrident")?.features,
      backtestUrl: getStrategyByName("FluxTrident")?.backtestUrl,
      categories: getStrategyByName("FluxTrident")?.categories,
    },
    {
      name: "ICC ChoCh",
      nameKey: "iccChoCh",
      images: [tvIccCoch],
      features: getStrategyByName("ICC ChoCh")?.features,
      backtestUrl: getStrategyByName("ICC ChoCh")?.backtestUrl,
      categories: getStrategyByName("ICC ChoCh")?.categories,
    },
    {
      name: "IchimokoStrat",
      nameKey: "ichimokoStrat",
      images: [tvIchimoko],
      features: getStrategyByName("IchimokoStrat")?.features,
      backtestUrl: getStrategyByName("IchimokoStrat")?.backtestUrl,
      categories: getStrategyByName("IchimokoStrat")?.categories,
    },
    {
      name: "KeltnerStrat",
      nameKey: "keltnerStrat",
      images: [tvKeltnerStrat],
      features: getStrategyByName("KeltnerStrat")?.features,
      backtestUrl: getStrategyByName("KeltnerStrat")?.backtestUrl,
      categories: getStrategyByName("KeltnerStrat")?.categories,
    },
    {
      name: "Low Volatility",
      nameKey: "lowVolatility",
      images: [tvLowVolatility],
      features: getStrategyByName("Low Volatility")?.features,
      backtestUrl: getStrategyByName("Low Volatility")?.backtestUrl,
      categories: getStrategyByName("Low Volatility")?.categories,
    },
    {
      name: "ORB (Opening Range Break)",
      nameKey: "orb",
      images: [tvOrb],
      features: getStrategyByName("ORB (Opening Range Break)")?.features,
      backtestUrl: getStrategyByName("ORB (Opening Range Break)")?.backtestUrl,
      categories: getStrategyByName("ORB (Opening Range Break)")?.categories,
    },
    {
      name: "Project Gamma",
      nameKey: "projectGamma",
      images: [tvProjectGamma],
      features: getStrategyByName("Project Gamma")?.features,
      backtestUrl: getStrategyByName("Project Gamma")?.backtestUrl,
      categories: getStrategyByName("Project Gamma")?.categories,
    },
    {
      name: "RileySR",
      nameKey: "rileySR",
      images: [tvRileySR],
      features: getStrategyByName("RileySR")?.features,
      backtestUrl: getStrategyByName("RileySR")?.backtestUrl,
      categories: getStrategyByName("RileySR")?.categories,
    },
    {
      name: "Slow and Steady",
      nameKey: "slowAndSteady",
      images: [tvSlowAndSteady],
      features: getStrategyByName("Slow and Steady")?.features,
      backtestUrl: getStrategyByName("Slow and Steady")?.backtestUrl,
      categories: getStrategyByName("Slow and Steady")?.categories,
    },
    {
      name: "Super Momentum",
      nameKey: "superMomentum",
      images: [tvSuperMomentum],
      features: getStrategyByName("Super Momentum")?.features,
      backtestUrl: getStrategyByName("Super Momentum")?.backtestUrl,
      categories: getStrategyByName("Super Momentum")?.categories,
    },
    {
      name: "Liquidity Sweep",
      nameKey: "liquiditySweep",
      images: [liquiditySweep],
      features: getStrategyByName("Liquidity Sweep")?.features,
      backtestUrl: getStrategyByName("Liquidity Sweep")?.backtestUrl,
      categories: getStrategyByName("Liquidity Sweep")?.categories,
    },
    {
      name: "TrendCatcher",
      nameKey: "trendCatcher",
      images: [tvTrendCatcher],
      features: getStrategyByName("TrendCatcher")?.features,
      backtestUrl: getStrategyByName("TrendCatcher")?.backtestUrl,
      categories: getStrategyByName("TrendCatcher")?.categories,
    },
  ];

  // Load metrics for all strategies
  /* eslint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const loadMetrics = async () => {
      const allStrategies = [
        ...strategies,
        ...propFocusedStrategies,
        ...tradingViewStrategies,
        ...tvPropFocusedStrategies,
      ];

      const metricsPromises = allStrategies
        .filter((strategy) => strategy.backtestUrl)
        .map(async (strategy) => {
          const csvFile = getCsvFilename(strategy.backtestUrl);
          if (!csvFile)
            return { strategy: strategy.backtestUrl, metrics: null };

          try {
            const response = await fetch(`/backtests/${csvFile}`);
            const reader = response.body.getReader();
            const result = await reader.read();
            const decoder = new TextDecoder("utf-8");
            const csv = decoder.decode(result.value);

            return new Promise((resolve) => {
              Papa.parse(csv, {
                header: true,
                complete: (results) => {
                  const data = results.data.filter(
                    (row) => row["Trade number"] && row["Entry time"]
                  );
                  const metrics = calculateMetrics(data);
                  resolve({
                    strategy: strategy.backtestUrl,
                    metrics: metrics,
                  });
                },
                error: () => {
                  resolve({
                    strategy: strategy.backtestUrl,
                    metrics: null,
                  });
                },
              });
            });
          } catch (error) {
            console.error(`Error loading metrics for ${csvFile}:`, error);
            return { strategy: strategy.backtestUrl, metrics: null };
          }
        });

      const results = await Promise.all(metricsPromises);
      const metricsMap = {};
      results.forEach(({ strategy, metrics }) => {
        if (strategy && metrics) {
          metricsMap[strategy] = metrics;
        }
      });
      setStrategyMetrics(metricsMap);
    };

    loadMetrics();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="bg-gray-900 text-white min-h-full">
      <SEO
        title="Advanced Trading Software & Strategies"
        description="FluxTrade provides advanced trading software, automated strategies, and indicators for NinjaTrader and TradingView. Backtested strategies, prop firm focused tools, and professional-grade trading solutions."
        keywords="trading software, automated trading strategies, NinjaTrader indicators, TradingView strategies, prop firm trading, backtested strategies, trading algorithms, flux trident, flux signal, flux pivot"
        canonical="/"
      />
      {/* Hero Section with Video Above the Fold */}
      <section
        className="relative w-full max-w-7xl mx-auto px-4"
        aria-label="Hero section"
      >
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          {/* Left side: Headline and CTA */}
          <div className="flex-1 text-center lg:text-left">
            <h1 className="pt-[20px] lg:text-[80px] md:text-[50px] text-[40px] font-bold mb-4">
              {t("landing.understandMarkets")}{" "}
              <span
                className={`italic bg-gradient-to-tl from-red-600 via-gray-300 to-green-600 hover:bg-gradient-to-br hover:from-green-500 hover:via-green-200 hover:to-lime-500 text-transparent bg-clip-text bg-300 ${prefersReducedMotion ? "" : "animate-gradient-pan"} cursor-default`}
                aria-label={t("landing.markets")}
              >
                {t("landing.markets")}
              </span>
              .
            </h1>
            <h2 className="lg:text-[80px] md:text-[50px] text-[40px] font-bold mb-6">
              {t("landing.gainEdge")}{" "}
              <span
                className={`italic bg-gradient-to-tl from-green-500 via-yellow-500 to-purple-800 hover:bg-gradient-to-br hover:from-purple-400 hover:via-indigo-400 hover:to-blue-400 text-transparent bg-clip-text bg-300 ${prefersReducedMotion ? "" : "animate-gradient-pan"} cursor-default`}
                aria-label={t("landing.edge")}
              >
                {t("landing.edge")}
              </span>
              .
            </h2>
            <p className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-8 font-medium">
              {t("landing.subtitle")}
            </p>
            <Link
              to="/pricing"
              className={`inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300 transform hover:scale-105 shadow-lg relative overflow-hidden ${prefersReducedMotion ? "" : "animate-pulse-glow"}`}
              aria-label={`${t("landing.seeItTrade")} - Go to pricing page`}
            >
              <span className="relative z-10">{t("landing.seeItTrade")}</span>
              {!prefersReducedMotion && (
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer bg-[length:200%_100%]"></span>
              )}
            </Link>
          </div>

          {/* Right side: Video Carousel */}
          <div
            className="w-auto flex flex-col items-center h-[600px]"
            aria-label={t("landing.videoCarousel")}
          >
            <div
              className="relative rounded-lg overflow-hidden shadow-lg mb-4"
              onMouseEnter={() => setIsVideoHovered(true)}
              onMouseLeave={() => setIsVideoHovered(false)}
            >
              {/* Video Player */}
              <video
                ref={videoRef}
                key={currentVideoIndex}
                className="w-[300px] h-[600px] cursor-pointer"
                loop
                muted
                playsInline
                controls={false}
                onLoadedData={handleVideoLoaded}
                onClick={togglePause}
                aria-label={t("landing.demonstrationVideo", {
                  label: videos[currentVideoIndex].label,
                })}
                aria-describedby="video-description"
              >
                <source src={videos[currentVideoIndex].src} type="video/mp4" />
                <track
                  kind="captions"
                  srcLang="en"
                  label="English captions"
                  default
                />
                Your browser does not support the video tag.
              </video>
              <div id="video-description" className="sr-only">
                {t("landing.demonstrationVideo", {
                  label: videos[currentVideoIndex].label,
                })}
              </div>

              {/* Centered Pause/Play Button - Visible on hover or when paused */}
              {(isVideoHovered || isPaused) && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePause();
                  }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/70 hover:bg-black/90 text-white rounded-full p-4 transition-all duration-200 z-20 shadow-lg"
                  aria-label={
                    isPaused
                      ? t("landing.playCarousel")
                      : t("landing.pauseCarousel")
                  }
                >
                  {isPaused ? (
                    <svg
                      className="w-8 h-8"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  ) : (
                    <svg
                      className="w-8 h-8"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                    </svg>
                  )}
                </button>
              )}

              {/* Navigation Buttons */}
              <button
                onClick={prevVideo}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-200 z-10"
                aria-label={t("landing.previousVideo")}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={nextVideo}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-all duration-200 z-10"
                aria-label={t("landing.nextVideo")}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              {/* Pause/Play Button with Circular Progress */}
              <div className="absolute bottom-4 right-4 z-10">
                <button
                  onClick={togglePause}
                  className="bg-black/50 hover:bg-black/70 text-white rounded-full p-3 transition-all duration-200 relative w-12 h-12 flex items-center justify-center"
                  aria-label={
                    isPaused
                      ? t("landing.playCarousel")
                      : t("landing.pauseCarousel")
                  }
                >
                  {/* Circular Progress Indicator */}
                  <svg
                    className="absolute inset-0 w-full h-full transform -rotate-90"
                    width="48"
                    height="48"
                  >
                    {/* Background circle */}
                    <circle
                      cx="24"
                      cy="24"
                      r="20"
                      fill="none"
                      stroke="rgba(255, 255, 255, 0.2)"
                      strokeWidth="3"
                    />
                    {/* Progress circle */}
                    <circle
                      cx="24"
                      cy="24"
                      r="20"
                      fill="none"
                      stroke="white"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 20}`}
                      strokeDashoffset={`${2 * Math.PI * 20 * (1 - progress / 100)}`}
                      className="transition-all duration-50"
                    />
                  </svg>
                  {/* Play/Pause Icon */}
                  <span className="relative z-10">
                    {isPaused ? (
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                      </svg>
                    )}
                  </span>
                </button>
              </div>
            </div>

            {/* Video Label */}
            <div className="text-center mb-3">
              <h3
                className="text-xl font-semibold text-white"
                id="current-video-label"
              >
                {videos[currentVideoIndex].label}
              </h3>
            </div>

            {/* Dot Indicators */}
            <div
              className="flex gap-2 justify-center"
              role="tablist"
              aria-label={t("landing.videoCarouselNav")}
            >
              {videos.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToVideo(index)}
                  role="tab"
                  aria-selected={index === currentVideoIndex}
                  aria-controls={`video-${index}`}
                  className={`w-3 h-3 rounded-full transition-all duration-200 ${
                    index === currentVideoIndex
                      ? "bg-[#5865F2] w-8"
                      : "bg-gray-600 hover:bg-gray-500"
                  }`}
                  aria-label={t("landing.goToVideo", {
                    label: videos[index].label,
                  })}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <main className="p-8">
        {/* Tabs */}
        <div
          className="flex justify-center mb-10"
          role="tablist"
          aria-label="Platform selection"
        >
          <div className="inline-flex rounded-lg bg-gray-800 p-1">
            <button
              onClick={() => setActiveTab("NinjaTrader")}
              role="tab"
              id="ninjatrader-tab"
              aria-selected={activeTab === "NinjaTrader"}
              aria-controls="ninjatrader-content"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === "NinjaTrader" ? "bg-[#5865F2] hover:bg-[#4752C4] text-white" : "text-gray-300 hover:text-white hover:bg-gray-700"}`}
            >
              {t("landing.ninjaTrader")}
            </button>
            <button
              onClick={() => setActiveTab("TradingView")}
              role="tab"
              id="tradingview-tab"
              aria-selected={activeTab === "TradingView"}
              aria-controls="tradingview-content"
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${activeTab === "TradingView" ? "bg-[#5865F2] hover:bg-[#4752C4] text-white" : "text-gray-300 hover:text-white hover:bg-gray-700"}`}
            >
              {t("landing.tradingView")}{" "}
              <span
                className={`ml-2 bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 text-white text-xs font-bold px-2 py-1 rounded ${prefersReducedMotion ? "" : "animate-pulse"}`}
                aria-label={t("landing.new")}
              >
                {t("landing.new")}
              </span>
            </button>
          </div>
        </div>

        {/* TradingView Chart with Indicator Toggles - Show for TradingView tab */}
        {activeTab === "TradingView" && (
          <section
            className="mb-16 max-w-7xl mx-auto"
            id="tradingview-content"
            role="tabpanel"
            aria-labelledby="tradingview-tab"
          >
            <TradingViewChart symbol="QQQ" height={600} />
          </section>
        )}

        {(() => {
          const currentStrategies =
            activeTab === "NinjaTrader" ? strategies : tradingViewStrategies;
          const currentIndicators =
            activeTab === "NinjaTrader" ? indicators : tradingViewIndicators;
          return (
            <>
              {activeTab === "NinjaTrader" && (
                <section
                  id="ninjatrader-content"
                  className="mb-12"
                  role="tabpanel"
                  aria-labelledby="ninjatrader-tab"
                >
                  <button
                    id="prop-focused-title"
                    onClick={() => toggleSection("propFocused")}
                    className="w-full flex items-center justify-center gap-4 mb-4 hover:opacity-80 transition-opacity"
                    aria-expanded={openSection === "propFocused"}
                    aria-controls="prop-focused-content"
                  >
                    <div className="text-center">
                      <h2 className="text-3xl font-bold mb-2">
                        {t("landing.propFirmFocused")}
                      </h2>
                      <h3 className="text-2xl">
                        {t("landing.propFirmSubtitle")}
                      </h3>
                    </div>
                    <svg
                      className={`w-6 h-6 transition-transform flex-shrink-0 ${
                        openSection === "propFocused" ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {openSection === "propFocused" && (
                    <>
                      {/* Filter Chips */}
                      <div className="flex flex-wrap gap-2 justify-center mb-6">
                        {filterOptions.map((filter) => {
                          const count = countStrategiesForFilter(
                            filter,
                            propFocusedStrategies
                          );
                          if (count === 0) return null;
                          return (
                            <button
                              key={filter}
                              onClick={() => toggleFilter(filter)}
                              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                                selectedFilters.includes(filter)
                                  ? "bg-[#5865F2] text-white shadow-lg scale-105"
                                  : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
                              }`}
                              aria-pressed={selectedFilters.includes(filter)}
                              aria-label={`Filter by ${filter}`}
                            >
                              {filter} ({count})
                            </button>
                          );
                        })}
                        <button
                          onClick={() => setSelectedFilters([])}
                          disabled={selectedFilters.length === 0}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                            selectedFilters.length > 0
                              ? "bg-gray-600 text-gray-300 hover:bg-gray-500 hover:text-white"
                              : "bg-gray-700 text-gray-500 cursor-not-allowed opacity-50"
                          }`}
                          aria-label={t("landing.clearFilters")}
                        >
                          {t("landing.clearFilters")}
                        </button>
                      </div>
                      <div
                        id="prop-focused-content"
                        className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4"
                      >
                        {filterStrategies(propFocusedStrategies)
                          .slice(0, visiblePropStrategies)
                          .map((strategy) => {
                            return (
                              <div
                                key={strategy.name}
                                className="bg-gray-800 rounded-lg p-4 flex flex-col items-center"
                              >
                                <h3 className="text-xl font-semibold mb-2 flex items-center">
                                  {strategy.nameKey ? getPropStrategyName(strategy.nameKey) : strategy.name}
                                  {strategy.isNew && (
                                    <span
                                      className={`ml-2 bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 text-white text-xs font-bold px-2 py-1 rounded ${prefersReducedMotion ? "" : "animate-pulse"}`}
                                      aria-label={t("landing.new")}
                                    >
                                      {t("landing.new")}
                                    </span>
                                  )}
                                </h3>
                                <ul className="list-disc list-inside mb-4">
                                  {(strategy.nameKey ? getPropStrategyFeatures(strategy.nameKey) : strategy?.features || []).map((feature, idx) => (
                                    <li key={idx}>{feature}</li>
                                  ))}
                                </ul>
                                {strategy?.backtestUrl && (
                                  <div className="mb-4">
                                    <div className="flex gap-2 flex-wrap">
                                      <Link
                                        to={strategy.backtestUrl}
                                        className="bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold py-2 px-4 rounded transition-colors duration-300 inline-block"
                                        aria-label={`View backtest results for ${strategy.name}`}
                                      >
                                        {t("landing.viewBacktest")}
                                      </Link>
                                      <Link
                                        to={`/backtests/explorer?strategy=${getStrategyNameForExplorer(strategy.backtestUrl)}`}
                                        className="bg-[#10b981] hover:bg-[#059669] text-white font-bold py-2 px-4 rounded transition-colors duration-300 inline-block"
                                        aria-label={`Explore backtest results for ${strategy.name}`}
                                      >
                                        {t("landing.exploreBacktest")}
                                      </Link>
                                    </div>
                                    {strategy?.backtestUrl &&
                                      strategyMetrics[strategy.backtestUrl] && (
                                        <div className="mt-2 text-xs text-gray-400 text-center">
                                          <span>
                                            {t("landing.winRate")}{" "}
                                            {
                                              strategyMetrics[
                                                strategy.backtestUrl
                                              ].winRate
                                            }{" "}
                                            | {t("landing.profitFactor")}{" "}
                                            {strategyMetrics[
                                              strategy.backtestUrl
                                            ].profitFactor || "N/A"}
                                          </span>
                                        </div>
                                      )}
                                  </div>
                                )}
                                <div className="flex flex-col w-full relative">
                                  {Array.isArray(strategy.images) &&
                                    strategy.images.map((imgSrc, idx) => {
                                      // Comment out second image (idx === 1) for NinjaTrader strategies
                                      if (idx === 1) return null;
                                      const imageId = `prop-${strategy.name}-${idx}`;
                                      const isImageLoaded =
                                        imageLoadedStates[imageId];
                                      return (
                                        <div
                                          key={`${strategy.name}-${idx}`}
                                          className="relative w-full"
                                        >
                                          {/* LQIP placeholder */}
                                          {!isImageLoaded && (
                                            <div className="absolute inset-0 bg-gray-700 rounded-lg mb-4 animate-pulse" />
                                          )}
                                          <img
                                            src={imgSrc}
                                            alt={`Screenshot of ${strategy.name} strategy interface showing trading indicators and signals`}
                                            className={`w-full h-auto rounded-lg mb-4 transition-opacity duration-300 ${
                                              isImageLoaded
                                                ? "opacity-100"
                                                : "opacity-0"
                                            }`}
                                            loading="lazy"
                                            onLoad={() =>
                                              handleImageLoad(imageId)
                                            }
                                          />
                                        </div>
                                      );
                                    })}
                                </div>
                              </div>
                            );
                          })}
                      </div>
                      {filterStrategies(propFocusedStrategies).length >
                        visiblePropStrategies && (
                        <div className="flex justify-center mt-6">
                          <button
                            onClick={loadMorePropStrategies}
                            className="bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300"
                            aria-label="Load more prop-focused strategies"
                          >
                            Load More Strategies
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </section>
              )}
              {activeTab === "TradingView" && (
                <section id="tv-prop-focused-strategies" className="mb-12">
                  <button
                    id="tv-prop-focused-title"
                    onClick={() => toggleSection("propFocused")}
                    className="w-full flex items-center justify-center gap-4 mb-4 hover:opacity-80 transition-opacity"
                    aria-expanded={openSection === "propFocused"}
                    aria-controls="tv-prop-focused-content"
                  >
                    <div className="text-center">
                      <h2 className="text-3xl font-bold mb-2">
                        {t("landing.propFirmFocused")}
                      </h2>
                      <h3 className="text-2xl">
                        {t("landing.propFirmSubtitle")}
                      </h3>
                    </div>
                    <svg
                      className={`w-6 h-6 transition-transform flex-shrink-0 ${
                        openSection === "propFocused" ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {openSection === "propFocused" && (
                    <>
                      {/* Filter Chips */}
                      <div className="flex flex-wrap gap-2 justify-center mb-6">
                        {filterOptions.map((filter) => {
                          const count = countStrategiesForFilter(
                            filter,
                            tvPropFocusedStrategies
                          );
                          if (count === 0) return null;
                          return (
                            <button
                              key={filter}
                              onClick={() => toggleFilter(filter)}
                              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                                selectedFilters.includes(filter)
                                  ? "bg-[#5865F2] text-white shadow-lg scale-105"
                                  : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
                              }`}
                              aria-pressed={selectedFilters.includes(filter)}
                              aria-label={`Filter by ${filter}`}
                            >
                              {filter} ({count})
                            </button>
                          );
                        })}
                        <button
                          onClick={() => setSelectedFilters([])}
                          disabled={selectedFilters.length === 0}
                          className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                            selectedFilters.length > 0
                              ? "bg-gray-600 text-gray-300 hover:bg-gray-500 hover:text-white"
                              : "bg-gray-700 text-gray-500 cursor-not-allowed opacity-50"
                          }`}
                          aria-label={t("landing.clearFilters")}
                        >
                          {t("landing.clearFilters")}
                        </button>
                      </div>
                      <div
                        id="tv-prop-focused-content"
                        className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4"
                      >
                        {filterStrategies(tvPropFocusedStrategies)
                          .slice(0, visiblePropStrategies)
                          .map((strategy) => {
                            return (
                              <div
                                key={strategy.name}
                                className="bg-gray-800 rounded-lg p-4 flex flex-col items-center"
                              >
                                <h3 className="text-xl font-semibold mb-2 flex items-center">
                                  {strategy.nameKey ? getPropStrategyName(strategy.nameKey) : strategy.name}
                                  {strategy.isNew && (
                                    <span
                                      className={`ml-2 bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 text-white text-xs font-bold px-2 py-1 rounded ${prefersReducedMotion ? "" : "animate-pulse"}`}
                                      aria-label={t("landing.new")}
                                    >
                                      {t("landing.new")}
                                    </span>
                                  )}
                                </h3>
                                <ul className="list-disc list-inside mb-4">
                                  {(strategy.nameKey ? getPropStrategyFeatures(strategy.nameKey) : strategy?.features || []).map((feature, idx) => (
                                    <li key={idx}>{feature}</li>
                                  ))}
                                </ul>
                                {strategy?.backtestUrl && (
                                  <div className="mb-4">
                                    <div className="flex gap-2 flex-wrap">
                                      <Link
                                        to={strategy.backtestUrl}
                                        className="bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold py-2 px-4 rounded transition-colors duration-300 inline-block"
                                        aria-label={`View backtest results for ${strategy.name}`}
                                      >
                                        {t("landing.viewBacktest")}
                                      </Link>
                                      <Link
                                        to={`/backtests/explorer?strategy=${getStrategyNameForExplorer(strategy.backtestUrl)}`}
                                        className="bg-[#10b981] hover:bg-[#059669] text-white font-bold py-2 px-4 rounded transition-colors duration-300 inline-block"
                                        aria-label={`Explore backtest results for ${strategy.name}`}
                                      >
                                        {t("landing.exploreBacktest")}
                                      </Link>
                                    </div>
                                    {strategy?.backtestUrl &&
                                      strategyMetrics[strategy.backtestUrl] && (
                                        <div className="mt-2 text-xs text-gray-400 text-center">
                                          <span>
                                            {t("landing.winRate")}{" "}
                                            {
                                              strategyMetrics[
                                                strategy.backtestUrl
                                              ].winRate
                                            }{" "}
                                            | {t("landing.profitFactor")}{" "}
                                            {strategyMetrics[
                                              strategy.backtestUrl
                                            ].profitFactor || "N/A"}
                                          </span>
                                        </div>
                                      )}
                                  </div>
                                )}
                                <div className="flex flex-col w-full relative">
                                  {Array.isArray(strategy.images) &&
                                    strategy.images.map((imgSrc, idx) => {
                                      const imageId = `tv-prop-${strategy.name}-${idx}`;
                                      const isImgLoaded =
                                        imageLoadedStates[imageId];
                                      return (
                                        <div
                                          key={`${strategy.name}-${idx}`}
                                          className="relative w-full"
                                        >
                                          {/* LQIP placeholder */}
                                          {!isImgLoaded && (
                                            <div className="absolute inset-0 bg-gray-700 rounded-lg mb-4 animate-pulse" />
                                          )}
                                          <img
                                            src={imgSrc}
                                            alt={`Screenshot of ${strategy.name} strategy interface showing trading indicators and signals`}
                                            className={`w-full h-auto rounded-lg mb-4 transition-opacity duration-300 ${
                                              isImgLoaded
                                                ? "opacity-100"
                                                : "opacity-0"
                                            }`}
                                            loading="lazy"
                                            onLoad={() =>
                                              handleImageLoad(imageId)
                                            }
                                          />
                                        </div>
                                      );
                                    })}
                                </div>
                              </div>
                            );
                          })}
                      </div>
                      {filterStrategies(tvPropFocusedStrategies).length >
                        visiblePropStrategies && (
                        <div className="flex justify-center mt-6">
                          <button
                            onClick={loadMorePropStrategies}
                            className="bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300"
                            aria-label="Load more prop-focused strategies"
                          >
                            Load More Strategies
                          </button>
                        </div>
                      )}
                    </>
                  )}
                </section>
              )}
              <section id="strategies" className="">
                <button
                  id="strategies-title"
                  onClick={() => toggleSection("strategies")}
                  className="w-full flex items-center justify-center gap-4 mb-4 hover:opacity-80 transition-opacity"
                  aria-expanded={openSection === "strategies"}
                  aria-controls="strategies-content"
                >
                  <div className="text-center">
                    <h2 className="text-3xl font-bold mb-2">
                      {t("landing.ourAutomatedStrategies")}
                    </h2>
                    <h3 className="text-2xl">
                      {t("landing.strategiesSubtitle")}
                    </h3>
                  </div>
                  <svg
                    className={`w-6 h-6 transition-transform flex-shrink-0 ${
                      openSection === "strategies" ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {openSection === "strategies" && (
                  <>
                    {/* Filter Chips */}
                    <div className="flex flex-wrap gap-2 justify-center mb-6">
                      {filterOptions.map((filter) => {
                        const count = countStrategiesForFilter(
                          filter,
                          currentStrategies
                        );
                        if (count === 0) return null;
                        return (
                          <button
                            key={filter}
                            onClick={() => toggleFilter(filter)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                              selectedFilters.includes(filter)
                                ? "bg-[#5865F2] text-white shadow-lg scale-105"
                                : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
                            }`}
                            aria-pressed={selectedFilters.includes(filter)}
                            aria-label={`Filter by ${filter}`}
                          >
                            {filter} ({count})
                          </button>
                        );
                      })}
                      <button
                        onClick={() => setSelectedFilters([])}
                        disabled={selectedFilters.length === 0}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                          selectedFilters.length > 0
                            ? "bg-gray-600 text-gray-300 hover:bg-gray-500 hover:text-white"
                            : "bg-gray-700 text-gray-500 cursor-not-allowed opacity-50"
                        }`}
                        aria-label="Clear all filters"
                      >
                        Clear Filters
                      </button>
                    </div>
                    <div
                      id="strategies-content"
                      className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4"
                    >
                      {filterStrategies(currentStrategies)
                        .slice(0, visibleStrategies)
                        .map((strategy) => {
                          const imageId = `strategy-${strategy.name}`;
                          return (
                            <div
                              key={strategy.name}
                              className="bg-gray-800 rounded-lg p-4 flex flex-col items-center"
                            >
                              <h3 className="text-xl font-semibold mb-2 flex items-center">
                                {strategy.nameKey ? getStrategyName(strategy.nameKey) : strategy.name}
                                {strategy.isNew && (
                                  <span
                                    className={`ml-2 bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 text-white text-xs font-bold px-2 py-1 rounded ${prefersReducedMotion ? "" : "animate-pulse"}`}
                                    aria-label={t("landing.new")}
                                  >
                                    {t("landing.new")}
                                  </span>
                                )}
                              </h3>
                              <ul className="list-disc list-inside mb-4">
                                {(strategy.nameKey ? getStrategyFeatures(strategy.nameKey) : strategy?.features || []).map((feature, idx) => (
                                  <li key={idx}>{feature}</li>
                                ))}
                              </ul>
                              {strategy?.backtestUrl && (
                                <div className="mb-4">
                                  <div className="flex gap-2 flex-wrap">
                                    <Link
                                      to={strategy.backtestUrl}
                                      className="bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                                      aria-label={`View backtest results for ${strategy.name}`}
                                    >
                                      {t("landing.viewBacktest")}
                                    </Link>
                                    <Link
                                      to={`/backtests/explorer?strategy=${getStrategyNameForExplorer(strategy.backtestUrl)}`}
                                      className="bg-[#10b981] hover:bg-[#059669] text-white font-bold py-2 px-4 rounded transition-colors duration-300"
                                      aria-label={`Explore backtest results for ${strategy.name}`}
                                    >
                                      {t("landing.exploreBacktest")}
                                    </Link>
                                  </div>
                                  {strategyMetrics[strategy.backtestUrl] && (
                                    <div className="mt-2 text-xs text-gray-400 text-center">
                                      <span>
                                        {t("landing.winRate")}{" "}
                                        {
                                          strategyMetrics[strategy.backtestUrl]
                                            .winRate
                                        }{" "}
                                        | {t("landing.profitFactor")}{" "}
                                        {
                                          strategyMetrics[strategy.backtestUrl]
                                            .profitFactor
                                        }
                                      </span>
                                    </div>
                                  )}
                                </div>
                              )}
                              <div className="flex flex-col w-full relative">
                                {Array.isArray(strategy.images) &&
                                  strategy.images.map((imgSrc, idx) => {
                                    // Comment out second image (idx === 1) for NinjaTrader strategies
                                    if (
                                      activeTab === "NinjaTrader" &&
                                      idx === 1
                                    )
                                      return null;
                                    const uniqueImageId = `${imageId}-${idx}`;
                                    const isImgLoaded =
                                      imageLoadedStates[uniqueImageId];
                                    return (
                                      <div
                                        key={`${strategy.name}-${idx}`}
                                        className="relative w-full"
                                      >
                                        {/* LQIP placeholder */}
                                        {!isImgLoaded && (
                                          <div className="absolute inset-0 bg-gray-700 rounded-lg mb-4 animate-pulse" />
                                        )}
                                        <img
                                          src={imgSrc}
                                          alt={`Screenshot of ${strategy.name} strategy interface showing trading indicators and signals`}
                                          className={`w-full h-auto rounded-lg mb-4 transition-opacity duration-300 ${
                                            isImgLoaded
                                              ? "opacity-100"
                                              : "opacity-0"
                                          }`}
                                          loading="lazy"
                                          onLoad={() =>
                                            handleImageLoad(uniqueImageId)
                                          }
                                        />
                                      </div>
                                    );
                                  })}
                              </div>
                            </div>
                          );
                        })}
                    </div>
                    {filterStrategies(currentStrategies).length >
                      visibleStrategies && (
                      <div className="flex justify-center mt-6">
                        <button
                          onClick={loadMoreStrategies}
                          className="bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300"
                          aria-label={t("landing.loadMoreStrategies")}
                        >
                          Load More Strategies
                        </button>
                      </div>
                    )}
                  </>
                )}
              </section>

              <section id="indicators" className="my-12 mt-16">
                <button
                  id="indicators-title"
                  onClick={() => toggleSection("indicators")}
                  className="w-full flex items-center justify-center gap-4 mb-4 hover:opacity-80 transition-opacity"
                  aria-expanded={openSection === "indicators"}
                  aria-controls="indicators-content"
                >
                  <div className="text-center">
                    <h2 className="text-3xl font-bold mb-2">
                      {t("landing.ourIndicators")}
                    </h2>
                    <h3 className="text-2xl">
                      {t("landing.indicatorsSubtitle")}
                    </h3>
                  </div>
                  <svg
                    className={`w-6 h-6 transition-transform flex-shrink-0 ${
                      openSection === "indicators" ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {openSection === "indicators" && (
                  <>
                    {/* Filter Chips */}
                    <div className="flex flex-wrap gap-2 justify-center mb-6">
                      {indicatorFilterOptions.map((filter) => {
                        const count = countIndicatorsForFilter(
                          filter,
                          currentIndicators
                        );
                        if (count === 0) return null;
                        return (
                          <button
                            key={filter}
                            onClick={() => toggleIndicatorFilter(filter)}
                            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                              selectedIndicatorFilters.includes(filter)
                                ? "bg-[#5865F2] text-white shadow-lg scale-105"
                                : "bg-gray-700 text-gray-300 hover:bg-gray-600 hover:text-white"
                            }`}
                            aria-pressed={selectedIndicatorFilters.includes(
                              filter
                            )}
                            aria-label={`Filter by ${filter}`}
                          >
                            {filter} ({count})
                          </button>
                        );
                      })}
                      <button
                        onClick={() => setSelectedIndicatorFilters([])}
                        disabled={selectedIndicatorFilters.length === 0}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                          selectedIndicatorFilters.length > 0
                            ? "bg-gray-600 text-gray-300 hover:bg-gray-500 hover:text-white"
                            : "bg-gray-700 text-gray-500 cursor-not-allowed opacity-50"
                        }`}
                        aria-label="Clear all filters"
                      >
                        Clear Filters
                      </button>
                    </div>
                    <div
                      id="indicators-content"
                      className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8"
                    >
                      {filterIndicators(currentIndicators)
                        .slice(0, visibleIndicators)
                        .map((indicator) => {
                          const imageId = `indicator-${indicator.name}`;
                          const isImageLoaded = imageLoadedStates[imageId];
                          return (
                            <div
                              key={indicator.name}
                              className="bg-gray-800 rounded-lg p-4 flex flex-col items-center relative"
                            >
                              <h3 className="text-xl font-semibold mb-2 flex items-center">
                                {indicator.nameKey ? getIndicatorName(indicator.nameKey) : indicator.name}
                                {indicator.isNew && (
                                  <span
                                    className={`ml-2 bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 text-white text-xs font-bold px-2 py-1 rounded ${prefersReducedMotion ? "" : "animate-pulse"}`}
                                    aria-label={t("landing.new")}
                                  >
                                    {t("landing.new")}
                                  </span>
                                )}
                              </h3>
                              <ul className="list-disc list-inside mb-4">
                                {(indicator.nameKey ? getIndicatorFeatures(indicator.nameKey) : indicator?.features || []).map((feature, idx) => (
                                  <li key={idx}>{feature}</li>
                                ))}
                              </ul>
                              <div className="relative w-full">
                                {/* LQIP placeholder */}
                                {!isImageLoaded && (
                                  <div className="absolute inset-0 bg-gray-700 rounded-lg mb-4 animate-pulse" />
                                )}
                                <img
                                  src={indicator.image}
                                  alt={`Screenshot of ${indicator.name} indicator showing trading signals and market analysis`}
                                  className={`w-full h-auto rounded-lg mb-4 transition-opacity duration-300 ${
                                    isImageLoaded ? "opacity-100" : "opacity-0"
                                  }`}
                                  loading="lazy"
                                  onLoad={() => handleImageLoad(imageId)}
                                />
                              </div>
                            </div>
                          );
                        })}
                    </div>
                    {filterIndicators(currentIndicators).length >
                      visibleIndicators && (
                      <div className="flex justify-center mt-6">
                        <button
                          onClick={loadMoreIndicators}
                          className="bg-[#5865F2] hover:bg-[#4752C4] text-white font-bold py-3 px-8 rounded-lg transition-colors duration-300"
                          aria-label={t("landing.loadMoreIndicators")}
                        >
                          {t("landing.loadMoreIndicators")}
                        </button>
                      </div>
                    )}
                  </>
                )}
              </section>

              <section id="wins" className="my-12 mt-16">
                <button
                  id="wins-title"
                  onClick={() => toggleSection("wins")}
                  className="w-full flex items-center justify-center gap-4 mb-4 hover:opacity-80 transition-opacity"
                  aria-expanded={openSection === "wins"}
                  aria-controls="wins-content"
                >
                  <div className="text-center">
                    <h2 className="text-3xl font-bold mb-2">
                      {t("landing.wins")}
                    </h2>
                    <h3 className="text-2xl">{t("landing.winsSubtitle")}</h3>
                  </div>
                  <svg
                    className={`w-6 h-6 transition-transform flex-shrink-0 ${
                      openSection === "wins" ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>
                {openSection === "wins" && (
                  <div
                    id="wins-content"
                    className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8"
                  >
                    <img
                      src={win1}
                      alt="Screenshot showing successful trading results from a Discord community member using FluxTrade tools"
                      className="w-full h-auto rounded-lg"
                    />
                    <img
                      src={win2}
                      alt="Screenshot showing successful trading results from a Discord community member using FluxTrade tools"
                      className="w-full h-auto rounded-lg"
                    />
                    <img
                      src={win3}
                      alt="Screenshot showing successful trading results from a Discord community member using FluxTrade tools"
                      className="w-full h-auto rounded-lg"
                    />
                  </div>
                )}
              </section>
            </>
          );
        })()}

        <section
          id="partners"
          className="my-12 mt-24 bg-[#0c111b] p-6 rounded-xl flex flex-col items-center justify-center"
          aria-label="Partners and affiliates"
        >
          <h2 className="text-3xl font-bold text-center mb-4 text-white">
            {t("landing.officialVendor")}
          </h2>
          <div className="flex flex-col flex-wrap justify-center items-center space-x-8 text-white bg-[#0c111b] p-6 rounded-lg">
            <div className="flex flex-col lg:flex-row flex-wrap justify-center items-center lg:space-x-8">
              <a
                href="http://account.ninjatrader.com/register?introducingPartner=FluxTrade"
                aria-label="Register for NinjaTrader (opens in new tab)"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={ntLogo}
                  width={300}
                  alt="NinjaTrader Logo"
                  className="bg-white rounded-md p-2"
                />
              </a>
              <a
                href="http://kinetick.com/NinjaTrader"
                className="bg-white rounded-md p-1 mt-8 lg:mt-0"
                aria-label="Visit Kinetick (opens in new tab)"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={kinetickLogo}
                  alt="Kinetick Logo"
                  className="h-16 lg:ml-[20px]"
                />
              </a>
            </div>
            <div className="flex flex-col md:flex-row flex-wrap justify-center items-center md:space-x-8 mt-6">
              <a
                href="https://ninjatraderus.pxf.io/APNodJ"
                aria-label="Upgrade NinjaTrader (affiliate link, opens in new tab)"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={ntUpgrade}
                  width={300}
                  alt="NinjaTrader Upgrade Logo"
                />
              </a>
              <p className="text-white w-[300px] lg:ml-[20px] mt-8 md:mt-0">
                {t("landing.affiliateLink")}{" "}
                <a
                  href="https://ninjatraderus.pxf.io/APNodJ"
                  className="text-blue-500 underline"
                  aria-label={t("landing.signUpAriaLabel")}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("landing.signUp")}
                </a>{" "}
                {t("landing.ninjaTraderDescription")} <br />
                <br />
                {t("landing.ninjaTraderEndorsement")}
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
