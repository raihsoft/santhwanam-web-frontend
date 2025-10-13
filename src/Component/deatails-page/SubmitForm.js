import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Submitform.css";
import Select from "react-select";
import { apiCall } from "../Api";
import Swal from "sweetalert2";

function SubmitForm() {
  const [orderType, setOrderType] = useState("");
  const [mekhalOptions, setMekhalOptions] = useState([]);
  const [clubOptions, setClubOptions] = useState([]);
  const [selectedClub, setSelectedClub] = useState("");
  const [otherClubName, setOtherClubName] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const [isNewOrganization, setIsNewOrganization] = useState(false);
  const [selectedZone, setSelectedZone] = useState("");
  const [popupPlace, setPopupPlace] = useState("");
  const [popupMobile, setPopupMobile] = useState("");
  const [popupRequesterName, setPopupRequesterName] = useState("");
  const [quantity, setQuantity] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [errors, setErrors] = useState({});
  // inside SubmitForm state
  const [mainMobile, setMainMobile] = useState("");
  const [mainMobileError, setMainMobileError] = useState("");
  // Add this at the top along with other states
  const [securityCodeError, setSecurityCodeError] = useState("");
  const [showOrgInactivePopup, setShowOrgInactivePopup] = useState(false);
  const [orgInactiveMessage, setOrgInactiveMessage] = useState("");
  const [showOrgAddedPopup, setShowOrgAddedPopup] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [orderByNameError, setOrderByNameError] = useState(null);
  const [mobileError, setMobileError] = useState(null);
  const [deliveryPlaceError, setDeliveryPlaceError] = useState(null);
  const [orderTypeError, setOrderTypeError] = useState(null); // <-- New state for order type error
  const [clubError, setClubError] = useState(null);
  const [quantityError, setQuantityError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showIndividualQuantityPopup, setShowIndividualQuantityPopup] =
    useState(false);
  const [pendingSubmit, setPendingSubmit] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    fetchMekhalOptions();
    fetchClubOptions();
  }, []);

  const fetchMekhalOptions = async () => {
    try {
      const data = await apiCall.get("order/zones/");
      setMekhalOptions(Array.isArray(data) ? data : data.results || []);
    } catch (err) {
      console.error("Error fetching zones:", err);
    }
  };

  const fetchClubOptions = async () => {
    try {
      const data = await apiCall.get("order/organizations/");
      setClubOptions(Array.isArray(data) ? data : data.results || []);
    } catch (err) {
      console.error("Error fetching clubs:", err);
    }
  };

  const handleChange = (e) => {
    const val = e.target.value;
    if (val === "") setQuantity("");
    else if (Number(val) >= 1) setQuantity(val);
  };

  const handleOrganizationChange = (option) => {
    setSelectedClub(option ? option.value : "");
    if (clubError) setClubError("");
    if (option) {
      if (option.isTemp) {
        setIsNewOrganization(true);
        setOtherClubName(option.label);
      } else {
        setIsNewOrganization(false);
        setOtherClubName("");
      }
      // Auto-select zone if available
      const org = clubOptions.find(
        (c) => String(c.id) === String(option.value)
      );
      if (org && org.zone) {
        setSelectedZone(org.zone);
      }
    } else {
      setIsNewOrganization(false);
      setOtherClubName("");
      setSelectedZone("");
    }
  };

  const handleSaveNewOrganization = async () => {
    if (!otherClubName.trim() || !selectedZone || !popupPlace.trim()) return;

    try {
      const payload = {
        organization_name: otherClubName,
        place: popupPlace,
        zone: selectedZone,
        mobile: popupMobile,
        responsible_person_name: popupRequesterName,
        security_code: verificationCode || null,
        requested_by: popupRequesterName,
      };

      // POST new organization request
      const newOrg = await apiCall.post("order/organizations/", payload);

      // Add new org to clubOptions and select it
      const newOption = {
        id: newOrg.id,
        value: newOrg.id,
        label: newOrg.organization_name,
        organization_name: newOrg.organization_name,
        is_active: true,
        isTemp: false,
      };

      setClubOptions((prev) =>
        Array.isArray(prev) ? [...prev, newOption] : [newOption]
      );
      setSelectedClub(newOption.value);
      setIsNewOrganization(false);

      // Clear popup
      setShowPopup(false);
      setOtherClubName("");
      setPopupPlace("");
      setPopupMobile("");
      setPopupRequesterName("");
      setErrors({});

      setShowOrgAddedPopup(true);
    } catch (error) {
      console.error("Error creating organization request:", error.message);
      // alert("organization with this organization name already exists");
      Swal.fire({
        text: "നിലവിൽ കൊടുത്തിട്ടുള്ള പേരിൽ ക്ലബ് /കൂട്ടായ്മ /സ്ഥാപനം അപേക്ഷിച്ചിട്ടുണ്ട്. സഹായത്തിനായി 9847991099 എന്ന WhatsApp നമ്പറിൽ ബന്ധപ്പെടുക.!",
        icon: "error", // This sets it as an error alert
        confirmButtonText: "OK",
      });
    }
  };

  // In handleSubmit, ensure zone is set for both order types before submitting
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    let data = Object.fromEntries(new FormData(e.target).entries());
    let hasError = false;

    // Order type validation
    if (!orderType) {
      setOrderTypeError("ദയവായി ഏതെങ്കിലും ഒന്ന് തിരഞ്ഞെടുക്കുക");
      hasError = true;
    } else {
      setOrderTypeError("");
    }

    // Quantity validation
    if (!quantity) {
      hasError = true;
    } else if (Number(quantity) > 100) {
      setQuantityError("");
      hasError = true;
    } else {
      setQuantityError("");
    }

    // order_by_name validation
    if (!data.order_by_name || data.order_by_name.trim() === "") {
      setOrderByNameError("ദയവായി നിങ്ങളുടെ പേര് നൽകുക");
      hasError = true;
    } else {
      setOrderByNameError("");
    }

    // mobile validation
    if (!mainMobile || mainMobile.trim() === "") {
      setMobileError("ദയവായി നിങ്ങളുടെ മൊബൈൽ നമ്പർ നൽകുക");
      hasError = true;
    } else {
      setMobileError("");
    }

    // delivery_place validation
    if (!data.delivery_place || data.delivery_place.trim() === "") {
      setDeliveryPlaceError("ദയവായി നിങ്ങളുടെ സ്ഥലം നൽകുക");
      hasError = true;
    } else {
      setDeliveryPlaceError("");
    }

    // Security code validation
    if (orderType === "Club") {
      if (!verificationCode) {
        setSecurityCodeError("");
        hasError = true;
      } else if (!/^\d{6}$/.test(verificationCode)) {
        setSecurityCodeError("");
        hasError = true;
      } else {
        setSecurityCodeError("");
      }
    } else {
      setSecurityCodeError("");
    }

    // Zone validation for Individual
    if (orderType === "Individual" && (!data.zone || data.zone === "")) {
      setErrors((prev) => ({
        ...prev,
        zone: "ദയവായി നിങ്ങളുടെ മേഖല തിരഞ്ഞെടുക്കുക",
      }));
      hasError = true;
    } else {
      setErrors((prev) => ({ ...prev, zone: undefined }));
    }

    // Club selection validation
    if (orderType === "Club" && !selectedClub && !otherClubName) {
      setClubError("ദയവായി നിങ്ങളുടെ ക്ലബ്‌/കൂട്ടായ്മ തിരഞ്ഞെടുക്കുക");
      hasError = true;
    } else {
      setClubError("");
    }


    if (!hasError) {
      setIsSubmitting(true);
    }
    if (hasError) {
      return;
    }

    // If no popup needed, proceed with submission
    console.log("Proceeding with direct submission");
    await proceedWithSubmission(data);
  };

  const proceedWithSubmission = async (formData) => {
    setIsSubmitting(true);

    try {
      let data = { ...formData };

      /** ---------- Zone Handling ---------- */
      if (orderType === "Club" && !data.zone && selectedZone) {
        data.zone = selectedZone;
      }

      /** ---------- Organization Handling ---------- */
      if (orderType === "Club") {
        if (!selectedClub && !otherClubName) {
          await Swal.fire({
            text: "Please select or add an organization.",
            icon: "warning",
            confirmButtonText: "OK",
          });
          setIsSubmitting(false);
          return;
        }

        const selectedOrg = clubOptions.find(
          (c) => String(c.id) === String(selectedClub)
        );

        if (!selectedOrg) {
          await Swal.fire({
            text: "Please select a valid organization.",
            icon: "error",
            confirmButtonText: "OK",
          });
          setIsSubmitting(false);
          return;
        }

        if (selectedOrg.isTemp && !selectedOrg.realId) {
          await Swal.fire({
            text: "Your organization request is pending verification. You cannot submit orders yet.",
            icon: "info",
            confirmButtonText: "OK",
          });
          setIsSubmitting(false);
          return;
        }

        data.organization =
          selectedOrg.realId ?? selectedOrg.id ?? selectedOrg.value;
        data.organization_name = selectedOrg.organization_name;
      }

      /** ---------- Zone Name Lookup ---------- */
      const zoneName =
        mekhalOptions.find((z) => String(z.id) === data.zone)?.zone_name ??
        "Unknown";

      /** ---------- Payload Preparation ---------- */
      data = {
        ...data,
        quantity: Number(data.quantity),
        order_type: orderType === "Club" ? "organization" : "individual",
        is_paid: false,
        payment_note: "",
        organization: data.organization ?? null,
      };

      console.log("Final payload:", JSON.stringify(data, null, 2));

      /** ---------- Special Validation for Individual ---------- */
      if (orderType === "Individual" && data.quantity < 5) {
        Swal.fire({
          text: "5 ലിറ്ററിന് താഴെയുള്ള വ്യക്തികത  ഓർഡറുകൾക്ക് ഡെലിവറി ഉണ്ടായിരിക്കുന്നതല്ല. പായസ വിതരണ കൗണ്ടറിൽ വന്നു നേരിട്ട് സ്വീകരിക്കേണ്ടതാണ്.",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "Ok",
          cancelButtonText: "Cancel",
        }).then(async (result) => {
          if (result.isConfirmed) {
            await submitOrder(data, zoneName);
          } else {
            setIsSubmitting(false);
          }
        });
        return; // stop further execution until user decides
      }

      /** ---------- Normal API Flow ---------- */
      await submitOrder(data, zoneName);
    } catch (error) {
      handleOrderError(error);
    }
  };

  /** ---------- Submit Order Helper ---------- */
  const submitOrder = async (data, zoneName) => {
    try {
      const result = await apiCall.post("order/orders/", data);

      resetOrderFormStates();

      navigate("/order-success", {
        state: {
          formData: {
            ...data,
            zone_name: zoneName,
            organization_name: data.organization_name ?? "",
          },
          response: result,
        },
      });
    } catch (error) {
      handleOrderError(error);
      if (
        error?.response?.data?.security_code &&
        error.response.data.security_code.includes(
          "Invalid security code for the selected organization."
        )
      ) {
        setSecurityCodeError(
          "ശരിയായ വെരിഫിക്കേഷൻ കോട് നൽകുക. സഹായത്തിനായി 9847991099 എന്ന Whatsapp നമ്പറിൽ ബന്ധപെടുക"
        );
        return;
      }
    }
  };

  /** ---------- Reset Form States ---------- */
  const resetOrderFormStates = () => {
    setIsNewOrganization(false);
    setOtherClubName("");
    setPopupPlace("");
    setPopupMobile("");
    setPopupRequesterName("");
    setVerificationCode("");
    setIsSubmitting(false);
  };

  /** ---------- Centralized Error Handler ---------- */
  const handleOrderError = (error) => {
    setIsSubmitting(false);

    const errorMsg = error?.response?.data;

    if (
      errorMsg?.organization?.includes("Selected organization is not active.")
    ) {
      setOrgInactiveMessage(
        "ദയവായി 9847991099 എന്ന Whatsapp നമ്പറിൽ ബന്ധപെടുക. അംഗീകരിച്ചതിന് ശേഷം വീണ്ടും സമർപ്പിക്കുക."
      );
      setShowOrgInactivePopup(true);
      return;
    }

    if (errorMsg?.security_code?.includes("Invalid security code")) {
      setSecurityCodeError(
        "ശരിയായ വെരിഫിക്കേഷൻ കോട് നൽകുക. സഹായത്തിനായി 9847991099 എന്ന Whatsapp നമ്പറിൽ ബന്ധപെടുക"
      );
      return;
    }

    console.error("Order submission failed:", error);
    setIsNewOrganization(false);
  };

  // 0
  // Handle individual quantity popup confirmation
  const handleIndividualQuantityConfirm = () => {
    setShowIndividualQuantityPopup(false);
    if (pendingSubmit) {
      const formData = new FormData(document.querySelector(".order-form"));
      const data = Object.fromEntries(formData.entries());
      proceedWithSubmission(data);
    }
  };

  // Handle individual quantity popup cancellation
  const handleIndividualQuantityCancel = () => {
    setShowIndividualQuantityPopup(false);
    setPendingSubmit(false);
    setIsSubmitting(false);
  };

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

      {/* Form */}
      <div className="submit-form-page">
        <div className="hero-banner">
          <div className="overlay"></div>
          <h1 className="page-title">
            <span className="line1">മധുര സാന്ത്വനം</span>
            <span className="line2">പാലട പായസം ചലഞ്ച്</span>
          </h1>
        </div>

        <div className="form-card">
          <div className="form-header">
            <h2>പായസം ഓർഡർ ചെയ്യൂ..</h2>
            <p>Please provide accurate details for successful delivery.</p>
          </div>

          <form className="order-form" onSubmit={handleSubmit}>
            {/* Zone selection */}

            {/* Order Type */}
            <div className="form-row">
              <p
                style={{
                  fontSize: "18px",
                  marginBottom: "10px",
                  color: "#333",
                }}
              >
                ഏതെങ്കിലും ഒന്ന് തിരഞ്ഞെടുക്കുക
                <span style={{ color: "red" }}>*</span>
              </p>
              {formSubmitted && orderTypeError && (
                <span
                  style={{
                    color: "red",
                    fontSize: "15px",
                    marginBottom: "8px",
                    display: "block",
                  }}
                >
                  {orderTypeError}
                </span>
              )}
              <label></label>
              <div className="order-type-options">
                <button
                  type="button"
                  className={`order-type-btn ${
                    orderType === "Club" ? "active" : ""
                  }`}
                  onClick={() => {
                    setOrderType("Club");
                    if (orderTypeError) setOrderTypeError("");
                  }}
                >
                  ക്ലബ്‌ / കൂട്ടായ്മ
                </button>
                <button
                  type="button"
                  className={`order-type-btn ${
                    orderType === "Individual" ? "active" : ""
                  }`}
                  onClick={() => {
                    setOrderType("Individual");
                    if (orderTypeError) setOrderTypeError("");
                  }}
                >
                  വ്യക്തി
                </button>
              </div>
            </div>

            {/* Club selection */}
            {orderType === "Club" && (
              <>
                <div className="form-row">
                  <label htmlFor="club_name">
                    ക്ലബ്‌ / കൂട്ടായ്മ<span style={{ color: "red" }}>*</span>
                  </label>
                  <div className="organization-input-wrapper">
                    <Select
                      id="club_name"
                      name="club_name"
                      value={
                        clubOptions
                          .filter((club) => club.is_active)
                          .map((club) => ({
                            value: club.id,
                            label: club.organization_name,
                            id: club.id,
                            isTemp: club.isTemp,
                            total_count: club.total_count || 0,
                          }))
                          .find(
                            (option) =>
                              String(option.value) === String(selectedClub)
                          ) || null
                      }
                      onChange={handleOrganizationChange}
                      options={clubOptions
                        .filter((club) => club.is_active)
                        .sort(
                          (a, b) => (b.total_count || 0) - (a.total_count || 0)
                        )
                        .map((club) => ({
                          value: club.id,
                          label: `${club.organization_name} (${
                            club.total_count || 0
                          })`,
                          id: club.id,
                          isTemp: club.isTemp,
                          total_count: club.total_count || 0,
                        }))}
                      placeholder="നിങ്ങളുടെ ക്ലബ്‌/കൂട്ടായ്മ തിരഞ്ഞെടുക്കുക"
                      isClearable
                      isSearchable
                      className="organization-select"
                      classNamePrefix="org-select"
                    />
                    {formSubmitted && clubError && (
                      <span
                        className="error-msg"
                        style={{ color: "red", fontSize: "14px" }}
                      >
                        {clubError}
                      </span>
                    )}
                    <a
                      type="button"
                      style={{
                        color: "blue",
                        textDecorationLine: "underline",
                        cursor: "pointer",
                        display: "flex",
                        justifyContent: "end",
                      }}
                      onClick={() => setShowPopup(true)}
                    >
                      പുതിയ ക്ലബ്‌/കൂട്ടായ്മ/സ്ഥാപനം ചേർക്കുന്നതിന് അപേക്ഷിക്കുക
                    </a>
                  </div>
                </div>
                {/* Mekhal (Region) display only, not editable */}
                <div className="form-row">
                  <label htmlFor="zone">
                    മേഖല<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    id="zone"
                    name="zone_name"
                    value={
                      mekhalOptions.find(
                        (z) => String(z.id) === String(selectedZone)
                      )?.zone_name || ""
                    }
                    readOnly
                    disabled
                    style={{
                      background: "#f5f5f5",
                      color: "#333",
                      fontWeight: "bold",
                    }}
                  />
                </div>
                {/* Verification Code */}
                <div className="form-row">
                  <label htmlFor="security_code">
                    വെരിഫിക്കേഷൻ കോഡ്<span style={{ color: "red" }}>*</span>
                  </label>
                  <input
                    type="text"
                    id="security_code"
                    name="security_code"
                    value={verificationCode}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (/^\d{0,6}$/.test(val)) {
                        setVerificationCode(val);
                        // Only clear error if user starts typing
                        if (securityCodeError && val !== "")
                          setSecurityCodeError("");
                      }
                      // Show error for invalid code
                      if (val !== "" && !/^\d{6}$/.test(val)) {
                        setSecurityCodeError("");
                      } else if (val.length === 6) {
                        setSecurityCodeError("");
                      }
                    }}
                    className="verification-code-input"
                    maxLength={6}
                  />
                  {formSubmitted && verificationCode === "" && (
                    <span
                      className="error-msg"
                      style={{ color: "red", fontSize: "14px" }}
                    >
                      ദയവായി വെരിഫിക്കേഷൻ കോഡ് നൽകുക
                    </span>
                  )}
                  {formSubmitted &&
                    verificationCode !== "" &&
                    !/^\d{6}$/.test(verificationCode) && (
                      <span
                        className="error-msg"
                        style={{ color: "red", fontSize: "14px" }}
                      >
                        ദയവായി 6 അക്ക കോഡ് നൽകുക
                      </span>
                    )}
                  {securityCodeError && (
                    <span
                      className="error-msg"
                      style={{ color: "red", fontSize: "14px" }}
                    >
                      {securityCodeError}
                    </span>
                  )}
                  {console.log("securityCodeError", securityCodeError)}
                </div>
              </>
            )}

            {/* Individual selection: Mekhal dropdown only */}
            {orderType === "Individual" && (
              <div className="form-row">
                <label htmlFor="zone">
                  മേഖല<span style={{ color: "red" }}>*</span>
                </label>
                <select
                  name="zone"
                  id="zone"
                  value={selectedZone}
                  onChange={(e) => {
                    setSelectedZone(e.target.value);
                    if (errors.zone)
                      setErrors((prev) => ({ ...prev, zone: undefined }));
                  }}
                >
                  <option value="" disabled>
                    Select Zone
                  </option>
                  {mekhalOptions.map((zone) => (
                    <option key={zone.id} value={zone.id}>
                      {zone.zone_name}
                    </option>
                  ))}
                </select>
                {formSubmitted && errors.zone && (
                  <span
                    className="error-msg"
                    style={{ color: "red", fontSize: "14px" }}
                  >
                    {errors.zone}
                  </span>
                )}
              </div>
            )}

            {/* Popup */}
            {showPopup && (
              <div className="popup-overlay">
                <div className="popup-box">
                  <h3>പുതിയ ക്ലബ്‌/കൂട്ടായ്മ ചേർക്കുക</h3>

                  {/* Zone Selection */}
                  <div className="form-row">
                    <select
                      id="popup-zone"
                      value={selectedZone}
                      onChange={(e) => setSelectedZone(e.target.value)}
                    >
                      <option value="" disabled>
                        മേഖല തിരഞ്ഞെടുക്കുക
                      </option>
                      {mekhalOptions.map((zone) => (
                        <option key={zone.id} value={zone.id}>
                          {zone.zone_name}
                        </option>
                      ))}
                    </select>
                    {errors.zone && (
                      <span className="error-msg">{errors.zone}</span>
                    )}
                  </div>

                  {/* Club Name */}
                  <div className="form-row">
                    <input
                      type="text"
                      value={otherClubName}
                      onChange={(e) => setOtherClubName(e.target.value)}
                      placeholder="ക്ലബ്‌/കൂട്ടായ്മ/സ്ഥാപനം പേര്"
                    />
                    {errors.name && (
                      <span className="error-msg">{errors.name}</span>
                    )}
                  </div>

                  {/* Place */}
                  <div className="form-row">
                    <input
                      type="text"
                      value={popupPlace}
                      onChange={(e) => setPopupPlace(e.target.value)}
                      placeholder="സ്ഥലം"
                    />
                    {errors.place && (
                      <span className="error-msg">{errors.place}</span>
                    )}
                  </div>

                  {/* Mobile Number */}
                  <div className="form-row">
                    <input
                      type="text"
                      value={popupMobile}
                      onChange={(e) => {
                        const val = e.target.value;
                        if (/^\d*$/.test(val)) setPopupMobile(val); // only digits
                      }}
                      placeholder="മൊബൈൽ നമ്പർ"
                      maxLength={10}
                    />
                    {errors.mobile && (
                      <span
                        className="error-msg"
                        style={{ color: "red", fontSize: "14px" }}
                      >
                        {errors.mobile}
                      </span>
                    )}
                  </div>

                  {/* Requester Name */}
                  <div className="form-row">
                    <input
                      type="text"
                      value={popupRequesterName}
                      onChange={(e) => setPopupRequesterName(e.target.value)}
                      placeholder="നിങ്ങളുടെ പേര്"
                    />
                    {errors.requester && (
                      <span className="error-msg">{errors.requester}</span>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="popup-actions">
                    <button
                      type="button"
                      onClick={() => {
                        setShowPopup(false);
                        setOtherClubName("");
                        setPopupPlace("");
                        setPopupMobile("");
                        setPopupRequesterName("");
                        setErrors({});
                      }}
                      className="btn-cancel"
                    >
                      Cancel
                    </button>

                    <button
                      type="button"
                      className="btn-save"
                      onClick={() => {
                        const newErrors = {};
                        if (!selectedZone)
                          newErrors.zone = "ദയവായി മേഖല തിരഞ്ഞെടുക്കുക";
                        if (!otherClubName.trim())
                          newErrors.name =
                            "ദയവായി ക്ലബ്‌/കൂട്ടായ്മ/സ്ഥാപനം പേര് നൽകുക";
                        if (!popupPlace.trim())
                          newErrors.place = "ദയവായി സ്ഥലം നൽകുക";
                        if (!popupMobile.trim())
                          newErrors.mobile = "ദയവായി മൊബൈൽ നമ്പർ നൽകുക";
                        else if (popupMobile.length !== 10)
                          newErrors.mobile =
                            "10 അക്കമുള്ള ശരിയായ മൊബൈൽ നമ്പർ നൽകുക";
                        if (!popupRequesterName.trim())
                          newErrors.requester = "ദയവായി പേര് നൽകുക";

                        setErrors(newErrors);
                        {
                          showPopup && (
                            <div className="popup-overlay">
                              <div className="popup-box">
                                <h3>പുതിയ ക്ലബ്‌/കൂട്ടായിമ ചേർക്കുക</h3>
                                <div className="form-row">
                                  <select
                                    id="popup-zone"
                                    value={selectedZone}
                                    onChange={(e) =>
                                      setSelectedZone(e.target.value)
                                    }
                                  >
                                    <option value="" disabled>
                                      മേഖല തിരഞ്ഞെടുക്കുക
                                    </option>
                                    {mekhalOptions.map((zone) => (
                                      <option key={zone.id} value={zone.id}>
                                        {zone.zone_name}
                                      </option>
                                    ))}
                                  </select>
                                  {errors.zone && (
                                    <span className="error-msg">
                                      {errors.zone}
                                    </span>
                                  )}
                                </div>

                                <div className="form-row">
                                  <input
                                    type="text"
                                    value={otherClubName}
                                    onChange={(e) =>
                                      setOtherClubName(e.target.value)
                                    }
                                    placeholder="ക്ലബ്‌ / കൂട്ടായ്മ പേര്"
                                  />
                                  {errors.name && (
                                    <span className="error-msg">
                                      {errors.name}
                                    </span>
                                  )}
                                </div>

                                <div className="form-row">
                                  <input
                                    type="text"
                                    value={popupPlace}
                                    onChange={(e) =>
                                      setPopupPlace(e.target.value)
                                    }
                                    placeholder="സ്ഥലം"
                                  />
                                  {errors.place && (
                                    <span className="error-msg">
                                      {errors.place}
                                    </span>
                                  )}
                                </div>

                                <div className="form-row">
                                  <input
                                    type="text"
                                    value={popupMobile}
                                    onChange={(e) => {
                                      const val = e.target.value;
                                      if (/^\d*$/.test(val)) {
                                        // only digits
                                        setPopupMobile(val);
                                        if (
                                          val.length > 0 &&
                                          val.length !== 10
                                        ) {
                                          setErrors((prev) => ({
                                            ...prev,
                                            mobile:
                                              "10 അക്കമുള്ള ശരിയായ മൊബൈൽ നമ്പർ നൽകുക",
                                          }));
                                        } else {
                                          setErrors((prev) => ({
                                            ...prev,
                                            mobile: undefined,
                                          }));
                                        }
                                      }
                                    }}
                                    placeholder="മൊബൈൽ നമ്പർ"
                                    maxLength={10}
                                  />
                                  {errors.mobile && (
                                    <span
                                      className="error-msg"
                                      style={{ color: "red", fontSize: "14px" }}
                                    >
                                      {errors.mobile}
                                    </span>
                                  )}
                                </div>

                                <div className="form-row">
                                  <input
                                    type="text"
                                    value={popupRequesterName}
                                    onChange={(e) =>
                                      setPopupRequesterName(e.target.value)
                                    }
                                    placeholder="നിങ്ങളുടെ പേര്"
                                  />
                                  {errors.requester && (
                                    <span className="error-msg">
                                      {errors.requester}
                                    </span>
                                  )}
                                </div>

                                <div className="popup-actions">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setShowPopup(false);
                                      setOtherClubName("");
                                      setPopupPlace("");
                                      setPopupMobile("");
                                      setPopupRequesterName("");
                                      setErrors({});
                                    }}
                                    className="btn-cancel"
                                  >
                                    Cancel
                                  </button>

                                  <button
                                    type="button"
                                    className="btn-save"
                                    onClick={() => {
                                      const newErrors = {};
                                      if (!selectedZone)
                                        newErrors.zone =
                                          "ദയവായി മേഖല തിരഞ്ഞെടുക്കുക";
                                      if (!otherClubName.trim())
                                        newErrors.name =
                                          "ദയവായി ക്ലബ്‌ / കൂട്ടായ്മ പേര് നൽകുക";
                                      if (!popupPlace.trim())
                                        newErrors.place = "ദയവായി സ്ഥലം നൽകുക";
                                      if (!popupMobile.trim())
                                        newErrors.mobile =
                                          "ദയവായി മൊബൈൽ നമ്പർ നൽകുക";
                                      if (!popupRequesterName.trim())
                                        newErrors.requester =
                                          "ദയവായി പേര് നൽകുക";

                                      setErrors(newErrors);

                                      if (Object.keys(newErrors).length === 0) {
                                        handleSaveNewOrganization();
                                      }
                                    }}
                                  >
                                    Save
                                  </button>
                                </div>
                              </div>
                            </div>
                          );
                        }
                        // Save only if no errors
                        if (Object.keys(newErrors).length === 0) {
                          handleSaveNewOrganization();
                        }
                      }}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* <div className="form-row"> <label htmlFor="zone">മേഖല<span style={{ color: "red" }}>*</span></label> <select name="zone" id="zone" value={selectedZone} onChange={(e) => setSelectedZone(e.target.value)} required > <option value="" disabled> Select Zone </option> {mekhalOptions.map((zone) => ( <option key={zone.id} value={zone.id}> {zone.zone_name} </option> ))} </select> </div> */}

            {/* User Inputs */}
            <div className="form-row">
              <label htmlFor="order_by_name">
                {" "}
                നിങ്ങളുടെ പേര്<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                id="order_by_name"
                name="order_by_name"
                onChange={(e) => {
                  if (orderByNameError) setOrderByNameError("");
                }}
              />
              {formSubmitted && orderByNameError && (
                <span
                  style={{
                    color: "red",
                    fontSize: "14px",
                    marginTop: "4px",
                    display: "block",
                  }}
                >
                  {orderByNameError}
                </span>
              )}
            </div>

            <div className="form-row">
              <label htmlFor="mobile">
                മൊബൈൽ<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                id="mobile"
                name="mobile"
                value={mainMobile}
                onChange={(e) => {
                  const val = e.target.value;
                  if (/^\d*$/.test(val)) {
                    setMainMobile(val);
                    // Show error only if length > 0 but not equal to 10
                    if (val.length > 0 && val.length !== 10) {
                      setMainMobileError(
                        "10 അക്കമുള്ള ശരിയായ മൊബൈൽ നമ്പർ നൽകുക"
                      );
                    } else {
                      setMainMobileError("");
                    }
                    if (mobileError) setMobileError("");
                  }
                }}
                maxLength={10}
              />
              {formSubmitted && mobileError && (
                <span
                  className="error-msg"
                  style={{ color: "red", fontSize: "14px" }}
                >
                  {mobileError}
                </span>
              )}
              {mainMobileError && (
                <span
                  className="error-msg"
                  style={{ color: "red", fontSize: "14px" }}
                >
                  {mainMobileError}
                </span>
              )}
            </div>

            <div className="form-row">
              <label htmlFor="quantity">
                എത്ര ലിറ്റർ?<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="number"
                id="quantity"
                name="quantity"
                value={quantity}
                onChange={(e) => {
                  let val = e.target.value;

                  // Prevent negatives and zero
                  if (val === "" || Number(val) < 1) {
                    setQuantity("");
                  } else {
                    setQuantity(val);
                  }

                  // if (formSubmitted) setFormSubmitted(false); // reset error on change
                }}
                min={1}
              />
              {formSubmitted && quantity === "" && (
                <span
                  style={{
                    color: "red",
                    fontSize: "14px",
                    marginTop: "4px",
                    display: "block",
                  }}
                >
                  ദയവായി എത്ര ലിറ്റർ എന്ന് നൽകുക
                </span>
              )}
              {Number(quantity) > 100 && (
                <span
                  style={{
                    color: "red",
                    fontSize: "14px",
                    marginTop: "4px",
                    display: "block",
                  }}
                >
                  ഒരു ഓർഡറിൽ 100 ലിറ്റർ മാത്രമാണ് സ്വീകരിക്കുന്നത്. അതിൽ
                  കൂടുതലുള്ള ലിറ്ററുകൾ ഒന്നിലധികം ഓർഡറുകളായി നൽകുക. കൂടുതൽ
                  വിവരങ്ങൾക് <a href="https://wa.me/9847991099">9847991099 </a> എന്ന Whatsapp നമ്പറിൽ ബന്ധപ്പെടുക.
                </span>
              )}
              {quantityError && (
                <span className="error-msg" style={{ color: "red" }}>
                  {quantityError}
                </span>
              )}
            </div>

            <div className="form-row">
              <label htmlFor="delivery_place">
                സ്ഥലം<span style={{ color: "red" }}>*</span>
              </label>
              <input
                type="text"
                id="delivery_place"
                name="delivery_place"
                onChange={(e) => {
                  if (deliveryPlaceError) setDeliveryPlaceError("");
                }}
              />
              {formSubmitted && deliveryPlaceError && (
                <span
                  style={{
                    color: "red",
                    fontSize: "14px",
                    marginTop: "4px",
                    display: "block",
                  }}
                >
                  {deliveryPlaceError}
                </span>
              )}
            </div>

            <div className="form-actions">
              <button
                type="submit"
                className="btn-submit"
                disabled={isSubmitting}
              >
                Submit
              </button>
              <p
                style={{
                  color: "rgb(143 137 137)",
                  marginTop: "18px",
                  textAlign: "end",
                }}
              >
                For any help, please WhatsApp:{" "}
                <a href="https://wa.me/9847991099">9847991099 </a><p>Raihsoft, Karaya</p>
              </p>
            </div>
          </form>
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

      {/* Individual Quantity Popup */}
      {/* {showIndividualQuantityPopup && (
        <div className="custom-popup-overlay">
          <div className="custom-popup-box">
            <div className="custom-popup-header">
              <span
                role="img"
                aria-label="info"
                style={{ fontSize: "2rem", color: "#2196f3" }}
              >
                ℹ
              </span>
              <h2 style={{ margin: "0.5em 0", color: "#1976d2" }}>
                കുറഞ്ഞ അളവ് ഓർഡർ
              </h2>
            </div>
            <div className="custom-popup-body">
              <p style={{ fontSize: "1.2em", color: "#333", lineHeight: "1.5" }}>
                നിങ്ങൾ {quantity} ലിറ്റർ മാത്രമാണ് ഓർഡർ ചെയ്യുന്നത്. 
                5 ലിറ്ററിൽ കുറവുള്ള ഓർഡറുകൾക്ക് ഡെലിവറി ചാർജ് ഉണ്ടാകാം. 
                താഴെയുള്ള നമ്പറിൽ ബന്ധപ്പെട്ട് കൂടുതൽ വിവരങ്ങൾക്ക് അറിയുക.
              </p>
              <p style={{ fontWeight: 'bold', color: '#1976d2', marginTop: '1em' }}>
                Contact: <a href="https://wa.me/9847991099">9847991099</a>
              </p>
            </div>
            <div className="custom-popup-actions" style={{ display: 'flex', gap: '1em', justifyContent: 'center' }}>
              <button
                style={{
                  background: "#f44336",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "0.7em 2em",
                  fontSize: "1em",
                  cursor: "pointer",
                  marginTop: "1em",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                }}
                onClick={handleIndividualQuantityCancel}
              >
                Cancel
              </button>
              <button
                style={{
                  background: "#4caf50",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "0.7em 2em",
                  fontSize: "1em",
                  cursor: "pointer",
                  marginTop: "1em",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                }}
                onClick={handleIndividualQuantityConfirm}
              >
                Confirm Order
              </button>
            </div>
          </div>
        </div>
      )} */}

      {showOrgInactivePopup && (
        <div className="custom-popup-overlay">
          <div className="custom-popup-box">
            <div className="custom-popup-header">
              <span
                role="img"
                aria-label="warning"
                style={{ fontSize: "2rem", color: "#ff9800" }}
              >
                ⚠️
              </span>
              <h2 style={{ margin: "0.5em 0", color: "#d32f2f" }}>
                നിങ്ങളുടെ ക്ലബ്‌/കൂട്ടായ്മ/സ്ഥാപനം ഇതുവെരെ അംഗീകരിച്ചിട്ടില്ല.
              </h2>
            </div>
            <div className="custom-popup-body">
              <p style={{ fontSize: "1.2em", color: "#333" }}>
                {orgInactiveMessage}
              </p>
              {/* <p style={{fontWeight: 'bold', color: '#1976d2'}}>Phone: 9847991099 admin</p> */}
            </div>
            <div className="custom-popup-actions">
              <button
                style={{
                  background:
                    "linear-gradient(90deg, #ff9800 0%, #d32f2f 100%)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "0.7em 2em",
                  fontSize: "1em",
                  cursor: "pointer",
                  marginTop: "1em",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                }}
                onClick={() => setShowOrgInactivePopup(false)}
              >
                OK
              </button>
            </div>
          </div>
          <style>{`
      .custom-popup-overlay {
        position: fixed;
        top: 0; left: 0; right: 0; bottom: 0;
        background: rgba(0,0,0,0.5);
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      .custom-popup-box {
        background: #fff;
        border-radius: 16px;
        box-shadow: 0 4px 24px rgba(0,0,0,0.2);
        padding: 2em 2.5em;
        max-width: 400px;
        text-align: center;
        animation: popupShow 0.3s ease;
      }
      @keyframes popupShow {
        from { transform: scale(0.8); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
      }
      .custom-popup-header h2 {
        color: #d32f2f;
      }
      .custom-popup-body p {
        margin: 0.5em 0;
      }
    `}</style>
        </div>
      )}

      {showOrgAddedPopup && (
        <div className="custom-popup-overlay">
          <div className="custom-popup-box">
            <div className="custom-popup-header">
              <span
                role="img"
                aria-label="success"
                style={{ fontSize: "2rem", color: "#4caf50" }}
              >
                ✅
              </span>
              <h2 style={{ margin: "0.5em 0", color: "#388e3c" }}>Success</h2>
            </div>
            <div className="custom-popup-body">
              <p style={{ fontSize: "1.2em", color: "#333" }}>
                നിങ്ങളുടെ അഭ്യർത്ഥന സ്വികരിച്ചു.വെരിഫിക്കേഷൻ കോഡ് ലഭിക്കാൻ{" "}
                <a
                  href="https://wa.me/9847991099"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "#4caf50", textDecoration: "none" }}
                >
                  9847991099 എന്ന Whatsapp
                </a>{" "}
                നമ്പറിൽ ബന്ധപെടുക.
              </p>
            </div>
            <div className="custom-popup-actions">
              <button
                style={{
                  background:
                    "linear-gradient(90deg, #4caf50 0%, #388e3c 100%)",
                  color: "#fff",
                  border: "none",
                  borderRadius: "8px",
                  padding: "0.7em 2em",
                  fontSize: "1em",
                  cursor: "pointer",
                  marginTop: "1em",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
                }}
                onClick={() => setShowOrgAddedPopup(false)}
              >
                OK
              </button>
            </div>
          </div>
          <style>{`
            .custom-popup-overlay {
              position: fixed;
              top: 0; left: 0; right: 0; bottom: 0;
              background: rgba(0,0,0,0.5);
              z-index: 9999;
              display: flex;
              align-items: center;
              justify-content: center;
            }
            .custom-popup-box {
              background: #fff;
              border-radius: 16px;
              box-shadow: 0 4px 24px rgba(0,0,0,0.2);
              padding: 2em 2.5em;
              max-width: 400px;
              text-align: center;
              animation: popupShow 0.3s ease;
            }
            @keyframes popupShow {
              from { transform: scale(0.8); opacity: 0; }
              to { transform: scale(1); opacity: 1; }
            }
            .custom-popup-header h2 {
              color: #388e3c;
            }
            .custom-popup-body p {
              margin: 0.5em 0;
            }
          `}</style>
        </div>
      )}
    </div>
  );
}

export default SubmitForm;
