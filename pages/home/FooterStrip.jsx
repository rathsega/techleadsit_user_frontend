import { useState, useEffect, useRef } from "react";
const FooterStrip = () => {
    const [showStripByScroll, setShowStripByScroll] = useState(false);
    const [isMobile, setIsMobile] = useState(false);


    useEffect(() => {
        const handleScroll = () => {
            const scrolledToBottom =
                window.innerHeight + window.scrollY >= document.body.scrollHeight;
            //console.log(scrolledToBottom)
            if (scrolledToBottom) {
                setShowStripByScroll(false); // hide element
            } else {
                setShowStripByScroll(true); // show element
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    // Detect mobile device
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 993);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
            const handleScroll = () => {
                const mainCourseStripCust = document.getElementById("mainCourseStrip");
                const mainCourseStripTextCust = document.querySelectorAll("#mainCourseStrip .mainCoursetext");
                const mainCourseStripPaths = document.querySelectorAll("#mainCourseStrip svg path");
    
                if (mainCourseStripCust) {
                    if (window.scrollY > 50) {
                        mainCourseStripCust.style.backgroundColor = "#ffffff";
    
                        mainCourseStripTextCust.forEach((text) => {
                            text.style.color = "#006FAA";
                        });
    
                        mainCourseStripPaths.forEach((path) => {
                            path.setAttribute("fill", "#006FAA");
                        });
                    } else {
                        mainCourseStripCust.style.backgroundColor = "transparent";
    
                        mainCourseStripTextCust.forEach((text) => {
                            text.style.color = "#ffffff";
                        });
    
                        mainCourseStripPaths.forEach((path) => {
                            path.setAttribute("fill", "#ffffff");
                        });
                    }
                }
            };
    
            window.addEventListener("scroll", handleScroll);
    
            // Cleanup on unmount
            return () => {
                window.removeEventListener("scroll", handleScroll);
            };
        }, []);

    return (
        isMobile && showStripByScroll && <div className="Main-Course-Banner-Strip" id="mainCourseStrip">
            <div className="d-flex fl-d-cl-aic">
                
                <div className="ms-2 mainCoursetext">
                    <p className="Main-Course-strip-p1">Program Duration</p>
                    <p className="Main-Course-strip-p2">2 Months</p>
                </div>
            </div>

            <div className="d-flex fl-d-cl-aic">
                <svg xmlns="http://www.w3.org/2000/svg" width="49" height="48" className="Main-Course-Strip-Icons"
                    viewBox="0 0 49 48" fill="none">
                    <path id="mainCoursepath4"
                        d="M41.2992 13.1992C41.2992 11.6079 40.6671 10.0818 39.5419 8.95658C38.4166 7.83136 36.8905 7.19922 35.2992 7.19922H13.6992C12.1079 7.19922 10.5818 7.83136 9.45658 8.95658C8.33136 10.0818 7.69922 11.6079 7.69922 13.1992V14.3992H41.2992V13.1992ZM41.2992 23.0392V16.7992H7.69922V34.7992C7.69922 36.3905 8.33136 37.9166 9.45658 39.0419C10.5818 40.1671 12.1079 40.7992 13.6992 40.7992H23.5392C22.27 38.3147 21.8207 35.4919 22.2556 32.7361C22.6906 29.9803 23.9876 27.4332 25.9604 25.4604C27.9332 23.4876 30.4803 22.1906 33.2361 21.7556C35.9919 21.3207 38.8147 21.77 41.2992 23.0392ZM46.0992 34.7992C46.0992 37.6636 44.9614 40.4106 42.936 42.436C40.9106 44.4614 38.1636 45.5992 35.2992 45.5992C32.4349 45.5992 29.6879 44.4614 27.6625 42.436C25.6371 40.4106 24.4992 37.6636 24.4992 34.7992C24.4992 31.9349 25.6371 29.1879 27.6625 27.1625C29.6879 25.1371 32.4349 23.9992 35.2992 23.9992C38.1636 23.9992 40.9106 25.1371 42.936 27.1625C44.9614 29.1879 46.0992 31.9349 46.0992 34.7992ZM40.6104 33.7504L33.4824 29.7904C33.2998 29.6888 33.0937 29.6367 32.8847 29.6393C32.6757 29.6418 32.471 29.6989 32.2909 29.8048C32.1107 29.9108 31.9613 30.062 31.8576 30.2434C31.7538 30.4248 31.6992 30.6302 31.6992 30.8392V38.7592C31.6992 38.9682 31.7538 39.1736 31.8576 39.3551C31.9613 39.5365 32.1107 39.6877 32.2909 39.7936C32.471 39.8996 32.6757 39.9567 32.8847 39.9592C33.0937 39.9617 33.2998 39.9096 33.4824 39.808L40.6104 35.848C40.7974 35.7441 40.9532 35.592 41.0617 35.4076C41.1701 35.2232 41.2273 35.0132 41.2273 34.7992C41.2273 34.5853 41.1701 34.3752 41.0617 34.1908C40.9532 34.0064 40.7974 33.8544 40.6104 33.7504Z"
                        fill="white" />
                </svg>
                <div className="ms-2 mainCoursetext">
                    <p className="Main-Course-strip-p1">Next Demo Date</p>
                    <p className="Main-Course-strip-p2">25th, July 2025</p>
                </div>
            </div>

            <div className="d-flex md-strip-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="49" height="48" className="Main-Course-Strip-Icons"
                    viewBox="0 0 49 48" fill="none">
                    <path id="mainCoursepath5"
                        d="M19.46 6.93784C16.0728 5.32066 11.3384 4.52847 5.00001 4.50034C4.40223 4.49222 3.81618 4.66653 3.32 5.00003C2.91274 5.27531 2.57937 5.64644 2.34919 6.08079C2.11902 6.51514 1.99911 6.9994 2 7.49097V34.3128C2 36.126 3.29 37.4938 5.00001 37.4938C11.6628 37.4938 18.3463 38.1163 22.3494 41.9C22.4041 41.952 22.473 41.9868 22.5473 42C22.6217 42.0132 22.6983 42.0043 22.7676 41.9743C22.8369 41.9443 22.8959 41.8947 22.9372 41.8315C22.9785 41.7682 23.0004 41.6943 23 41.6188V10.0147C23.0001 9.8015 22.9545 9.59074 22.8662 9.39666C22.7779 9.20259 22.6489 9.02972 22.4881 8.88972C21.5712 8.10581 20.5526 7.44926 19.46 6.93784ZM45.68 4.99722C45.1836 4.66455 44.5975 4.49121 44 4.50034C37.6616 4.52847 32.9272 5.31691 29.54 6.93784C28.4475 7.44832 27.4286 8.10359 26.5109 8.88597C26.3504 9.02617 26.2218 9.19911 26.1337 9.39315C26.0455 9.58719 26 9.79785 26 10.011V41.6169C26 41.6895 26.0213 41.7604 26.0615 41.8209C26.1016 41.8813 26.1587 41.9286 26.2256 41.9567C26.2925 41.9849 26.3662 41.9926 26.4375 41.979C26.5087 41.9655 26.5744 41.9311 26.6263 41.8803C29.0328 39.4897 33.2563 37.491 44.0038 37.4919C44.7994 37.4919 45.5625 37.1758 46.1251 36.6132C46.6877 36.0506 47.0038 35.2876 47.0038 34.4919V7.49191C47.0049 6.99937 46.8847 6.51413 46.6538 6.07905C46.4229 5.64397 46.0885 5.27242 45.68 4.99722Z"
                        fill="white" />
                </svg>
                <div className="ms-2 mainCoursetext">
                    <p className="Main-Course-strip-p1">Learning Format</p>
                    <p className="Main-Course-strip-p2">Classroom, Online, Videos</p>
                </div>
            </div>

            <div className="d-flex md-strip-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="49" height="48" className="Main-Course-Strip-Icons"
                    viewBox="0 0 49 48" fill="none">
                    <path id="mainCoursepath6" fillRule="evenodd" clipRule="evenodd"
                        d="M16.5 14C16.5 11.8783 17.3429 9.84344 18.8431 8.34315C20.3434 6.84285 22.3783 6 24.5 6C26.6217 6 28.6566 6.84285 30.1569 8.34315C31.6571 9.84344 32.5 11.8783 32.5 14C32.5 16.1217 31.6571 18.1566 30.1569 19.6569C28.6566 21.1571 26.6217 22 24.5 22C22.3783 22 20.3434 21.1571 18.8431 19.6569C17.3429 18.1566 16.5 16.1217 16.5 14ZM16.5 26C13.8478 26 11.3043 27.0536 9.42893 28.9289C7.55357 30.8043 6.5 33.3478 6.5 36C6.5 37.5913 7.13214 39.1174 8.25736 40.2426C9.38258 41.3679 10.9087 42 12.5 42H36.5C38.0913 42 39.6174 41.3679 40.7426 40.2426C41.8679 39.1174 42.5 37.5913 42.5 36C42.5 33.3478 41.4464 30.8043 39.5711 28.9289C37.6957 27.0536 35.1522 26 32.5 26H16.5Z"
                        fill="white" />
                </svg>
                <div className="ms-2 mainCoursetext">
                    <p className="Main-Course-strip-p1">Trainer</p>
                    <p className="Main-Course-strip-p2">Rajana Sekhar</p>
                </div>
            </div>

            <div className="mainCoursetext Price-d-fl-aic">
                <p className="Main-Course-strip-p1">Price</p>
                 <p className="Main-Course-strip-p2"><span className="Main-Course-strip-p2-span ">₹25,000</span></p>
            </div>

        </div>
    )
}

export default FooterStrip;