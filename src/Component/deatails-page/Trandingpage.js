import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Trandingpage.css";
import { apiCall } from "../Api";
import { IoMdDownload } from "react-icons/io";
import { CiMenuKebab } from "react-icons/ci";
import { FaLock } from "react-icons/fa";

const LIST_ENDPOINT = "order/organizations";
const STATUS_ENDPOINT = "order/order_status/";
const ZONE_ENDPOINT = "order/zone_reports/"; // ✅ zone endpoint

const Trandingpage = () => {
  const [clubs, setClubs] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [zones, setZones] = useState([]); // ✅ zone state
  const [selectedZone, setSelectedZone] = useState(null); // ✅ selected zone
  const navigate = useNavigate();
  const dropdownRefs = useRef({});

  // ✅ handle outside click
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

  // ✅ fetch all data on mount
  useEffect(() => {
    fetchClubs();
    fetchTotalCount();
    fetchZones();
    const interval = setInterval(() => {
      fetchClubs();
      fetchTotalCount();
    }, 30000);
    return () => clearInterval(interval);
  }, []);

  // ✅ fetch all pages helper
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

  // ✅ fetch clubs
  const fetchClubs = async () => {
    setLoading(true);
    setError(null);
    try {
      const clubsList = await fetchAllPages(LIST_ENDPOINT);

      const cleaned = clubsList
        .map((item) => ({
          id: item.id || item.organization?.id || 0,
          organization_name:
            item.organization_name ||
            item.organization?.organization_name ||
            item.name ||
            "Unknown",
          total_count: Number(item.total_count) || 0,
        }))
        .filter(
          (club) =>
            club.organization_name &&
            club.organization_name.toLowerCase() !== "unknown" &&
            club.total_count > 0
        )
        .sort((a, b) => b.total_count - a.total_count);

      setClubs(cleaned.slice(0, 100));
    } catch (err) {
      console.error("Error fetching clubs:", err);
      setError(err.message || "Failed to load data.");
      setClubs([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ fetch total count
  const fetchTotalCount = async () => {
    try {
      const res = await apiCall.get(STATUS_ENDPOINT);
      const data = res.data || res;
      setTotalCount(data.total_order || 0);
    } catch (err) {
      console.error("Error fetching total count:", err);
      setTotalCount(0);
    }
  };

  // ✅ fetch zones
  const fetchZones = async () => {
    try {
      const res = await apiCall.get(ZONE_ENDPOINT);
      console.log("✅ Raw Zone API response:", res);

      // ✅ If apiCall already unwraps, use res directly
      const data = Array.isArray(res)
        ? res
        : Array.isArray(res.data)
        ? res.data
        : res.data?.results || res.results || [];

      console.log("✅ Processed Zone Data:", data);

      const validZones = data
        .filter(
          (zone) =>
            zone &&
            zone.zone_id &&
            zone.zone_name &&
            typeof zone.total_quantity !== "undefined"
        )
        .map((zone) => ({
          zone_id: zone.zone_id,
          zone_name: zone.zone_name,
          total_quantity: zone.total_quantity,
        }));

      console.log("✅ Valid Zones Before Sort:", validZones);

      const sortedZones = [...validZones].sort(
        (a, b) => Number(b.total_quantity) - Number(a.total_quantity)
      );

      console.log("✅ Sorted Zones:", sortedZones);
      setZones(sortedZones);
    } catch (err) {
      console.error("❌ Error fetching zones:", err);
      setZones([]);
    }
  };

  // ✅ dropdown handlers
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

  // ✅ leaderboard logic
  // const topThree = clubs.slice(0, 1);
  const others = clubs.slice(0);
  const getMedalEmoji = (rank) =>
    rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : "";

  // ✅ render
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
                  <i className="fa fa-phone-alt me-2"></i>+91 8281381390,
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

      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
        </div>
      )}

      <div className="leaderboard-subtitle-header">
        <h1 style={{ color: "black" }}>മധുര സാന്ത്വനം പാലട പായസം ചലഞ്ച്</h1>
        <h2 style={{ color: "gray" }}>ഒക്ടോബർ 14</h2>
      </div>

      {/* ✅ main layout */}
      <div className="main-layout">
        {/* Left Sidebar - Zones */}

        {/* Right - Leaderboard */}
        <div className="leaderboard-container1">
          <h2 className="leaderboard-subtitle">
            <p style={{ display: "flex" }}>Together we achieved</p>
            <div className="spacer-1">
              <p
                style={{
                  fontSize: "5rem",
                  fontWeight: "600",
                  color: "#FcD700",
                  marginBottom: 0,
                }}
              >
                {totalCount}
              </p>
              <p
                style={{
                  fontSize: "25px",
                  marginTop: "75px",
                  marginLeft: "5px",
                }}
              >
                LTR
              </p>
            </div>
          </h2>

          <div className="zone-sidebar">
            <h3>Zones</h3>
            <div className="zonecenter">
              <ul>
                {zones.length === 0 && <li>No zones found</li>}
                {zones.map((zone, index) => (
                  <li
                    key={zone.zone_id}
                    className={`${
                      selectedZone === zone.zone_id ? "active" : ""
                    } zone-rank-${index + 1}`}
                    onClick={() => setSelectedZone(zone.zone_id)}
                  >
                    <span
                      className="zone-rank-number"
                      style={{ color: "black" }}
                    >
                      #{index + 1}
                    </span>{" "}
                    {zone.zone_name}{" "}
                    <strong style={{ color: "black" }}>
                      {zone.total_quantity} LTR
                    </strong>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <h1 className="leaderboard-title">Top Challengers</h1>

          {error && <p className="error">{error}</p>}

          {/* Top 3 */}
          {/* <div className="top-three">
            {topThree.map((club, index) => (
              <div key={index} className={`top-card rank-${index + 1}`}>
                <div className="card-row">
                  <div className="medal">{getMedalEmoji(index + 1)}</div>
                  <h2 className="club-name">{club.organization_name}</h2>
                  <p className="amount">
                    {club.total_count}{" "}
                    <span
                      style={{
                        fontSize: "12px",
                        color: "#5e5e5e",
                        marginTop: "13px",
                        marginLeft: "5px",
                      }}
                    >
                      LTR
                    </span>
                  </p>
                </div>
                <div
                  className="dropdown-container"
                  ref={(el) => setDropdownRef(index, el)}
                >
                  <button
                    className="status-btn1"
                    onClick={(e) => toggleDropdown(index, e)}
                    style={{ color: "black" }}
                  >
                    <CiMenuKebab />
                  </button>
                  {activeDropdown === index && (
                    <div className="dropdown-menu show">
                      <button
                        className="dropdown-item"
                        onClick={(e) => handleDownloadStatus(club, index, e)}
                      >
                        <IoMdDownload className="dropdown-icon" /> Download
                        Status
                      </button>
                      <button
                        className="dropdown-item"
                        onClick={(e) => handleViewOrders(club, e)}
                      >
                        <FaLock className="dropdown-icon" /> View Orders
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div> */}

          {/* Other clubs */}
          <div className="table-body">
            {others.map((club, index) => {
              const rank = index + 1;
              const absoluteIndex = index + 3;
              return (
                <div key={index} className="table-row">
                  <span className="name">
                    <span style={{ color: "black" }}>#{rank}</span>{" "}
                    {club.organization_name}
                  </span>
                  <div className="spacer">
                    <p className="amount-1">
                      {club.total_count}{" "}
                      <span style={{ fontSize: "12px", color: "#5e5e5e" }}>
                        LTR
                      </span>
                    </p>
                    <div
                      className="dropdown-container"
                      ref={(el) => setDropdownRef(absoluteIndex, el)}
                    >
                      <button
                        style={{ fontSize: "25px", marginLeft: "10px" }}
                        className="status-btn"
                        onClick={(e) => toggleDropdown(absoluteIndex, e)}
                      >
                        <CiMenuKebab />
                      </button>
                      {activeDropdown === absoluteIndex && (
                        <div className="dropdown-menu show">
                          <button
                            className="dropdown-item"
                            onClick={(e) =>
                              handleDownloadStatus(club, absoluteIndex, e)
                            }
                          >
                            <IoMdDownload className="dropdown-icon" /> Download
                            Status
                          </button>
                          <button
                            className="dropdown-item"
                            onClick={(e) => handleViewOrders(club, e)}
                          >
                            <FaLock className="dropdown-icon" /> View Orders
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <section className="py-5 bg-dark text-white text-center wow fadeInUp">
        <div className="container">
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
    </div>
  );
};

export default Trandingpage;
