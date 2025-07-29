import React, { useState, useRef, useEffect } from "react";

const panelsContent = {
    all: (
        <div className="Header-All-Category-Icon-card-Container">
            <div class="Header-All-Category-Icon-card">
                <img src="/images/header/Oracle-Fusion-Icon.svg" alt="Oracle Fusion" class="Header-All-Category-Icon" />
                <p class="Header-All-Category-Icon-card-Para">Oracle Fusion</p>
            </div>
            <div class="Header-All-Category-Icon-card">
                <img src="/images/header/Oracle-EBS-Icon.svg" alt="Oracle EBS" class="Header-All-Category-Icon" />
                <p class="Header-All-Category-Icon-card-Para">Oracle EBS</p>
            </div>
            <div class="Header-All-Category-Icon-card">
                <img src="/images/header/SAP-Icon.svg" alt="SAP" class="Header-All-Category-Icon" />
                <p class="Header-All-Category-Icon-card-Para">SAP</p>
            </div>
            <div class="Header-All-Category-Icon-card">
                <img src="/images/header/Workday-HCM-Icon.svg" alt="Workday HCM" class="Header-All-Category-Icon" />
                <p class="Header-All-Category-Icon-card-Para">Workday HCM</p>
            </div>
            <div class="Header-All-Category-Icon-card">
                <img src="/images/header/Sales-Force-Icon.svg" alt="Salesforce" class="Header-All-Category-Icon" />
                <p class="Header-All-Category-Icon-card-Para">Salesforce</p>
            </div>
            <div class="Header-All-Category-Icon-card">
                <img src="/images/header/Data-Science-Icon.svg" alt="Data Science" class="Header-All-Category-Icon" />
                <p class="Header-All-Category-Icon-card-Para">Data Science</p>
            </div>
        </div>
    ),
    fusion: (
        <div className="Header-Oracle-Fusion-Content-Section">
            <div class="Header-Oracle-Fusion-Content">
                <img src="/images/header/Header-Arrow-Mark-Icon.svg" alt="Arrow-Mark-Pointer" />
                <p class="Header-Oracle-Fusion-Content-P">Oracle Fusion SCM Online Training</p>
            </div>
            <div class="Header-Oracle-Fusion-Content">
                <img src="/images/header/Header-Arrow-Mark-Icon.svg" alt="Arrow-Mark-Pointer" />
                <p class="Header-Oracle-Fusion-Content-P">Oracle Fusion HCM Online Training</p>
            </div>
            <div class="Header-Oracle-Fusion-Content">
                <img src="/images/header/Header-Arrow-Mark-Icon.svg" alt="Arrow-Mark-Pointer" />
                <p class="Header-Oracle-Fusion-Content-P">Oracle Fusion Financials Online Training</p>
            </div>
            <div class="Header-Oracle-Fusion-Content">
                <img src="/images/header/Header-Arrow-Mark-Icon.svg" alt="Arrow-Mark-Pointer" />
                <p class="Header-Oracle-Fusion-Content-P">Oracle Fusion Technical + OIC Training</p>
            </div>
            <div class="Header-Oracle-Fusion-Content">
                <img src="/images/header/Header-Arrow-Mark-Icon.svg" alt="Arrow-Mark-Pointer" />
                <p class="Header-Oracle-Fusion-Content-P">Oracle Recruiting Cloud Online Training</p>
            </div>
            <div class="Header-Oracle-Fusion-Content">
                <img src="/images/header/Header-Arrow-Mark-Icon.svg" alt="Arrow-Mark-Pointer" />
                <p class="Header-Oracle-Fusion-Content-P">Oracle Transportation Management Cloud Training</p>
            </div>
            <div class="Header-Oracle-Fusion-Content">
                <img src="/images/header/Header-Arrow-Mark-Icon.svg" alt="Arrow-Mark-Pointer" />
                <p class="Header-Oracle-Fusion-Content-P">Oracle Global Trade Management Training</p>
            </div>
            <div class="Header-Oracle-Fusion-Content">
                <img src="/images/header/Header-Arrow-Mark-Icon.svg" alt="Arrow-Mark-Pointer" />
                <p class="Header-Oracle-Fusion-Content-P">Oracle Integration Cloud (OIC) Online Training</p>
            </div>
            <div class="Header-Oracle-Fusion-Content">
                <img src="/images/header/Header-Arrow-Mark-Icon.svg" alt="Arrow-Mark-Pointer" />
                <p class="Header-Oracle-Fusion-Content-P">Oracle Fusion Procurement Training</p>
            </div>
            <div class="Header-Oracle-Fusion-Content">
                <img src="/images/header/Header-Arrow-Mark-Icon.svg" alt="Arrow-Mark-Pointer" />
                <p class="Header-Oracle-Fusion-Content-P">Oracle Fusion HCM Technical Training</p>
            </div>
            <div class="Header-Oracle-Fusion-Content">
                <img src="/images/header/Header-Arrow-Mark-Icon.svg" alt="Arrow-Mark-Pointer" />
                <p class="Header-Oracle-Fusion-Content-P">Oracle Fusion Manufacturing training</p>
            </div>
            <div class="Header-Oracle-Fusion-Content">
                <img src="/images/header/Header-Arrow-Mark-Icon.svg" alt="Arrow-Mark-Pointer" />
                <p class="Header-Oracle-Fusion-Content-P">Oracle Fusion Planning Central Training</p>
            </div>
            <div class="Header-Oracle-Fusion-Content">
                <img src="/images/header/Header-Arrow-Mark-Icon.svg" alt="Arrow-Mark-Pointer" />
                <p class="Header-Oracle-Fusion-Content-P">Oracle Fusion PPM | Project's Training</p>
            </div>
            <div class="Header-Oracle-Fusion-Content">
                <img src="/images/header/Header-Arrow-Mark-Icon.svg" alt="Arrow-Mark-Pointer" />
                <p class="Header-Oracle-Fusion-Content-P">Fusion Cloud CRM Online Training</p>
            </div>
            <div class="Header-Oracle-Fusion-Content">
                <img src="/images/header/Header-Arrow-Mark-Icon.svg" alt="Arrow-Mark-Pointer" />
                <p class="Header-Oracle-Fusion-Content-P">Oracle ADF Online Training</p>
            </div>
        </div>
    ),
    sap: (
        <div className="Header-SAP-Content-Section">
            <div class="Header-SAP-Content">
                <img src="/images/header/Header-Arrow-Mark-Icon.svg" alt="Arrow-Mark-Pointer" />
                <p class="Header-SAP-Content-P">SAP CPI Online Training</p>
            </div>
            <div class="Header-SAP-Content">
                <img src="/images/header/Header-Arrow-Mark-Icon.svg" alt="Arrow-Mark-Pointer" />
                <p class="Header-SAP-Content-P">SAP SD Online Training</p>
            </div>
            <div class="Header-SAP-Content">
                <img src="/images/header/Header-Arrow-Mark-Icon.svg" alt="Arrow-Mark-Pointer" />
                <p class="Header-SAP-Content-P">SAP MM Online Training</p>
            </div>
            <div class="Header-SAP-Content">
                <img src="/images/header/Header-Arrow-Mark-Icon.svg" alt="Arrow-Mark-Pointer" />
                <p class="Header-SAP-Content-P">SAP ABAP Online Training</p>
            </div>
        </div>
    ),
    ds: (
        <div className="Header-DS-Content-Section">
            <div class="Header-DS-Content">
                <img src="/images/header/Header-Arrow-Mark-Icon.svg" alt="Arrow-Mark-Pointer" />
                <p class="Header-DS-Content-P">Oracle Fusion SCM Online Training</p>
            </div>
        </div>
    )
};

const categoryTitles = { all: "All", fusion: "Fusion", sap: "SAP", ds: "Data Science" };

export default function AllCoursesButton() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [activePanel, setActivePanel] = useState();
    const menuRef = useRef(null);
    const [isMobile, setIsMobile] = useState(false);
    const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
    const [mobilePanelOpen, setMobilePanelOpen] = useState(null);
    const mobileDropdownRef = useRef(null);

    // Detect mobile device
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 993);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Close dropdown/panels on outside click
    useEffect(() => {
        if (!mobileDropdownOpen) return;
        const handleClickOutside = (e) => {
            if (mobileDropdownRef.current && !mobileDropdownRef.current.contains(e.target)) {
                setMobileDropdownOpen(false);
                setMobilePanelOpen(null);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [mobileDropdownOpen]);

    // Keyboard accessibility: close on Escape
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === "Escape") setMenuOpen(false);
        };
        if (menuOpen) document.addEventListener("keydown", handleKeyDown);
        return () => document.removeEventListener("keydown", handleKeyDown);
    }, [menuOpen]);

    // Open menu on hover (desktop) or click (mobile)
    const handleAllCoursesEnter = () => {
        if (!isMobile) setMenuOpen(true);
    };
    const handleAllCoursesClick = () => {
        if (isMobile) setMenuOpen((prev) => !prev);
    };

    // Keep menu open when hovering over menu or right panel (desktop)
    const handleMenuEnter = () => {
        if (!isMobile) setMenuOpen(true);
    };

    // Panel selection
    const handlePanelSelect = (panel) => {
        setActivePanel(panel);
        if (isMobile) setMenuOpen(true);
    };

    useEffect(() => {
        if (!menuOpen || isMobile) return;
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setMenuOpen(false);
                setActivePanel(undefined);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [menuOpen, isMobile]);

    // Mobile menu rendering
    if (isMobile) {
        return (
            <div className="mobile-header" id="mobile-header">
                <div className="mobile-header-topbar">
                    <button
                        className="mobile-courses-btn"
                        id="mobile-courses-btn"
                        onClick={e => {
                            e.stopPropagation();
                            setMobileDropdownOpen((open) => !open);
                            setMobilePanelOpen(null);
                        }}
                    >
                        All Courses
                        <span className="All-Courses-Common-Header-chevron">
                            <i className="fa-solid fa-chevron-right"></i>
                        </span>
                    </button>
                </div>
                <div
                    className={`mobile-dropdown${mobileDropdownOpen ? " open" : ""}`}
                    id="mobile-dropdown"
                    ref={mobileDropdownRef}
                >
                    {["all", "fusion", "sap", "ds"].map((panel) => (
                        <div className="mobile-menu-group" key={panel}>
                            <button
                                className="mobile-menu-item"
                                data-panel={panel}
                                onClick={e => {
                                    e.stopPropagation();
                                    setMobilePanelOpen(mobilePanelOpen === panel ? null : panel);
                                }}
                            >
                                {categoryTitles[panel]}
                                <span>
                                    <i className="fa-solid fa-chevron-right"></i>
                                </span>
                            </button>
                            <div
                                className={`mobile-panel-content${mobilePanelOpen === panel ? " open" : ""}`}
                                id={`mobile-panel-${panel}`}
                            >
                                {panelsContent[panel]}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    const closePanel = () => {
        console.log("Mouse leaved");
        setTimeout(() => {
            setActivePanel(false)
            setMenuOpen(false)
        }, 3000)
    }

    console.log(isMobile);
    return (
        <div
            className="All-Courses-Common-Header-parent"
            id="all_courses_btn"
            ref={menuRef}
            onMouseEnter={() => { if (!isMobile) setMenuOpen(true); }}
            onMouseLeave={() => { if (!isMobile) { setMenuOpen(false); setActivePanel(undefined); closePanel(); } }}
            style={{ position: "relative" }}
        >
            <div className="All-Courses-Common-Header-container">
                <div
                    className="All-Courses-Common-Header-wrapper"
                    tabIndex={0}
                    style={{ cursor: "pointer" }}
                >
                    <div className="All-Courses-Common-Header-button">
                        All Courses
                        <span className="All-Courses-Common-Header-chevron">
                            <i className="fa-solid fa-chevron-right"></i>
                        </span>
                    </div>
                </div>
                <div style={{ backgroundColor: "white" }}>
                    {menuOpen && (
                        <div className="All-Courses-Common-Header-dropdown">
                            <div className="All-Courses-Common-Header-menu-panels">
                                <div className="All-Courses-Common-Header-menu-list">
                                    {["all", "fusion", "sap", "ds"].map((panel) => (
                                        <div
                                            key={panel}
                                            className={`All-Courses-Common-Header-item${activePanel === panel ? " active" : ""}`}
                                            onMouseEnter={() => { if (!isMobile) setActivePanel(panel); }}
                                            onClick={() => handlePanelSelect(panel)}
                                            tabIndex={0}
                                        >
                                            {categoryTitles[panel]}
                                            <span className="All-Courses-Common-Header-chevron">
                                                <i className="fa-solid fa-chevron-right"></i>
                                            </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                    {/* Right panel is now inside the parent, so mouseleave works as expected */}
                    {!isMobile && menuOpen && activePanel && (
                        <div className="All-Courses-Common-Header-right-panel active">
                            {panelsContent[activePanel]}
                        </div>
                    )}
                </div>
            </div>
            {/* Mobile rendering remains unchanged */}
            {isMobile && activePanel && (
                <div className="All-Courses-Common-Header-right-panel active" style={{ marginTop: 16 }}>
                    {panelsContent[activePanel]}
                </div>
            )}
        </div>
    );
}