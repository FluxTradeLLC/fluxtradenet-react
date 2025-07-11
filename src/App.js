import './App.css';
import fluxLogo from './assets/logo.png';
import kinetickLogo from './assets/logos/Kinetick_Logo.png';
import ntLogo from './assets/logos/NinjaTrader_Wordmark_color_RGB.png';
import fluxConfluence from './assets/indicators/FluxConfluence.PNG';
import fluxPivot from './assets/indicators/FluxPivot.PNG';
import fluxSignal from './assets/indicators/FluxSignal.PNG';
import marketRegime from './assets/indicators/MarketRegime.PNG';
import parabolicRSI from './assets/indicators/ParabolicRSI.PNG';
import previousLevels from './assets/indicators/PreviousLevels.PNG';


function App() {
  const indicators = [
    { name: 'FluxConfluence', image: fluxConfluence, features: ["Trade with the trend", "Get multiple confluences", "Buy and sell signals"]},
    { name: 'FluxPivot', image: fluxPivot, features: ["Pivot between buying and selling", "Add into existing positions", "Smart pivot detection"]},
    { name: 'FluxSignal', image: fluxSignal, features: ["Understand changing markets", "Buy and sell signals", "Catch new trends as they start"]},
    { name: 'Market Regime', image: marketRegime, features: ["Understand market regimes", "High and low volatility", "Sideways or trending"]},
    { name: 'Parabolic RSI', image: parabolicRSI, features: ["Parabolic SAR + RSI", "Paired with Ultimate Entry Indicator", "Overbought and oversold areas"]},
    { name: 'Previous Levels', image: previousLevels, features: ["Identify previous highs and lows", "Trade reversals and breakouts", "Yesterday, premarket, and opening range"]},
  ];

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <header className="p-4 flex justify-center items-center">
        <img src={fluxLogo} alt="Flux Trade Logo" className="h-[75px]" />
        <h1 className="text-6xl font-bold ml-[20px] italic">FluxTrade</h1>
        <div />
      </header>

      <main className="p-8">
        <section id="indicators" className="my-8">
          <h2 className="text-3xl font-bold text-center mb-8">Our Indicators</h2>
          <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-8">
            {indicators.map(indicator => (
              <div key={indicator.name} className="bg-gray-800 rounded-lg p-4 flex flex-col items-center">
                <img src={indicator.image} alt={indicator.name} className="w-full h-auto rounded-md mb-4" />
                <h3 className="text-xl font-semibold mb-2">{indicator.name}</h3>
                <ul className="list-disc list-inside">
                  {indicator?.features?.map(feature => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
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

export default App;
