import React, { useEffect, useCallback, useState } from "react";
import { useLocation, useNavigate ,Link, } from "react-router-dom";

import html2canvas from "html2canvas";
import "./Statuscount.css";

const Statuscount = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [clubs, setClubs] = useState([]);

  const club = location.state;

  const fetchClubs = useCallback(async () => {
    try {
      const response = await fetch("/api/clubs"); 
      const data = await response.json();
      setClubs(data);
    } catch (error) {
      console.error("Failed to fetch clubs:", error);
    }
  }, []);

  useEffect(() => {
    fetchClubs();
  }, [fetchClubs]);

  if (!club) {
    return (
      <div className="clubb-container">
        <h2>⚠ No Club Data Found</h2>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    );
  }

  const handleDownload = () => {
    const card = document.querySelector(".status-card");
    if (!card) return;

    const img = card.querySelector(".bg-template");

    const capture = () => {
      html2canvas(card, {
        useCORS: true,
        allowTaint: true,
        scale: window.devicePixelRatio, // ensures high-res
      }).then((canvas) => {
        const link = document.createElement("a");
        link.download = `${club.organization_name || "status"}-status.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
      });
    };

    // Ensure the background image is fully loaded before capturing
    if (img.complete) {
      capture();
    } else {
      img.onload = capture;
    }
  };

  return (
      <div>
  <div className="container-fluid bg-light ps-5 pe-0 d-none d-lg-block">
        <div className="row gx-0">
          <div className="col-md-6 text-center text-lg-start mb-2 mb-lg-0">
            <div className="d-inline-flex align-items-center">
              <small className="py-2">
                <i className="bi bi-geo-alt-fill"></i> Churakkavu, Pandikkad,
                Malappuram, 676521
              </small>
            </div>
          </div>
          <div className="col-md-6 text-center text-lg-end">
            <div className="position-relative d-inline-flex align-items-center bg-primary text-white top-shape px-5">
              <div className="me-3 pe-3 border-end py-2">
                <p className="m-0">Reg No : (MPM/CA/626/2024)</p>
              </div>
              <div className="py-2">
                <p className="m-0">
                  <i className="fa fa-phone-alt me-2"></i>‪+91 8281381390‬,
                  9846802196
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top px-3 px-md-5 py-2 py-lg-0">
        <a className="navbar-brand p-0" href="/">
          <img
            className="img-fluid"
            src="/img/santh.png"
            alt="Logo"
            style={{ maxHeight: "100px" }}
          />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto py-0">
            <Link to="/" className="nav-item nav-link">
              Home
            </Link>
            <Link to="/about" className="nav-item nav-link">
              About
            </Link>
            <Link
              to="/Donate-for-pandikkad-santhwanam-palliative-care-society"
              className="nav-item nav-link"
            >
              Donation
            </Link>
            <Link to="/gallery" className="nav-item nav-link">
              Gallery
            </Link>
            <Link to="/leaders" className="nav-item nav-link">
              Leaders
            </Link>
            <Link to="/contact" className="nav-item nav-link">
              Contact
            </Link>
          </div>
        </div>
      </nav>

        

          <div className="leaderboard-subtitle-headers" >
            <h1 style={{color:"black"}}>മധുര സാന്ത്വനം പാലട പായസം ചലഞ്ച് </h1>
            <h2 style={{color:"gray"}}>ഒക്ടോബർ 14</h2>
          </div>


    <div className="clubb-container">
      <div className="status-card">
        {/* Background Image */}
        <img src="/img/template1.jpg" alt="template" className="bg-template" />

{/* Top Text */}
        <div className="overlay-text top-text">www.santhwanamcare.com</div>

        {/* Content Overlay - Center */}
        <div className="card-content">
          <h2 className="org-name">{club.organization_name}</h2>
          <div className="big-number">{club.total_count}</div>
        </div>

        {/* Bottom Text */}
        <div className="overlay-text bottom-text">www.raihsoft.com</div>
      </div>



      {/* Download Button */}
      <button className="download-btn" onClick={handleDownload}>
        ⬇ Download
      </button>
    </div>
          {/* footer */}
          <section
            className="py-5 bg-dark text-white text-center wow fadeInUp"

          >
            <div className="container">
              <h2 className="display-5 fw-bold mb-3"></h2>
              <p className="mb-4">
                Every rupee makes a difference. Join our mission to ease suffering
                and bring peace to lives in need.
              </p>
              {/* <Link
                to="/Donate-for-pandikkad-santhwanam-palliative-care-society"
                className="btn btn-primary btn-lg px-4 py-2 rounded-pill"

              >
                Donate Now
              </Link> */}
              <p className="mt-4 text-white small">
                Powered by{" "}
                <a
                  href="https://raihsoft.com/"
                  className="text-white fw-semibold"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <u>raihsoft</u>
                </a>
              </p>
            </div>
          </section>
          {/* footer end */}
    </div>
  );
};

export default Statuscount;