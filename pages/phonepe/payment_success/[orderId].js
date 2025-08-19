import { useRouter } from 'next/router';
import React, { useEffect, useState, useRef, useMemo } from "react";
import dynamic from "next/dynamic";
import httpService from './../../../services/httpService';

const DirectInvoiceAutoDownload = dynamic(() => import("./../../direct_payment/DirectInvoiceAutoDownload"), { ssr: false });
import DirectPaymentInvoiceReact from './../../direct_payment/DirectPaymentInvoiceReact';
import { useLoader } from '../../../contexts/LoaderContext';

const PaymentSuccessPage = () => {
    const router = useRouter();
    const { orderId } = router.query;
    const [showInvoice, setShowInvoice] = useState(false);
    const [invoiceDetails, setInvoiceDetails] = useState({});
    const [downloadProp, setDownloadProp] = useState(false);
    const downloadInvoiceRef = useRef(null);
    const { setLoading } = useLoader();
    const [paymentStatus, setPaymentStatus] = useState("INPROGRESS");
    const [courseId, setCourseId] = useState(false);
    const [userCourseId, setUserCourseId] = useState("");
    const [publicKey, setPublicKey] = useState('');

    const handleEncryptData = async (data) => {
        // Dynamically import jsencrypt in browser
        const { JSEncrypt } = await import('jsencrypt');
        const jsEncrypt = new JSEncrypt();
        jsEncrypt.setPublicKey(data.publicKey);

        const encrypted = jsEncrypt.encrypt(JSON.stringify({ email: data.email, password: data.password }));
        return encrypted;
    };

    const openInNewTab = (url, data) => {
        const form = document.createElement('form');
        form.method = 'GET';
        form.action = url;
        form.target = '_blank';

        for (let key in data) {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = data[key];
            form.appendChild(input);
        }

        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
    };

    const autoLogin = (encodedCreds) => {
        const url = process.env.NEXT_PUBLIC_LMS_URL + `login/autologin`;
        openInNewTab(url, { token: encodedCreds });
    };

    const generateBase64PDF = async (data) => {
        const { pdf } = await import("@react-pdf/renderer");
        const blob = await pdf(<DirectPaymentInvoiceReact invoiceDetails={data} />).toBlob();
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result.split(',')[1];
                resolve(base64);
            };
            reader.readAsDataURL(blob);
        });
    };

    const generatePDF = async (data) => {
        try {
            const base64 = await generateBase64PDF(data);
            sendNotification(base64, data.email, data.phone, data.user_id, data.name, data.title, data);
        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };

    const sendNotification = async (base64PDF, email, phone, user_id, name, title, data) => {
        try {
            const response = await httpService.post("notifications/sendNotifications", {
                email,
                pdfData: base64PDF,
                userId: user_id,
                phone,
                name,
                courseTitle: title,
                invoiceDetails: data
            });
            if (response.status >= 200 && response.status < 300) {
                //console.log("Notification sent successfully:", response.data);
            } else {
                console.warn("Unexpected response status:", response.status);
            }
        } catch (error) {
            console.error("Error sending PDF:", error.message);
        }
    };

    const sendPaymentStatusNotification = async (orderId, status) => {
        try {
            const response = await httpService.post("notifications/sendPaymentStatusNotification", {
                paymentGateway: 'phonepe',
                orderId,
                status
            });
            if (response.status >= 200 && response.status < 300) {
                //console.log("Notification sent successfully:", response.data);
            } else {
                console.warn("Unexpected response status:", response.status);
            }
        } catch (error) {
            console.error("Error sending PDF:", error.message);
        }
    }

    const fetchDependenciesAndPaymentData = async (isMounted) => {
        try {
            // Fetch public key and user course ID concurrently.
            const [publicKeyRes, courseRes] = await Promise.all([
                httpService.get("/config/getPublicKey"),
                httpService.get("/config/getCourseId")
            ]);

            const fetchedPublicKey = publicKeyRes?.data?.publicKey;
            const fetchedUserCourseId = courseRes?.data?.id;

            // Update state only if the component is still mounted.
            if (isMounted) {
                setPublicKey(fetchedPublicKey);
                setUserCourseId(fetchedUserCourseId);
            }

            // Now that you have the required data, call the payment verification API.
            setLoading(true);
            const paymentRes = await httpService.get(
                `/payment/verifyPhonePePaymentStatus/${orderId}`
            );


            // Example: if you're using live API response, replace paymentData with paymentRes.data.
            const paymentData = paymentRes.data; // or use dummy data below for testing:

            // Process the paymentData and take action accordingly.
            if (paymentData?.success === true && paymentData?.paymentId) {
                setPaymentStatus("SUCCESS");
                setInvoiceDetails(paymentData.invoiceDetails);
                // Delay showing invoice until after invoiceDetails is rendered
                setTimeout(() => {
                    setShowInvoice(true);
                }, 0); // or 100ms for safer timing
                generatePDF(paymentData.invoiceDetails);

                // For example, auto-login using the fetched userCourseId (or other data)
                setTimeout(async () => {
                    const postData = await handleEncryptData({
                        email: paymentData.email,
                        password: fetchedUserCourseId, // using the data fetched earlier
                        publicKey: fetchedPublicKey // if needed in encryption
                    });
                    autoLogin(postData);
                }, 3000);
            } else if (paymentData?.status === "PENDING") {
                setPaymentStatus("PENDING");
                sendPaymentStatusNotification(orderId, "PENDING");
                setCourseId(paymentData?.courseId);
                console.warn("Payment is still pending.");
                // alert("Your payment is still pending. Please wait or refresh later.");
            } else if (paymentData?.status === "FAILED") {
                sendPaymentStatusNotification(orderId, "FAILED");
                setPaymentStatus("FAILED");
                setCourseId(paymentData?.courseId);
                console.error(
                    "Payment failed:",
                    paymentData?.message || "Unknown failure."
                );
            } else {
                setPaymentStatus("UNKNOWN");
                console.error("Unexpected payment response:", paymentData);
                // alert("Unexpected response received. Please contact support.");
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        if (!orderId) return;
        let isMounted = true;



        // Call the function that handles dependency fetching and the payment call.
        fetchDependenciesAndPaymentData(isMounted);

        return () => {
            isMounted = false;
        };
    }, [orderId]);

    const handleGenerateInvoice = () => {
        setShowInvoice(true);
        setDownloadProp(prev => !prev);
    };

    const retryPayment = () => {
        router.push(`/direct_payment/${courseId}`);
    }

    const handleStatus = (status) => {
        setPaymentStatus(status);
    }
    return (
        <>


            {paymentStatus === 'FAILED' && (
                <div className='payment-failed-div'>
                    <section className="failed-section">
                        <img src="/images/payment_gateway/Process-Declined-icon.gif" className="gif-size" />
                        <div className="payment-appearance">
                            <p className="payment-f-heading">Your Payment has been Failed!!</p>
                            <p className="payment-f-para">
                                Your payment could not be processed due to a technical issue. Any debited amount
                                will be refunded within 4-5 business days.
                            </p>
                            <button className="retry-btn" onClick={retryPayment}>
                                Retry Payment
                                <img src="/images/payment_gateway/Retry-btn-icon.png" height="14" className="ms-2 Right-plan-arrow" />
                            </button>
                        </div>
                    </section>
                </div>
            )}

            {paymentStatus === 'SUCCESS' && (
                <section className="success-section">
                    <img src='/images/payment_gateway/successful-gif.gif' className="gif-size" />
                    <p className="payment-s-heading">Your Payment has been Successful!!</p>
                    <p className="payment-s-para">Thank you for choosing Tech Leads IT.</p>
                    {!invoiceDetails?.invoice_id && <div className="Payment-custom-loader"></div>}
                    {invoiceDetails?.invoice_id && (
                        <div className="download-animation">
                            <button className="download-button" type="button" onClick={handleGenerateInvoice}>
                                <span className="download-button__text">Download</span>
                                <span className="download-button__icon">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35" className="download-button__svg">
                                        <path d="M17.5,22.131a1.249,1.249,0,0,1-1.25-1.25V2.187a1.25,1.25,0,0,1,2.5,0V20.881A1.25,1.25,0,0,1,17.5,22.131Z" />
                                        <path d="M17.5,22.693a3.189,3.189,0,0,1-2.262-.936L8.487,15.006a1.249,1.249,0,0,1,1.767-1.767l6.751,6.751a.7.7,0,0,0,.99,0l6.751-6.751a1.25,1.25,0,0,1,1.768,1.767l-6.752,6.751A3.191,3.191,0,0,1,17.5,22.693Z" />
                                        <path d="M31.436,34.063H3.564A3.318,3.318,0,0,1,.25,30.749V22.011a1.25,1.25,0,0,1,2.5,0v8.738a.815.815,0,0,0,.814.814H31.436a.815.815,0,0,0,.814-.814V22.011a1.25,1.25,0,1,1,2.5,0v8.738A3.318,3.318,0,0,1,31.436,34.063Z" />
                                    </svg>
                                </span>
                            </button>
                        </div>
                    )}
                </section>
            )}

            {paymentStatus !== 'FAILED' && paymentStatus !== 'SUCCESS' && (
                <div className='payment-failed-div'>
                    <section class="Pending-section">
                        <img src="/images/payment_gateway/payment-pending-icon.gif" class="gif-size" />
                        <div class="Pending-payment-appearance">
                            <p class="payment-P-heading">Your payment is currently under processing.</p>
                            <p class="payment-P-para">If the amount has been debited, it will either be refunded immediately or within 4-5 business days.</p>
                            {paymentStatus == "PENDING" ? <button class="retry-btn" onClick={() => fetchDependenciesAndPaymentData(true)}>
                                Recheck Payment Status <img src="/images/payment_gateway/Retry-btn-icon.png" height="14"
                                    class="ms-2 Right-plan-arrow" />
                            </button> : <button className="retry-btn" onClick={() => router.push(`/direct_payment/${courseId}`)}>
                                Retry Payment <img src="/images/payment_gateway/Retry-btn-icon.png" height="14"
                                    class="ms-2 Right-plan-arrow" />
                            </button>}
                        </div>
                    </section>
                </div>
            )}


            {showInvoice && <DirectInvoiceAutoDownload invoiceDetails={invoiceDetails} downloadProp={downloadProp} ref={downloadInvoiceRef} paymentStatus={paymentStatus} handleStatus={handleStatus} onComplete={() => setShowInvoice(false)} />}
        </>
    );
};

export default PaymentSuccessPage;
