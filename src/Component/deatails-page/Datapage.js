import React, { useState, useEffect } from "react";
import "./Datapage.css";
import { apiCall } from "../Api";
import { Link, useNavigate, useLocation } from "react-router-dom";


export default function Datapage() {
  const navigate = useNavigate();
  const location = useLocation();
  const passedClub = location.state || null;

  const selectedOrgId = passedClub?.id || "";
  const selectedOrgName = passedClub?.organization_name || "";

  const PAGE_SIZE = 100;

  const [showPopup, setShowPopup] = useState(true);
  const [verificationCode, setVerificationCode] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [allOrders, setAllOrders] = useState([]); // stores all data
  const [visibleOrders, setVisibleOrders] = useState([]); // paginated data
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [fullResponse, setFullResponse] = useState(null);


  // Redirect if opened directly without org data
  useEffect(() => {
    if (!passedClub) navigate("/");
  }, [passedClub, navigate]);

  // Fetch all orders once
  const fetchOrders = async (orgId, code) => {
    setLoading(true);
    try {
      const response = await apiCall.post("order/order_by_organization/", {
        organization_id: orgId,
        security_code: code,
      });

      const data = response.data || response;
      console.log("API Response:", data);

      const ordersArr = data.orders || [];

      if (!Array.isArray(ordersArr)) throw new Error("Invalid API format");

      // Store all orders
      setAllOrders(ordersArr);
      setTotalPages(Math.ceil(ordersArr.length / PAGE_SIZE));
      setCurrentPage(1);

      setFullResponse(data); // store full backend data


      // Show first page
      setVisibleOrders(ordersArr.slice(0, PAGE_SIZE));

      setShowPopup(false);
    } catch (err) {
      console.error(
        "Error fetching orders:",
        err.response?.data || err.message
      );
      setErrorMessage(
        err.response?.data?.message ||
        "Failed to fetch orders. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // Verify code and fetch orders
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!verificationCode || !/^\d{6}$/.test(verificationCode)) {
      setErrorMessage("Please enter a valid 6-digit verification code");
      return;
    }

    await fetchOrders(selectedOrgId, verificationCode);
  };

  // Pagination controls
  const handleNext = () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      const start = (nextPage - 1) * PAGE_SIZE;
      const end = start + PAGE_SIZE;
      setVisibleOrders(allOrders.slice(start, end));
      setCurrentPage(nextPage);
    }
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      const prevPage = currentPage - 1;
      const start = (prevPage - 1) * PAGE_SIZE;
      const end = start + PAGE_SIZE;
      setVisibleOrders(allOrders.slice(start, end));
      setCurrentPage(prevPage);
    }
  };
  // print function
  const handlePrint = (order) => {
    const orgName = fullResponse?.organization_name || order.organization_name || selectedOrgName;

    const printContent = `
<h5 style="text-align:center; font-size:15px; font-weight:bold; margin:0 0 2px 0;">മധുര സാന്ത്വനം - 2025</h5>
<h5 style="text-align:center; font-size:10px; margin:0 0 3px 0;">പാണ്ടിക്കാട് പാലിയേറ്റീവ് പായസ ചലഞ്ച്</h5>

<div style="font-family: Arial; padding:10px; line-height:1;">
  <h2 style="text-align:center; margin:0 0 2px 0;">Delivery Slip</h2>
  <hr style="margin: 5px 0;"/>
  <p style="text-align:center; margin: 3px 0;"><strong>${orgName}</strong></p>
  <p style="text-align:center; margin: 3px 0;"><strong>${order.delivery_place}</strong></p>
  <p style="text-align:center; margin: 3px 0;">Mob: <strong>${order.mobile}</strong></p>
  <p style="text-align:center; margin: 3px 0; font-size:25px">No: <strong>${order.order_number}</strong></p>
  <p style="text-align:center; margin: 3px 0;">
    Qty:
    <span style="
      display:inline-block;
      padding: 5px 15px;
      margin-left:10px;
      border:2px solid #000;
      font-size: 1.8em;
      font-weight:bold;
      min-width:50px;
      text-align:center;
    ">
      ${order.quantity}
    </span>
  </p>
  <hr style="margin: 5px 0;"/>
  <p style="text-align:center; font-size:14px; margin:3px 0;">Thanks for your order!</p>
  <p style="text-align:center; font-size:14px; margin:3px 0;">www.raihsoft.com</p>
</div>

  `;

    const printWindow = window.open("", "", "width=800,height=600");
    printWindow.document.write("<html><head><title>Order Receipt</title></head><body>");
    printWindow.document.write(printContent);
    printWindow.document.write("</body></html>");
    printWindow.document.close();
    printWindow.print();
  };

  // print function end


  return (
    <div className="data-page">
      {/* Header */}
      <div className="container-fluid bg-light ps-5 pe-0 d-none d-lg-block w-100">
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
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top px-3 px-md-5 py-2 py-lg-0 w-100">
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

      {/* Verification Popup */}
      {showPopup && (
        <div className="order-popup-overlay">
          <div className="order-popup-content">
            <form onSubmit={handleSubmit}>
              <h3>Authorize with your verification code</h3>
              <p>
                <strong>{selectedOrgName}</strong>
              </p>
              <input
                type="text"
                value={verificationCode}
                onChange={(e) =>
                  setVerificationCode(
                    e.target.value.replace(/\D/g, "").slice(0, 6)
                  )
                }
                placeholder="Enter your verification code"
                disabled={loading}
              />
              {errorMessage && <p className="error-message">{errorMessage}</p>}
              <button type="submit" disabled={loading}>
                {loading ? "Verifying..." : "Submit"}
              </button>
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="cancel-btn"
                style={{ backgroundColor: "red" }}
                disabled={loading}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Orders Table */}
      {!showPopup && (
        <div className="orders-table-container">
          <h2 className="h2-head">Orders - {selectedOrgName}</h2>

          <div className="table-scroll-wrapper">
            <table>
              <thead>
                <tr>
                  <th>SL NO</th>
                  <th>Order Number</th>
                  <th>Name</th>
                  <th>Mobile</th>
                  <th>Quantity</th>
                  <th>Place</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {visibleOrders.length > 0 ? (
                  visibleOrders.map((o, index) => {
                    const serial = (currentPage - 1) * PAGE_SIZE + index + 1;
                    return (
                      <tr key={o.id}>
                        <td>{serial}</td>
                        <td>{o.order_number}</td>
                        <td>{o.order_by_name}</td>
                        <td>{o.mobile}</td>
                        <td>{o.quantity}</td>
                        <td>{o.delivery_place}</td>
                        <td>{o.status}</td>
                        <td>{new Date(o.order_date).toLocaleDateString()}</td>
                        <td>
                          <button
                            className="view-status-btn"
                            onClick={() => handlePrint(o)}
                          >
                            Print
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="9">No orders found</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination-controls">
              <button
                disabled={currentPage <= 1}
                onClick={handlePrevious}
                className="pagination-btn"
              >
                ⬅ Previous
              </button>
              <span style={{ color: "#333", fontWeight: "500" }}>
                Page {currentPage} of {totalPages}
              </span>
              <button
                disabled={currentPage >= totalPages}
                onClick={handleNext}
                className="pagination-btn"
              >
                Next ➡
              </button>
            </div>
          )}
        </div>
      )}

      {/* Footer */}
      <section className="py-5 bg-dark text-white text-center wow fadeInUp w-100 m-0">
        <div className="container-fluid px-0">
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
}