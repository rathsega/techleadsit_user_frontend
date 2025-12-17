import React, { useCallback, useMemo } from "react";
import { useRouter } from 'next/router';
import { useLoader } from "../../contexts/LoaderContext";
import Image from "next/image"; // Importing Image component from next.js for optimized image handling
import useLmsStore  from "../../store/lmsStore";
const PricingPlans = React.memo(({ data, openForm, courseId, courseTax, nativeCourse }) => {
    // ...existing code...
    const [selfPeaced, liveTraining, corporateTraining] = useMemo(() => {
        if (Array.isArray(data) && data.length > 0) {
            const selfPacedPlan = data.find(plan => plan?.planName === 'Self Paced') || {};
            const liveTrainingPlan = data.find(plan => plan?.planName === 'Live Training') || {};
            const corporateTrainingPlan = data.find(plan => plan?.planName === 'Corporate Training') || {};
            return [selfPacedPlan, liveTrainingPlan, corporateTrainingPlan];
        }
        return [{}, {}, {}];
    }, [data]);

    const router = useRouter();
    const { setLoading } = useLoader();
    const setQuickPaymentVisibility = useLmsStore((state) => state.setQuickPaymentVisibility);
    const setBuyingCourse = useLmsStore((state) => state.setBuyingCourse);

    const handleBuyNowClick = () => {
        setBuyingCourse({
            title: nativeCourse?.basic?.title,
            price: nativeCourse?.basic?.price,
            discountedPrice: nativeCourse?.basic?.discountedPrice,
            thumbnail: nativeCourse?.basic?.thumbnailImage?.path,
            id: courseId,
        })
        setQuickPaymentVisibility(true);
    };

    const buyNowCourseIds = [
        "ORF-SCM-OT-001",    // Oracle Fusion SCM Online Training
        "ORF-HCM-OT-002",    // Oracle Fusion HCM Online Training
        "ORF-FIN-OT-003",    // Oracle Fusion Financials Training
        "ORF-TEC-OT-004",    // Oracle Fusion Technical + OIC Training
        "SAP-CPI-OT-006",    // SAP CPI Online Training
        "SAP-SDO-OT-007",    // SAP SD Online Training
        "ORF-RCT-OT-012",    // Oracle Recruiting Cloud Online Training
        "ORF-OIC-OT-015",    // Oracle Integration Cloud (OIC) Online Training
        "ORF-MFG-OT-016",    // Oracle Fusion Manufacturing training
        "ORF-PPM-OT-017",    // Oracle Fusion PPM | Project's Training
        "ORF-SCM-PT-024",    // Oracle Fusion SCM Training in Hyderabad
        "ORF-SCM-CT-025",    // Oracle Fusion SCM Certification Training
        "ORF-SCM-SP-026",    // Oracle Fusion SCM Self Paced Training
        "ORF-HCM-PT-027",    // Oracle Fusion HCM Training in Hyderabad
        "ORF-HCM-CT-028",    // Oracle Fusion HCM Certification Training
        "ORF-HCM-SP-029",    // Oracle Fusion HCM Self Paced Training
        "ORF-FIN-PT-030",    // Oracle Fusion Financials Training in Hyderabad
        "ORF-FIN-CT-031",    // Oracle Fusion Financials Certification Training
        "ORF-FIN-SP-032",    // Oracle Fusion Financials Self Paced Training
        "ORF-TEC-CT-033",    // Oracle Fusion Technical OIC Certification Training
        "ORF-TEC-SP-034",    // Oracle Fusion Technical Self Paced Training
        "ORF-WMS-SP-035",    // Oracle Fusion WMS Cloud (Logfire) Self Paced Training
        "ORF-MFP-OT-042",    // Oracle Fusion Manufacturing & Planning training
        "GEN-PMP-OT-043",     // PMP Certification Training
        "ORF-WMS-OT-005",    // Oracle Fusion WMS Cloud (Logfire) Training
        "ORF-APX-OT-044"     // Oracle Apex Online Training
    ];

    // Course IDs that should show "Enquire Now" button (disabled courses)
    const enquireNowCourseIds = [
        "GEN-DST-OT-008",    // Data Science Online Training
        "WRK-HCM-OT-009",    // Workday HCM Techno Functional Training
        "ORF-PRC-OT-010",    // Oracle Fusion Procurement Training
        "ORF-HCM-OT-011",    // Oracle Fusion HCM Technical Training
        "ORF-OTM-OT-013",    // Oracle Transportation Management OTM cloud Training
        "ORF-GTM-OT-014",    // Oracle Global Trade Management Cloud Online Training
        "ORF-ADF-OT-018",    // Oracle ADF Online Training
        "ORR-SCM-OT-019",    // Oracle EBS R12 SCM Training
        "ORR-FIN-OT-020",    // Oracle EBS R12 Financials Training
        "ORR-PAT-OT-021",    // Oracle EBS R12 Project Accounting Training
        "ORR-TCH-OT-022",    // Oracle Apps R12 Technical Training
        "ORR-OAF-OT-023",    // Oracle OAF Online Training
        "GEN-DMO-OT-036",    // Digital Marketing Online Training
        "SAP-MMO-OT-037",    // SAP MM online Training
        "SAP-ABP-OT-038",    // SAP ABAP Online Training
        "SFR-CRM-OT-039",    // Salesforce Online Training
        "ORF-PLC-OT-040",    // Oracle Fusion Planning Central Training
        "ORF-CRM-OT-041"     // Fusion Cloud CRM Online Training
    ];

    return (
        <section className="Main-Course-Choose-Your-Right-Plan-Section">
            <h2 className="Main-Course-Choose-Your-Right-Plan-Heading text-center">Choose Your Right Plan</h2>
            <p className="Main-Course-Choose-Your-Right-Plan-Para text-center">Choose the perfect learning mode
                based on your schedule, learning style, and career goals. Get industry-leading training with
                expert guidance.</p>
            <div className="Main-Course-Choose-Your-Right-Plan-Pricing-Grid-card">
                <div className="d-fl-al-str">
                    <div className="Main-Course-Choose-Your-Right-Plan-Pricing-card">
                        <h2 className="Main-Course-Choose-Your-Right-Plan-Pricing-card-Heading">Self Paced</h2>
                        <p className="Main-Course-Choose-Your-Right-Plan-Pricing-card-Para">{selfPeaced?.planShortDescription}</p>
                        <p className="Main-Course-Choose-Your-Right-Plan-Pricing-card-Price">{selfPeaced?.planPrice}{(courseTax?.cgst > 0 || courseTax?.sgst > 0 || courseTax?.igst > 0) && <span style={{ fontSize: "14px" }}>+Taxes</span>}</p>
                        <div className="Main-Course-Choose-Your-Right-Plan-Pricing-card-Plan-Points-Section">
                            {
                                selfPeaced?.planFeatures?.map((feature, index) => (
                                    <div className="Main-Course-Choose-Your-Right-Plan-Pricing-card-Plans-Points" key={index}>
                                        <Image priority={false} loading="lazy" src="/images/courses/Choose-Your-Right-Plan-Tick-Mark-Icon.svg"
                                            alt="Tick-Icon" height="24" width="24"
                                            className="Main-Course-Choose-Your-Right-Plan-Pricing-card-Plans-Points-img" />
                                        <p>{feature}</p>
                                    </div>
                                ))
                            }
                        </div>
                        <button className="Main-Course-Choose-Your-Right-Plan-Pricing-card-Plans-Btn" onClick={(e) => openForm("Enquire Now")}>
                            Enquire Now <i
                                className="fa-solid fa-arrow-right Choose-Your-Right-plan-Arrow-Icon ms-1"></i>
                        </button>
                    </div>
                </div>
                <div className="d-fl-al-str">
                    <div className="Main-Course-Choose-Your-Right-Plan-Pricing-card position-relative">
                        <div className="Choose-Your-Right-Plan-Blinker-Wrapper">
                            <p className="Main-Course-Emi-Blinker"> Easy EMI Options</p>
                            <p className="Main-Course-Best-Offer-Blinker">Best Seller</p>
                        </div>
                        <h2 className="Main-Course-Choose-Your-Right-Plan-Pricing-card-Heading">Live Training</h2>
                        <p className="Main-Course-Choose-Your-Right-Plan-Pricing-card-Para">{liveTraining?.planShortDescription}</p>
                        <p className="Main-Course-Choose-Your-Right-Plan-Pricing-card-Price">{liveTraining?.planPrice}{(courseTax?.cgst > 0 || courseTax?.sgst > 0 || courseTax?.igst > 0) && <span style={{ fontSize: "14px" }}>+Taxes</span>}</p>
                        <div className="Main-Course-Choose-Your-Right-Plan-Pricing-card-Plan-Points-Section">
                            {
                                liveTraining?.planFeatures?.map((feature, index) => (
                                    <div className="Main-Course-Choose-Your-Right-Plan-Pricing-card-Plans-Points" key={index}>
                                        <Image priority={false} loading="lazy" src="/images/courses/Choose-Your-Right-Plan-Tick-Mark-Icon.svg"
                                            alt="Tick-Icon" height="24" width="24"
                                            className="Main-Course-Choose-Your-Right-Plan-Pricing-card-Plans-Points-img" />
                                        <p>{feature}</p>
                                    </div>
                                ))
                            }
                        </div>
                        { buyNowCourseIds.includes(nativeCourse?.basic?.courseId) && <button className="Main-Course-Choose-Your-Right-Plan-Pricing-card-Plans-Btn" onClick={handleBuyNowClick}>
                            Buy Now <i
                                className="fa-solid fa-arrow-right Choose-Your-Right-plan-Arrow-Icon ms-1"></i>
                        </button>}
                        {
                            enquireNowCourseIds.includes(nativeCourse?.basic?.courseId) && <button className="Main-Course-Choose-Your-Right-Plan-Pricing-card-Plans-Btn" onClick={(e) => openForm("Enquire Now")}>
                            Enquire Now <i
                                className="fa-solid fa-arrow-right Choose-Your-Right-plan-Arrow-Icon ms-1"></i>
                        </button>
                        }
                    </div>
                </div>
                <div className="d-fl-al-str">
                    <div className="Main-Course-Choose-Your-Right-Plan-Pricing-card">
                        <h2 className="Main-Course-Choose-Your-Right-Plan-Pricing-card-Heading">Corporate Training
                        </h2>
                        <p className="Main-Course-Choose-Your-Right-Plan-Pricing-card-Para">{corporateTraining?.planShortDescription}
                        </p>
                        <h3 className="Main-Course-Choose-Your-Right-Plan-Pricing-card-Price">Let's Discuss</h3>
                        <div className="Main-Course-Choose-Your-Right-Plan-Pricing-card-Plan-Points-Section">
                            {
                                corporateTraining?.planFeatures?.map((feature, index) => (
                                    <div className="Main-Course-Choose-Your-Right-Plan-Pricing-card-Plans-Points" key={index}>
                                        <Image priority={false} loading="lazy" src="/images/courses/Choose-Your-Right-Plan-Tick-Mark-Icon.svg"
                                            alt="Tick-Icon" height="24" width="24"
                                            className="Main-Course-Choose-Your-Right-Plan-Pricing-card-Plans-Points-img" />
                                        <p>{feature}</p>
                                    </div>
                                ))
                            }
                        </div>
                        <button onClick={(e) => openForm("Get a personalised quote")}
                            className="Main-Course-Choose-Your-Right-Plan-Pricing-card-Plans-Btn d-flex align-items-center justify-content-center demo_register-btn">
                            <i className="fa-solid fa-phone-volume Choose-Your-Right-plan-Phone-Icon me-1"></i>Get a
                            Personalized Quote
                        </button>
                    </div>
                </div>
            </div>
        </section>
    )
});

export default PricingPlans;
