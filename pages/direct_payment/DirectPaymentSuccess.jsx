import { useRouter } from 'next/router';
import httpService from './../../services/httpService';
import React, { useRef, useEffect, useState } from "react";
import { pdf } from "@react-pdf/renderer";
import dynamic from "next/dynamic";
const DirectInvoiceAutoDownload = dynamic(() => import("./DirectInvoiceAutoDownload"), { ssr: false });
const DirectPaymentInvoiceReact = dynamic(() => import("./DirectPaymentInvoiceReact"), { ssr: false });

const DirectPaymentSuccess = () => {
    const router = useRouter();
    const downloadInvoiceRef = useRef(null);
    const { paymentId, orderId } = router.query;
    const [showInvoice, setShowInvoice] = useState(false);
    const [invoiceDetails, setInvoiceDetails] = useState({});
    const [downloadProp, setDownloadProp] = useState(false);

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

    const autoLogin = (email) => {
        const url = process.env.NEXT_PUBLIC_LMS_URL + '/login/validate_login'; // URL to open
        const postData = {
            email: email,
            password: 'TechLeads$123'
        };

        openInNewTab(url, postData);
    };

    const pdfRef = useRef(null);

    // Convert React component to PDF
    const generatePDF = async (data) => {
        const blob  = await pdf(<DirectPaymentInvoiceReact invoiceDetails={data} />).toBlob();
        // Convert Blob to Base64
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
            sendNotification(reader.result.split(",")[1], data.email, data.phone, data.user_id, data.name, data.title); // Extract base64 data
        };
    };

    // Function to send email with the generated PDF
    const sendNotification = async (base64PDF, email, phone, user_id, name, title) => {
        return true;
        // Send Base64 PDF to Node.js API
        try {
            const response = await httpService.post("notifications/sendNotifications", {
                    email: email, // Replace with recipient's email
                    pdfData: base64PDF, // Send Base64 PDF data
                    userId: user_id,
                    phone: phone,
                    name:name,
                    courseTitle: title
                }
            );

            const result = await response.json();
            //console.log(result);
        } catch (error) {
            console.error("Error sending PDF:", error);
        }
    };

   
    useEffect(() => {
        httpService.get('payment/getPaymentDetails/' + paymentId + '/' + orderId).then((data) => {
            setInvoiceDetails(data.data);
            setShowInvoice(true);
            setTimeout(() => {
                autoLogin(data.data.email);
            }, 3000)
            //Generate PDF and Send Notifications
            generatePDF(data.data);
        }).catch((error) => {

        })
    }, [paymentId])


    const handleGenerateInvoice = () => {
        setShowInvoice(true)
        setDownloadProp(!downloadProp);
    };

    return (
        <>
            <section className="success-section">
                <img src="/images/payment_gateway/successful-gif.gif" className="gif-size" />
                <p className="payment-s-heading">Your Payment has been Successful!!</p>
                <p className="payment-s-para">Thank you for choosing Tech Leads IT. </p>
                {!invoiceDetails?.invoice_id && <div className="Payment-custom-loader"></div>}
                {invoiceDetails?.invoice_id && <div className="download-animation">
                    <button className="download-button" type="button" onClick={handleGenerateInvoice}>
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
}

export default DirectPaymentSuccess;