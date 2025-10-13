import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./delivery_status.css";
import { apiCall } from "../Api";
import { IoMdDownload } from "react-icons/io";
import { CiMenuKebab } from "react-icons/ci";
import { FaLock } from "react-icons/fa";

const LIST_ENDPOINT = "order/organizations";
const STATUS_ENDPOINT = "order/order_status/";

const Delivery_status = () => {
  const [clubs, setClubs] = useState([]);
  const [totalDelivered, setTotalDelivered] = useState(0);
  const [totalStock, setTotalStock] = useState(0);
  const [totalApproved, setTotalApproved] = useState(0);
  const [totalCancelled, setTotalCancelled] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const navigate = useNavigate();
  const dropdownRefs = useRef({});

  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      const isOutside = Object.values(dropdownRefs.current).every(
        (ref) => ref && !ref.contains(event.target)
      );
      if (isOutside) setActiveDropdown(null);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    fetchClubs();
    fetchTotals();
    const interval = setInterval(() => {
      fetchClubs();
      fetchTotals();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  const fetchAllPages = async (endpoint) => {
    let url = endpoint;
    const all = [];
    while (url) {
      const data = await apiCall.get(url);
      const results = data.data?.results || data.data || data.results || data;
      all.push(...(Array.isArray(results) ? results : [results]));
      url = data.data?.next
        ? data.data.next.replace(/^https?:\/\/[^/]+\/api\/v1\//, "")
        : null;
    }
    return all;
  };

const fetchClubs = async () => {
  setLoading(true);
  setError(null);
  try {
    const clubsList = await fetchAllPages(LIST_ENDPOINT);
    const cleaned = clubsList
      .map((item) => {
        const delivered = Number(item.delivered_count) || 0;
        const clubCount = Number(item.total_count) || 0;
        const percentage =
          clubCount > 0 ? ((delivered / clubCount) * 100).toFixed(1) : 0;

        return {
          id: item.id || item.organization?.id || 0,
          organization_name:
            item.organization_name ||
            item.organization?.organization_name ||
            item.name ||
            "Unknown",
          delivered_count: delivered,
          total_count: clubCount,
          percentage,
          approved_count: Number(item.approved_count) || 0,
          cancelled_count: Number(item.cancelled_count) || 0,
          is_active: item.is_active ?? item.organization?.is_active ?? true,
        };
      })
      // ✅ Filter out inactive organizations
      .filter(
        (club) =>
          club.organization_name &&
          club.organization_name.toLowerCase() !== "unknown" &&
          club.is_active === true
      )
      .sort((a, b) => b.delivered_count - a.delivered_count);

    setClubs(cleaned.slice(0, 100));
  } catch (err) {
    console.error("Error fetching clubs:", err);
    setError(err.message || "Failed to load data.");
    setClubs([]);
  } finally {
    setLoading(false);
  }
};


  const fetchTotals = async () => {
    try {
      const res = await apiCall.get(STATUS_ENDPOINT);
      const data = res.data || res;
      setTotalDelivered(data.total_delivered || 0);
      setTotalStock(data.total_stock || 0);
      setTotalApproved(data.total_approved || 0);
      setTotalCancelled(data.total_cancelled || 0);
    } catch (err) {
      console.error("Error fetching totals:", err);
      setTotalDelivered(0);
      setTotalStock(0);
      setTotalApproved(0);
      setTotalCancelled(0);
    }
  };

  const toggleDropdown = (index, event) => {
    event.stopPropagation();
    setActiveDropdown(activeDropdown === index ? null : index);
  };

  const handleDownloadStatus = (club, index, event) => {
    event.stopPropagation();
    navigate(`/Statuscount/${index}`, { state: club });
    setActiveDropdown(null);
  };

  const handleViewOrders = (club, event) => {
    event.stopPropagation();
    navigate("/Datapage", {
      state: { id: club.id, organization_name: club.organization_name },
    });
    setActiveDropdown(null);
  };

  const setDropdownRef = (index, element) => {
    if (element) dropdownRefs.current[index] = element;
  };

  // Total percentage
  const totalPercentage =
    totalStock > 0 ? ((totalDelivered / totalStock) * 100).toFixed(1) : 0;

  return (
    <div>
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

      {/* Loading */}
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}

      {/* Header */}
      <div className="leaderboard-subtitle-header">
        <h1 style={{ color: "black" }}>മധുര സാന്ത്വനം പാലട പായസം ചലഞ്ച്</h1>
        <h2 style={{ color: "gray" }}>ഒക്ടോബർ 14</h2>
      </div>

      {/* Top Totals */}
      <div className="leaderboard-container">
        <div
          style={{
            background: "linear-gradient(90deg, #287e0eff, #6f7cecff)",
            borderRadius: "20px",
            padding: "30px 20px",
            color: "white",
            textAlign: "center",
            width: "80%",
            maxWidth: "800px",
            margin: "40px auto",
            position: "relative",
            boxShadow: "0 8px 20px rgba(0,0,0,0.2)",
          }}
        >
          {/* Card Title */}
          <p
            style={{
              display: "flex",
              justifyContent: "center",
              fontSize: "1.5rem",
              fontWeight: "600",
              marginBottom: "20px",
            }}
          >
            Delivered
          </p>

          {/* Main Delivered Count */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "flex-end",
              gap: "10px",
            }}
          >
            <p
              style={{
                fontSize: "5rem",
                fontWeight: "700",
                color: "#FcD700",
                marginBottom: 0,
              }}
            >
              {totalDelivered}
            </p>
            <p
              style={{
                fontSize: "25px",
                marginTop: "75px",
                marginLeft: "5px",
                color: "white",
              }}
            >
              LTR
            </p>
          </div>

          {/* Delivery Percentage Bar */}
          <div
            style={{
              marginTop: "20px",
              width: "80%",
              maxWidth: "500px",
              height: "15px",
              background: "rgba(255,255,255,0.2)",
              borderRadius: "10px",
              marginLeft: "auto",
              marginRight: "auto",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                height: "100%",
                width: `${
                  totalApproved > 0
                    ? ((totalDelivered / totalApproved) * 100).toFixed(2)
                    : 0
                }%`,
                background: "#FcD700",
                borderRadius: "10px 0 0 10px",
                transition: "width 0.5s ease-in-out",
              }}
            ></div>
          </div>

          {/* Bottom Info Section */}
          <div
            style={{
              marginTop: "20px",
              display: "flex",
              justifyContent: "center",
              gap: "40px",
              flexWrap: "wrap",
              fontSize: "25px",
            }}
          >
            <p>
              Current Stock: <b>{(totalStock || 0) - (totalDelivered || 0)}</b>{" "}
              LTR
            </p>
            <p>
              Delivery Percentage:{" "}
              <b>
                {totalApproved > 0
                  ? ((totalDelivered / totalApproved) * 100).toFixed(2)
                  : 0}
                %
              </b>
            </p>
          </div>
        </div>

        {error && <p className="error">{error}</p>}

        {/* Clubs List */}
        <div className="table-body">
          {clubs.map((club, index) => {
            const rank = index + 1;
            return (
              <div key={club.id} className="table-row">
                <span className="name">
                  <span style={{ color: "black" }}>#{rank}</span>{" "}
                  {club.organization_name}
                </span>
                <div
                  className="spacer"
                  style={{ display: "flex", gap: "20px" }}
                >
                  <p className="amount-1" style={{ margin: 0 }}>
                    <b>
                      {club.delivered_count}{" "}
                      <span style={{ fontSize: "15px" }}>LTR</span>
                    </b>
                  </p>

                  <p
                    className="amount-1"
                    style={{ margin: 0, color: "#28a745" }}
                  >
                    <span style={{ fontSize: "20px" }}>
                      ({club.percentage}%)
                    </span>
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* footer */}
      <section className="py-5 bg-dark text-white text-center wow fadeInUp">
        <div className="container">
          <h2 className="display-5 fw-bold mb-3"></h2>
          <p className="mb-4">
            Every rupee makes a difference. Join our mission to ease suffering
            and bring peace to lives in need.
          </p>

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
      {/* Footer omitted for brevity */}
    </div>
  );
};

export default Delivery_status;
