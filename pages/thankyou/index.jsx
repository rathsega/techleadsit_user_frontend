import React, { use, useEffect } from 'react';
import { useRouter } from 'next/router';
import useLmsStore from '../../store/lmsStore';
import { set } from 'date-fns';
import { useLoader } from '../../contexts/LoaderContext';

const ThankYouPage = () => {
    const router = useRouter();
    const { courseTitle, courseId, slug } = router.query;
    const formHeading = useLmsStore((state) => state.formHeading);
    const setFormHeading = useLmsStore((state) => state.setFormHeading);
    const { setLoading } = useLoader();
    const handleGoBack = () => {
        setLoading(true);
        if (courseTitle) {
            setFormHeading(formHeading ? formHeading.trim() : "");
            router.push(slug.replaceAll("_", "/"));
        } else {
            router.back();
        }
        setLoading(false);
    }

    useEffect(() => {
        //routeback to course page after 5 seconds
        const timer = setTimeout(() => {
            handleGoBack();
        }, 3000);
        return () => clearTimeout(timer);
    }, []);
    return (
        <div class="SR-register-wrapper">
            <section class="SR-register-s-section">
                <img src="/images/thankyou/sheild.png" class="SR-gif-size" />
                <h1 class="SR-register-main-h">Thank You! </h1>
                <p class="SR-register-f-heading">Get Ready to Elevate Your Skills!</p>
                <p class="SR-register-f-para">{courseTitle ? `Thank You for your interest! Your Journey to Mastering ${courseTitle} Begins
                    Here.
                    Stay tuned! Your demo session details have been emailed to you.`: `Thank You for your interest!`}</p>
                <button class="SR-register-s-btn" onClick={handleGoBack}>
                    <img src="/images/thankyou/Go-to-icon.png" height="14" class="me-2 SR-left-plan-arrow" />
                    Go Back
                </button>
                <div class="SR-media-sections mt-4">
                    <div class="SR-about-media">
                        <p>Follow Us for Updates & Insights:</p>
                        <img src="/images/thankyou/instagram.png" height="45" width="45" class="SR-border-social-media" />
                        <img src="/images/thankyou/facebook.png" height="45" width="45" class="SR-border-social-media" />
                        <img src="/images/thankyou/linkedin.png" height="45" width="45" class="SR-border-social-media" />
                        <img src="/images/thankyou/youtube.png" height="45" width="45" class="SR-border-social-media SR-yt" />
                    </div>
                    <div class="SR-Content-media">
                        <p class="SR-content-heading">Need Help?</p>
                        <div class="d-flex justify-content-center ">
                            <img src="/images/thankyou/Phone-icon.png" height="45" width="45" class="SR-border-social-media" />
                            <div class="ms-2">
                                <p class="SR-contact-info-p">Our Contact Info</p>
                                <p class="SR-contact-info-num">+91-8125323232</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default ThankYouPage;