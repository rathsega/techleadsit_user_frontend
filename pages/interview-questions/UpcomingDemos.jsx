import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import httpService from "../../services/httpService";
import { useLoader } from "../../contexts/LoaderContext";
import { useRouter } from "next/router";
const UpcomingDemos = ({ handleReserveSeatVisibility, setCourseName, setDemoDate }) => {
    const [upcomingDemos, setUpcomingDemos] = useState([]);
    const router = useRouter();
        const { setLoading } = useLoader();
    useEffect(() => {
        if (typeof window !== "undefined") {
            import("bootstrap/dist/js/bootstrap.bundle.min.js").then((bootstrap) => {
                const carouselElement = document.querySelector("#customCarousel");
                if (carouselElement) {
                    new bootstrap.Carousel(carouselElement, {
                        interval: 3000, // Auto-slide every 3s
                        ride: "carousel",
                        wrap: true,
                        pause: false, // No pause on hover
                    });
                }
            }).catch((error) => console.error("Bootstrap JS load error:", error));
        }

        const getUpcomingDemos = async () => {
            try {
                const response = await httpService.get("courses/upcomingDemos");
                //console.log(response?.data?.upcomingDemos);
                if (response?.data?.upcomingDemos) {
                    setUpcomingDemos(response.data?.upcomingDemos);
                }
            } catch (error) {
                console.error("Error fetching upcoming demos:", error);
            }
        };

        getUpcomingDemos();

    }, []);

    const formatDateTimeIST = (utcDate) => {
        //console.log("Input Date:", utcDate);

        const date = new Date(utcDate); // Convert string to Date object

        // ✅ Extract Date (e.g., "1st April")
        const day = date.getUTCDate(); // Get day without conversion
        const suffix = ["th", "st", "nd", "rd"][(day % 10) > 3 ? 0 : (day % 100 - day % 10 !== 10) * (day % 10)] || "th";
        const month = date.toLocaleString("en-US", { month: "long", timeZone: "UTC" }); // Get month without conversion
        const formattedDate = `${day}${suffix} ${month}`;

        // ✅ Extract Time (e.g., "10:30 AM IST") without converting to IST
        const hours = date.getUTCHours(); // Get hours in UTC
        const minutes = date.getUTCMinutes(); // Get minutes in UTC
        const ampm = hours >= 12 ? "PM" : "AM";
        const formattedHours = hours % 12 || 12; // Convert 24-hour to 12-hour format
        const formattedMinutes = minutes.toString().padStart(2, "0"); // Ensure 2-digit minutes

        const formattedTime = `${formattedHours}:${formattedMinutes} ${ampm} IST`;

        //console.log("Formatted Output:", formattedDate, formattedTime);
        return { formattedDate, formattedTime };
    };

    const openForm = (courseName, demoDate) => {
        setCourseName(courseName);
        setDemoDate(demoDate);
        handleReserveSeatVisibility();
    }

    const openCourse = (slug) => {
        if (slug) {
            setLoading(true)
            router.push(`/${slug}`); // Example route: /slug-value
            setLoading(false)
        } else {
            console.warn("Invalid slug provided!");
        }
    }

    return (
        <div id="customCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
            <div className="carousel-inner">
                {
                    upcomingDemos?.map((demo, index) => (
                        <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={index}>
                            <div className="live-demo-card cursor-pointer"  onClick={() => openForm(demo?.courseTitle, formatDateTimeIST(demo?.demoDate)?.formattedDate + " " + formatDateTimeIST(demo?.demoDate)?.formattedTime)}>
                                <img src="/images/blogs/Announcement-slider.png" alt="Sliding-image" className="Slider-image cursor-pointer" onClick={(e)=>{ e.stopPropagation(); openCourse(demo?.slug)}}  />
                                <div className="Demo-detail-grid cursor-pointer" onClick={(e) => {  e.stopPropagation(); openForm(demo?.courseTitle, formatDateTimeIST(demo?.demoDate)?.formattedDate + " " + formatDateTimeIST(demo?.demoDate)?.formattedTime)}}>
                                    <span className="Upcoming-demo-detail">Upcoming Demo Sessions</span>
                                    <p className="Upcoming-demo-course-name">{demo?.courseTitle}</p>
                                    <img src="/images/blogs/live-demo-img.svg" alt="Demo-Type-image" className="category-carousal-img" />
                                    <span className="Demo-type">Live Demo (online)</span>
                                    <div className="Demo-date-time">
                                        <div className="d-flex align-items-center me-3">
                                            <img src="/images/blogs/demo-date.svg" alt="Calender-image" className="me-2 category-carousal-img" />
                                            <span>{formatDateTimeIST(demo?.demoDate)?.formattedDate}</span>
                                        </div>
                                        <div className="d-flex align-items-center">
                                            <img src="/images/blogs/demo-time.svg" alt="Clock-image" className="me-2 category-carousal-img" />
                                            <span>{formatDateTimeIST(demo?.demoDate)?.formattedTime}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="Reserve-CTA cursor-pointer" onClick={(e) => {  e.stopPropagation(); openForm(demo?.courseTitle, formatDateTimeIST(demo?.demoDate)?.formattedDate + " " + formatDateTimeIST(demo?.demoDate)?.formattedTime)}}>
                                    <button className="Reserve-seat-CTA" onClick={(e) => {  e.stopPropagation(); openForm(demo?.courseTitle, formatDateTimeIST(demo?.demoDate)?.formattedDate + " " + formatDateTimeIST(demo?.demoDate)?.formattedTime)}}>Reserve Your Seat</button>
                                    <p className="Reserve-seat-OP">Grab this now, limited seats available</p>
                                </div>
                            </div>
                        </div>
                    ))
                }

            </div>
        </div>
    );
};

export default UpcomingDemos;
