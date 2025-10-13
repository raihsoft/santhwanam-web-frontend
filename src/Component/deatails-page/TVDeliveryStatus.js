import React, { useState, useEffect, useCallback, useRef } from "react";
import "./TVDeliveryStatus.css";
import { apiCall } from "../Api";

const LIST_ENDPOINT = "order/organizations";
const STATUS_ENDPOINT = "order/order_status/";

const TVDeliveryStatus = () => {
  const [clubs, setClubs] = useState([]);
  const [totalDelivered, setTotalDelivered] = useState(0);
  const [totalStock, setTotalStock] = useState(0);
  const [totalApproved, setTotalApproved] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [animatedDelivered, setAnimatedDelivered] = useState(0);
  const previousDeliveredRef = useRef(0);
  const animationRef = useRef(null);

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

  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Fetch clubs and totals simultaneously
      const [clubsList, totalsRes] = await Promise.all([
        fetchAllPages(LIST_ENDPOINT),
        apiCall.get(STATUS_ENDPOINT)
      ]);

      // Process clubs data
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
          };
        })
        .filter(
          (club) =>
            club.organization_name &&
            club.organization_name.toLowerCase() !== "unknown"
        )
        .sort((a, b) => b.delivered_count - a.delivered_count);

      setClubs(cleaned); // Show all clubs for TV display

      // Set totals
      const totalsData = totalsRes.data || totalsRes;
      setTotalDelivered(totalsData.total_delivered || 0);
      setTotalStock(totalsData.total_stock || 0);
      setTotalApproved(totalsData.total_approved || 0);
    } catch (err) {
      console.error("Error fetching data:", err);
      setError("Failed to load data. Retrying...");
    } finally {
      setLoading(false);
    }
  }, []);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Cleanup animation on unmount
  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  // Auto-refresh data every 30 seconds
  useEffect(() => {
    fetchData();
    const interval = setInterval(() => {
      fetchData();
    }, 30000);
    return () => clearInterval(interval);
  }, [fetchData]);

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  };

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Animate number changes
  const animateNumber = useCallback((from, to, duration = 2000) => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
    }

    const startTime = Date.now();
    const difference = to - from;

    const animate = () => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      
      const currentValue = Math.round(from + (difference * easeOutQuart));
      setAnimatedDelivered(currentValue);

      if (progress < 1) {
        animationRef.current = requestAnimationFrame(animate);
      }
    };

    animationRef.current = requestAnimationFrame(animate);
  }, []);

  // Effect to trigger animation when totalDelivered changes
  useEffect(() => {
    const previousValue = previousDeliveredRef.current;
    const newValue = totalDelivered;

    if (previousValue !== newValue) {
      animateNumber(previousValue, newValue);
      previousDeliveredRef.current = newValue;
    }
  }, [totalDelivered, animateNumber]);

  const deliveryPercentage = totalApproved > 0 
    ? ((totalDelivered / totalApproved) * 100).toFixed(1) 
    : 0;

  const getRankEmoji = (rank) => {
    switch(rank) {
      case 1: return "🏆";
      case 2: return "🥈";
      case 3: return "🥉";
      default: return "🏅";
    }
  };

  if (loading && clubs.length === 0) {
    return (
      <div className="tv-container">
        <div className="loading-screen">
          <div className="loading-spinner"></div>
          <h2>Loading Delivery Status...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="tv-container">
      {/* Animated Background */}
      <div className="animated-background">
        <div className="floating-shapes">
          {[...Array(20)].map((_, i) => (
            <div key={i} className={`shape shape-${i % 4}`}></div>
          ))}
        </div>
      </div>

      {/* Header Section */}
      <header className="tv-header">
        <div className="logo-section">
          <img 
            src="/img/logo-santhwanam-pkd-removebg-preview.png" 
            alt="Santhwanam Logo" 
            className="tv-logo"
          />
        </div>
        
        <div className="title-section">
          <h1 className="main-title">മധുര സാന്ത്വനം</h1>
          <h2 className="sub-title">പാലട പായസം ചലഞ്ച് - ഒക്ടോബർ 14</h2>
          <div className="live-indicator">
            <span className="pulse-dot"></span>
            LIVE STATUS
          </div>
        </div>

        <div className="time-section">
          <div className="current-time">{formatTime(currentTime)}</div>
          <div className="current-date">{formatDate(currentTime)}</div>
        </div>
      </header>

      {/* Main Content with Stats and Organizations */}
      <div className="main-content-section">
        {/* Left Side Organizations */}
        <div className="left-organizations">
          {clubs.slice(0, Math.ceil(clubs.length / 2)).map((club, index) => {
            const rank = index + 1;
            return (
              <div key={club.id} className={`organization-card rank-${rank <= 3 ? rank : 'other'}`}>
                <div className="organization-name">{club.organization_name}</div>
                
                <div className="delivery-info">
                  <div className="delivery-amount">{club.delivered_count} LTR</div>
                  <div className="percentage-text">({club.percentage}%)</div>
                </div>
                
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${Math.min(club.percentage, 100)}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Center Stats Section */}
        <div className="center-stats">
          <div className="main-stat-card delivered">
            <div className="stat-icon">🚚</div>
            <div className="stat-number animated-number">{animatedDelivered}</div>
            <div className="stat-unit">LTR</div>
            <div className="stat-label">DELIVERED</div>
            
            <div className="progress-ring">
              <svg className="progress-circle" width="160" height="160">
                <circle
                  cx="80"
                  cy="80"
                  r="65"
                  fill="transparent"
                  stroke="rgba(255,255,255,0.2)"
                  strokeWidth="6"
                />
                <circle
                  cx="80"
                  cy="80"
                  r="65"
                  fill="transparent"
                  stroke="#00ff88"
                  strokeWidth="6"
                  strokeDasharray={`${(deliveryPercentage * 408.4) / 100} 408.4`}
                  strokeLinecap="round"
                  transform="rotate(-90 80 80)"
                />
              </svg>
              <div className="percentage-text">{deliveryPercentage}%</div>
            </div>
          </div>

          <div className="secondary-stats">
            <div className="stat-card stock">
              <div className="stat-icon">📦</div>
              <div className="stat-number">{(totalStock || 0) - (totalDelivered || 0)}</div>
              <div className="stat-label">REMAINING STOCK</div>
            </div>
            
            <div className="stat-card approved">
              <div className="stat-icon">✅</div>
              <div className="stat-number">{totalApproved}</div>
              <div className="stat-label">TOTAL APPROVED</div>
            </div>
            
            <div className="stat-card total">
              <div className="stat-icon">📊</div>
              <div className="stat-number">{totalStock}</div>
              <div className="stat-label">TOTAL STOCK</div>
            </div>
          </div>
        </div>

        {/* Right Side Organizations */}
        <div className="right-organizations">
          {clubs.slice(Math.ceil(clubs.length / 2)).map((club, index) => {
            const rank = Math.ceil(clubs.length / 2) + index + 1;
            return (
              <div key={club.id} className={`organization-card rank-${rank <= 3 ? rank : 'other'}`}>
                <div className="organization-name">{club.organization_name}</div>
                
                <div className="delivery-info">
                  <div className="delivery-amount">{club.delivered_count} LTR</div>
                  <div className="percentage-text">({club.percentage}%)</div>
                </div>
                
                <div className="progress-bar">
                  <div 
                    className="progress-fill" 
                    style={{ width: `${Math.min(club.percentage, 100)}%` }}
                  ></div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <footer className="tv-footer">
        <div className="refresh-indicator">
          <span className="refresh-dot"></span>
          Auto-refresh every 30 seconds
        </div>
        <div className="powered-by">
          Powered by <strong>Raihsoft Technologies</strong>
        </div>
        {error && (
          <div className="error-message">
            ⚠️ {error}
          </div>
        )}
      </footer>
    </div>
  );
};

export default TVDeliveryStatus;