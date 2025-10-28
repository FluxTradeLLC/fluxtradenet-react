import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { PricingPage } from './pages/PricingPage';
import { AccountPage } from './pages/AccountPage';
import { AuthCallback } from './components/auth/AuthCallback';
import { PaymentSuccessPage } from './pages/PaymentSuccessPage';
import { BacktestPage } from './pages/BacktestPage';
import { Header } from './components/layout/Header';
import { SignIn } from './components/auth/SignIn';
import { SignUp } from './components/auth/SignUp';
import { Footer } from './components/layout/Footer';
import { RefundPolicyPage } from './pages/RefundPolicyPage';
import { PaymentPostPurchasePage } from './pages/PaymentPostPurchasePage';
import { AffiliatesPage } from './pages/AffiliatesPage';
import { SupportPage } from './pages/SupportPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Header/>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/success" element={<PaymentSuccessPage />} />
          <Route path="/payment/success" element={<PaymentPostPurchasePage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="/backtests/flux-trident" element={<BacktestPage file="fluxTrident.csv" />} />
          <Route path="/backtests/orms" element={<BacktestPage file="orms.csv" />} />
          <Route path="/backtests/flux-signal-strat" element={<BacktestPage file="fluxSignalStrat.csv" />} />
          <Route path="/backtests/flux-pivot-strat" element={<BacktestPage file="fluxPivotStrat.csv" />} />
          <Route path="/backtests/flux-lightning" element={<BacktestPage file="fluxLightning.csv" />} />
          <Route path="/backtests/riley-sr" element={<BacktestPage file="rileySR.csv" />} />
          <Route path="/backtests/cointegrated-pairs" element={<BacktestPage file="cointegratedPairs.csv" />} />
          <Route path="/backtests/orb" element={<BacktestPage file="orb.csv" />} />
          <Route path="/backtests/elliot-wave" element={<BacktestPage file="elliotWave.csv" />} />
          <Route path="/backtests/icc-choch" element={<BacktestPage file="ICCChoCh.csv" />} />
          <Route path="/backtests/low-volatility" element={<BacktestPage file="lowVolatility.csv" />} />
          <Route path="/backtests/project-gamma" element={<BacktestPage file="projectGamma.csv" />} />
          <Route path="/backtests/trend-catcher" element={<BacktestPage file="trendCatcher.csv" />} />
          <Route path="/backtests/holy-grail" element={<BacktestPage file="holyGrail.csv" />} />
          <Route path="/backtests/quad-confluence" element={<BacktestPage file="quadConfluence.csv" />} />
          <Route path="/backtests/future-prediction-server" element={<BacktestPage file="futurePredictionServer.csv" />} />
          <Route path="/backtests/donchian-turtle" element={<BacktestPage file="donchianTurtle.csv" />} />
          <Route path="/backtests/ichimoko-strat" element={<BacktestPage file="ichimokoStrat.csv" />} />
          <Route path="/backtests/keltner-strat" element={<BacktestPage file="keltnerStrat.csv" />} />
          <Route path="/backtests/liquidity-sweep" element={<BacktestPage file="liquiditySweep.csv" />} />
          <Route path="/backtests/slow-and-steady" element={<BacktestPage file="slowAndSteady.csv" />} />
          <Route path="/backtests/super-momentum" element={<BacktestPage file="superMomentum.csv" />} />
          <Route path="/backtests/centauri" element={<BacktestPage file="centauri.csv" />} />
          <Route path="/backtests/mars" element={<BacktestPage file="mars.csv" />} />
          <Route path="/backtests/moon" element={<BacktestPage file="moon.csv" />} />
          <Route path="/backtests/pluto" element={<BacktestPage file="pluto.csv" />} />
          <Route path="/refund-policy" element={<RefundPolicyPage />} />
          <Route path="/affiliates" element={<AffiliatesPage />} />
          <Route path="/support" element={<SupportPage />} />
        </Routes>
        <Footer/> 
      </div>
    </Router>
  );
}

export default App;