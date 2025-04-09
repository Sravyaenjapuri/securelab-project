// src/SQLInjectionLabs.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BACKEND_URL = 'https://securedevlab.onrender.com';

const SQLInjectionHomepage = () => {
  const [labs, setLabs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLabs = async () => {
      const res = await fetch(`${BACKEND_URL}/api/labs`);
      const data = await res.json();
      setLabs(data);
    };
    fetchLabs();
  }, []);

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-4 fw-bold text-primary">SQL Injection Practice Labs</h1>
        <p className="lead text-muted">Master SQL injection techniques through hands-on practice</p>
      </div>

      <div className="row g-4">
        {labs.map((lab) => (
          <div key={lab.id} className="col-md-6 col-lg-4">
            <div
              className="card h-100 shadow-sm hover-shadow transition"
              onClick={() => {
                if ([2, 3, 4, 5].includes(lab.id)) {
                  navigate(`/lab/${lab.id}/:category`);
                } else {
                  navigate(`/lab/${lab.id}`);
                }
              }}
              style={{ cursor: 'pointer' }}
            >
              <div className="card-img-top position-relative" style={{ height: '200px', overflow: 'hidden' }}>
                <img
                  src={`https://content.pentest-tools.com/assets/content/sql-injection-attacks/common-sql-injection-attacks.webp`}
                  alt={lab.title}
                  className="w-100 h-100 object-fit-cover"
                />
              </div>
              <div className="card-body">
                <h3 className="card-title h5 fw-bold">{lab.title}</h3>
                <p className="card-text text-muted">{lab.subtitle}</p>
              </div>
              <div className="card-footer bg-transparent border-0">
                <button className="btn btn-primary w-100">Start Lab</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SQLInjectionHomepage;
