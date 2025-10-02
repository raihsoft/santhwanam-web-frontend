import React from "react";
import { useEffect } from "react";
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';
import "./About.css";

const About = () => {

  useEffect(() => {
  AOS.init({
    duration: 1000, // animation duration in ms
    once: true,     // whether animation should happen only once
  });
}, []);

  const [loading, setLoading] = React.useState(true);
  
    React.useEffect(() => {
      const timer = setTimeout(() => setLoading(false), 150); // 1 second
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
      {/* Spinner Start */}
      {/* <div
        id="spinner"
        className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
      >
        <div className="spinner-grow text-primary m-1" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <div className="spinner-grow text-success m-1" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div> */}
      {/* Spinner End */}

      {/* Topbar Start */}
      <div className="container-fluid bg-light ps-5 pe-0 d-none d-lg-block">
        <div className="row gx-0">
          <div className="col-md-6 text-center text-lg-start mb-2 mb-lg-0">
            <div className="d-inline-flex align-items-center">
              <small className="py-2">
                <i className="bi bi-geo-alt-fill"></i> Churakkavu, Pandikkad, Malappuram, 676521
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
                  <i className="fa fa-phone-alt me-2"></i>+91 8281381390, 9846802196
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Topbar End */}

      {/* Navbar Start */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top px-3 px-md-5 py-2 py-lg-0">
        <a className="navbar-brand p-0" href="/">
          <img
            className="img-fluid"
            src="/img/santh.png"
            alt="Logo"
            style={{ maxHeight: "100px" }}
          />
        </a>

        {/* Toggle Button */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarCollapse"
          aria-controls="navbarCollapse"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
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
      {/* Navbar End */}

      {/* Full Screen Search Start */}
      <div className="modal fade" id="searchModal" tabIndex="-1">
        <div className="modal-dialog modal-fullscreen">
          <div
            className="modal-content"
            style={{ background: "rgba(9, 30, 62, .7)" }}
          >
            <div className="modal-header border-0">
              <button
                type="button"
                className="btn bg-white btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body d-flex align-items-center justify-content-center">
              <div className="input-group" style={{ maxWidth: "600px" }}>
                <input
                  type="text"
                  className="form-control bg-transparent border-primary p-3"
                  placeholder="Type search keyword"
                />
                <button className="btn btn-primary px-4">
                  <i className="bi bi-search"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Full Screen Search End */}

      {/* Hero Start */}
      <div className="container-fluid bg-primary py-5 hero-header mb-5" >
        <div className="row py-3">
          <div className="col-12 text-center">
            <h1 className="display-3 text-white animated zoomIn">About Us</h1>
          </div>
        </div>
      </div>
      {/* Hero End */}

      {/* About Start */}
      <div
        className="container-fluid py-5 wow fadeInUp"
        data-wow-delay="0.1s" 
      >
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-7 about-section-mobile" data-aos="fade-up" data-aos-delay="300">
              <div className="section-title ">
                <h5 className="position-relative d-inline-block text-primary text-uppercase">
                  About Us
                </h5>
                <h1 className="display-5 mb-0">
                  Together, We Can Make a Difference
                </h1>
              </div>
              <h4 className="text-body fst-italic mb-4">
                Empowering communities, one life at a time. Your support helps bring hope where it's needed most.
              </h4>
              <p className="mb-4">
                Santhwanam Palliative Care Society, Pandikkad, founded in 2002 by Dr. Firoz Khan (Chairman) and Ashraf Ibrahim Shah (Secretary), is a charitable trust providing compassionate care for patients with chronic and life-limiting illnesses. From a small rented clinic, it has grown into a full-fledged center offering home care, outpatient services, and community support, dedicated to bringing dignity and comfort to patients and families.
              </p>
              <div className="row g-3">
                <div className="col-sm-6 wow zoomIn" data-wow-delay="0.3s">
                  <h5 className="mb-3">
                    <i className="fa fa-check-circle text-primary me-3"></i>
                    100% Donation Policy
                  </h5>
                  <h5 className="mb-3">
                    <i className="fa fa-check-circle text-primary me-3"></i>
                    Trusted by Thousands
                  </h5>
                </div>
                <div className="col-sm-6 wow zoomIn" data-wow-delay="0.6s">
                  <h5 className="mb-3">
                    <i className="fa fa-check-circle text-primary me-3"></i>
                    Community Focused
                  </h5>
                  <h5 className="mb-3">
                    <i className="fa fa-check-circle text-primary me-3"></i>
                    Transparent Reporting
                  </h5>
                </div>
              </div>
              {/* <a href="donate.html" className="btn btn-primary py-3 px-5 mt-4 wow zoomIn" data-wow-delay="0.6s">Donate Now</a> */}
            </div>
            <div className="col-lg-5" style={{ minHeight: "500px" }}>
              <div className="position-relative h-100" data-aos="zoom-in" data-aos-delay="600">
                <img
                  className="position-absolute w-100 h-100 rounded wow zoomIn"
                  data-wow-delay="0.9s"
                  src="img/heath1.jpg"
                  style={{ objectFit: "cover" }}
                  alt="Donation image"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* About End */}

      {/* Newsletter Start */}
      {/* Newsletter End */}

      {/* Footer Start */}
      <section
        className="py-5 bg-dark text-white text-center wow fadeInUp"
        data-wow-delay="0.4s" data-aos="zoom-in" data-aos-delay="300"
      >
        <div className="container">
          <h2 className="display-5 fw-bold mb-3"></h2>
          <p className="mb-4">
            Every rupee makes a difference. Join our mission to ease suffering and bring peace to lives in need.
          </p>
          <Link to="/Donate-for-pandikkad-santhwanam-palliative-care-society" className="btn btn-primary btn-lg px-4 py-2 rounded-pill" data-aos="zoom-in" data-aos-delay="600">
            Donate Now
          </Link>
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
      {/* Footer End */}

      {/* Back to Top */}
      <a href="#" className="btn btn-lg btn-lg-square rounded back-to-top">
        <i className="bi bi-arrow-up" style={{ color: "aliceblue" }}></i>
      </a>
    </div>
  );
};

export default About;