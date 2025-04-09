import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ShopUnionLab from '../sql_injection_helper/ShopUnionLab';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

const BACKEND_URL = "https://securedevlab.onrender.com";

const UnionInjectionLab = () => {
  const { labId, category } = useParams();
  const parsedLabId = parseInt(labId);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const categoryFromParam = category;
  const navigate = useNavigate();
  const [labDetails, setLabDetails] = useState({});
  const [categoryName, setCategoryName] = useState(categoryFromParam);
  const [result, setResult] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLabDetails = async () => {
      const res = await fetch(`${BACKEND_URL}/api/lab/${parsedLabId}`);
      const data = await res.json();
      setLabDetails(data);
      console.log(data)
    };
    fetchLabDetails();
  }, [parsedLabId]);

  const runInjection = async () => {
    try {
      setSelectedCategory(categoryName);
      const encodedPayload = encodeURIComponent(categoryName);
      const res = await fetch(`${BACKEND_URL}/lab/union-test?category=${encodedPayload}`);
      const data = await res.json();

      if (data.success) {
        setResult(data.result);
        setProducts(data.result);
        setError(null);

        if(data.result.length > 0){
          if(labId==5){
            if(data.result[0].name == 'iPhone'){
              toast.success(`✅ ${labDetails.title} successfully completed!`);
              setShowSuccessModal(true);
            }
          }
          else{
          // toast.success(`✅ ${labDetails.title} successfully completed!`);
          setShowSuccessModal(true);}
        }
      } else {
        setResult([]);
        setProducts([]);
        setError(data.error || 'Something went wrong');
      }
    } catch (err) {
      setResult([]);
      setProducts([]);
      setError(err.message);
    }
  };

  const fetchProducts = async (categoryName) => {
    try {
      const res = await fetch(`${BACKEND_URL}/lab/union-test?category=${encodeURIComponent(categoryName)}`);
      const data = await res.json();

      if (data.success) {
        setProducts(data.result);
        setError(null);
      } else {
        setProducts([]);
        setError(data.error || 'Error fetching products');
      }
    } catch (err) {
      setProducts([]);
      setError(err.message);
    }
  };

  useEffect(() => {
    if (categoryName) {
      runInjection();
    }
    fetchProducts(selectedCategory);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryName]);

  return (
    <>
     
        <ShopUnionLab labDetails={labDetails}/> 
      <ToastContainer />
   
      {/* Success Modal */}
      {showSuccessModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">✅ {labDetails.title} Completed!</h5>
                <button type="button" className="btn-close" onClick={() => setShowSuccessModal(false)}></button>
              </div>
              {/* <ShopUnionLab products={products} /> */}
              <div className="modal-body">
                <p>Do you want to return to the SQL Injection homepage?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowSuccessModal(false)}>
                  Stay Here
                </button>
                <button type="button" className="btn btn-primary" onClick={() => navigate('/sql_injection')}>
                  Go Home
                </button>

              </div>
            </div>
          </div>
        </div>
      )}

      <div className="container py-5">
        <div className="row">
          <div className="col-lg-8 mx-auto">
            {/* Lab Details Card */}
            {/* <div className="card shadow-sm mb-4"> */}
              {/* <div className="card-body"> */}
                <h4 className="">SOLVE THIS: {labDetails.subtitle}</h4> 
                {/* <p className="card-text">{labDetails.description}</p> */}
              {/* </div> */}
            {/* </div> */}

            {/* Injection Input Card */}
            <div className="card shadow-sm mb-4">
              <div className="card-body">
                <h3 className="card-title h4 mb-3">SQL Injection Playground</h3>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control font-monospace"
                    value={categoryName}
                    onChange={e => setCategoryName(e.target.value)}
                    placeholder="Try: ' UNION SELECT NULL, NULL --"
                  />
                </div>
                <button 
                  className="btn btn-primary mb-3"
                  onClick={runInjection}
                >
                  Run Injection
                </button>

                {error && (
                  <div className="alert alert-danger" role="alert">
                    {error}
                  </div>
                )}

                {result && (
                  <div className="mt-3">
                    <h4 className="h5 mb-2">Query Result:</h4>
                    <pre className="bg-light p-3 rounded">
                      {JSON.stringify(result, null, 2)}
                    </pre>
                  </div>
                )}
              </div>
            </div>

        
          </div>
        </div>
      </div>
    </>
  );
};

export default UnionInjectionLab;
