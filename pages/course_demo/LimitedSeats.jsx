import React, { useState, useEffect } from 'react';
const bgImage = "/images/limited-seats-bg.png"; // Import local image
import Image from 'next/image';


const LimitedSeats = ({ details, openForm }) => {
    const target = new Date(details?.dateTime).getTime();

    const updateTimer = () => {
        const now = new Date().getTime();
        const difference = target - now;
        if (difference <= 0) {
            setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / (1000 * 60)) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({
            days: String(days).padStart(2, "0"),
            hours: String(hours).padStart(2, "0"),
            minutes: String(minutes).padStart(2, "0"),
            seconds: String(seconds).padStart(2, "0"),
        });
    };

    // State for countdown timer
    const [timeLeft, setTimeLeft] = useState({
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
    });

    // Run the update every second
    useEffect(() => {
        const timer = setInterval(updateTimer, 1000);

        // Cleanup the interval when the component unmounts
        return () => clearInterval(timer);
    }, [details?.dateTime]); // Re-run when `details?.dateTime` changes


    useEffect(() => {
        const updateTimer = () => {
            const now = new Date().getTime(); // User's local time
            const target = new Date(details?.dateTime).getTime(); // Convert target time to local time
            const difference = target - now;

            if (difference <= 0) {
                setTimeLeft({ days: "00", hours: "00", minutes: "00", seconds: "00" });
                return;
            }

            const days = Math.floor(difference / (1000 * 60 * 60 * 24));
            const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
            const minutes = Math.floor((difference / (1000 * 60)) % 60);
            const seconds = Math.floor((difference / 1000) % 60);

            setTimeLeft({
                days: String(days).padStart(2, "0"),
                hours: String(hours).padStart(2, "0"),
                minutes: String(minutes).padStart(2, "0"),
                seconds: String(seconds).padStart(2, "0"),
            });
        };

        updateTimer(); // Initialize immediately
        const timer = setInterval(updateTimer, 1000);

        return () => clearInterval(timer);
    }, [details?.dateTime]);

    return (<section className="Limited-seats-section">
        <div className="demo_banner">
            <div className="demo_content">
                <h1 className="demo_content-h">"Limited Seats Available – Don’t Miss Out!"</h1>
                <p className="demo_content-para">"Reserve your spot for the free demo session now. Time is ticking, and seats are
                    filling up fast!"</p>
                <p className="imp-content-para">Hurry! Only 20 spots left for this session.</p>
                <div className="timer">
                    <div className="df-al-c">
                        <div className="time-box"><span>{timeLeft.days}</span> Days</div><span className="dot-icon">:</span>
                    </div>
                    <div className="df-al-c">
                        <div className="time-box"><span>{timeLeft.hours}</span> Hours</div><span className="dot-icon">:</span>
                    </div>
                    <div className="df-al-c">
                        <div className="time-box"><span>{timeLeft.minutes}</span> Minutes</div><span className="dot-icon">:</span>
                    </div>
                    <div className="df-al-c">
                        <div className="time-box"><span>{timeLeft.seconds}</span> Seconds</div>
                    </div>
                </div>
                <div className='text-center'>
                    <button className="limited-seats-btn demo_register-btn" onClick={() => {
                        openForm("Try Before You Enrol");
                    }}>Try Before You Enroll<Image src='/images/demo/Right-plan-arrow.png' alt='Arrow icon' height="14" className="ms-2 h-11"
                        style={{ "transform": "rotate(-45deg)" }} /></button>
                </div>
            </div>
        </div>
    </section>)
}
export default LimitedSeats;