// src/SQLInjectionLabs.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar';
import './sqlHome.css';

const BACKEND_URL = 'https://securedevlab.onrender.com';

const SQLInjectionHomepage = () => {
  const [labs, setLabs] = useState([]);
  const [completedLabs, setCompletedLabs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Get user email from localStorage
        const userEmail = localStorage.getItem('userEmail');
        if (!userEmail) {
          console.error('No user email found');
          return;
        }

        // Fetch labs
        const labsRes = await fetch(`${BACKEND_URL}/api/labs`);
        const labsData = await labsRes.json();
        setLabs(labsData);

        // Fetch completed labs using the standardized endpoint
        const completedRes = await fetch(`${BACKEND_URL}/api/lab-completion/${encodeURIComponent(userEmail)}`, {
          credentials: 'include'
        });
        const completedData = await completedRes.json();
        
        // Filter for SQL injection labs
        const sqlCompletedLabs = completedData.completed_labs
          .filter(labType => labType.startsWith('sql_injection_'))
          .map(labType => {
            // Extract lab ID from the lab_type (e.g., 'sql_injection_1' -> '1')
            const labId = labType.split('_')[2];
            return { id: labId };
          });
        
        setCompletedLabs(sqlCompletedLabs);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const isLabCompleted = (labId) => {
    return completedLabs.some(lab => lab.id === labId.toString());
  };

  return (
    <div className="page-layout">
      <Navbar />
      <main className="main-content">
        <div className="sql-container">
          <div className="sql-header">
            <h1>SQL Injection Practice Labs</h1>
            <p className="lab-description">
              Master SQL injection techniques through hands-on practice. Learn how attackers can manipulate database queries
              and how to prevent these vulnerabilities in your applications.
            </p>
          </div>

          <div className="sql-grid">
            {labs.map((lab) => (
              <div key={lab.id} className="sql-card" onClick={() => {
                if ([2, 3, 4, 5].includes(lab.id)) {
                  navigate(`/lab/${lab.id}/:category`);
                } else {
                  navigate(`/lab/${lab.id}`);
                }
              }}>
                <div className="sql-card-image">
                  <img
                    src={`https://content.pentest-tools.com/assets/content/sql-injection-attacks/common-sql-injection-attacks.webp`}
                    alt={lab.title}
                  />
                  {isLabCompleted(lab.id) && (
                    <div className="completion-badge">✓ Completed</div>
                  )}
                </div>
                <div className="sql-card-content">
                  <h3>{lab.title}</h3>
                  <p>{lab.subtitle}</p>
                  <button 
                    className={`start-button ${isLabCompleted(lab.id) ? 'completed' : ''}`}
                  >
                    {isLabCompleted(lab.id) ? 'Completed' : 'Start Lab'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default SQLInjectionHomepage;
