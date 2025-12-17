import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import useLmsStore from '../../store/lmsStore';
import { set } from 'date-fns';
import { useLoader } from '../../contexts/LoaderContext';

const ThankYouPage = () => {
    const router = useRouter();
    const { courseTitle, courseId, slug, fromPage } = router.query;
    const formHeading = useLmsStore((state) => state.formHeading);
    const setFormHeading = useLmsStore((state) => state.setFormHeading);
    const { setLoading } = useLoader();
    const handleGoBack = async () => {
        setLoading(true);
        try {
            if (courseTitle && ['upcoming_demo', 'home'].includes(fromPage) && slug) {
                setFormHeading(formHeading ? formHeading.trim() : "");
                await router.push(slug.replaceAll("_", "/"));
            } else if (fromPage == 'upcoming_demo' && slug) {
                await router.push(slug);
            } else if (fromPage == 'home') {
                router.back();
            } else if (fromPage == 'unknown' && slug) {
                await router.push(slug);
            } else {
                router.back();
            }
        } catch (error) {
            console.error('Navigation error:', error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        //routeback to course page after 5 seconds
        const timer = setTimeout(() => {
            handleGoBack();
        }, 3000);
        return () => clearTimeout(timer);
    }, []);
    return (
        <div className="SR-register-wrapper">
            <section className="SR-register-s-section">
                <img src="/images/thankyou/sheild.png" className="SR-gif-size" />
                <h1 className="SR-register-main-h">Thank You! </h1>
                <p className="SR-register-f-heading">Get Ready to Elevate Your Skills!</p>
                <p className="SR-register-f-para">{courseTitle ? `Thank You for your interest! Your Journey to Mastering ${courseTitle} Begins
                    Here.
                    Stay tuned! Your demo session details have been emailed to you.`: `Thank You for your interest!`}</p>
                <button className="SR-register-s-btn" onClick={handleGoBack}>
                    <img src="/images/thankyou/Go-to-icon.png" height="14" className="me-2 SR-left-plan-arrow" />
                    Go Back
                </button>
                <div className="SR-media-sections mt-4">
                    <div className="SR-about-media">
                        <p>Follow Us for Updates & Insights:</p>
                        {/* <img src="/images/thankyou/instagram.png" height="45" width="45" className="SR-border-social-media" />
                        <img src="/images/thankyou/facebook.png" height="45" width="45" className="SR-border-social-media" />
                        <img src="/images/thankyou/linkedin.png" height="45" width="45" className="SR-border-social-media" />
                        <img src="/images/thankyou/youtube.png" height="45" width="45" className="SR-border-social-media SR-yt" /> */}
<a href="https://www.instagram.com/techleadsit" target="_blank" rel="noopener noreferrer">
                            <img src="/images/thankyou/instagram.png" height="45" width="45" className="SR-border-social-media" />
                        </a>
                        <a href="https://www.facebook.com/techleadsitinstitute" target="_blank" rel="noopener noreferrer">
                            <img src="/images/thankyou/facebook.png" height="45" width="45" className="SR-border-social-media" />
                        </a>
                        <a href="https://www.linkedin.com/company/techleadsit1" target="_blank" rel="noopener noreferrer">
                            <img src="/images/thankyou/linkedin.png" height="45" width="45" className="SR-border-social-media" />
                        </a>
                        <a href="https://www.youtube.com/@TechLeadsIT" target="_blank" rel="noopener noreferrer">
                            <img src="/images/thankyou/youtube.png" height="45" width="45" className="SR-border-social-media SR-yt" />
                        </a>
                    </div>
                    <div className="SR-Content-media">
                        <p className="SR-content-heading">Need Help?</p>
                        <div className="d-flex justify-content-center ">
                            <img src="/images/thankyou/Phone-icon.png" height="45" width="45" className="SR-border-social-media" />
                            <div className="ms-2">
                                <p className="SR-contact-info-p">Our Contact Info</p>
                                <p className="SR-contact-info-num">+91-8125323232</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ThankYouPage;
