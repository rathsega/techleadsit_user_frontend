import { useRouter } from 'next/router';
import httpService from './../../../services/httpService';
import React, { useRef, useEffect, useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { Page, Text, View, Document, pdf } from "@react-pdf/renderer";
const DirectInvoiceAutoDownload = dynamic(() => import("./../../direct_payment/DirectInvoiceAutoDownload"), { ssr: false });
import DirectPaymentInvoiceReact from './../../direct_payment/DirectPaymentInvoiceReact';
import { useLoader } from '../../../contexts/LoaderContext';
import DirectPaymentInvoiceHTML from '../../direct_payment/DirectPaymentInvoiceHTML';


const PaymentSuccessPage = () => {
    const router = useRouter();
    const downloadInvoiceRef = useRef(null);
    const { paymentId, orderId } = router.query;
    const [showInvoice, setShowInvoice] = useState(false);
    const [invoiceDetails, setInvoiceDetails] = useState({});
    const [downloadProp, setDownloadProp] = useState(false);
    const [userCourseId, setUserCourseId] = useState("");
    const { setLoading } = useLoader();

    const openInNewTab = (url, data) => {
        // Create a form element dynamically
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = url;

        // Add the data to the form as hidden input fields
        Object.keys(data).forEach((key) => {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = data[key];
            form.appendChild(input);
        });

        // Append the form to the document body
        document.body.appendChild(form);

        // Set the form's target to the new window's name
        form.target = "_blank";

        // Append the form to the document body
        document.body.appendChild(form);

        // Submit the form
        form.submit();

        // Clean up the form after submitting
        document.body.removeChild(form);
    };

    const handleEncryptData = async (credentials) => {
        // Dynamically import jsencrypt in browser
        const { JSEncrypt } = await import('jsencrypt');
        const jsEncrypt = new JSEncrypt();
        jsEncrypt.setPublicKey(publicKey);

        const encrypted = jsEncrypt.encrypt(JSON.stringify(credentials));
        return encrypted;
    };

    const autoLogin = (email) => {
        const url = process.env.NEXT_PUBLIC_LMS_URL + '/login/validate_login'; // URL to open
        const postData = {
            email: email,
            password: 'TechLeads$123'
        };

        openInNewTab(url, postData);
    };

    const pdfRef = useRef(null);

    const generateBase64PDF = async (data) => {
        const invoiceRef = useRef(null);
        const blob = await pdf(<DirectPaymentInvoiceReact invoiceDetails={data} />).toBlob();

        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64 = reader.result.split(',')[1];
                resolve(base64);
            };
            reader.readAsDataURL(blob);
        });

        /*const reader = new FileReader();
        return new Promise((resolve) => {
            reader.onloadend = () => {
                const base64 = reader.result.split(',')[1];
                resolve(base64);
            };
            reader.readAsDataURL(blob);
        });*/
    };

    // Convert React component to PDF
    const generatePDF = async (data) => {
        if (!data || typeof window === 'undefined' || !DirectPaymentInvoiceReact) {
            console.warn('PDF generation skipped — component or data not ready');
            return;
        } else {
            //console.log("Data available", data, DirectPaymentInvoiceReact);
        }

        try {

            let base64 = await generateBase64PDF(data);
            sendNotification(base64, data.email, data.phone, data.user_id, data.name, data.title, data);

        } catch (error) {
            console.error('Error generating PDF:', error);
        }
    };

    // Function to send email with the generated PDF
    const sendNotification = async (base64PDF, email, phone, user_id, name, title, data) => {
        try {
            const response = await httpService.post("notifications/sendNotifications", {
                email: email,
                pdfData: base64PDF,
                userId: user_id,
                phone: phone,
                name: name,
                courseTitle: title,
                invoiceDetails: data
            });

            // Axios auto-parses JSON; no need for response.json()
            if (response.status >= 200 && response.status < 300) {
                //console.log("Notification sent successfully:", response.data);
                return { success: true, message: response.data.message || "Notification sent successfully." };
            } else {
                // This should rarely happen as errors usually go to catch block
                console.warn("Unexpected response status:", response.status);
                return { success: false, message: response.data.message || "Unexpected response status." };
            }

        } catch (error) {
            // Get custom error message from interceptor, if available
            const errorMessage = error.customMessage || error.message || "Something went wrong while sending the notification.";
            console.error("Error sending PDF:", errorMessage);

            return { success: false, message: errorMessage };
        }
    };

    const stablePaymentId = useMemo(() => paymentId, [paymentId]);

    useEffect(() => {
        if (!paymentId || !orderId) return;

        let isMounted = true; // flag to prevent state updates on unmounted components

        const fetchData = async () => {
            try {
                setLoading(true)
                const res = await httpService.get(`payment/getPaymentDetails/${paymentId}/${orderId}`);
                if (!isMounted) return;

                const paymentData = res.data;
                console.log("Payment data is : " , paymentData)
                setInvoiceDetails(paymentData);
                setShowInvoice(true);
                setLoading(false)

                setTimeout(() => {
                    autoLogin(paymentData.email);
                }, 3000);

                if (paymentData) {
                    generatePDF(paymentData);
                }

                const courseRes = await httpService.get('/config/getCourseId');
                if (courseRes?.data?.id) {
                    setUserCourseId(courseRes.data.id);
                }

            } catch (error) {
                setLoading(false)
                console.error('Failed to fetch payment details or course ID:', error);
            }
        };

        fetchData();

        return () => {
            isMounted = false;
        };
    }, [paymentId, orderId]);



    const handleGenerateInvoice = () => {
        const isIOS = typeof navigator !== "undefined" && /iPad|iPhone|iPod/.test(navigator.userAgent);
        if (isIOS) {
            handleManualDownload();
        } else {
            setShowInvoice(true)
            setTimeout(() => {
                setDownloadProp(prev => !prev);
            }, 500);
        }

    };

    const handleManualDownload = async () => {
        const invoiceRef = useRef(null);
        const blob = await pdf(<DirectPaymentInvoiceReact  invoiceDetails={invoiceDetails} />).toBlob();
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
    };


    return (
        <>

            <section className="success-section">
                <img src='/images/payment_gateway/successful-gif.gif' className="gif-size" />
                <p className="payment-s-heading">Your Payment has been Successful!!</p>
                <p className="payment-s-para">Thank you for choosing Tech Leads IT. </p>
                {!invoiceDetails?.invoice_id && <div className="Payment-custom-loader"></div>}
                {invoiceDetails?.invoice_id && <div className="download-animation">
                    <button className="download-button" type="button" onClick={(e) => handleGenerateInvoice()}>
                        <span className="download-button__text">Download</span>
                        <span className="download-button__icon">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35" className="download-button__svg">
                                <path
                                    d="M17.5,22.131a1.249,1.249,0,0,1-1.25-1.25V2.187a1.25,1.25,0,0,1,2.5,0V20.881A1.25,1.25,0,0,1,17.5,22.131Z">
                                </path>
                                <path
                                    d="M17.5,22.693a3.189,3.189,0,0,1-2.262-.936L8.487,15.006a1.249,1.249,0,0,1,1.767-1.767l6.751,6.751a.7.7,0,0,0,.99,0l6.751-6.751a1.25,1.25,0,0,1,1.768,1.767l-6.752,6.751A3.191,3.191,0,0,1,17.5,22.693Z">
                                </path>
                                <path
                                    d="M31.436,34.063H3.564A3.318,3.318,0,0,1,.25,30.749V22.011a1.25,1.25,0,0,1,2.5,0v8.738a.815.815,0,0,0,.814.814H31.436a.815.815,0,0,0,.814-.814V22.011a1.25,1.25,0,1,1,2.5,0v8.738A3.318,3.318,0,0,1,31.436,34.063Z">
                                </path>
                            </svg>
                        </span>
                    </button>
                </div>}

            </section>
            {showInvoice && <DirectInvoiceAutoDownload invoiceDetails={invoiceDetails} downloadProp={downloadProp} ref={downloadInvoiceRef} onComplete={() => setShowInvoice(false)} />}
        </>
    )
};

export default PaymentSuccessPage;
