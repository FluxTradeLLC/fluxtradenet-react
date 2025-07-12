import { Link } from 'react-router-dom';

import fluxLogo from '../assets/logo.png';
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
        features: ["Fully automated strategy", "Great for trending markets", "Long and short signals"]
    },
    { 
        name: 'FluxPivot Strategy', 
        images: [fluxPivotStrat1, fluxPivotStrat2], 
        features: ["Automated pivot detection", "Trade with institutional levels", "Works great with FluxPivot indicator"]
    },
    { 
        name: 'FluxSignal Strategy', 
        images: [fluxSignalStrat1, fluxSignalStrat2], 
        features: ["Uses Flux Signal for entries", "Catches trends early", "Simple to use"]
    },
    { 
        name: 'FluxTrident', 
        images: [fluxTrident1, fluxTrident2], 
        features: ["Three-step trend confirmation", "Powerful scalping strategy", "Identifies strong trend continuations"]
    }
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <header className="p-4 flex flex-col-reverse md:flex-row md:items-center justify-end">
        <div className="flex items-center mt-[20px] flex-col md:flex-row">
          <img src={fluxLogo} alt="Flux Trade Logo" className="h-[75px]" />
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold italic ml-[40px] text-center">FluxTrade Trading System</h1>
        </div>
        <nav className="flex w-full md:w-auto justify-center md:justify-end items-center space-x-8 p-6 rounded-lg md:ml-[100px]">
          <ul><Link to="/pricing">Pricing</Link></ul>
          <ul><a href="https://discord.gg/UTcxDRQ26U">Free Discord</a></ul>
        </nav>
      </header>

      <section>
      <h2 className="mt-[50px] lg:text-[100px] md:text-[50px] text-[40px] text-center">Understand the <span className="italic bg-gradient-to-tl from-red-600 via-gray-300 to-green-600 hover:bg-gradient-to-br hover:from-green-500 hover:via-green-200 hover:to-lime-500 text-transparent bg-clip-text bg-300 animate-gradient-pan cursor-default">markets</span>.</h2>
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

      <footer className="p-8 text-md text-white">
        <p className="mb-4">Disclaimers</p>
        <p className="mb-4">Futures and forex trading contains substantial risk and is not for every investor. An investor could
potentially lose all or more than the initial investment. Risk capital is money that can be lost without
jeopardizing ones’ financial security or life style. Only risk capital should be used for trading and only
those with sufficient risk capital should consider trading. Past performance is not necessarily indicative of
future results</p>
        <p className="mb-4">Hypothetical performance results have many inherent limitations, some of which are described below. No
representation is being made that any account will or is likely to achieve profits or losses similar to those
shown; in fact, there are frequently sharp differences between hypothetical performance results and the
actual results subsequently achieved by any particular trading program. One of the limitations of
hypothetical performance results is that they are generally prepared with the benefit of hindsight. In
addition, hypothetical trading does not involve financial risk, and no hypothetical trading record can
completely account for the impact of financial risk of actual trading. for example, the ability to withstand
losses or to adhere to a particular trading program in spite of trading losses are material points which
can also adversely affect actual trading results. There are numerous other factors related to the markets
in general or to the implementation of any specific trading program which cannot be fully accounted for
in the preparation of hypothetical performance results and all which can adversely affect trading results.</p>
        <p>Testimonials appearing on this website may not be representative of other clients or customers and is not
        a guarantee of future performance or success. </p>
      </footer>
    </div>
  );
}
