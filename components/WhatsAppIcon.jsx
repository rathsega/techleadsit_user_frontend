import React, { useState, useEffect } from 'react';
const WhatsAppIcon = () => {

    useEffect(() => {
        // Detect if device is touch device
        const checkIsMobile = () => {
            setIsMobile(window.innerWidth <= 768); // you can fine-tune breakpoint
        };
        checkIsMobile();
        window.addEventListener("resize", checkIsMobile);
        return () => window.removeEventListener("resize", checkIsMobile);
    }, []);


    const handleClick = (e) => {

        window.open(
            "https://api.whatsapp.com/send?phone=918889993194&text=",
            "_blank",
            "noopener,noreferrer"
        );

        if (isMobile) {
            setIsExpanded(true);
            setTimeout(() => setIsExpanded(false), 2000); // collapse after 2s
        }


    };

    const [isExpanded, setIsExpanded] = useState(false);
    const [isMobile, setIsMobile] = useState(false);


    return (
        <button className={`Quick-Whatsapp-Btn ${isExpanded ? 'expanded' : ''}`}
            onMouseEnter={() => !isMobile && setIsExpanded(true)}
            onMouseLeave={() => !isMobile && setIsExpanded(false)}
            onClick={handleClick}>
            <div className="Quick-Whatsapp-Icon">
                <i className="fab fa-whatsapp"></i>
            </div>
            <div className="Quick-Whatsapp-Text">Whatsapp</div>
        </button>
    );
};

export default WhatsAppIcon;