import React, { useState, useEffect } from 'react';
import LoginTester from '../sql_injection_helper/login';
import { useParams } from 'react-router-dom';

const BACKEND_URL = "https://securedevlab.onrender.com";

const SQLPlayground = () => {
  const { labId } = useParams();
  const [labDetails, setLabDetails] = useState({});
  const [query, setQuery] = useState("SELECT * FROM users;");
  const [queryResult, setQueryResult] = useState(null);
  const [labCompleted, setLabCompleted] = useState(false);

  useEffect(() => {
    const fetchLabDetails = async () => {
      const res = await fetch(`${BACKEND_URL}/api/lab/${labId}`);
      const data = await res.json();
      setLabDetails(data);
    };

    fetchLabDetails();
  }, [labId]);

  const runQuery = async () => {
    try {
      const res = await fetch('https://securedevlab.onrender.com/playground', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });

      const data = await res.json();
      setQueryResult(data);
    } catch (err) {
      setQueryResult({ success: false, error: err.message });
    }
  };

  return (

    <div className="container py-5">
      <div className="row">
        <div className="col-lg-8 mx-auto">
          {/* Lab Details Card */}
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <h2 className="card-title h3 mb-3">{labDetails.title}</h2>
              <h4 className="h5 text-muted mb-3">{labDetails.subtitle}</h4>
              <p className="card-text">{labDetails.description}</p>
            </div>
          </div>

          {/* Login Tester Section */}
          <div className="card shadow-sm mb-4">
            <div className="card-body">
              <LoginTester
              title={labDetails.title}
                solution={labDetails.solution}
                onSuccess={() => setLabCompleted(true)}
              />
            </div>
          </div>

          {/* Query Playground Section */}
          {/* <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="card-title h4 mb-3">SQL Query Playground</h3>
              <div className="mb-3">
                <textarea
                  className="form-control font-monospace"
                  rows={5}
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  placeholder="Enter your SQL query here..."
                />
              </div>
              <button 
                className="btn btn-primary mb-3"
                onClick={runQuery}
              >
                Run Query
              </button>

              {queryResult && (
                <div className="mt-3">
                  <h4 className="h5 mb-2">Query Result:</h4>
                  <pre className="bg-light p-3 rounded">
                    {JSON.stringify(queryResult, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default SQLPlayground;
