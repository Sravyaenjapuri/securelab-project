import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SQLPlayground from './components/sql_injection/playground';
import ShopUnionLab from './components/sql_injection_helper/ShopUnionLab';
import UnionInjectionLab from './components/sql_injection/unionInjection';
import SQLInjectionHomepage from './components/sql_injection/homepage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SecurityLabDashboard from './components/dashboard';

function App() {
  return (
    <div className="App">
  <Router>
      <Routes>
        <Route path="/" element={<SecurityLabDashboard />} />
        <Route path="/sql_injection" element={<SQLInjectionHomepage />} />
      <Route path="/lab/:labId" element={<SQLPlayground />} />
        <Route path="/lab/:labId/:category" element={<UnionInjectionLab />} />
        {/* Optional: fallback for manual entry */}
        <Route path="/lab/union-test" element={<UnionInjectionLab />} />
      </Routes>
    </Router>
    <ToastContainer />
    </div>
  );
}

export default App;
