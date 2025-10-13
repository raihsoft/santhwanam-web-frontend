import React from "react";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";
import "./index.css";
import "./index1.css";

const Index = () => {
  const [loading, setLoading] = React.useState(true);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // Hide spinner after 1.5 seconds
    const timer = setTimeout(() => setLoading(false), 150);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    AOS.init({
      duration: 1000, // animation duration in ms
      once: true, // whether animation should happen only once
    });
  }, []);

  // Auto open popup after page load
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowPopup(true);
    }, 1000); // open popup after 1s
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div
        id="spinner"
        className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center"
      >
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
      {/* ✅ Popup Modal */}
      {/* {showPopup && (
  <div className="popup-overlay">
    <div
      className="popup-content"
      style={{ backgroundImage: "url(/img/popup.jpeg)" }}
    >
      <div className="popup-header">
        <button
          className="popup-close"
          onClick={() => setShowPopup(false)}
        >
          ✖
        </button>
      </div>

      <Link
        to="/Payasa-challenge-2025-orderform-pandikkad-palliative"
        className="btn btn-primary mt-3"
      >
        ORDER NOW!
      </Link>
    </div>
  </div>
)} */}

      {/* Spinner Start */}
      {/* <div id="spinner" className="show bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center">
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
                <i className="bi bi-geo-alt-fill"></i> Churakkavu, Pandikkad,
                Malappuram, 676521{" "}
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
                  <i className="fa fa-phone-alt me-2"></i>+91 8281381390,
                  9846802196
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
            src="img/santh.png"
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
      {/* Navbar End */}

      {/* <div className="banner-container">
      <img src="\img\challenge.jpg" alt="Support Our Cause" className="banner-image" />
      <button className="center-button"><Link to="/submitform">Order Now</Link></button>
    </div> */}

      {/* Rest of your page content */}

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

      {/* Carousel Start */}
      {/* <div className="container-fluid p-0">
        <div
          id="header-carousel"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active">
              <img
                className="w-100"
                src="img/WhatsApp Image 2025-04-08 at 5.11.18 PM.jpeg"
                alt="Image"
              />
              <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                <div className="p-3" style={{ maxWidth: "900px" }}>
                  <h1 className="display-1 text-white mb-md-4 animated zoomIn">
                    {" "}
                    DONATE FOR A NOBLE CAUSE
                  </h1>
                </div>
              </div>
            </div>
            <div className="carousel-item">
              <img className="w-100" src="img/carousel-2.jpg" alt="Image" />
              <div className="carousel-caption d-flex flex-column align-items-center justify-content-center">
                <div className="p-3" style={{ maxWidth: "900px" }}>
                  <h1 className="display-1 text-white mb-md-4 animated zoomIn">
                    Bringing Comfort, Compassion, and Care to Life{" "}
                  </h1>
                </div>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#header-carousel"
            data-bs-slide="prev"
          >
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#header-carousel"
            data-bs-slide="next"
          >
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div> */}
      {/* Carousel End */}

      <div className="container-fluid p-0">
        <div
          id="header-carousel"
          className="carousel slide carousel-fade"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            {/* First Slide */}
            <div className="carousel-item active">
              <img
                className="d-block w-100 img-fluid"
                src="/img/banner1.jpeg"
                alt="Charity Event"
                style={{ objectFit: "cover", maxHeight: "70vh" }}
              />
            </div>

            {/* Second Slide */}
            <div className="carousel-item">
              <img
                className="d-block w-100 img-fluid"
                src="/img/banner2.jpeg"
                alt="Helping Hands"
                style={{ objectFit: "cover", maxHeight: "70vh" }}
              />
            </div>
          </div>

          {/* Controls */}
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#header-carousel"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#header-carousel"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>

          {/* Order Now Button */}
          <div className="order-now-btn d-flex gap-3 position-absolute bottom-1 start-50 translate-middle-x mb-4">
            <a
              href="/Payasa-challenge-2025-orderform-pandikkad-palliative"
              className="order-btn-1"
            >
              Order Now
            </a>
            <a
              href="/Pandikkad-santhwanam-palliative-payasa-challenge-trending-now"
              className="order-btn"
            >
              Trending Now
            </a>
            <a
              href="/Pandikkad-santhwanam-palliative-payasa-challenge-delivery-status"
              className="delivery-btn"
            >
              Delivery Status
            </a>
          </div>
        </div>
      </div>

      {/* About Start */}
      <div className="container-fluid py-5 wow fadeInUp" data-wow-delay="0.1s">
        <div className="container">
          <div className="row g-5">
            <div className="col-lg-7">
              <div
                className="section-title mb-4 autoShow "
                data-aos="fade-up"
                data-aos-delay="600"
              >
                <h5 className="position-relative d-inline-block text-primary text-uppercase">
                  Who We Are
                </h5>
                <h1 className="display-5 mb-0">
                  Your Support Brings Peace to Those in Pain
                </h1>
              </div>
              <h4
                className="text-body fst-italic mb-4"
                data-aos="fade-up"
                data-aos-delay="600"
              >
                We offer comfort, dignity, and hope to patients facing
                life-limiting illnesses—with the help of people like you.
              </h4>
              <p className="mb-4" data-aos="fade-up" data-aos-delay="600">
                Our mission is to provide compassionate palliative care to those
                who need it most. With every donation, you help deliver
                essential services, emotional support, and relief to individuals
                and families during their most difficult moments.
              </p>
              <div className="row g-3">
                <div
                  className="col-sm-6 wow zoomIn"
                  data-wow-delay="0.3s"
                  data-aos="zoom-in"
                  data-aos-delay="600"
                >
                  <h5 className="mb-3">
                    <i className="fa fa-check-circle text-primary me-3"></i>Free
                    Patient Services
                  </h5>
                  <h5 className="mb-3">
                    <i className="fa fa-check-circle text-primary me-3"></i>
                    Trained Caregivers
                  </h5>
                </div>
                <div className="col-sm-6 wow zoomIn" data-wow-delay="0.6s">
                  <h5 className="mb-3">
                    <i className="fa fa-check-circle text-primary me-3"></i>
                    Emergency Support
                  </h5>
                  <h5 className="mb-3">
                    <i className="fa fa-check-circle text-primary me-3"></i>
                    Transparent Giving
                  </h5>
                </div>
              </div>
              <Link
                to="/Donate-for-pandikkad-santhwanam-palliative-care-society"
                className="btn btn-primary py-3 px-5 mt-4 wow zoomIn"
                style={{ color: "aliceblue" }}
                data-wow-delay="0.6s"
                data-aos="zoom-in"
              >
                Support Our Work
              </Link>
            </div>
            <div className="col-lg-5" style={{ minHeight: "500px" }}>
              <div className="position-relative h-100">
                <img
                  className="position-absolute w-100 h-100 rounded wow zoomIn imageReveal"
                  data-aos="zoom-in"
                  data-aos-delay="900"
                  data-wow-delay="0.9s"
                  src="img/chivalry.jpeg"
                  style={{ objectFit: "cover" }}
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* About End */}

      {/* vision mission */}
      <section className="vision-mission-section py-5">
        <div className="container" data-aos="fade-up" data-aos-delay="700">
          <div className="text-center mb-5">
            <h5 className="text-primary text-uppercase fw-semibold">
              Our Philosophy
            </h5>
            <p className="text-muted">
              Guided by purpose, driven by compassion.
            </p>
          </div>
          <div className="row g-4 align-items-stretch">
            {/* Vision */}
            <div className="col-md-6">
              <div className="glass-card h-100 p-4 text-center">
                <div className="icon-wrap mb-3">
                  <i className="fa fa-eye"></i>
                </div>
                <h4 className="fw-bold">Our Vision</h4>
                <p className="fst-italic text-muted mt-2">
                  “To build a compassionate society where quality palliative
                  care is accessible to all, ensuring that no one suffers alone,
                  and every patient lives with dignity, comfort, and hope until
                  the very end.”
                </p>
              </div>
            </div>
            {/* Mission */}
            <div className="col-md-6">
              <div className="glass-card h-100 p-4 text-center">
                <div className="icon-wrap mb-3">
                  <i className="fa fa-bullseye"></i>
                </div>
                <h4 className="fw-bold">Our Mission</h4>
                <p className="fst-italic text-muted mt-2">
                  “To provide compassionate, holistic, and community-based
                  palliative care that brings dignity, comfort, and relief to
                  patients with chronic and life-limiting illnesses, while
                  extending emotional and social support to their families.”
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* vision mission end */}

      {/* Our Services Section */}
      <section
        className="py-5 bg-light wow fadeInUp"
        data-wow-delay="0.1s"
        data-aos="fade-up"
        data-aos-delay="800"
      >
        <div className="container">
          <div className="text-center mb-5">
            <h5 className="text-primary text-uppercase fw-semibold">
              Our Services
            </h5>
            <h2 className="display-6 fw-bold">
              We Provide Hope and Healing Through Compassionate Support
            </h2>
            <p className="text-muted mx-auto" style={{ maxWidth: "700px" }}>
              With your generous donations, we deliver essential services to
              those facing pain, illness, and end-of-life care. Every gift
              brings comfort and care.
            </p>
          </div>
          <div className="row g-4">
            <div
              className="col-md-6 col-lg-3 wow zoomIn"
              data-wow-delay="0.6s"
              data-aos="zoom-in"
              data-aos-delay="1000"
            >
              <div className="card border-0 shadow-sm h-100 text-center rounded-4 p-3 service-card">
                <img
                  src="/img/service2.jpeg"
                  className="card-img-top rounded-4"
                  alt="Home Care"
                  style={{ height: "180px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title fw-semibold">Home Care</h5>
                  <p className="text-muted small">
                    Personalized care delivered to homes for patients with
                    mobility challenges.
                  </p>
                </div>
              </div>
            </div>
            {/* Service Card */}
            <div
              className="col-md-6 col-lg-3 wow zoomIn"
              data-wow-delay="0.4s"
              data-aos="zoom-in"
              data-aos-delay="800"
            >
              <div className="card border-0 shadow-sm h-100 text-center rounded-4 p-3 service-card">
                <img
                  src="/img/service4.jpeg"
                  className="card-img-top rounded-4"
                  alt="Medicine"
                  style={{ height: "180px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title fw-semibold">Medical Support</h5>
                  <p className="text-muted small">
                    Providing essential medicines, equipment, and clinical care
                    at no cost.
                  </p>
                </div>
              </div>
            </div>
            {/* Service Card */}
            <div
              className="col-md-6 col-lg-3 wow zoomIn"
              data-wow-delay="0.2s"
              data-aos="zoom-in"
              data-aos-delay="1100"
            >
              <div className="card border-0 shadow-sm h-100 text-center rounded-4 p-3 service-card">
                <img
                  src="/img/service3.jpeg"
                  className="card-img-top rounded-4"
                  alt="Food Support"
                  style={{ height: "180px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title fw-semibold">Volunteer Training</h5>
                  <p className="text-muted small">
                    Educating community members to provide compassionate care.
                  </p>
                </div>
              </div>
            </div>
            {/* Service Card */}
            <div
              className="col-md-6 col-lg-3 wow zoomIn"
              data-wow-delay="0.8s"
              data-aos="zoom-in"
              data-aos-delay="900"
            >
              <div className="card border-0 shadow-sm h-100 text-center rounded-4 p-3 service-card">
                <img
                  src="/img/service1.jpeg"
                  className="card-img-top rounded-4"
                  alt="Emotional Support"
                  style={{ height: "180px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title fw-semibold">Emotional Support</h5>
                  <p className="text-muted small">
                    Counseling, prayer, and compassionate listening for mental
                    and spiritual strength.
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* Donation CTA */}
          <div className="text-center mt-5">
            <Link
              to="/Donate-for-pandikkad-santhwanam-palliative-care-society"
              className="btn btn-primary btn-lg px-5 py-3 rounded-pill shadow-sm wow zoomIn"
              style={{ color: "aliceblue" }}
              data-wow-delay="1s"
            >
              Make a Donation
            </Link>
          </div>
        </div>
      </section>

      {/* Why Your Donation Matters */}
      <section
        className="py-5 bg-white wow fadeInUp"
        data-wow-delay="0.2s"
        data-aos="fade-up"
        data-aos-delay="800"
      >
        <div className="container text-center">
          <h5 className="text-primary text-uppercase fw-semibold">
            Why Your Donation Matters
          </h5>
          <h2 className="display-6 fw-bold mb-4">
            Together, We Bring Comfort to the Most Vulnerable
          </h2>
          <p className="text-muted mx-auto mb-5" style={{ maxWidth: "750px" }}>
            Every donation helps someone receive vital palliative care, easing
            pain and bringing peace in life’s most challenging moments. Your
            compassion can light the darkest days.
          </p>
          <div className="row g-4">
            <div className="col-md-4">
              <div className="p-4 border rounded shadow-sm h-100">
                <i className="fa fa-heart text-primary fs-2 mb-3"></i>
                <h5 className="fw-bold">Compassion in Action</h5>
                <p className="text-muted small">
                  Your support funds hands-on care, emotional support, and
                  essential needs for patients.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 border rounded shadow-sm h-100">
                <i className="fa fa-hands-helping text-primary fs-2 mb-3"></i>
                <h5 className="fw-bold">Transparent Giving</h5>
                <p className="text-muted small">
                  We ensure every donation reaches those in need through clear,
                  honest reporting.
                </p>
              </div>
            </div>
            <div className="col-md-4">
              <div className="p-4 border rounded shadow-sm h-100">
                <i className="fa fa-globe text-primary fs-2 mb-3"></i>
                <h5 className="fw-bold">Community Impact</h5>
                <p className="text-muted small">
                  You help build a kinder world, one act of care at a time. Join
                  our growing mission.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real Stories */}
      {/* <section
        className="py-5 bg-light wow fadeInUp"
        data-wow-delay="0.3s"
        data-aos="fade-up"
        data-aos-delay="800"
      >
        <div className="container text-center">
          <h5 className="text-primary text-uppercase fw-semibold">
            Real Stories
          </h5>
          <h2 className="display-6 fw-bold mb-4">
            Lives Touched By Your Kindness
          </h2>
          <div className="row g-4">
            <div className="col-md-6">
              <div className="p-4 bg-white rounded shadow-sm h-100">
                <p className="fst-italic">
                  “Thanks to your donations, my mother received the care and
                  dignity she deserved in her final days. We will forever be
                  grateful.”
                </p>
                <h6 className="mt-3 fw-semibold">
                  – Asha M., Care Recipient’s Daughter
                </h6>
              </div>
            </div>
            <div className="col-md-6">
              <div className="p-4 bg-white rounded shadow-sm h-100">
                <p className="fst-italic">
                  “Donating was the best decision I made. Seeing how even a
                  small gift brought real help made me want to do more.”
                </p>
                <h6 className="mt-3 fw-semibold">– Rajan V., Monthly Donor</h6>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* Gallery */}
      <section
        className="py-5 bg-light wow fadeInUp"
        data-wow-delay="0.2s"
        data-aos="fade-up"
        data-aos-delay="800"
      >
        <div className="container">
          <div className="text-center mb-5">
            <h5 className="text-primary text-uppercase fw-semibold">Gallery</h5>
            <h2 className="display-6 fw-bold">Moments of Hope & Compassion</h2>
            <p className="text-muted">
              Captured moments from our journey of care, service, and healing.
            </p>
          </div>
          <div className="row g-4">
            <div className="col-sm-6 col-md-4">
              <div className="gallery-item rounded overflow-hidden shadow-sm position-relative">
                <img
                  src="img/gallery1.jpeg"
                  className="img-fluid w-100 h-100"
                  style={{ objectFit: "cover" }}
                  alt="inaguration image-1"
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-4">
              <div className="gallery-item rounded overflow-hidden shadow-sm position-relative">
                <img
                  src="img/gallery5.jpeg"
                  className="img-fluid w-100 h-100"
                  style={{ objectFit: "cover" }}
                  alt="volunteer training-1"
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-4">
              <div className="gallery-item rounded overflow-hidden shadow-sm position-relative">
                <img
                  src="img/gallery8.jpeg"
                  className="img-fluid w-100 h-100"
                  style={{ objectFit: "cover" }}
                  alt="volunteer training-2"
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-4">
              <div className="gallery-item rounded overflow-hidden shadow-sm position-relative">
                <img
                  src="img/gallery9.jpeg"
                  className="img-fluid w-100 h-100"
                  style={{ objectFit: "cover" }}
                  alt="palliative office"
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-4">
              <div className="gallery-item rounded overflow-hidden shadow-sm position-relative">
                <img
                  src="img/gallery11.jpeg"
                  className="img-fluid w-100 h-100"
                  style={{ objectFit: "cover" }}
                  alt="volunteer training-3"
                />
              </div>
            </div>
            <div className="col-sm-6 col-md-4">
              <div className="gallery-item rounded overflow-hidden shadow-sm position-relative">
                <img
                  src="img/gallery16.jpeg"
                  className="img-fluid w-100 h-100"
                  style={{ objectFit: "cover" }}
                  alt="Volunteer training-4"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="text-center mt-5">
          <Link
            to="/gallery"
            className="btn btn-primary btn-lg px-5 py-3 rounded-pill shadow-sm wow zoomIn"
            style={{ color: "aliceblue" }}
            data-wow-delay="1s"
            data-aos="zoom-in"
            data-aos-delay="1000"
          >
            View All
          </Link>
        </div>
      </section>

      {/* Get Involved */}
      <section
        className="py-5 wow fadeInUp"
        data-wow-delay="0.3s"
        data-aos="fade-up"
        data-aos-delay="800"
      >
        <div className="container">
          <div className="text-center mb-5">
            <h5 className="text-primary text-uppercase fw-semibold">
              Get Involved
            </h5>
            <h2 className="display-6 fw-bold">How You Can Help</h2>
            <p className="text-muted">
              Your compassion can bring comfort, care, and hope to those in
              need. Here’s how you can be a part of our mission.
            </p>
          </div>
          <div className="row g-4">
            {/* Donate */}
            <div className="col-md-4 text-center">
              <div className="bg-light p-4 rounded shadow-sm h-100">
                <div className="mb-3">
                  <i className="fa fa-hand-holding-heart fa-3x text-primary"></i>
                </div>
                <h5 className="fw-bold mb-2">Make a Donation</h5>
                <p className="text-muted">
                  Every contribution helps provide medical care, food, and
                  emotional support to patients and their families.
                </p>
              </div>
            </div>
            {/* Volunteer */}
            <div className="col-md-4 text-center">
              <div className="bg-light p-4 rounded shadow-sm h-100">
                <div className="mb-3">
                  <i className="fa fa-users fa-3x text-primary"></i>
                </div>
                <h5 className="fw-bold mb-2">Become a Volunteer</h5>
                <p className="text-muted">
                  Join our team and make a direct impact by offering your time,
                  skills, and care to those in need.
                </p>
              </div>
            </div>
            {/* Spread the Word */}
            <div className="col-md-4 text-center">
              <div className="bg-light p-4 rounded shadow-sm h-100">
                <div className="mb-3">
                  <i className="fa fa-share-alt fa-3x text-primary"></i>
                </div>
                <h5 className="fw-bold mb-2">Spread Awareness</h5>
                <p className="text-muted">
                  Share our story, support our mission on social media, and help
                  more people understand palliative care.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Milestones Section - Ultra Advanced */}
      <section className="wow-milestones py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <h5 className="text-primary text-uppercase fw-semibold">
              Our Milestones
            </h5>
            <h2 className="display-6 fw-bold">Journey Through the Years</h2>
            <p className="text-muted mx-auto" style={{ maxWidth: "700px" }}>
              From our humble beginnings to today, every year marks a milestone
              in providing compassionate care.
            </p>
          </div>

          <div className="timeline-wow position-relative">
            {[
              {
                year: "2002",
                desc: "Founded by Dr. Firoz Khan & Ashraf Ibrahim Shah; first clinic inaugurated.",
                icon: "🏥",
              },
              {
                year: "2008",
                desc: "Registered as Pain and Palliative Care Trust, strengthening services.",
                icon: "📜",
              },
              {
                year: "2009",
                desc: "First ambulance purchased, expanding home-care services.",
                icon: "🚑",
              },
              {
                year: "2012",
                desc: "Trust expanded with new members, governance strengthened.",
                icon: "👥",
              },
              {
                year: "2016",
                desc: "Land purchased for a permanent center at Choorakkavu.",
                icon: "🌿",
              },
              {
                year: "2017",
                desc: "Foundation stone laid, construction began with community help.",
                icon: "🏗️",
              },
              {
                year: "2019",
                desc: "Trust building inaugurated; gained permanent headquarters.",
                icon: "🏢",
              },
              {
                year: "2020",
                desc: "Provided vital care during COVID-19 pandemic.",
                icon: "🦠",
              },
              {
                year: "2024",
                desc: "New ambulance purchased after 15 years of service.",
                icon: "🚑",
              },
              {
                year: "2025",
                desc: "Expanded services including home care, psychiatry, physiotherapy, dialysis, outpatient support.",
                icon: "✨",
              },
            ].map((m, index) => (
              <div
                key={index}
                className={`timeline-card-wow ${
                  index % 2 === 0 ? "left" : "right"
                }`}
                data-aos="fade-up"
                data-aos-delay={index * 150}
              >
                <div className="timeline-dot-wow">{m.icon}</div>
                <div className="timeline-content-wow p-4 shadow-lg rounded bg-white">
                  <h5 className="fw-bold text-primary mb-2">{m.year}</h5>
                  <p className="text-muted mb-0">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section
        className="py-5 bg-white wow fadeInUp"
        data-wow-delay="0.2s"
        data-aos="fade-up"
        data-aos-delay="800"
      >
        <div className="container text-center">
          <h5 className="text-primary text-uppercase fw-semibold">
            How It Works
          </h5>
          <h2 className="display-6 fw-bold mb-5">Your Gift Goes a Long Way</h2>
          <div className="row g-4">
            <div className="col-md-3">
              <div className="p-4 border rounded shadow-sm h-100">
                <i className="fa fa-hand-holding-heart fs-1 text-primary mb-3"></i>
                <h6 className="fw-semibold">Step 1</h6>
                <p className="text-muted small">
                  You choose to give – a one-time or recurring donation.
                </p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="p-4 border rounded shadow-sm h-100">
                <i className="fa fa-people-carry fs-1 text-primary mb-3"></i>
                <h6 className="fw-semibold">Step 2</h6>
                <p className="text-muted small">
                  Our volunteers and caregivers deploy resources.
                </p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="p-4 border rounded shadow-sm h-100">
                <i className="fa fa-user-injured fs-1 text-primary mb-3"></i>
                <h6 className="fw-semibold">Step 3</h6>
                <p className="text-muted small">
                  Patients and families receive palliative care, food, and love.
                </p>
              </div>
            </div>
            <div className="col-md-3">
              <div className="p-4 border rounded shadow-sm h-100">
                <i className="fa fa-seedling fs-1 text-primary mb-3"></i>
                <h6 className="fw-semibold">Step 4</h6>
                <p className="text-muted small">
                  You get updates and feel the impact you helped create.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* footer */}
      <section
        className="py-5 bg-dark text-white text-center wow fadeInUp"
        data-wow-delay="0.4s"
        data-aos="zoom-in"
        data-aos-delay="800"
      >
        <div className="container">
          <h2 className="display-5 fw-bold mb-3"></h2>
          <p className="mb-4">
            Every rupee makes a difference. Join our mission to ease suffering
            and bring peace to lives in need.
          </p>
          <Link
            to="/Donate-for-pandikkad-santhwanam-palliative-care-society"
            className="btn btn-primary btn-lg px-4 py-2 rounded-pill"
            data-aos="zoom-in"
            data-aos-delay="900"
          >
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
      {/* footer end */}
    </div>
  );
};

export default Index;
