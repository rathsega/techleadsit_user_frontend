import { useState, useEffect } from "react";
import httpService from "../../../services/httpService";

const SubscribeSection = ({ currentBlogId, classes }) => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [errorMsg, setErrorMsg] = useState("Please Enter Valid Email Address");

    useEffect(() => {
        const userDetails = localStorage.getItem('userDetails');
        if (userDetails) {
            try {
                const parsed = JSON.parse(userDetails);
                setEmail(prev => parsed?.email || "",);
            } catch (e) {
                // ignore parse errors
            }
        }
    }, []);

    const handleSubscribe = async () => {
        setError(false);
        setSuccess(false);

        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            setError(true);
            return;
        }

        try {
            const response = await httpService.post("blogs/subscribeNewsLetter/" + currentBlogId, { email });
            if (response.status === 200) {
                setSuccess(true);
                setEmail("");
            }
        } catch (error) {
            setError(true);
            setErrorMsg(error.response.data.message);
        }
    };

    return (
        <section className={`get-notified ${classes}`}>
            <div className="newsletter-banner">
                <div className="get-notified-card">
                    <h1 className="newsletter-h">Get Notified about Latest Blogs, Interview Questions & Job Alerts</h1>
                    <p className="newsletter-p">Stay updated with the latest insights, trends, and expert tips on Oracle
                        Fusion SCM.
                        Subscribe to our newsletter and never miss an update!</p>
                    <div className="d-flex justify-content-center">
                        <div className="newsletter-container">
                            <input
                                type="email"
                                className={`newsletter-btn`}
                                placeholder="Enter your email address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <button className="newsletter-sub-btn" onClick={handleSubscribe}>
                                Subscribe Now!!
                            </button>
                        </div>
                    </div>
                    {success && <div className="mt-2">
                        <img src="/images/blog-overview-tick.svg" className="blog-overview-Newsletter-tick-img" />
                        <span className="blog-overview-Newsletter-message">Thank You!! You have been Subscribed to our
                            Newsletter </span>
                    </div>}
                    {error && <div className="mt-2">
                        <img src="/images/blog-overview-invalid.svg"
                            className="blog-overview-Newsletter-invalid-img" />
                        <span className="blog-overview-Newsletter-message">{errorMsg} </span>
                    </div>}
                </div>
            </div>
        </section>
    )
}

export default SubscribeSection;