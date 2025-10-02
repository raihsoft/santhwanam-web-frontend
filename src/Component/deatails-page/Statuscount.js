import React, { useEffect, useCallback, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import "./Statuscount.css";

const Statuscount = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [clubs, setClubs] = useState([]);

  const club = location.state;

  const fetchClubs = useCallback(async () => {
    try {
      const response = await fetch("/api/clubs");
      const data = await response.json();
      setClubs(data);
    } catch (error) {
      console.error("Failed to fetch clubs:", error);
    }
  }, []);

  useEffect(() => {
    fetchClubs();
  }, [fetchClubs]);

  if (!club) {
    return (
      <div className="clubb-container">
        <h2>⚠ No Club Data Found</h2>
        <button onClick={() => navigate("/")}>Go Back</button>
      </div>
    );
  }

  const handleDownload = () => {
    const card = document.querySelector(".status-card");
    if (!card) return;

    const img = card.querySelector(".bg-template");

    const capture = () => {
      html2canvas(card, {
        useCORS: true,
        allowTaint: true,
        scale: window.devicePixelRatio, // ensures high-res
      }).then((canvas) => {
        const link = document.createElement("a");
        link.download = `${club.organization_name || "status"}-status.png`;
        link.href = canvas.toDataURL("image/png");
        link.click();
      });
    };

    // Ensure the background image is fully loaded before capturing
    if (img.complete) {
      capture();
    } else {
      img.onload = capture;
    }
  };

  return (
    <div className="clubb-container">
      <div className="status-card">
        {/* Background Image */}
        <img src="/img/TEMPLATE.jpg" alt="template" className="bg-template" />

        {/* Top Text */}
        <div className="overlay-text top-text">www.santhwanamcare.com</div>

        {/* Content Overlay - Center */}
        <div className="card-content">
          <h2 className="org-name">{club.organization_name}</h2>
          <div className="big-number">{club.total_count}</div>
        </div>

        {/* Bottom Text */}
        <div className="overlay-text bottom-text">www.raihsoft.com</div>
      </div>

      {/* Download Button */}
      <button className="download-btn" onClick={handleDownload}>
        ⬇ Download
      </button>
    </div>
  );
};

export default Statuscount;
