import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SQLPlayground from './components/sql_injection/playground';
import ShopUnionLab from './components/sql_injection_helper/ShopUnionLab';
import UnionInjectionLab from './components/sql_injection/unionInjection';
import SQLInjectionHomepage from './components/sql_injection/homepage';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SecurityLabDashboard from './components/dashboard';
import Login from './components/login';
// Simple authentication check
const isAuthenticated = () => {
  return localStorage.getItem('isAuthenticated') === 'true';
};

// Protected Route component
const ProtectedRoute = ({ children }) => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  return children;
};

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <ProtectedRoute>
              <SecurityLabDashboard />
            </ProtectedRoute>
          } />
          <Route path="/sql_injection" element={
            <ProtectedRoute>
              <SQLInjectionHomepage />
            </ProtectedRoute>
          } />
          <Route path="/lab/:labId" element={
            <ProtectedRoute>
              <SQLPlayground />
            </ProtectedRoute>
          } />
          <Route path="/lab/:labId/:category" element={
            <ProtectedRoute>
              <UnionInjectionLab />
            </ProtectedRoute>
          } />
          {/* Optional: fallback for manual entry */}
          <Route path="/lab/union-test" element={
            <ProtectedRoute>
              <UnionInjectionLab />
            </ProtectedRoute>
          } />
        </Routes>
      </Router>
      <ToastContainer />
    </div>
  );
}

export default App;
