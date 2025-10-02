import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import "./Donation.css";

const Donation = () => {
  const [copied, setCopied] = useState(false);

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 150);
    });
  };

  useEffect(() => {
  AOS.init({
    duration: 1000, // animation duration in ms
    once: true,     // whether animation should happen only once
  });
}, []);


  const [loading, setLoading] = React.useState(true);
    
      React.useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000); // 1 second
        return () => clearTimeout(timer);
      }, []);
  
      if (loading) {
      return (
        <div id="spinner" className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
          <div className="spinner-grow text-primary m-1" role="status">
            <span className="sr-only">Loading...</span>
          </div>
          <div className="spinner-grow text-success m-1" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      );
    }

  
  return (
    <div>
      {/* <div id="spinner" className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
        <div className="spinner-grow text-primary m-1" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <div className="spinner-grow text-success m-1" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div> */}

      <div className="container-fluid bg-light ps-5 pe-0 d-none d-lg-block">
        <div className="row gx-0">
          <div className="col-md-6 text-center text-lg-start mb-2 mb-lg-0">
            <div className="d-inline-flex align-items-center">
              <small className="py-2"><i className="bi bi-geo-alt-fill"></i> Churakkavu, Pandikkad, Malappuram, 676521 </small>
            </div>
          </div>
          <div className="col-md-6 text-center text-lg-end">
            <div className="position-relative d-inline-flex align-items-center bg-primary text-white top-shape px-5">
              <div className="me-3 pe-3 border-end py-2">
                <p className="m-0">Reg No : (MPM/CA/626/2024)</p>
              </div>
              <div className="py-2">
                <p className="m-0"><i className="fa fa-phone-alt me-2"></i>+91 8281381390, 9846802196</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top px-3 px-md-5 py-2 py-lg-0">
        <a className="navbar-brand p-0" href="/">
          <img className="img-fluid" src="img/santh.png" alt="Logo" style={{ maxHeight: "100px" }} />
        </a>
        {/* Toggle Button */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        {/* Collapsible Menu */}
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto py-0">
            <Link to="/" className="nav-item nav-link">Home</Link>
            <Link to="/about" className="nav-item nav-link">About</Link>
            <Link to="/Donate-for-pandikkad-santhwanam-palliative-care-society" className="nav-item nav-link">Donation</Link>
            <Link to="/gallery" className="nav-item nav-link">Gallery</Link>
            <Link to="/leaders" className="nav-item nav-link">Leaders</Link>
            <Link to="/contact" className="nav-item nav-link">Contact</Link>
          </div>
        </div>
      </nav>

      <div className="modal fade" id="searchModal" tabIndex="-1">
        <div className="modal-dialog modal-fullscreen">
          <div className="modal-content" style={{ background: "rgba(9, 30, 62, .7)" }}>
            <div className="modal-header border-0">
              <button type="button" className="btn bg-white btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body d-flex align-items-center justify-content-center">
              <div className="input-group" style={{ maxWidth: "600px" }}>
                <input type="text" className="form-control bg-transparent border-primary p-3" placeholder="Type search keyword" />
                <button className="btn btn-primary px-4"><i className="bi bi-search"></i></button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container-fluid bg-primary py-5 hero-header mb-5">
        <div className="row py-3">
          <div className="col-12 text-center">
            <h1 className="display-3 text-white animated zoomIn">Donation</h1>
          </div>
        </div>
      </div>

      <div className="container py-5">
        <div className="text-center mb-5" data-aos="fade-up" data-aos-delay="800">
          <h2 className="text-gradient fw-bold display-5 mb-3">Support Our Cause</h2>
          <p className="lead text-muted">Your generosity creates lasting change. Every contribution matters.</p>
          <div className="divider mx-auto" style={{ width: "80px", height: "3px", background: "linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)" }}></div>
        </div>

        <div className="row g-4 justify-content-center" data-aos="fade-up" data-aos-delay="800">
          {/* Bank Transfer */}
          <div className="col-lg-5 col-md-6">
            <div className="donation-card bank-card rounded-4 p-4 h-100" style={{ fontSize: "0.9rem" }}>
              <div className="icon-wrapper bg-primary-soft mb-4">
                <i className="fas fa-university text-primary"></i>
              </div>
              <h3 className="mb-4">Bank Transfer</h3>
              <ul className="list-unstyled donation-details">
                <li style={{color:"black"}}><span className="detail-label">Account:</span>PANDIKAD SANTHWANAM PALLIATIVE CARE SOCIETY</li>
                <li style={{color:"black"}}><span className="detail-label">Account No:</span>1222-05057030-195001</li>
                <li style={{color:"black"}}><span className="detail-label">Bank:</span>CSB BANK LTD</li>
                <li style={{color:"black"}}><span className="detail-label">IFSC:</span>CSBK0001222</li>
              </ul>
            </div>
          </div>

          {/* UPI Section */}
          <div className="col-lg-5 col-md-6">
            <div className="donation-card upi-card rounded-4 p-3 h-100 text-center" style={{ fontSize: "0.9rem" }} >
              <div className="icon-wrapper bg-success-soft mb-3" style={{ fontSize: "1.5rem" }}>
                <i className="fas fa-mobile-alt text-success"></i>
              </div>
              <h4 className="mb-3">UPI Transfer</h4>
              <p className="text-muted mb-2">Scan QR Code to donate</p>
              <div className="qr-wrapper mb-3 mx-auto" style={{ width: "150px" }}>
                <img src="img/google-pay.jpeg" alt="UPI QR Code" className="img-fluid rounded-3 border" />
                <div className=""></div>
              </div>
              <div className="upi-id-box bg-light rounded-3 p-2 mb-2">
                <span className="text-muted small d-block ">UPI ID</span>
                <strong className="text-dark small-upi-id d-block">pandikkadsanthwanam.10016827@csbpay</strong>
                <button
                  className={`btn btn-sm copy-btn ms-2${copied ? " copied" : ""}`}
                  onClick={() => handleCopy("pandikkadsanthwanam.10016827@csbpay")}
                  disabled={copied}
                >
                  {copied ? (
                    <span><i className="fas fa-check me-2"></i>Copied!</span>
                  ) : (
                    <span><i className="fas fa-copy"></i></span>
                  )}
                </button>
              </div>
              <p className="small text-muted mt-auto">Supports all UPI apps</p>
            </div>
          </div>
        </div>
      </div>

      <section className="py-5 bg-dark text-white text-center wow fadeInUp" data-wow-delay="0.4s" data-aos="zoom-in" data-aos-delay="400">
        <div className="container">
          <h2 className="display-5 fw-bold mb-3"></h2>
          <p className="mb-4">Every rupee makes a difference. Join our mission to ease suffering and bring peace to lives in need.</p>
          <Link to="/Donate-for-pandikkad-santhwanam-palliative-care-society" className="btn btn-primary btn-lg px-4 py-2 rounded-pill" data-aos="zoom-in" data-aos-delay="600">Donate Now</Link>
          <p className="mt-4 text-white small">
            Powered by <a href="https://raihsoft.com/" className="text-white fw-semibold" target="_blank" rel="noopener noreferrer"><u>raihsoft</u></a>
          </p>
        </div>
      </section>

      <a href="#" className="btn btn-lg btn-lg-square rounded back-to-top"><i className="bi bi-arrow-up " style={{ color: "aliceblue" }}></i></a>
    </div>
  );
};

export default Donation;