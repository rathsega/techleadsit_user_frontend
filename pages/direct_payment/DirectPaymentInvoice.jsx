import React, { forwardRef, useEffect, useState } from "react";
import { toWords } from "number-to-words";
import { format } from "date-fns";
import { Page, Text, View, Document, StyleSheet, Font } from "@react-pdf/renderer";

// Register the Inter font (Ensure internet connection for font loading)
Font.register({
    family: "Inter",
    src: "https://fonts.gstatic.com/s/inter/v3/UcC8FJQ4PlQkZZKc-PtK8H0.woff2",
});

// Define styles for the PDF document
const styles = StyleSheet.create({
    page: { padding: 20 },
    section: { marginBottom: 10 },
    title: { fontSize: 18, fontFamily: "Inter", fontWeight: "bold", marginBottom: 5 },
    text: { fontSize: 12, fontFamily: "Inter" },
});

const DirectPaymentInvoice = forwardRef((props, ref) => {

    const getAmountParams = (amountString) => {
        return amountString ? JSON.parse(amountString) : {};
    }

    const getTaxDetails = (taxString) => {
        return taxString ? JSON.parse(taxString) : {};
    }

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
            minimumFractionDigits: 2, // Ensures two decimal places
        }).format(amount);
    };

    const formatAmountInWords = (amount) => {
        if (amount === 0) return "Zero Rupees Only";
        return amount ? toWords(amount).replace(/\b\w/g, (c) => c.toUpperCase()) + " Rupees Only" : "Zero Rupees Only";
    };

    const isEmpty = (obj) => Object.keys(obj).length === 0;

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true); // Ensures this runs only on the client-side
    }, []);

    if (!isClient) return null; // Prevents rendering on the server

    return (
        props && !isEmpty(props) ? <Document>
            <Page size="A4" style={styles.page}>
                <View style={styles.section}>
                    <div ref={ref} style={{ padding: "20px", border: "1px solid black", width: "210mm", height: "297mm" }}>
                        <div style={{ /*fontFamily: "'inter', sans-serif",*/ margin: "0", padding: "20px", background: "#F4F4F4" }}>
                            <table style={{ width: "100%", background: "#fff", borderCollapse: "collapse", margin: "auto", border: "1px solid #ddd" }}>
                                <thead>
                                    <tr>
                                        <td style={{ padding: "5px", textAlign: "center" }}>
                                            <img src="/images/logoDark.webp" style={{ height: "50px" }} alt="Tech Leads IT" />
                                        </td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td colSpan="5">
                                            <table style={{ width: "100%" }}>
                                                <tbody>
                                                    <tr>
                                                        <td style={{ padding: "15px", verticalAlign: "top", fontSize: "15px", width: "45%" }}>
                                                            <p style={{ fontWeight: 500, color: "#5E6470", margin: "0px", marginBottom: "8px" }}>Billing Address</p>
                                                            <p style={{ fontWeight: 600, color: "#1A1C21", margin: "0px", marginBottom: "8px" }}>{props?.invoiceDetails?.name}</p>
                                                            <p style={{ fontWeight: 400, color: "#5E6470", margin: "0px", marginBottom: "8px" }}>{props?.invoiceDetails?.address},</p>
                                                            <p style={{ fontWeight: 400, color: "#5E6470", margin: "0px", marginBottom: "8px" }}>{props?.invoiceDetails?.state_name}, {props?.invoiceDetails?.country_name}.</p>
                                                            <p style={{ fontWeight: 400, color: "#5E6470", margin: "0px", marginBottom: "8px" }}>{props?.invoiceDetails?.email}</p>
                                                            <p style={{ fontWeight: 400, color: "#5E6470", margin: "0px", marginBottom: "8px" }}>{props?.invoiceDetails?.phone}</p>
                                                        </td>
                                                        <td style={{ padding: "15px", verticalAlign: "top", width: "25%" }}>
                                                            <p style={{ fontWeight: 500, color: "#5E6470", margin: "0px", marginBottom: "8px" }}>Invoice Date</p>
                                                            {props?.invoiceDetails?.updated_at && <p style={{ fontWeight: 600, color: "#1A1C21", margin: "0px", marginBottom: "8px" }}>{format(new Date(props?.invoiceDetails?.updated_at), "dd-MM-yyyy")}</p>}
                                                        </td>
                                                        <td style={{ padding: "15px", textAlign: "right", verticalAlign: "top", width: "35%" }}>
                                                            <p style={{ fontWeight: 500, color: "#5E6470", margin: "0px", marginBottom: "8px" }}>Invoice of (Rupees)</p>
                                                            <p style={{ fontWeight: 700, color: "#005CA9", margin: "0px", marginBottom: "8px", fontSize: "26px" }}>{formatCurrency(getAmountParams(props?.invoiceDetails?.payment_details)?.totalPriceWithTax)}</p>
                                                            <p style={{ fontWeight: 500, color: "#5E6470", margin: "0px", marginBottom: "8px", fontSize: "12px", textTransform: "capitalize" }}>Payment Mode: {props?.invoiceDetails?.payment_type}</p>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="5">
                                            <table style={{ width: "100%", marginBottom: "25px" }}>
                                                <thead>
                                                    <tr style={{ fontWeight: 500, color: "#5E6470", fontSize: "15px" }}>
                                                        <td style={{ width: "25%" }}>Subject</td>
                                                        <td style={{ width: "25%" }}>Invoice number</td>
                                                        <td style={{ width: "25%" }}>Reference Number</td>
                                                        <td style={{ width: "25%" }}>GSTIN Number</td>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr style={{ fontWeight: 600, color: "#1A1C21", fontSize: "15px" }}>
                                                        <td style={{ width: "25%" }}>Course Purchase</td>
                                                        <td style={{ width: "25%" }}>{props?.invoiceDetails?.invoice_id}</td>
                                                        <td style={{ width: "25%" }}>1234567890</td>
                                                        <td style={{ width: "25%" }}>{props?.invoiceDetails?.gstin_number}</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="5">
                                            <table style={{ width: "100%", border: "1px solid #D7DAE0", borderLeft: "none", borderRight: "none" }}>
                                                <thead>
                                                    <tr style={{ border: "1px solid #D7DAE0", color: "#5E6470", textTransform: "uppercase", fontSize: "12px" }}>
                                                        <th style={{ padding: "10px", textAlign: "start", width: "40%" }}>Course Details</th>
                                                        <th style={{ padding: "10px", textAlign: "start", width: "15%" }}>HSN Code</th>
                                                        <th style={{ padding: "10px", textAlign: "start", width: "15%" }}>QTY</th>
                                                        <th style={{ padding: "10px", textAlign: "start", width: "15%" }}>Rate</th>
                                                        <th style={{ padding: "10px", textAlign: "start", width: "15%" }}>Amount</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td style={{ padding: "10px", borderTop: "1px solid #D7DAE0", width: "40%", fontWeight: 600, fontSize: "14px" }}>
                                                            {props?.invoiceDetails?.title}
                                                        </td>
                                                        <td style={{ padding: "10px", borderTop: "1px solid #D7DAE0", width: "15%", fontWeight: 600, fontSize: "14px" }}>
                                                            999293
                                                        </td>
                                                        <td style={{ padding: "10px", borderTop: "1px solid #D7DAE0", width: "15%", fontWeight: 600, fontSize: "14px" }}>
                                                            1
                                                        </td>
                                                        <td style={{ padding: "10px", borderTop: "1px solid #D7DAE0", width: "15%", fontWeight: 600, fontSize: "14px" }}>
                                                            {formatCurrency(getAmountParams(props?.invoiceDetails?.payment_details)?.discountedPrice)}
                                                        </td>
                                                        <td style={{ padding: "10px", borderTop: "1px solid #D7DAE0", width: "15%", fontWeight: 600, fontSize: "14px" }}>
                                                            {formatCurrency(getAmountParams(props?.invoiceDetails?.payment_details)?.discountedPrice)}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="5">
                                            <table width="100%">
                                                <tbody>
                                                    <tr>
                                                        <td width="55%"></td>
                                                        <td style={{ padding: "10px", textAlign: "left", fontWeight: 500, color: "#1A1C21", fontSize: "14px", width: "15%" }}>
                                                            Subtotal
                                                        </td>
                                                        <td width="15%"></td>
                                                        <td style={{ padding: "10px", fontSize: "14px", width: "15%" }}>{formatCurrency(getAmountParams(props?.invoiceDetails?.payment_details).discountedPrice)}</td>
                                                    </tr>
                                                    <tr>
                                                        <td width="55%"></td>
                                                        <td style={{ padding: "10px", textAlign: "left", fontWeight: 500, color: "#1A1C21", fontSize: "14px", width: "15%" }}>
                                                            IGST ({getTaxDetails(props?.invoiceDetails?.tax_details)?.igst ?? 0}%)
                                                        </td>
                                                        <td width="15%"></td>
                                                        <td style={{ padding: "10px", fontSize: "14px", width: "15%" }}>{formatCurrency(getAmountParams(props?.invoiceDetails?.payment_details).igstAmount)}</td>
                                                    </tr>
                                                    <tr>
                                                        <td width="55%"></td>
                                                        <td style={{ padding: "10px", textAlign: "left", fontWeight: 500, color: "#1A1C21", fontSize: "14px", width: "15%" }}>
                                                            CGST ({getTaxDetails(props?.invoiceDetails?.tax_details)?.cgst ?? 0}%)
                                                        </td>
                                                        <td width="15%"></td>
                                                        <td style={{ padding: "10px", fontSize: "14px", width: "15%" }}>{formatCurrency(getAmountParams(props?.invoiceDetails?.payment_details).cgstAmount)}</td>
                                                    </tr>
                                                    <tr>
                                                        <td width="55%"></td>
                                                        <td style={{ padding: "10px", textAlign: "left", fontWeight: 500, color: "#1A1C21", fontSize: "14px", width: "15%" }}>
                                                            SGST ({getTaxDetails(props?.invoiceDetails?.tax_details)?.sgst ?? 0}%)
                                                        </td>
                                                        <td width="15%"></td>
                                                        <td style={{ padding: "10px", fontSize: "14px", width: "15%" }}>{formatCurrency(getAmountParams(props?.invoiceDetails?.payment_details).sgstAmount)}</td>
                                                    </tr>
                                                    <tr>
                                                        <td width="55%"></td>
                                                        <td
                                                            style={{
                                                                padding: "10px",
                                                                textAlign: "left",
                                                                fontWeight: 500,
                                                                color: "#1A1C21",
                                                                fontSize: "14px",
                                                                width: "15%",
                                                                borderTop: "0.5px solid #D7DAE0"
                                                            }}
                                                        >
                                                            Total
                                                        </td>
                                                        <td width="15%" style={{ borderTop: "0.5px solid #D7DAE0" }}></td>
                                                        <td
                                                            style={{
                                                                padding: "10px",
                                                                fontSize: "14px",
                                                                width: "15%",
                                                                borderTop: "0.5px solid #D7DAE0"
                                                            }}
                                                        >
                                                            {formatCurrency(getAmountParams(props?.invoiceDetails?.payment_details).totalPriceWithTax)}
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="5">
                                            <table style={{ width: "100%" }}>
                                                <tbody>
                                                    <tr>
                                                        <td style={{ padding: "15px", border: "0.5px solid #D7DAE0", borderLeft: "none", borderRight: "none", fontWeight: 600, fontSize: "14px", width: "55%" }}>
                                                            Invoice total in words
                                                        </td>
                                                        <td style={{ padding: "15px", border: "0.5px solid #D7DAE0", borderLeft: "none", borderRight: "none", fontWeight: 600, fontSize: "14px", width: "45%" }}>
                                                            {formatAmountInWords(getAmountParams(props?.invoiceDetails?.payment_details)?.totalPriceWithTax)}.
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td colSpan="5">
                                            <table style={{ width: "100%" }}>
                                                <tbody>
                                                    <tr>
                                                        <td style={{ width: "70%" }}></td>
                                                        <td style={{ padding: "15px", textAlign: "end", width: "30%" }}>
                                                            <div style={{ textAlign: "center" }}>
                                                                <h1 style={{ fontWeight: 600, color: "#1A1C21", margin: "0px", marginBottom: "8px", fontSize: "15px" }}>Tech Leads IT</h1>
                                                                <p style={{ fontWeight: 400, color: "#1A1C21", margin: "0px", fontSize: "10px" }}>Digitally Signed by</p>
                                                                <p style={{ fontWeight: 400, color: "#1A1C21", margin: "0px", fontSize: "10px" }}>Tech Leads IT</p>
                                                                <p style={{ fontWeight: 400, color: "#1A1C21", margin: "0px", fontSize: "10px" }}>{format(new Date(props?.invoiceDetails?.updated_at), "dd-MM-yyyy")}</p>
                                                                <img src="/images/payment_gateway/digital-sign.png" style={{ "height": "50px", "transform": "translate(-10px, 18px)", "position": "absolute" }} alt="Digital Signature" />
                                                                <img className="stamp" src="/images/payment_gateway/stamp.png" style={{ "height": "90px !important", "marginLeft": "-30px", "position": "relative" }} alt="Digital Signature" />
                                                                <p style={{ fontWeight: 500, color: "#1A1C21", margin: "0px", marginTop: "8px", fontSize: "15px" }}>Authorised Signatory</p>
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table style={{ width: "100%" }}>
                                <tbody>
                                    <tr>
                                        <td>
                                            <h1 style={{ fontWeight: 600, fontSize: "16px", marginBottom: "2px" }}>Tech Leads IT</h1>
                                            <p style={{ fontWeight: 400, fontSize: "16px", marginTop: "2px" }}>
                                                Police Station, 44/A, 302, Geetanjali Apartments, SR Nagar Main road, Hyderabad, Telangana, 500038, India
                                            </p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            <table style={{ width: "100%" }}>
                                <tbody>
                                    <tr>
                                        <td style={{ textAlign: "end" }}>
                                            <strong>
                                                <span style={{ borderRight: "2px solid #bfc1c5", fontWeight: 600, color: "#000000", marginRight: "25px", paddingRight: "25px" }}>
                                                    +91 8125323232
                                                </span>
                                                <span style={{ fontWeight: 600, color: "#000000" }}>info@techleadsit.com</span>
                                            </strong>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div >
                </View>
            </Page>
        </Document> : <Document>
    <Page size="A4">
      <View>
        <Text>No data found</Text>
      </View>
    </Page>
  </Document>
    );
});

export default DirectPaymentInvoice;
