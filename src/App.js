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
import { PaymentPostPurchasePage } from './pages/PaymentPostPurchasePage';

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
          <Route path="/backtests/flux_trident" element={<BacktestPage file="fluxTrident.csv" />} />
          <Route path="/backtests/flux_signal_strat" element={<BacktestPage file="fluxSignalStrat.csv" />} />
          <Route path="/backtests/flux_pivot_strat" element={<BacktestPage file="fluxPivotStrat.csv" />} />
          <Route path="/backtests/flux_lightning" element={<BacktestPage file="fluxLightning.csv" />} />
          <Route path="/backtests/rileySR" element={<BacktestPage file="rileySR.csv" />} />
          <Route path="/backtests/cointegrated_pairs" element={<BacktestPage file="cointegratedPairs.csv" />} />
          <Route path="/backtests/orb" element={<BacktestPage file="orb.csv" />} />
          <Route path="/backtests/elliot_wave" element={<BacktestPage file="elliotWave.csv" />} />
          <Route path="/backtests/icc_choch" element={<BacktestPage file="ICCChoCh.csv" />} />
          <Route path="/backtests/low_volatility" element={<BacktestPage file="lowVolatility.csv" />} />
          <Route path="/backtests/project_gamma" element={<BacktestPage file="projectGamma.csv" />} />
          <Route path="/backtests/trend_catcher" element={<BacktestPage file="trendCatcher.csv" />} />
        </Routes>
        <Footer/> 
      </div>
    </Router>
  );
}

export default App;