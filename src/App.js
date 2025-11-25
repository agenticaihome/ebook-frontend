import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import SalesPage from './SalesPage';
import HowToBuyErgo from './HowToBuyErgo';
import WhyErgo from './WhyErgo';
import WalletGuide from './WalletGuide';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SalesPage />} />
        <Route path="/how-to-buy-ergo" element={<HowToBuyErgo />} />
        <Route path="/why-ergo" element={<WhyErgo />} />
        <Route path="/wallet-guide" element={<WalletGuide />} />
      </Routes>
    </Router>
  );
}

export default App;
