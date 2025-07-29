import React, { useEffect, useState } from "react";
import httpService from "../../services/httpService";

const HeaderStrip = React.memo(() => {
    const [tickerData, setTickerData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const controller = new AbortController();
        const fetchTickerData = async () => {
            try {
                const response = await httpService.get("courses/getNearestUpcomingDemos", {
                    signal: controller.signal,
                });
                if (response?.data) {
                    setTickerData(response.data);
                }
            } catch (error) {
                // Optionally handle error
            } finally {
                setLoading(false);
            }
        };
        fetchTickerData();
        return () => controller.abort();
    }, []);

    if (loading) {
        return (
            <div className="Home-Page-Upcoming-Batch-ticker-wrapper" style={{ minHeight: 32 }}>
                {/* Optionally a spinner or skeleton */}
            </div>
        );
    }

    if (!tickerData.length) return null;

    return (
        <div className="Home-Page-Upcoming-Batch-ticker-wrapper">
            <div className="Home-Page-Upcoming-Batch-ticker">
                {tickerData.map((item, idx) => (
                    <p key={item._id || idx}>
                        <img src="/images/home/Annoucement-Icon.webp" height="22" width="22" alt="Announcement" />{" "}
                        {item.course} - {item.date}
                        {idx !== tickerData.length - 1 && (
                            <span style={{ margin: "0 18px", color: "#888" }}>|</span>
                        )}
                    </p>
                ))}
            </div>
        </div>
    );
});

export default HeaderStrip;