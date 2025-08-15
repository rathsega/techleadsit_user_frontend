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

    const redirectToPaymentPage = useCallback(() => {
        if (typeof courseId === 'number' && courseId > 0) {
            setLoading(true);
            router.push(`/direct_payment/${courseId}`);
            setLoading(false);
        } else {
            console.warn("Invalid course ID provided!");
        }
    }, [courseId, setLoading, router]);

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
                        <button className="Main-Course-Choose-Your-Right-Plan-Pricing-card-Plans-Btn" onClick={handleBuyNowClick}>
                            Buy Now <i
                                className="fa-solid fa-arrow-right Choose-Your-Right-plan-Arrow-Icon ms-1"></i>
                        </button>
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