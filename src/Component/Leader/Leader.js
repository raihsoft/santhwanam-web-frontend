import React from "react";
import { Link } from 'react-router-dom';
import { useEffect } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import "./Leader.css";

const Leader = () => {  
    
    const [loading, setLoading] = React.useState(true);
      
        React.useEffect(() => {
          const timer = setTimeout(() => setLoading(false), 150); // 1 second
          return () => clearTimeout(timer);
        }, []);
    
        useEffect(() => {
  AOS.init({
    duration: 1000, // animation duration in ms
    once: true,     // whether animation should happen only once
  });
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
    {/* Topbar End */}

    {/* Navbar Start */}
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top px-3 px-md-5 py-2 py-lg-0">
        <a className="navbar-brand p-0" href="/">
            <img className="img-fluid" src="img/santh.png" alt="Logo" style={{maxHeight: "100px"}} />
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
    {/* Navbar End */}

    {/* Full Screen Search Start */}
    <div className="modal fade" id="searchModal" tabIndex="-1">
        <div className="modal-dialog modal-fullscreen">
            <div className="modal-content" style={{background: "rgba(9, 30, 62, .7)"}}>
                <div className="modal-header border-0">
                    <button type="button" className="btn bg-white btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div className="modal-body d-flex align-items-center justify-content-center">
                    <div className="input-group" style={{maxWidth: "600px"}}>
                        <input type="text" className="form-control bg-transparent border-primary p-3" placeholder="Type search keyword"/>
                        <button className="btn btn-primary px-4"><i className="bi bi-search"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    {/* Full Screen Search End */}

    {/* Hero Start */}
    <div className="container-fluid bg-primary py-5 hero-header mb-5">
        <div className="row py-3">
            <div className="col-12 text-center">
                <h1 className="display-3 text-white animated zoomIn">Guiding Hearts</h1>
            </div>
        </div>
    </div>

<section className="container py-5">

  {/* Top Leaders (Large Size) */}
  <div className="row g-4 justify-content-center mb-4">
      {/* President */}
      <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.2s" data-aos="fade-up" data-aos-delay="200">
          <div className="team-card border-0 shadow-sm rounded overflow-hidden">
              <div className="team-img-container" style={{height: "350px"}}>
                  <img src="img/President.jpeg" alt="President" className="img-fluid team-img " style={{objectFit: "cover"}}/>
              </div>
              <div className="p-4 text-center bg-light">
                  <h4 className="fw-bold mb-1">Firoskhan</h4>
                  <p className="text-primary mb-0">President</p>
              </div>
          </div>
      </div>

      {/* General Secretary */}
      <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s" data-aos="fade-up" data-aos-delay="400">
          <div className="team-card border-0 shadow-sm rounded overflow-hidden">
              <div className="team-img-container" style={{height: "350px"}}>
                  <img src="img/General Secretary.jpeg" alt="General Secretary" className="img-fluid team-img " style={{objectFit: "cover"}}/>
              </div>
              <div className="p-4 text-center bg-light">
                  <h4 className="fw-bold mb-1">Ummar AT</h4>
                  <p className="text-primary mb-0">General Secretary</p>
              </div>
          </div>
      </div>

      {/* Treasurer */}
      <div className="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.4s" data-aos="fade-up" data-aos-delay="600">
          <div className="team-card border-0 shadow-sm rounded overflow-hidden">
              <div className="team-img-container" style={{height: "350px"}}>
                  <img src="img/Treasurer.jpeg" alt="Treasurer" className="img-fluid team-img " style={{objectFit: "cover"}}/>
              </div>
              <div className="p-4 text-center bg-light">
                  <h4 className="fw-bold mb-1">Ashraf Ibrahim Shah E</h4>
                  <p className="text-primary mb-0">Treasurer</p>
              </div>
          </div>
      </div>
  </div>

  {/* Other Leaders (Smaller Size) */}
  <div className="row other-leaders g-4 justify-content-center">

    <div className="col-sm-6 col-lg-3 wow fadeInUp" data-wow-delay="0.3s" data-aos="fade-up" data-aos-delay="300">
        <div className="team-card border-0 shadow-sm rounded overflow-hidden">
            <div className="team-img-container" style={{height: "250px"}}>
                <img src="img/Vice President.jpeg" alt="Vice President" className="img-fluid team-img h-100 w-100" style={{objectFit: "cover"}}/>
            </div>
            <div className="p-3 text-center bg-light">
                <h5 className="fw-bold mb-1">Jayarajan MP</h5>
                <p className="text-primary small mb-0">Vice President</p>
            </div>
        </div>
    </div>

    <div className="col-sm-6 col-lg-3 wow fadeInUp" data-wow-delay="0.5s" data-aos="fade-up" data-aos-delay="500">
        <div className="team-card border-0 shadow-sm rounded overflow-hidden">
            <div className="team-img-container" style={{height: "250px"}}>
                <img src="img/Vice President3.jpeg" alt="Vice President" className="img-fluid team-img h-100 w-100" style={{objectFit: "cover"}}/>
            </div>
            <div className="p-3 text-center bg-light">
                <h5 className="fw-bold mb-1">Asya Teacher</h5>
                <p className="text-primary small mb-0">Vice President</p>
            </div>
        </div>
    </div>
      {/* Vice Presidents */}
      <div className="col-sm-6 col-lg-3 wow fadeInUp" data-wow-delay="0.2s" data-aos="fade-up" data-aos-delay="200">
          <div className="team-card border-0 shadow-sm rounded overflow-hidden">
              <div className="team-img-container" style={{height: "250px"}}>
                  <img src="img/Vice President1.jpeg" alt="Vice President" className="img-fluid team-img h-100 w-100" style={{objectFit: "cover"}}/>
              </div>
              <div className="p-3 text-center bg-light">
                  <h5 className="fw-bold mb-1">Gopinathan</h5>
                  <p className="text-primary small mb-0">Vice President</p>
              </div>
          </div>
      </div>

      <div className="col-sm-6 col-lg-3 wow fadeInUp" data-wow-delay="0.4s" data-aos="fade-up" data-aos-delay="400">
          <div className="team-card border-0 shadow-sm rounded overflow-hidden">
              <div className="team-img-container" style={{height: "250px"}}>
                  <img src="img/Vice President4.jpeg" alt="Vice President" className="img-fluid team-img h-100 w-100" style={{objectFit: "cover"}}/>
              </div>
              <div className="p-3 text-center bg-light">
                  <h5 className="fw-bold mb-1">Habeeb VTS</h5>
                  <p className="text-primary small mb-0">Vice President</p>
              </div>
          </div>
      </div>

      {/* Joint Secretaries */}
      <div className="col-sm-6 col-lg-3 wow fadeInUp" data-wow-delay="0.2s" data-aos="fade-up" data-aos-delay="200">
          <div className="team-card border-0 shadow-sm rounded overflow-hidden">
              <div className="team-img-container" style={{height: "250px"}}>
                  <img src="img/Joint Secretery3.jpeg" alt="Joint Secretary" className="img-fluid team-img h-100 w-100" style={{objectFit: "cover"}}/>
              </div>
              <div className="p-3 text-center bg-light">
                  <h5 className="fw-bold mb-1">Naushad Babu M</h5>
                  <p className="text-primary small mb-0">Joint Secretary</p>
              </div>
          </div>
      </div>

      <div className="col-sm-6 col-lg-3 wow fadeInUp" data-wow-delay="0.3s" data-aos="fade-up" data-aos-delay="300">
          <div className="team-card border-0 shadow-sm rounded overflow-hidden">
              <div className="team-img-container" style={{height: "250px"}}>
                  <img src="img/Joint Secretery.jpeg" alt="Joint Secretary" className="img-fluid team-img h-100 w-100" style={{objectFit: "cover"}}/>
              </div>
              <div className="p-3 text-center bg-light">
                  <h5 className="fw-bold mb-1">Shibu VP</h5>
                  <p className="text-primary small mb-0">Joint Secretary</p>
              </div>
          </div>
      </div>

      <div className="col-sm-6 col-lg-3 wow fadeInUp" data-wow-delay="0.4s" data-aos="fade-up" data-aos-delay="400">
          <div className="team-card border-0 shadow-sm rounded overflow-hidden">
              <div className="team-img-container" style={{height: "250px"}}>
                  <img src="img/Joint Secretery1.jpeg" alt="Joint Secretary" className="img-fluid team-img h-100 w-100" style={{objectFit: "cover"}}/>
              </div>
              <div className="p-3 text-center bg-light">
                  <h5 className="fw-bold mb-1">Abdul Rasheed PT</h5>
                  <p className="text-primary small mb-0">Joint Secretary</p>
              </div>
          </div>
      </div>

      <div className="col-sm-6 col-lg-3 wow fadeInUp" data-wow-delay="0.5s" data-aos="fade-up" data-aos-delay="500">
          <div className="team-card border-0 shadow-sm rounded overflow-hidden">
              <div className="team-img-container" style={{height: "250px"}}>
                  <img src="img/Joint Secretery2.jpeg" alt="Joint Secretary" className="img-fluid team-img h-100 w-100" style={{objectFit: "cover"}}/>
              </div>
              <div className="p-3 text-center bg-light">
                  <h5 className="fw-bold mb-1">Anvar Sadhiq NV</h5>
                  <p className="text-primary small mb-0">Joint Secretary</p>
              </div>
          </div>
      </div>

      <div className="col-sm-6 col-lg-3 wow fadeInUp" data-wow-delay="0.6s" data-aos="fade-up" data-aos-delay="600">
          <div className="team-card border-0 shadow-sm rounded overflow-hidden">
              <div className="team-img-container" style={{height: "250px"}}>
                  <img src="img/Joint Secretery5.jpeg" alt="Joint Secretary" className="img-fluid team-img h-100 w-100" style={{objectFit: "cover"}}/>
              </div>
              <div className="p-3 text-center bg-light">
                  <h5 className="fw-bold mb-1">Gopakumar K</h5>
                  <p className="text-primary small mb-0">Joint Secretary</p>
              </div>
          </div>
      </div>
  </div>
</section>
{/* Leaders Gallery End */}

    <section className="py-5 bg-dark text-white text-center wow fadeInUp" data-wow-delay="0.4s" data-aos="fade-up" data-aos-delay="400">
        <div className="container">
            <h2 className="display-5 fw-bold mb-3"></h2>
          <p className="mb-4">Every rupee makes a difference. Join our mission to ease suffering and bring peace to lives in need.</p>
          <Link to="/Donate-for-pandikkad-santhwanam-palliative-care-society" className="btn btn-primary btn-lg px-4 py-2 rounded-pill" data-aos="zoom-in" data-aos-delay="600">Donate Now</Link>
          <p className="mt-4 text-white small">
            Powered by <a href="https://raihsoft.com/" className="text-white fw-semibold" target="_blank" rel="noopener noreferrer"><u>raihsoft</u></a>
          </p>
        </div>
      </section>

    {/* Back to Top */}
    <a href="#" className="btn btn-lg btn-lg-square rounded back-to-top"><i className="bi bi-arrow-up " style={{color: "aliceblue"}}></i></a>
    </div>
  );

};

export default Leader;