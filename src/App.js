import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { LandingPage } from './pages/LandingPage';
import { PricingPage } from './pages/PricingPage';
import { AccountPage } from './pages/AccountPage';
import { AuthCallback } from './components/auth/AuthCallback';
import { PaymentSuccessPage } from './pages/PaymentSuccessPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/auth/callback" element={<AuthCallback />} />
        <Route path="/" element={<LandingPage />} />
        <Route path="/pricing" element={<PricingPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/payment/success" element={<PaymentSuccessPage />} />
      </Routes>
    </Router>
  );
}

export default App;