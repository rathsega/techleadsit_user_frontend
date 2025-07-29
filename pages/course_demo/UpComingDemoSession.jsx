import React, { useState, useEffect } from 'react';
import Image from 'next/image';



const UpCominDemoSession = ({ details }) => {
    const [imageSrc, setImageSrc] = useState("");
    const [endTime, setEndTime] = useState("");

    const calculateEndTime = (startTime, duration) => {
        if (!startTime || !duration) return;

        // Extract hours, minutes, and AM/PM
        const [time, modifier] = startTime.split(" ");
        let [hours, minutes] = time.split(":").map(Number);

        // Convert to 24-hour format
        if (modifier.toLowerCase() === "pm" && hours !== 12) {
            hours += 12;
        } else if (modifier.toLowerCase() === "am" && hours === 12) {
            hours = 0;
        }

        // Convert everything to minutes and add duration
        const totalMinutes = hours * 60 + minutes + parseInt(duration, 10);

        // Calculate end time
        const endHours = Math.floor(totalMinutes / 60) % 24;
        const endMinutes = totalMinutes % 60;

        // Convert back to 12-hour format with AM/PM
        const amPm = endHours >= 12 ? "PM" : "AM";
        let finalHours = endHours % 12 || 12; // Convert 0 to 12 for AM times

        return `${finalHours.toString().padStart(2, "0")}:${endMinutes
            .toString()
            .padStart(2, "0")} ${amPm}`;
    };

    const FetchTimeParts = (dateString) => {
        if (!dateString) return null; // ✅ Handle undefined/null input

        const date = new Date(dateString);

        if (isNaN(date)) return null; // ✅ Handle invalid date

        // Get day with suffix (st, nd, rd, th)
        const getDayWithSuffix = (day) => {
            if (day > 3 && day < 21) return day + "th"; // 11th, 12th, 13th...
            const suffixes = ["th", "st", "nd", "rd"];
            return day + (suffixes[day % 10] || "th");
        };

        return {
            year: date.getFullYear(),
            month: new Intl.DateTimeFormat("en-US", { month: "long" }).format(date),
            day: getDayWithSuffix(date.getDate()), // ✅ Converts 25 → "25th"
            time: new Intl.DateTimeFormat("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
                timeZone: "Asia/Kolkata",
            }).format(date),
        };
    };


    return (
        <section className="Demo-section-timings">
            <div className="demo-section-main">
                <div className="demo-section-sub">
                    <div className="d-flex align-items-center" style={{ "padding": "12px 10px" }}>
                        <div className="d-flex flex-column demo-section-sc1">
                            <p>{FetchTimeParts(details?.dateTime)?.year}</p>
                            <h1>{FetchTimeParts(details?.dateTime)?.day}</h1>
                            <span>{FetchTimeParts(details?.dateTime)?.month}</span>
                        </div>
                        <div className="demo-section-sc2">
                            <h3>Upcoming Demo Session</h3>
                            <p className="demo-section-cust mt-3">{details?.courseTitle}</p>
                            <div className="d-flex align-items-center">
                                <Image src='/images/demo/clock icon.svg' height="25" className="h-18" alt='Clock Icon' />
                                <p className="demo-section-cust ms-1 mb-0">{FetchTimeParts(details?.dateTime)?.time} - {calculateEndTime(FetchTimeParts(details?.dateTime)?.time, details?.duration)} </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="demo-section-sub">
                    <div className="d-flex align-items-center" style={{ "padding": "12px 10px" }}>
                        <Image src={process.env.NEXT_PUBLIC_FILES_URL + details?.trainerImage?.path} height="150" width="150" alt='Trainer Image' className="h-105" />
                        <div className="demo-section-sc3">
                            <h3>
                                {details?.trainerName}
                            </h3>
                            <p className="mt-3">{details?.trainerDesignation}</p>
                            <p style={{ "fontSize": "15px" }} className="fs-10">{details?.aboutTrainer}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default UpCominDemoSession;