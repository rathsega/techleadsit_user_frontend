import Image from 'next/image';
import React from 'react';
const UpcomingFreeDemoClass = ({ details, openForm}) => {
    
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

    const FetchDate = (dateString) => {
        if (!dateString) return null; // ✅ Handle undefined/null input

        const date = new Date(dateString);
        if (isNaN(date)) return null; // ✅ Handle invalid date

        const getOrdinalSuffix = (day) => {
            if (day > 3 && day < 21) return "th"; // Covers 4th to 20th
            const lastDigit = day % 10;
            return lastDigit === 1 ? "st" : lastDigit === 2 ? "nd" : lastDigit === 3 ? "rd" : "th";
        };

        const day = date.getDate();
        const month = new Intl.DateTimeFormat("en-US", { month: "long" }).format(date);

        return `${day}${getOrdinalSuffix(day)} ${month}`;
    };

    return (
        <section className="upcoming-free-demo-section">
            <div className="row upcoming-free-demo upcoming-m">
                <div className="col-lg-6 text-center free-demo-pr">
                    <Image src={process.env.NEXT_PUBLIC_FILES_URL + details?.image?.path}  alt="Mobile Mockup"
                        className="img-fluid mockup-img" width={1200}
                        height={600}
                        sizes="(max-width: 600px) 100vw, (max-width: 1200px) 80vw, 50vw"
                        fetchPriority="low" />
                </div>

                <div className="col-lg-6 free-demo-pl free-demo-content">
                    <div className="free-demo-sub-content">
                        <span className="badge">Upcoming Free Demo class</span>
                        <h2 className="free-demo-h" dangerouslySetInnerHTML={{ __html: details?.demoTitle }}></h2>
                        <p className="free-demo-p" >{details?.shortDescription}</p>
                        <div className="icon-border">
                            <div className="d-flex align-items-center mb-4">
                                <Image src='/images/demo/clock icon.svg' height="25" width="25" className="icon-1-f me-2" />
                                <span className="details-f">{FetchTimeParts(details?.dateTime)?.time}</span>
                            </div>
                            <div className="d-flex align-items-center mt-4">
                                <Image src='/images/demo/date icon.svg' height="25" width="25" className="icon-1-f me-2" />
                                <span className="details-f">{FetchDate(details?.dateTime)}</span>
                            </div>
                        </div>
                        <button className="free-demo-btn mt-2"   onClick={() => {
                        openForm("Kick Start Your Journey");
                    }}>Kick Start Your Journey!!</button>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default UpcomingFreeDemoClass;