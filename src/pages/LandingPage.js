import { Link } from 'react-router-dom';

import kinetickLogo from '../assets/logos/Kinetick_Logo.png';
import ntLogo from '../assets/logos/NinjaTrader_Wordmark_color_RGB.png';
import fluxConfluence from '../assets/indicators/FluxConfluence.PNG';
import fluxPivot from '../assets/indicators/FluxPivot.PNG';
import fluxSignal from '../assets/indicators/FluxSignal.PNG';
import marketRegime from '../assets/indicators/MarketRegime.PNG';
import parabolicRSI from '../assets/indicators/ParabolicRSI.PNG';
import previousLevels from '../assets/indicators/PreviousLevels.PNG';

import fluxLightning1 from '../assets/strategies/FluxLightning1.PNG';
import fluxLightning2 from '../assets/strategies/FluxLightning2.PNG';
import fluxPivotStrat1 from '../assets/strategies/FluxPivotStrat1.PNG';
import fluxPivotStrat2 from '../assets/strategies/FluxPivotStrat2.PNG';
import fluxSignalStrat1 from '../assets/strategies/FluxSignalStrat1.PNG';
import fluxSignalStrat2 from '../assets/strategies/FluxSignalStrat2.PNG';
import fluxTrident1 from '../assets/strategies/FluxTrident1.PNG';
import fluxTrident2 from '../assets/strategies/FluxTrident2.PNG';

import '../App.css';


export function LandingPage() {
  const indicators = [
    { name: 'FluxConfluence', image: fluxConfluence, features: ["Trade with the trend", "Get multiple confluences", "Buy and sell signals"]},
    { name: 'FluxPivot', image: fluxPivot, features: ["Pivot between buying and selling", "Add into existing positions", "Smart pivot detection"]},
    { name: 'FluxSignal', image: fluxSignal, features: ["Understand changing markets", "Buy and sell signals", "Catch new trends as they start"]},
    { name: 'Market Regime', image: marketRegime, features: ["Understand market regimes", "High and low volatility", "Sideways or trending"]},
    { name: 'Parabolic RSI', image: parabolicRSI, features: ["Parabolic SAR + RSI", "Paired with Ultimate Entry Indicator", "Overbought and oversold areas"]},
    { name: 'Previous Levels', image: previousLevels, features: ["Identify previous highs and lows", "Trade reversals and breakouts", "Yesterday, premarket, and opening range"]},
  ];

  const strategies = [
    { 
        name: 'FluxLightning', 
        images: [fluxLightning1, fluxLightning2], 
        features: ["Fully automated strategy", "Great for trending markets", "Long and short signals"],
        backtestUrl: "/backtests/flux_lightning"
    },
    { 
        name: 'FluxPivot Strategy', 
        images: [fluxPivotStrat1, fluxPivotStrat2], 
        features: ["Automated pivot detection", "Trade with institutional levels", "Works great with FluxPivot indicator"],
        backtestUrl: "/backtests/flux_pivot_strat"
    },
    { 
        name: 'FluxSignal Strategy', 
        images: [fluxSignalStrat1, fluxSignalStrat2], 
        features: ["Uses Flux Signal for entries", "Catches trends early", "Simple to use"],
        backtestUrl: "/backtests/flux_signal_strat"
    },
    { 
        name: 'FluxTrident', 
        images: [fluxTrident1, fluxTrident2], 
        features: ["Three-step trend confirmation", "Powerful scalping strategy", "Identifies strong trend continuations"],
        backtestUrl: "/backtests/flux_trident"
    }
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <section>
      <h2 className="pt-[50px] lg:text-[100px] md:text-[50px] text-[40px] text-center">Understand the <span className="italic bg-gradient-to-tl from-red-600 via-gray-300 to-green-600 hover:bg-gradient-to-br hover:from-green-500 hover:via-green-200 hover:to-lime-500 text-transparent bg-clip-text bg-300 animate-gradient-pan cursor-default">markets</span>.</h2>
      <h2 className="lg:text-[100px] md:text-[50px] text-[40px] text-center">Gain an <span className="italic bg-gradient-to-tl from-green-500 via-yellow-500 to-purple-800 hover:bg-gradient-to-br hover:from-purple-400 hover:via-indigo-400 hover:to-blue-400 text-transparent bg-clip-text bg-300 animate-gradient-pan cursor-default">edge</span>.</h2>
      </section>

      <main className="p-8">
        <section id="indicators" className="my-8">
          <h2 className="text-3xl font-bold text-center mb-2">Our Indicators</h2>
          <h3 className="text-2xl text-center mb-8">Learn how to trade manually with a plan and strategy built with indicators</h3>
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8">
            {indicators.map(indicator => (
              <div key={indicator.name} className="bg-gray-800 rounded-lg p-4 flex flex-col items-center">
                <h3 className="text-xl font-semibold mb-2">{indicator.name}</h3>
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

        <section id="strategies" className="my-12 mt-16">
          <h2 className="text-3xl font-bold text-center mb-2">Our Automated Strategies</h2>
          <h3 className="text-2xl text-center mb-8">Highly customizable with automated entries and exits</h3>
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8">
            {strategies.map(strategy => (
              <div key={strategy.name} className="bg-gray-800 rounded-lg p-4 flex flex-col items-center">
                <h3 className="text-xl font-semibold mb-2">{strategy.name}</h3>
                <ul className="list-disc list-inside mb-4">
                  {strategy.features.map(feature => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                <Link to={strategy.backtestUrl} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 transition-colors duration-300">
                  View Backtest
                </Link>
                <div className="flex flex-col">
                  <img src={strategy.images[0]} alt={`${strategy.name} 1`} className="w-full h-auto rounded-md mb-4" />
                  <img src={strategy.images[1]} alt={`${strategy.name} 2`} className="w-full h-auto rounded-md mb-4" />
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="partners" className="my-12 mt-24">
          <h2 className="text-3xl font-bold text-center mb-8">Official NinjaTrader Ecosystem Vendor</h2>
          <div className="flex justify-center items-center space-x-8 bg-white p-6 rounded-lg">
            <a href="http://account.ninjatrader.com/register?introducingPartner=FluxTrade"><img src={ntLogo} width={300} alt="NinjaTrader Logo" /></a>
            <a href="http://kinetick.com/NinjaTrader"><img src={kinetickLogo} alt="Kinetick Logo" className="h-16 ml-[20px]" /></a>
          </div>
        </section>
      </main>
    </div>
  );
}
