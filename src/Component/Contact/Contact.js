import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { apiCall } from "../Api";
import "./Contact.css";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const [responseMsg, setResponseMsg] = useState("");
  const [loading, setLoading] = useState(true);

  // Spinner
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 150);
    return () => clearTimeout(timer);
  }, []);

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setResponseMsg("");
    try {
      const res = await apiCall.post("crm/contacts/", form);

      setResponseMsg(
        <div className="alert alert-success">✅ Message sent successfully!</div>
      );
      setForm({ name: "", email: "", phone: "", address: "" });
    } catch (error) {
      console.error("Contact API error:", error);
      setResponseMsg(
        <div className="alert alert-danger">❌ Something went wrong. Try again.</div>
      );
    }
  };

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
      {/* Topbar */}
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
                  <i className="fa fa-phone-alt me-2"></i>+91 8281381390, 9846802196
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
            src="img/santh.png"
            alt="Logo"
            style={{ maxHeight: "100px" }}
          />
        </a>
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
        <div className="collapse navbar-collapse" id="navbarCollapse">
          <div className="navbar-nav ms-auto py-0">
            <Link to="/" className="nav-item nav-link">
              Home
            </Link>
            <Link to="/about" className="nav-item nav-link">
              About
            </Link>
            <Link to="/Donate-for-pandikkad-santhwanam-palliative-care-society" className="nav-item nav-link">
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

      {/* Hero */}
      <div className="container-fluid bg-primary py-5 hero-header mb-5">
        <div className="row py-3">
          <div className="col-12 text-center">
            <h1 className="display-3 text-white animated zoomIn">Contact Us</h1>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="container-fluid py-5">
        <div className="container">
          <div className="row g-5">
            {/* Contact Info */}
            <div
              className="col-lg-6"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="bg-light rounded h-100 p-5">
                <div className="section-title">
                  <h5 className="position-relative d-inline-block text-primary text-uppercase">
                    Contact Us
                  </h5>
                  <h1 className="display-6 mb-4">Feel Free To Contact Us</h1>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <i className="bi bi-geo-alt fs-1 text-primary me-3"></i>
                  <div className="text-start">
                    <h5 className="mb-0">Our Office</h5>
                    <span>
                      Santhwanam palliative care, Churakkavu Pandikkad, 676521
                    </span>
                  </div>
                </div>
                <div className="d-flex align-items-center mb-3">
                  <i className="bi bi-envelope-open fs-1 text-primary me-3"></i>
                  <div className="text-start">
                    <h5 className="mb-0">Email Us</h5>
                    <span className="email">santhwanam@gmail.com</span>
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <i className="bi bi-phone-vibrate fs-1 text-primary me-3"></i>
                  <div className="text-start">
                    <h5 className="mb-0">Call Us</h5>
                    <span>+91 8281381390, 9846802196</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div
              className="col-lg-6"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="bg-light rounded h-100 p-5">
                <h5 className="text-primary text-uppercase mb-4">
                  Send Us a Message
                </h5>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="name" className="form-label">Your Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Enter your name"
                      required
                      value={form.name}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">Your Email</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter your email"
                      required
                      value={form.email}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="phone" className="form-label">Phone</label>
                    <input
                      type="text"
                      className="form-control"
                      id="phone"
                      placeholder="Enter your phone number"
                      required
                      value={form.phone}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="address" className="form-label">Address</label>
                    <input
                      type="text"
                      className="form-control"
                      id="address"
                      placeholder="Enter your address"
                      required
                      value={form.address}
                      onChange={handleChange}
                    />
                  </div>

                  <button type="submit" className="btn btn-primary w-100 py-2">
                    Send Message
                  </button>
                </form>
                <div id="formResponse" className="mt-3">{responseMsg}</div>
              </div>
            </div>

            {/* Google Map */}
            <div
              className="col-lg-12"
              data-aos="fade-up"
              data-aos-delay="600"
            >
              <iframe
                className="position-relative rounded w-100 h-100"
                src="//www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d213388.17356135492!2d76.060628228125!3d11.085080531241262!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba633000b7f9ad1%3A0xf90c100205a8d459!2sSanthvanam%20pain%20and%20palliative%20clinic!5e1!3m2!1sen!2sin!4v1744286151756!5m2!1sen!2sin"
                frameBorder="0"
                style={{ minHeight: "400px", border: 0 }}
                allowFullScreen=""
                aria-hidden="false"
                tabIndex="0"
                title="Santhwanam Location"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* Donate Section */}
      <section
        className="py-5 bg-dark text-white text-center"
        data-aos="fade-up"
        data-aos-delay="400"
      >
        <div className="container">
          <p className="mb-4">
            Every rupee makes a difference. Join our mission to ease suffering
            and bring peace to lives in need.
          </p>
          <Link
            to="/Donate-for-pandikkad-santhwanam-palliative-care-society"
            className="btn btn-primary btn-lg px-4 py-2 rounded-pill"
            data-aos="zoom-in"
            data-aos-delay="600"
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

      {/* Back to Top */}
      <a href="#" className="btn btn-lg btn-lg-square rounded back-to-top">
        <i className="bi bi-arrow-up" style={{ color: "aliceblue" }}></i>
      </a>
    </div>
  );
};

export default Contact;
