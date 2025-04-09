import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import './login.css';

const Login = () => {
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // For demo purposes, using a simple validation
    // In a real application, you would validate against a backend
    if (credentials.username === 'admin' && credentials.password === 'password') {
      toast.success('Login successful!');
      // Store authentication state (could use context, redux, or localStorage)
      localStorage.setItem('isAuthenticated', 'true');
      navigate('/');
    } else {
      toast.error('Invalid credentials. Try admin/password');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>Security Lab Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={credentials.password}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="login-button">Login</button>
        </form>
        <div className="login-hint">
          <p>Demo credentials: admin / password</p>
        </div>
      </div>
    </div>
  );
};

export default Login; 