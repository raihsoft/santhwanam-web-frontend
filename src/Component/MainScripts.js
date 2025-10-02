import { useEffect, useState } from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import DatePicker from "react-datepicker";
import ReactCompareImage from "react-compare-image";

const MainScripts = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [date, setDate] = useState(new Date());
  const [time, setTime] = useState(new Date());

  // Sticky navbar + back-to-top
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 40);
      setShowBackToTop(window.scrollY > 100);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Dropdown hover
  const [isDesktop, setIsDesktop] = useState(window.innerWidth >= 992);
  useEffect(() => {
    const handleResize = () => setIsDesktop(window.innerWidth >= 992);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Carousel settings
  const priceSettings = {
    autoplay: true,
    speed: 1500,
    arrows: true,
    dots: false,
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [{ breakpoint: 768, settings: { slidesToShow: 1 } }],
  };

  const testimonialSettings = {
    autoplay: true,
    speed: 1000,
    arrows: true,
    dots: false,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <>
      {/* Navbar */}
      <nav className={`navbar ${isSticky ? "sticky-top" : ""}`}>
        <div className="container">
          <a className="navbar-brand" href="/">MySite</a>
          <ul className="nav">
            <li className={`dropdown nav-item ${isDesktop ? "hover-enabled" : ""}`}>
              <a href="/" className="nav-link dropdown-toggle">Menu</a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="/">Item 1</a></li>
                <li><a className="dropdown-item" href="/">Item 2</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </nav>

      {/* Hero Section (Framer Motion replaces WOW.js) */}
      <motion.section
        className="hero text-center py-5"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <h1>Welcome</h1>
        <p>Scroll animations with Framer Motion 🎉</p>
      </motion.section>

      {/* Date & Time Picker */}
      <section className="container py-5">
        <h2>Date & Time Picker</h2>
        <div className="d-flex gap-3">
          <DatePicker
            selected={date}
            onChange={(d) => setDate(d)}
            dateFormat="P"
            className="form-control"
          />
          <DatePicker
            selected={time}
            onChange={(t) => setTime(t)}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={15}
            timeCaption="Time"
            dateFormat="h:mm aa"
            className="form-control"
          />
        </div>
      </section>

      {/* Image Comparison (ReactCompareImage replaces twentytwenty) */}
      <section className="container py-5">
        <h2>Image Comparison</h2>
        <ReactCompareImage
          leftImage="https://via.placeholder.com/400x200?text=Before"
          rightImage="https://via.placeholder.com/400x200?text=After"
        />
      </section>

      {/* Price Carousel */}
      <section className="price-carousel container py-5">
        <h2>Pricing</h2>
        <Slider {...priceSettings}>
          <div className="p-4 bg-light rounded shadow">Plan A</div>
          <div className="p-4 bg-light rounded shadow">Plan B</div>
          <div className="p-4 bg-light rounded shadow">Plan C</div>
        </Slider>
      </section>

      {/* Testimonial Carousel */}
      <section className="testimonial-carousel container py-5">
        <h2>Testimonials</h2>
        <Slider {...testimonialSettings}>
          <div className="p-4 bg-light rounded shadow">
            <p>"This service is awesome!"</p>
          </div>
          <div className="p-4 bg-light rounded shadow">
            <p>"I loved working with this team."</p>
          </div>
        </Slider>
      </section>

      {/* Back To Top */}
      {showBackToTop && (
        <button
          className="back-to-top btn btn-dark position-fixed"
          style={{ bottom: "20px", right: "20px" }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          ↑
        </button>
      )}
    </>
  );
};

export default MainScripts;
