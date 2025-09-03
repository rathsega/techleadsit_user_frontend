import React, { useState, useEffect, useCallback } from "react";
import httpService from "../../services/httpService";
import Image from "next/image"; // Importing Image component from next.js for optimized image handling
import { useExpiringLocalStorage } from "../../services/useExpiringLocalStorage";
const SubscribeNewsLetters = React.memo(() => {

    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [errorMsg, setErrorMsg] = useState("Please Enter Valid Email Address");


    const now = new Date();
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999).getTime();

    const [userDetails, setUserDetails, clearUserDetails] = useExpiringLocalStorage(
        "userDetails",
        null,
        endOfDay
    );

    useEffect(() => {
        // const userDetails = localStorage.getItem('userDetails');
        if (userDetails) {
            try {
                const parsed = JSON.parse(userDetails);
                setEmail(prev => parsed?.email || "",);
            } catch (e) {
                // ignore parse errors
            }
        }
    }, []);

    const handleEmailChange = useCallback((e) => {
        setEmail(e.target.value);
    }, []);

    const handleSubscribe = useCallback(async () => {
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
    }, [email]);

    return (
        <section className="Main-Course-Get-Notified-About-Blogs-get-notified">
            <div className="Main-Course-Get-Notified-About-Blogs-newsletter-banner">
                <div className="Main-Course-Get-Notified-About-Blogs-get-notified-card">
                    <h2 className="Main-Course-Get-Notified-About-Blogs-newsletter-h">Get Notified about Latest Blogs,
                        Interview Questions & Job Alerts</h2>
                    <p className="Main-Course-Get-Notified-About-Blogs-newsletter-p">Stay updated with Jobs, Interview
                        Questions, New Features and Expert Talks</p>
                    <div className="d-flex justify-content-center">
                        <div className="Main-Course-Get-Notified-About-Blogs-newsletter-container">
                            <input
                                type="email"
                                className="Main-Course-Get-Notified-About-Blogs-newsletter-btn"
                                placeholder="Enter your email address"
                                value={email}
                                onChange={handleEmailChange}
                            />
                            <button className="Main-Course-Get-Notified-About-Blogs-newsletter-sub-btn" onClick={handleSubscribe}>Subscribe
                                Now!!</button>
                        </div>
                    </div>
                    {success && <div className="mt-2">
                        <Image priority={false} loading="lazy" src="/images/courses/Main-Course-Get-Notified-About-Blogs-Tick-Icon.svg"
                            alt="Tick-Icon" className="Main-Course-Get-Notified-About-Blogs-newsletter-tick-img" />
                        <span className="Main-Course-Get-Notified-About-Blogs-newsletter-message">Thank You!! You have
                            been Subscribed to our Newsletter </span>
                    </div>}
                    {error && <div className="mt-2">
                        <Image priority={false} loading="lazy" src="/images/courses/Main-Course-Get-Notified-About-Blogs-invalid-Icon.svg"
                            alt="Invalid-Icon" className="Main-Course-Get-Notified-About-Blogs-newsletter-invalid-img" />
                        <span className="Main-Course-Get-Notified-About-Blogs-newsletter-message">{errorMsg} </span>
                    </div>}
                </div>
            </div>
        </section>
    )
})

export default SubscribeNewsLetters;