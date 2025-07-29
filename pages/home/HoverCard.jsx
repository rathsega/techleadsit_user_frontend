
const HoverCard = ({ slug, position, style }) => {

    const data = [
        {
            title: "Oracle Fusion SCM Course",
            durationInMonths: "3 Months(Daily 1 Hour)",
            durationInHours: "80 Hours",
            numberOfVideos: "80+",
            toolsAndModules: [
                "Product Management",
                "Inventory Management",
                "Order Management",
                "Pricing",
                "RSSP",
                "Purchasing",
                "Sourcing",
                "Supplier Portal",
                "Procurement Contracts",
                "SQM",
                "Cost Management"
            ]
        },
        {
            title: "Oracle Fusion HCM Course",
            durationInMonths: "3 Months (Daily 1 Hour)",
            durationInHours: "70 Hours",
            numberOfVideos: "70+",
            toolsAndModules: [
                "Core HR",
                "Absence Management",
                "Compensation",
                "Payroll",
                "Talent Management",
                "Goal Management",
                "Profile Management",
                "HCM Communicate",
                "Succession Planning",
                "Oracle ME"
            ]
        },
        {
            title: "Oracle Fusion Financials Course",
            durationInMonths: "3 Months (Daily 1 Hour)",
            durationInHours: "70 Hours",
            numberOfVideos: "70+",
            toolsAndModules: [
                "General Ledger",
                "Account Payables",
                "Account receivables",
                "Cash management",
                "Fusion Tax",
                "Fixed assets",
                "Fusion Expenses",
                "Budgeting",
                "Inter company"
            ]
        },
        {
            title: "Oracle Fusion Technical + OIC Training",
            durationInMonths: "2 Months (Daily 1 Hour)",
            durationInHours: "50 Hours",
            numberOfVideos: "50+",
            toolsAndModules: [
                "OTBI Reports",
                "BIP Reports",
                "Data Migration",
                "Extensions",
                "File Integrations",
                "Web Service Integrations",
                "Rest API Integrations",
                "FBDI Generic & ATP",
                "VBCS",
                "PCS",
                "Scheduling & Migration"
            ]
        }
    ]
    return (
        <div
            className={`hover-card hover-card-${position}`}
            style={{
                position: "absolute",
                top: "50%",
                transform: "translateY(-50%)",
                [position]: "-320px", // adjust as needed for your layout
                zIndex: 10,
                minWidth: 300,
                maxWidth: 320,
            }}
        >
            {/* Arrow */}
            <div className={`hover-card-arrow hover-card-arrow-${position}`} />
           Hello
        </div>
    );
}

export default HoverCard;