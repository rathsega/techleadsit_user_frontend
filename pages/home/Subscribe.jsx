import { useState, useEffect } from "react";
import httpService from "../../services/httpService";

const Subscribe = () => {
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
            setErrorMsg("Enter a valid email address");
            return;
        }

        try {
            const response = await httpService.post("blogs/subscribeNewsLetter/" + null, { email });
            if (response.status === 200) {
                setSuccess(true);
                setEmail("");
            }
        } catch (error) {
            setError(true);
            setErrorMsg(error?.response?.data?.message);
        }
    };

    return (
        <section className="Main-Course-Home-Page-Get-Notified-About-Blogs-get-notified">
            <div className="Main-Course-Home-Page-Get-Notified-About-Blogs-newsletter-banner">
                <div className="Main-Course-Home-Page-Get-Notified-About-Blogs-get-notified-card">
                    <h1 className="Main-Course-Home-Page-Get-Notified-About-Blogs-newsletter-h">Get Notified about
                        Latest Blogs,
                        Interview Questions & Job Alerts</h1>
                    <p className="Main-Course-Home-Page-Get-Notified-About-Blogs-newsletter-p">Stay updated with
                        Jobs, Interview
                        Questions, New Features and Expert Talks</p>
                    <div className="d-flex justify-content-center">
                        <div className="Main-Course-Home-Page-Get-Notified-About-Blogs-newsletter-container">
                            <input type="email"
                                className="Main-Course-Home-Page-Get-Notified-About-Blogs-newsletter-btn"
                                placeholder="Enter your email address" value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                            <button
                                className="Main-Course-Home-Page-Get-Notified-About-Blogs-newsletter-sub-btn" onClick={handleSubscribe}>Subscribe
                                Now!!</button>
                        </div>
                    </div>
                    {success && <div className="mt-2">
                        <img src="/images/home/Main-Course-Home-Page-Get-Notified-About-Blogs-Tick-Icon.svg"
                            alt="Tick-Icon"
                            className="Main-Course-Home-Page-Get-Notified-About-Blogs-newsletter-tick-img" />
                        <span className="Main-Course-Home-Page-Get-Notified-About-Blogs-newsletter-message">Thank
                            You!! You have
                            been Subscribed to our Newsletter </span>
                    </div>}
                    {error && <div className="mt-2">
                        <img src="/images/home/Main-Course-Home-Page-Get-Notified-About-Blogs-invalid-Icon.svg"
                            alt="Invalid-Icon"
                            className="Main-Course-Home-Page-Get-Notified-About-Blogs-newsletter-invalid-img" />
                        <span className="Main-Course-Home-Page-Get-Notified-About-Blogs-newsletter-message"> {errorMsg} </span>
                    </div>}
                </div>
            </div>
        </section>
    )
}

export default Subscribe;