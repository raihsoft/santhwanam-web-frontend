import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Trandingpage.css";
import { apiCall } from "../Api";

const COUNT_ENDPOINT = "order/organizations/";

const Trandingpage = () => {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchClubs();

    // 🔄 Auto reload every 30 sec
    const interval = setInterval(() => {
      fetchClubs();
    }, 30000);

    // cleanup interval when component unmounts
    return () => clearInterval(interval);
  }, []);

  const fetchAllPages = async (endpoint) => {
    let url = endpoint;
    const all = [];
    while (url) {
      const data = await apiCall.get(url);
      if (Array.isArray(data.results)) {
        all.push(...data.results);
        url = data.next
          ? data.next.replace(/^https?:\/\/[^/]+\/api\/v1\//, "")
          : null;
      } else if (Array.isArray(data)) {
        all.push(...data);
        url = null;
      } else {
        all.push(data);
        url = null;
      }
    }
    return all;
  };

  const fetchClubs = async () => {
    setLoading(true);
    setError(null);
    try {
      const arrayData = await fetchAllPages(COUNT_ENDPOINT);

      const cleaned = arrayData
        .map((item) => ({
          organization_name:(
            item.organization_name ||
              item.organization?.organization_name ||
              item.name ||
              "Unknown"
          ),
          total_count: Number(item.total_count) || 0,
        }))
        .filter(
          (club) =>
            club.organization_name &&
            club.organization_name.toLowerCase() !== "unknown" &&
            club.total_count > 0
        )
        .sort((a, b) => b.total_count - a.total_count);

      setClubs(cleaned.slice(0, 50));
    } catch (err) {
      console.error("❌ Error fetching clubs:", err);
      setError(err.message || "Failed to load data.");
      setClubs([]);
    } finally {
      setLoading(false);
    }
  };

  const topThree = clubs.slice(0, 3);
  const others = clubs.slice(3);

  const getMedalEmoji = (rank) => {
    if (rank === 1) return "🥇";
    if (rank === 2) return "🥈";
    if (rank === 3) return "🥉";
    return "";
  };


  const totalCount = clubs.reduce((sum, club) => sum + club.total_count, 0);

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

      {/* Leaderboard */}

    {loading && (
  <div className="loading-overlay">
    <div className="spinner"></div>
  </div>
)}

      <div className="leaderboard-container">
        <h2 className="leaderboard-subtitle">
          <p style={{display:"flex"}}>Together we achieved</p>
          <div className="spacer-1">
          <p
            style={{
              fontSize: "5rem",
              fontWeight: "600",
              color: "#FcD700",
              marginBottom: "0",
            }}
          >
            {totalCount}
          </p>
          <p style={{ fontSize: "25px", marginTop:"50px",marginLeft:"10px"}}>LTR</p>
          </div>
        </h2>
        <h1 className="leaderboard-title">Top Challengers</h1>

        {loading && <p>Loading...</p>}
        {error && <p className="error">{error}</p>}

        {/* Top 3 */}
        <div className="top-three">
          {topThree.map((club, index) => (
            <div key={index} className={`top-card rank-${index + 1}`}>
              <div className="medal">{getMedalEmoji(index + 1)}</div>
              <h2>{club.organization_name}</h2>
              <p className="amount">
                {club.total_count}{" "}
                <span style={{ fontSize: "12px" }}>LTR</span>
              </p>
              <button
                className="status-btn"
                onClick={() =>
                  navigate(`/Statuscount/${index}`, { state: club })
                }
              >
                Download Status
              </button>
            </div>
          ))}
        </div>

        {/* Others */}
        <div className="table-body">
          {others.map((club, index) => (
            <div key={index} className="table-row">
              <span className="name">{club.organization_name}</span>
              <div className="spacer">
                <span className="count">
                  {club.total_count}{" "}
                  <span style={{ fontSize: "9px", marginLeft: "5px" }}>LTR</span>
                </span>
                <button
                  className="status-btn small-btn"
                  style={{
                    marginLeft: "66px",
                    height: "25px",
                    fontWeight: "bolder",
                  }}
                  onClick={() =>
                    navigate(`/Statuscount/${index + 3}`, { state: club })
                  }
                >
                  Download Status
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trandingpage;