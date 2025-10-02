import React, { useEffect, useState } from "react";
import "./Spinner.css"; // use the CSS animation you shared

const Spinner = () => {
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500); // fade out start
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loading) {
      // remove completely after fade-out transition (0.5s)
      const hideTimer = setTimeout(() => setVisible(false), 500);
      return () => clearTimeout(hideTimer);
    }
  }, [loading]);

  if (!visible) return null; // completely unmount after fade-out

  return (
    <div
      id="spinner"
      className={`bg-white position-fixed translate-middle w-100 vh-100 top-50 start-50 d-flex align-items-center justify-content-center ${
        loading ? "show" : ""
      }`}
    >
      <div className="spinner-grow text-primary m-1" role="status">
        <span className="sr-only">Loading...</span>
      </div>
      <div className="spinner-grow text-success m-1" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  );
};

export default Spinner;
