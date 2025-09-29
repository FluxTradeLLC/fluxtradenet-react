import { Link } from 'react-router-dom';
import { useState } from 'react';

import kinetickLogo from '../assets/logos/Kinetick_Logo.png';
import ntLogo from '../assets/logos/nt_ecosystem.png';
import ntUpgrade from '../assets/logos/nt_upgrade.png';

import fluxConfluence from '../assets/indicators/FluxConfluence.PNG';
import fluxPivot from '../assets/indicators/FluxPivot.PNG';
import fluxSignal from '../assets/indicators/FluxSignal.PNG';
import marketRegime from '../assets/indicators/MarketRegime.PNG';
import parabolicRSI from '../assets/indicators/ParabolicRSI.PNG';
import previousLevels from '../assets/indicators/PreviousLevels.PNG';
import fluxTarget from '../assets/indicators/FluxTarget.PNG';
import marketPhase from '../assets/indicators/MarketPhase.PNG';
import ttmSqueeze from '../assets/indicators/TTM Squeeze.PNG';
import volatilityCycle from '../assets/indicators/VolatilityCycle.PNG';

import fluxLightning1 from '../assets/strategies/FluxLightning1.PNG';
import fluxLightning2 from '../assets/strategies/FluxLightning2.PNG';
import fluxPivotStrat1 from '../assets/strategies/FluxPivotStrat1.PNG';
import fluxPivotStrat2 from '../assets/strategies/FluxPivotStrat2.PNG';
import fluxSignalStrat1 from '../assets/strategies/FluxSignalStrat1.PNG';
import fluxSignalStrat2 from '../assets/strategies/FluxSignalStrat2.PNG';
import fluxTrident1 from '../assets/strategies/FluxTrident1.PNG';
import fluxTrident2 from '../assets/strategies/FluxTrident2.PNG';
import cointegratedPairs1 from '../assets/strategies/CointegratedPairs1.PNG';
import cointegratedPairs2 from '../assets/strategies/CointegratedPairs2.PNG';
import rileySR1 from '../assets/strategies/RileySR1.PNG';
import rileySR2 from '../assets/strategies/RileySR2.PNG';
import orb1 from '../assets/strategies/ORB1.PNG';
import orb2 from '../assets/strategies/ORB2.PNG';

// New strategy assets
import elliotWave1 from '../assets/strategies/ElliotWave1.PNG';
import elliotWave2 from '../assets/strategies/ElliotWave2.PNG';
import iccChoch1 from '../assets/strategies/ICCChoch1.PNG';
import iccChoch2 from '../assets/strategies/ICCChoch2.PNG';
import lowVolatility1 from '../assets/strategies/LowVolatility1.PNG';
import lowVolatility2 from '../assets/strategies/LowVolatility2.PNG';
import projectGamma1 from '../assets/strategies/ProjectGamma1.PNG';
import projectGamma2 from '../assets/strategies/ProjectGamma2.PNG';
import trendCatcher1 from '../assets/strategies/TrendCatcher.PNG';
import trendCatcher2 from '../assets/strategies/TrendCatcher2.PNG';
import holyGrail1 from '../assets/strategies/HolyGrail1.PNG';
import holyGrail2 from '../assets/strategies/HolyGrail2.PNG';
import quadConfluence1 from '../assets/strategies/QuadConfluence1.PNG';
import quadConfluence2 from '../assets/strategies/QuadConfluence2.PNG';
import futurePredictionServer1 from '../assets/strategies/FuturePredictionServer1.PNG';
import futurePredictionServer2 from '../assets/strategies/FuturePredictionServer2.PNG';

// Newly added strategy assets
import donchianTurtle1 from '../assets/strategies/DonchianTurtle1.PNG';
import donchianTurtle2 from '../assets/strategies/DonchianTurtle2.PNG';
import ichimokoStrat1 from '../assets/strategies/IchimokoStrat1.PNG';
import ichimokoStrat2 from '../assets/strategies/IchimokoStrat2.PNG';
import keltnerStrat1 from '../assets/strategies/KeltnerStrat1.PNG';
import keltnerStrat2 from '../assets/strategies/KeltnerStrat2.PNG';

// Newly added strategy assets (Liquidity Sweep, Slow and Steady, Super Momentum)
import liquiditySweep1 from '../assets/strategies/LiquiditySweep1.PNG';
import liquiditySweep2 from '../assets/strategies/LiquiditySweep2.PNG';
import slowAndSteady1 from '../assets/strategies/SlowAndSteady1.PNG';
import slowAndSteady2 from '../assets/strategies/SlowAndSteady2.PNG';
import superMomentum1 from '../assets/strategies/SuperMomentum1.PNG';
import superMomentum2 from '../assets/strategies/SuperMomentum2.PNG';

import '../App.css';


export function LandingPage() {
  const [activeTab, setActiveTab] = useState('NinjaTrader');
  const indicators = [
    // NEW INDICATORS
    { name: 'DynamicTrend', image: null, features: ["Dynamic trendline", "Support and resistance", "Signals upon crosses"], isNew: true },
    { name: 'FluxTarget', image: fluxTarget, features: ["Dynamic target bands", "Adaptive to volatility", "Great for exits"], isNew: true },
    { name: 'Market Phase', image: marketPhase, features: ["Visual market phase detection", "Trend and range highlighting", "Easy to interpret"], isNew: true },
    { name: 'TTM Squeeze', image: ttmSqueeze, features: ["Momentum and squeeze detection", "Great for breakout trades", "Visual histogram"], isNew: true },
    { name: 'Volatility Cycle', image: volatilityCycle, features: ["Volatility cycle oscillator", "Spot expansion and contraction", "Pairs well with other indicators"], isNew: true },

    { name: 'FluxConfluence', image: fluxConfluence, features: ["Trade with the trend", "Get multiple confluences", "Buy and sell signals"]},
    { name: 'FluxPivot', image: fluxPivot, features: ["Pivot between buying and selling", "Add into existing positions", "Smart pivot detection"]},
    { name: 'FluxSignal', image: fluxSignal, features: ["Understand changing markets", "Buy and sell signals", "Catch new trends as they start"]},
    { name: 'Market Regime', image: marketRegime, features: ["Understand market regimes", "High and low volatility", "Sideways or trending"]},
    { name: 'Parabolic RSI', image: parabolicRSI, features: ["Parabolic SAR + RSI", "Paired with Ultimate Entry Indicator", "Overbought and oversold areas"]},
    { name: 'Previous Levels', image: previousLevels, features: ["Identify previous highs and lows", "Trade reversals and breakouts", "Yesterday, premarket, and opening range"]}, 
  ];

  const strategies = [
    {
      name: 'Donchian Turtle',
      images: [donchianTurtle1, donchianTurtle2],
      features: [
        'Breakout strategy using Donchian channels',
        'Trend following with pyramiding',
        'ATR-based stops and position sizing'
      ],
      backtestUrl: '/backtests/donchian-turtle',
      isNew: true
    },
    {
      name: 'IchimokoStrat',
      images: [ichimokoStrat1, ichimokoStrat2],
      features: [
        'Ichimoku Kinko Hyo based entries',
        'Cloud, Tenkan/Kijun crosses, and Chikou span',
        'Works across market regimes'
      ],
      backtestUrl: '/backtests/ichimoko-strat',
      isNew: true
    },
    {
      name: 'KeltnerStrat',
      images: [keltnerStrat1, keltnerStrat2],
      features: [
        'Keltner Channel breakouts and pullbacks',
        'Volatility-adaptive targets and stops',
        'Pairs well with momentum filters'
      ],
      backtestUrl: '/backtests/keltner-strat',
      isNew: true
    },
    {
      name: 'Future Prediction Server',
      images: [futurePredictionServer1, futurePredictionServer2],
      features: [
        'Uses machine learning for labelling and predictions',
        'Calls out to a remote server',
        'Reinforcement learning algorithm'
      ],
      backtestUrl: '/backtests/future-prediction-server',
      isNew: true
    },
    {
      name: 'Quad Confluence',
      images: [quadConfluence1, quadConfluence2],
      features: [
        'Multiple entry trigger types',
        'Looks for multiple confluences',
        'Dynamic targets and stops'
      ],
      backtestUrl: '/backtests/quad-confluence',
      isNew: true
    },
    {
      name: 'Holy Grail Adaptive',
      images: [holyGrail1, holyGrail2],
      features: [
        'Adaptive trend following',
        'Automated entries and exits',
        'Targets and risk controls'
      ],
      backtestUrl: '/backtests/holy-grail',
      isNew: true
    },
    {
      name: 'ElliotWave',
      images: [elliotWave1, elliotWave2],
      features: [
        'Automated Elliott Wave counts',
        'Identifies impulse and corrective waves',
        'Risk targets aligned with structure'
      ],
      backtestUrl: '/backtests/elliot-wave',
      isNew: true
    },
    {
      name: 'ICC ChoCh',
      images: [iccChoch1, iccChoch2],
      features: [
        'Smart structure shift detection',
        'ChoCh/BOS signals for reversals',
        'Trend continuation and reversal logic'
      ],
      backtestUrl: '/backtests/icc-choch',
    },
    {
      name: 'Low Volatility',
      images: [lowVolatility1, lowVolatility2],
      features: [
        'Mean reversion in quiet regimes',
        'Adaptive filters and bands',
        'Captures squeeze expansions'
      ],
      backtestUrl: '/backtests/low-volatility',
    },
    {
      name: 'Project Gamma',
      images: [projectGamma1, projectGamma2],
      features: [
        'Bullish and bearish engulfing pattern detection',
        'Volatility-aware entries and exits',
        'Great on indices and futures'
      ],
      backtestUrl: '/backtests/project-gamma',
    },
    {
      name: 'TrendCatcher',
      images: [trendCatcher1, trendCatcher2],
      features: [
        'Ride sustained trends',
        'Dynamic trailing stop logic',
        'Multi-timeframe confirmation'
      ],
      backtestUrl: '/backtests/trend-catcher',
    },
    {
      name: 'ORB (Opening Range Break)',
      images: [orb1, orb2],
      features: [
        'Classic opening range breakout',
        'Automated entries and exits',
        'Works on all timeframes',
        'Great for volatility and momentum'
      ],
      backtestUrl: '/backtests/orb',
    },
    {
      name: 'Liquidity Sweep',
      images: [liquiditySweep1, liquiditySweep2],
      features: [
        'Sweep liquidity around key levels',
        'Fade and breakout modes',
        'Risk-managed entries'
      ],
      backtestUrl: '/backtests/liquidity-sweep',
      isNew: true,
    },
    {
      name: 'Slow and Steady',
      images: [slowAndSteady1, slowAndSteady2],
      features: [
        'High-probability, low-frequency setups',
        'Tight risk controls',
        'Ideal for conservative growth'
      ],
      backtestUrl: '/backtests/slow-and-steady',
      isNew: true,
    },
    {
      name: 'Super Momentum',
      images: [superMomentum1, superMomentum2],
      features: [
        'Momentum continuation signals',
        'Dynamic targets with trailing stops',
        'Great in strong trend days'
      ],
      backtestUrl: '/backtests/super-momentum',
      isNew: true,
    },
    {
      name: 'CointegratedPairs',
      images: [cointegratedPairs1, cointegratedPairs2],
      features: [
        "Pairs trading strategy",
        "Statistical arbitrage",
        "Dynamic Z-Score entries and exits"
      ],
      backtestUrl: "/backtests/cointegrated-pairs",
    },
    {
      name: 'RileySR',
      images: [rileySR1, rileySR2],
      features: [
        "Support/resistance breakout",
        "Multiple indicator filters",
        "Volume and RSI confirmation"
      ],
      backtestUrl: "/backtests/riley-sr",
    },
    { 
        name: 'FluxLightning', 
        images: [fluxLightning1, fluxLightning2], 
        features: ["Fully automated strategy", "Great for trending markets", "Long and short signals"],
        backtestUrl: "/backtests/flux-lightning"
    },
    { 
        name: 'FluxPivot Strategy', 
        images: [fluxPivotStrat1, fluxPivotStrat2], 
        features: ["Automated pivot detection", "Trade with institutional levels", "Works great with FluxPivot indicator"],
        backtestUrl: "/backtests/flux-pivot-strat"
    },
    { 
        name: 'FluxSignal Strategy', 
        images: [fluxSignalStrat1, fluxSignalStrat2], 
        features: ["Uses Flux Signal for entries", "Catches trends early", "Simple to use"],
        backtestUrl: "/backtests/flux-signal-strat"
    },
    { 
        name: 'FluxTrident', 
        images: [fluxTrident1, fluxTrident2], 
        features: ["Three-step trend confirmation", "Powerful scalping strategy", "Identifies strong trend continuations"],
        backtestUrl: "/backtests/flux-trident"
    }
  ];

  // TradingView assets
  // Indicators
  const tvDynamicTrend = require('../assets/tradingview/indicators/dynamicTrend.png');
  const tvFluxConfluence = require('../assets/tradingview/indicators/fluxConfluence.png');
  const tvFluxPivot = require('../assets/tradingview/indicators/fluxPivot.png');
  const tvFluxSignal = require('../assets/tradingview/indicators/fluxsignal.png');
  const tvParabolicRSI = require('../assets/tradingview/indicators/parabolicRSI.png');
  const tvTtmSqueeze = require('../assets/tradingview/indicators/ttmSqueeze.png');
  const tvVolatilityCycle = require('../assets/tradingview/indicators/volatilityCycle.png');
  const tvFluxTarget = require('../assets/tradingview/indicators/fluxTarget.png');
  const tvMarketPhase = require('../assets/tradingview/indicators/marketPhase.png');
  const tvMarketRegime = require('../assets/tradingview/indicators/marketRegime.png');
  const tvPreviousLevels = require('../assets/tradingview/indicators/prevLevels.png');

  // Strategies
  const tvDonchian = require('../assets/tradingview/strategies/donchian.png');
  const tvFluxLightning = require('../assets/tradingview/strategies/fluxLightning.png');
  const tvFluxPivotStrat = require('../assets/tradingview/strategies/fluxPivotStrat.png');
  const tvFluxSignalStrat = require('../assets/tradingview/strategies/fluxSignalStrat.png');
  const tvFluxSignalScalper = require('../assets/tradingview/strategies/fluxSignalScalper.png');
  const tvFluxThunder = require('../assets/tradingview/strategies/fluxThunder.png');
  const tvFluxTrident = require('../assets/tradingview/strategies/fluxTrident.png');
  const tvIccCoch = require('../assets/tradingview/strategies/icccoch.png');
  const tvIchimoko = require('../assets/tradingview/strategies/ichimiko.png');
  const tvKeltnerStrat = require('../assets/tradingview/strategies/keltnerStrat.png');
  const tvLowVolatility = require('../assets/tradingview/strategies/lowVolatility.png');
  const tvOrb = require('../assets/tradingview/strategies/orb.png');
  const tvProjectGamma = require('../assets/tradingview/strategies/projectGamma.png');
  const tvRileySR = require('../assets/tradingview/strategies/rileySR.png');
  const tvSlowAndSteady = require('../assets/tradingview/strategies/slowAndSteady.png');
  const tvSuperMomentum = require('../assets/tradingview/strategies/superMomentum.png');
  const tvTrendCatcher = require('../assets/tradingview/strategies/trendCatcher.png');
  const liquiditySweep = require('../assets/tradingview/strategies/liquiditySweep.png');

  // Helper getters to reuse features/backtest info where possible
  const getIndicatorByName = (name) => indicators.find(i => i.name === name);
  const getStrategyByName = (name) => strategies.find(s => s.name === name);

  const tradingViewIndicators = [
    { name: 'Dynamic Trend', image: tvDynamicTrend, features: getIndicatorByName('DynamicTrend')?.features, isNew: true, },
    { name: 'FluxConfluence', image: tvFluxConfluence, features: getIndicatorByName('FluxConfluence')?.features, isNew: true, },
    { name: 'FluxPivot', image: tvFluxPivot, features: getIndicatorByName('FluxPivot')?.features, isNew: true, },
    { name: 'FluxSignal', image: tvFluxSignal, features: getIndicatorByName('FluxSignal')?.features, isNew: true, },
    { name: 'Parabolic RSI', image: tvParabolicRSI, features: getIndicatorByName('Parabolic RSI')?.features, isNew: true, },
    { name: 'TTM Squeeze', image: tvTtmSqueeze, features: getIndicatorByName('TTM Squeeze')?.features, isNew: true, },
    { name: 'Volatility Cycle', image: tvVolatilityCycle, features: getIndicatorByName('Volatility Cycle')?.features, isNew: true, },
    { name: 'FluxTarget', image: tvFluxTarget, features: getIndicatorByName('FluxTarget')?.features, isNew: true, },
    { name: 'Market Phase', image: tvMarketPhase, features: getIndicatorByName('Market Phase')?.features, isNew: true, },
    { name: 'Market Regime', image: tvMarketRegime, features: getIndicatorByName('Market Regime')?.features, isNew: true, },
    { name: 'Previous Levels', image: tvPreviousLevels, features: getIndicatorByName('Previous Levels')?.features, isNew: true, },
  ];

  const tradingViewStrategies = [
    {
      name: 'Donchian Turtle',
      images: [tvDonchian],
      features: getStrategyByName('Donchian Turtle')?.features,
      backtestUrl: getStrategyByName('Donchian Turtle')?.backtestUrl,
      isNew: true,
    },
    {
      name: 'FluxLightning',
      images: [tvFluxLightning],
      features: getStrategyByName('FluxLightning')?.features,
      backtestUrl: getStrategyByName('FluxLightning')?.backtestUrl,
      isNew: true,
    },
    {
      name: 'FluxPivot Strategy',
      images: [tvFluxPivotStrat],
      features: getStrategyByName('FluxPivot Strategy')?.features,
      backtestUrl: getStrategyByName('FluxPivot Strategy')?.backtestUrl,
      isNew: true,
    },
    {
      name: 'FluxSignal Strategy',
      images: [tvFluxSignalStrat],
      features: getStrategyByName('FluxSignal Strategy')?.features,
      backtestUrl: getStrategyByName('FluxSignal Strategy')?.backtestUrl,
      isNew: true,
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
      name: 'FluxTrident',
      images: [tvFluxTrident],
      features: getStrategyByName('FluxTrident')?.features,
      backtestUrl: getStrategyByName('FluxTrident')?.backtestUrl,
      isNew: true,
    },
    {
      name: 'ICC ChoCh',
      images: [tvIccCoch],
      features: getStrategyByName('ICC ChoCh')?.features,
      backtestUrl: getStrategyByName('ICC ChoCh')?.backtestUrl,
      isNew: true,
    },
    {
      name: 'IchimokoStrat',
      images: [tvIchimoko],
      features: getStrategyByName('IchimokoStrat')?.features,
      backtestUrl: getStrategyByName('IchimokoStrat')?.backtestUrl,
      isNew: true,
    },
    {
      name: 'KeltnerStrat',
      images: [tvKeltnerStrat],
      features: getStrategyByName('KeltnerStrat')?.features,
      backtestUrl: getStrategyByName('KeltnerStrat')?.backtestUrl,
      isNew: true,
    },
    {
      name: 'Low Volatility',
      images: [tvLowVolatility],
      features: getStrategyByName('Low Volatility')?.features,
      backtestUrl: getStrategyByName('Low Volatility')?.backtestUrl,
      isNew: true,
    },
    {
      name: 'ORB (Opening Range Break)',
      images: [tvOrb],
      features: getStrategyByName('ORB (Opening Range Break)')?.features,
      backtestUrl: getStrategyByName('ORB (Opening Range Break)')?.backtestUrl,
      isNew: true,
    },
    {
      name: 'Project Gamma',
      images: [tvProjectGamma],
      features: getStrategyByName('Project Gamma')?.features,
      backtestUrl: getStrategyByName('Project Gamma')?.backtestUrl,
      isNew: true,
    },
    {
      name: 'RileySR',
      images: [tvRileySR],
      features: getStrategyByName('RileySR')?.features,
      backtestUrl: getStrategyByName('RileySR')?.backtestUrl,
      isNew: true,
    },
    {
      name: 'Slow and Steady',
      images: [tvSlowAndSteady],
      features: getStrategyByName('Slow and Steady')?.features,
      backtestUrl: getStrategyByName('Slow and Steady')?.backtestUrl,
      isNew: true,
    },
    {
      name: 'Super Momentum',
      images: [tvSuperMomentum],
      features: getStrategyByName('Super Momentum')?.features,
      backtestUrl: getStrategyByName('Super Momentum')?.backtestUrl,
      isNew: true,
    },
    {
      name: 'Liquidity Sweep',
      images: [liquiditySweep],
      features: getStrategyByName('Liquidity Sweep')?.features,
      backtestUrl: getStrategyByName('Liquidity Sweep')?.backtestUrl,
      isNew: true,
    },
    {
      name: 'TrendCatcher',
      images: [tvTrendCatcher],
      features: getStrategyByName('TrendCatcher')?.features,
      backtestUrl: getStrategyByName('TrendCatcher')?.backtestUrl,
      isNew: true,
    },
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <section>
      <h2 className="pt-[50px] lg:text-[100px] md:text-[50px] text-[40px] text-center">Understand the <span className="italic bg-gradient-to-tl from-red-600 via-gray-300 to-green-600 hover:bg-gradient-to-br hover:from-green-500 hover:via-green-200 hover:to-lime-500 text-transparent bg-clip-text bg-300 animate-gradient-pan cursor-default">markets</span>.</h2>
      <h2 className="lg:text-[100px] md:text-[50px] text-[40px] text-center">Gain an <span className="italic bg-gradient-to-tl from-green-500 via-yellow-500 to-purple-800 hover:bg-gradient-to-br hover:from-purple-400 hover:via-indigo-400 hover:to-blue-400 text-transparent bg-clip-text bg-300 animate-gradient-pan cursor-default">edge</span>.</h2>
      </section>

      <main className="p-8">
        {/* Tabs */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex rounded-md bg-gray-800 p-1">
            <button
              onClick={() => setActiveTab('NinjaTrader')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'NinjaTrader' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-700'}`}
            >
              NinjaTrader
            </button>
            <button
              onClick={() => setActiveTab('TradingView')}
              className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${activeTab === 'TradingView' ? 'bg-blue-600 text-white' : 'text-gray-300 hover:text-white hover:bg-gray-700'}`}
            >
              TradingView
            </button>
          </div>
        </div>

        {(() => {
          const currentStrategies = activeTab === 'NinjaTrader' ? strategies : tradingViewStrategies;
          const currentIndicators = activeTab === 'NinjaTrader' ? indicators : tradingViewIndicators;
          return (
            <>
        <section id="strategies" className="">
          <h2 className="text-3xl font-bold text-center mb-2">Our Automated Strategies</h2>
          <h3 className="text-2xl text-center mb-8">Highly customizable with automated entries and exits</h3>
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-4">
            {currentStrategies.map(strategy => (
              <div key={strategy.name} className="bg-gray-800 rounded-lg p-4 flex flex-col items-center">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  {strategy.name}
                  {strategy.isNew && (
                    <span className="ml-2 bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 text-white text-xs font-bold px-2 py-1 rounded animate-pulse">NEW!</span>
                  )}
                </h3>
                <ul className="list-disc list-inside mb-4">
                  {strategy?.features?.map(feature => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                {strategy?.backtestUrl && (
                  <Link to={strategy.backtestUrl} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 transition-colors duration-300">
                    View Backtest
                  </Link>
                )}
                <div className="flex flex-col w-full">
                  {Array.isArray(strategy.images) && strategy.images.map((imgSrc, idx) => (
                    <img key={`${strategy.name}-${idx}`} src={imgSrc} alt={`${strategy.name} ${idx + 1}`} className="w-full h-auto rounded-md mb-4" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="indicators" className="my-12 mt-16">
          <h2 className="text-3xl font-bold text-center mb-2">Our Indicators</h2>
          <h3 className="text-2xl text-center mb-8">Learn how to trade manually with a plan and strategy built with indicators</h3>
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8">
            {currentIndicators.map(indicator => (
              <div key={indicator.name} className="bg-gray-800 rounded-lg p-4 flex flex-col items-center relative">
                <h3 className="text-xl font-semibold mb-2 flex items-center">
                  {indicator.name}
                  {indicator.isNew && (
                    <span className="ml-2 bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 text-white text-xs font-bold px-2 py-1 rounded animate-pulse">NEW!</span>
                  )}
                </h3>
                <ul className="list-disc list-inside mb-4">
                  {indicator?.features?.map(feature => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <img src={indicator.image} alt={indicator.name} className="w-full h-auto rounded-md mb-4" />
              </div>
            ))}
          </div>
        </section>
            </>
          );
        })()}

        <section id="partners" className="my-12 mt-24">
          <h2 className="text-3xl font-bold text-center mb-8">Official NinjaTrader Ecosystem Vendor</h2>
          <div className="flex flex-col justify-center items-center space-x-8 bg-white p-6 rounded-lg">
            <div className="flex justify-center items-center space-x-8">
              <a href="http://account.ninjatrader.com/register?introducingPartner=FluxTrade"><img src={ntLogo} width={300} alt="NinjaTrader Logo" /></a>
              <a href="http://kinetick.com/NinjaTrader"><img src={kinetickLogo} alt="Kinetick Logo" className="h-16 ml-[20px]" /></a>
            </div>
            <div className="flex justify-center items-center space-x-8 mt-6">
              <a href="https://ninjatraderus.pxf.io/APNodJ"><img src={ntUpgrade} width={300} alt="NinjaTrader Upgrade Logo" /></a>
              <p className='text-black w-[300px] ml-[20px]'>(Affiliate link*) <a href="https://ninjatraderus.pxf.io/APNodJ" className='text-blue-500 underline'>Sign up</a> for NinjaTrader, the best desktop trading platform, to start backtesting FluxTrade strategies today. <br/><br/>*NinjaTrader is compensating FluxTrade for this endorsement.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
