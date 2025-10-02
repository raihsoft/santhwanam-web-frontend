import { Link, useLocation, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import "./OrderSuccess.css";

function OrderSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const { formData, response } = location.state || {};

  if (!formData || !response) return <p>No data found</p>;

  const handleDownload = () => {
    const doc = new jsPDF();

    // Top URL
    doc.setFontSize(10);
    doc.setTextColor(120); // gray
    doc.text("www.santhwanamcare.com", 105, 10, { align: "center" });

    // Title
    doc.setFontSize(18);
    doc.setTextColor(0); // black
    doc.text("Order Receipt", 14, 20);

    doc.setFontSize(12);
    doc.text("Paalada Payasam Challenge", 14, 28);

    const rows = [
      ["Name", formData.order_by_name],
      ["Mobile", formData.mobile],
      ["Quantity", formData.quantity],
      ["Place", formData.delivery_place],
      ["Zone", formData.zone_name]
    ];

    if (formData.order_type === "club") {
      rows.push(["Club Name", formData.club_name]);
    }

    rows.push(["Order Number", response.order_no]);

    // Add table
    const table = autoTable(doc, {
      startY: 30,
      head: [["Field", "Details"]],
      body: rows,
    });

    // Bottom URL just below table
    const finalY = doc.lastAutoTable.finalY || 30;
    doc.setFontSize(10);
    doc.setTextColor(120);
    doc.text("www.raihsoft.com", 105, finalY + 8, { align: "center" });

    doc.save(`order_${response.order_no}.pdf`);
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div>
      {/* Topbar Start */}
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
      {/* Topbar End */}

      {/* Navbar Start */}
      <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top px-3 px-md-5 py-2 py-lg-0">
        <a className="navbar-brand p-0">
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
            <Link to="/" className="nav-item nav-link">Home</Link>
            <Link to="/about" className="nav-item nav-link">About</Link>
            <Link
              to="/Donate-for-pandikkad-santhwanam-palliative-care-society"
              className="nav-item nav-link"
            >
              Donation
            </Link>
            <Link to="/gallery" className="nav-item nav-link">Gallery</Link>
            <Link to="/leaders" className="nav-item nav-link">Leaders</Link>
            <Link to="/contact" className="nav-item nav-link">Contact</Link>
          </div>
        </div>
      </nav>
      {/* Navbar End */}

      <div className="order-success-container">
        <div className="receipt-card">
          {/* Top URL */}
          <p className="receipt-top-url">www.santhwanamcare.com</p>

          <h2 className="success-message">നിങ്ങളുടെ ഓർഡർ സ്വികരിച്ചിരിക്കുന്നു!</h2>
          <h4 className="order-number">ഓർഡർ നമ്പർ: {response.order_no}</h4>

          <div className="receipt-box">
            <p><b>പേര്:</b> {formData.order_by_name}</p>
            <p><b>മൊബൈൽ:</b> {formData.mobile}</p>
            <p><b>ലിറ്റർ:</b> {formData.quantity}</p>
            <p><b>സ്ഥലം:</b> {formData.delivery_place}</p>
            <p><b>മേഖല:</b> {formData.zone_name}</p>
            <p><b>ഓർഡർ നമ്പർ:</b> {response.order_no}</p>
          </div>

          <button className="download-btn" onClick={handleDownload}>
            Download Receipt (PDF)
          </button>
          &nbsp; &nbsp;
          <button className="back-btn" onClick={handleBack}>
            പുതിയ ഓർഡർ നൽകുക
          </button>

          {/* Bottom URL */}
          <p className="receipt-bottom-url">www.raihsoft.com</p>
        </div>
      </div>

      {/* footer */}
      <section className="py-5 bg-dark text-white text-center wow fadeInUp">
        <div className="container">
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
}

export default OrderSuccess;
