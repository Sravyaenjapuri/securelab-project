import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../Navbar';
import './xssHome.css';

const BACKEND_URL = 'https://securedevlab.onrender.com';

const XSSHomepage = () => {
  const [completedLabs, setCompletedLabs] = useState({
    reflected: false,
    stored: false,
    dom: false
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLabCompletion = async () => {
      const userEmail = localStorage.getItem('userEmail');
      if (!userEmail) return;

      try {
        setIsLoading(true);
        const response = await fetch(`${BACKEND_URL}/api/lab-completion/${encodeURIComponent(userEmail)}`);
        if (response.ok) {
          const data = await response.json();
          const completed = {
            reflected: data.completed_labs.includes('reflected_xss'),
            stored: data.completed_labs.includes('stored_xss'),
            dom: data.completed_labs.includes('dom_xss')
          };
          setCompletedLabs(completed);
        } else {
          setError('Failed to fetch lab completion status');
        }
      } catch (error) {
        console.error('Error fetching lab completion status:', error);
        setError('Error connecting to the server');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLabCompletion();
  }, []);

  const labCards = [
    {
      id: 'reflected',
      title: 'Reflected XSS',
      description: 'Practice exploiting reflected XSS vulnerabilities in a search function.',
      path: '/xss-lab/reflected',
      image: 'https://miro.medium.com/v2/resize:fit:1400/0*aV4mhFiskCdVHSsU'
    },
    {
      id: 'stored',
      title: 'Stored XSS',
      description: 'Learn about stored XSS attacks through a vulnerable comment system.',
      path: '/xss-lab/stored',
      image: 'https://i.ytimg.com/vi/ABwS2MIxFPQ/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLBfAmy5CtdLdsOaCFu1aasNEqEuVw'
    },
    // {
    //   id: 'dom',
    //   title: 'DOM-based XSS',
    //   description: 'Explore DOM-based XSS vulnerabilities in client-side JavaScript.',
    //   path: '/xss-lab/dom',
    //   image: 'https://www.imperva.com/learn/wp-content/uploads/sites/13/2019/01/dom-xss.jpg'
    // }
  ];

  if (isLoading) {
    return (
      <div className="page-layout">
        <Navbar />
        <main className="main-content">
          <div className="xss-home-container">
            <div className="loading-spinner">Loading labs...</div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="page-layout">
        <Navbar />
        <main className="main-content">
          <div className="xss-home-container">
            <div className="error-message">{error}</div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="page-layout">
      <Navbar />
      <main className="main-content">
        <div className="xss-home-container">
          <h1>Cross-Site Scripting (XSS) Labs</h1>
          <p className="intro-text">
            Welcome to the XSS Security Labs. Here you can practice identifying and exploiting different types of XSS vulnerabilities.
            Each lab focuses on a specific type of XSS attack, helping you understand the underlying principles and security implications.
          </p>
          
          <div className="labs-grid">
            {labCards.map(lab => (
              <div key={lab.id} className="lab-card">
                <div className="lab-image">
                  <img src={lab.image} alt={lab.title} />
                </div>
                <h2>{lab.title}</h2>
                <p>{lab.description}</p>
                <Link 
                  to={lab.path} 
                  className={`lab-link ${completedLabs[lab.id] ? 'completed' : ''}`}
                >
                  {completedLabs[lab.id] ? 'Completed' : 'Start Lab'}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default XSSHomepage; 