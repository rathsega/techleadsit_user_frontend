import React, { useEffect, useState, useMemo } from "react";

const toIST = (utcDateStr) => {
  const date = new Date(utcDateStr);
  return new Date(date.getTime() + 5.5 * 60 * 60 * 1000);
};

const getNearestDemo = (demos) => {
  const now = new Date();
  let nearest = null;
  let minDiff = Infinity;
  demos.forEach((demo) => {
    const demoDate = toIST(demo.date);
    const diff = demoDate - now;
    if (diff > 0 && diff < minDiff) {
      minDiff = diff;
      nearest = demoDate;
    }
  });
  return nearest;
};

const getTimeLeft = (targetDate) => {
  const now = new Date();
  const diff = targetDate - now;
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds };
};

const UpcomingDemoHeaderStrip = React.memo(({ demos = [], price, discountedPrice, title }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const nearestDemo = useMemo(() => getNearestDemo(demos), [demos]);

  useEffect(() => {
    if (!nearestDemo) return;
    const update = () => setTimeLeft(getTimeLeft(nearestDemo));
    update();
    const timer = setInterval(update, 1000);
    return () => clearInterval(timer);
  }, [nearestDemo]);

  const discountPercent = useMemo(() => {
    if (price && discountedPrice && price > discountedPrice) {
      return Math.floor(((price - discountedPrice) / price) * 100);
    }
    return 0;
  }, [price, discountedPrice]);
  // console.log("UpcomingDemoHeaderStrip: discountPercent", nearestDemo);

  if (!nearestDemo) {
    return null; // If no upcoming demo, do not render the banner
  }
  // Always render the banner, but hide it visually if no demo

  const timerBoxStyle = { display: "flex", gap: "12px" };
  const timerStyle = { minWidth: 60 };
  const timeBoxStyle = { minWidth: 44, textAlign: "center" };
  const timeSpanStyle = { display: "flex", minWidth: 32, justifyContent: "center" };
  return (
    <div
      className="Course-Page-Upcoming-Batch-banner"
      style={{
        minHeight: "55px", // Reserve space for the banner
        opacity: nearestDemo ? 1 : 0,
        transition: "opacity 0.3s",
        display: "flex",
        alignItems: "center",
      }}
    >
      <div className="Course-Page-Upcoming-Batch-offer-text">
        { discountPercent > 0 ? `Hurry Up! ${discountPercent}% Off on ${title}` : null}
      </div>
      <div className="Course-Page-Upcoming-Batch-countdown">
        <p className="Course-Page-Upcoming-Batch-label">Demo Session Starts In:</p>
        <div className="Course-Page-Upcoming-Batch-countdown-timer-box" style={timerBoxStyle}>
          {["days", "hours"].map((unit) => (
            <div key={unit} className="Course-Page-Upcoming-Batch-countdown-timer" style={timerStyle}>
              <p className="Course-Page-Upcoming-Batch-time-box" style={timeBoxStyle}>
                <span style={timeSpanStyle}>
                  {String(timeLeft[unit]).padStart(2, "0")}
                </span>
              </p>
              <small>{unit.charAt(0).toUpperCase() + unit.slice(1)}</small>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
});

export default UpcomingDemoHeaderStrip;