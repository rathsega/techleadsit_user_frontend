import React, { forwardRef } from "react";
import { toWords } from "number-to-words";
import { Page, Text, View, Document, StyleSheet, Font, Image } from "@react-pdf/renderer";

// Register the Inter font (Ensure internet connection for font loading)
Font.register({
    family: "Inter",
    src: "https://fonts.gstatic.com/s/inter/v3/UcC8FJQ4PlQkZZKc-PtK8H0.woff2",
});

// Styles for PDF
const styles = StyleSheet.create({
    page: { padding: 20, fontSize: 12, fontFamily: 'Helvetica' },
    section: { marginBottom: 10, padding: 10 },
    header: { textAlign: 'center', marginBottom: 10 },
    table: { display: 'table', width: '100%', borderWidth: 1, borderColor: '#ddd' },
    tableRow: { flexDirection: 'row' },
    tableCellHeader: { padding: 5, fontWeight: 'bold', backgroundColor: '#F4F4F4', borderBottomWidth: 1 },
    tableCell: { padding: 5, borderBottomWidth: 1 },
    rightAlign: { textAlign: 'right' },
    bold: { fontWeight: 'bold' },
    logo: { height: 50, marginBottom: 10, width: '40%' },
    signature: { height: 50, marginTop: 10 },
    footer: { textAlign: 'center', marginTop: 20, fontSize: 10 },
});

// Invoice Component
const DirectPaymentInvoiceReact = ({ invoiceDetails }) => {
    const formatDate = (dateStr) => {
        const date = new Date(dateStr);

        const day = date.getDate();
        const month = date.toLocaleString('default', { month: 'short' }); // Get short month (Jan, Feb, etc.)
        const year = date.getFullYear();

        // Get suffix for the day
        const suffix = (day % 10 === 1 && day !== 11) ? 'st' :
            (day % 10 === 2 && day !== 12) ? 'nd' :
                (day % 10 === 3 && day !== 13) ? 'rd' : 'th';

        return `${day}${suffix} ${month}, ${year}`;
    }

    const getAmountParams = (amountString) => {
        return amountString ? JSON.parse(amountString) : "";
    }

    const getTaxDetails = (taxString) => {
        return taxString ? JSON.parse(taxString) : "";
    }

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat("en-IN", {
            minimumFractionDigits: 2, // Ensures two decimal places
        }).format(amount);
    };

    const formatAmountInWords = (amount) => {
        if (amount === 0) return "Zero Rupees Only";
        return amount ? toWords(amount).replace(/\b\w/g, (c) => c.toUpperCase()) + " Rupees Only" : "Zero Rupees Only";
    };
    return (
        <Document>
            <Page size="A4" style={styles.page}>
                {/* Header Section */}
                {/* <View style={{ padding: "5px", textAlign: "center" }}>
                    <Image src={LogoLight} style={{ height: "50px" }} />
                </View> */}
                <View style={styles.header}>
                    <Image src="/images/logoLight.png" style={styles.logo} />
                </View>

                <View style={[styles.tableRow]}>
                    {/* Billing Section */}
                    <View style={{ padding: 15, verticalAlign: "top", fontSize: "15px", width: "45%" }}>
                        <Text style={styles.bold}>Billing Address</Text>
                        <Text>{invoiceDetails?.name}</Text>
                        <Text>{invoiceDetails?.address}, {invoiceDetails?.state_name}, {invoiceDetails?.country_name}.</Text>
                        <Text>{invoiceDetails?.email}</Text>
                        <Text>{invoiceDetails?.phone}</Text>
                    </View>
                    {/* Invoice Date Section */}
                    <View style={{ padding: 15, verticalAlign: "top", width: "25%" }}>
                        <Text style={{ fontWeight: 500, color: '#5E6470', marginBottom: 8 }}>Invoice Date</Text>
                        <Text style={{ fontWeight: 600, color: '#1A1C21', marginBottom: 8 }}>
                            {formatDate(invoiceDetails?.updated_at)}
                        </Text>
                    </View>

                    {/* Invoice Amount Section */}
                    <View style={{ padding: 15, textAlign: "right", verticalAlign: "top", width: "35%" }}>
                        <Text style={{ fontWeight: 500, color: '#5E6470', marginBottom: 8 }}>Invoice of (Rupees)</Text>
                        <Text style={{ fontWeight: 700, color: '#005CA9', marginBottom: 8, fontSize: 26 }}>
                        {formatCurrency(getAmountParams(invoiceDetails?.payment_details)?.totalPriceWithTax)}
                        </Text>
                        <Text style={{ fontWeight: 500, color: '#5E6470', marginBottom: 8, fontSize: 12, textTransform: 'capitalize' }}>
                            Payment Mode: {invoiceDetails?.payment_type}
                        </Text>
                    </View>
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>



                </View>


                {/* Invoice Summary */}
                <View style={styles.section}>
                    <View style={styles.table}>
                        <View style={[styles.tableRow, styles.tableCellHeader]}>
                            <Text style={{ width: '25%' }}>Subject</Text>
                            <Text style={{ width: '25%' }}>Invoice No.</Text>
                            <Text style={{ width: '25%' }}>Reference No.</Text>
                            <Text style={{ width: '25%' }}>GSTIN</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={[styles.tableCell, { width: '25%' }]}>Course Purchase</Text>
                            <Text style={[styles.tableCell, { width: '25%' }]}>{invoiceDetails?.invoice_id}</Text>
                            <Text style={[styles.tableCell, { width: '25%' }]}>-</Text>
                            <Text style={[styles.tableCell, { width: '25%' }]}>{invoiceDetails?.gstin_number}</Text>
                        </View>
                    </View>
                </View>

                {/* Course Details Table */}
                <View style={styles.section}>
                    <View style={styles.table}>
                        <View style={[styles.tableRow, styles.tableCellHeader]}>
                            <Text style={{ width: '40%' }}>Course Details</Text>
                            <Text style={{ width: '15%' }}>HSN Code</Text>
                            <Text style={{ width: '15%' }}>QTY</Text>
                            <Text style={{ width: '15%' }}>Rate</Text>
                            <Text style={{ width: '15%' }}>Amount</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={[styles.tableCell, { width: '40%' }]}>{invoiceDetails?.title}</Text>
                            <Text style={[styles.tableCell, { width: '15%' }]}>999293</Text>
                            <Text style={[styles.tableCell, { width: '15%' }]}>1</Text>
                            <Text style={[styles.tableCell, { width: '15%' }]}>{formatCurrency(getAmountParams(invoiceDetails?.payment_details)?.discountedPrice)}</Text>
                            <Text style={[styles.tableCell, { width: '15%' }]}>{formatCurrency(getAmountParams(invoiceDetails?.payment_details)?.discountedPrice)}</Text>
                        </View>
                    </View>
                </View>

                {/* Total Calculation */}
                <View style={styles.section}>
                    <View style={styles.table}>
                        <View style={styles.tableRow}>
                            <Text style={[styles.tableCell, { width: '55%' }]}></Text>
                            <Text style={[styles.tableCell, styles.rightAlign, { width: '15%' }]}>Subtotal</Text>
                            <Text style={[styles.tableCell, { width: '15%' }]}></Text>
                            <Text style={[styles.tableCell, { width: '15%' }]}>{formatCurrency(getAmountParams(invoiceDetails?.payment_details)?.discountedPrice)}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={[styles.tableCell, { width: '55%' }]}></Text>
                            <Text style={[styles.tableCell, styles.rightAlign, { width: '15%' }]}>IGST ({getTaxDetails(invoiceDetails?.tax_details)?.igst}%)</Text>
                            <Text style={[styles.tableCell, { width: '15%' }]}></Text>
                            <Text style={[styles.tableCell, { width: '15%' }]}>{formatCurrency(getAmountParams(invoiceDetails?.payment_details)?.igstAmount)}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={[styles.tableCell, { width: '55%' }]}></Text>
                            <Text style={[styles.tableCell, styles.rightAlign, { width: '15%' }]}>CGST ({getTaxDetails(invoiceDetails?.tax_details)?.cgst}%)</Text>
                            <Text style={[styles.tableCell, { width: '15%' }]}></Text>
                            <Text style={[styles.tableCell, { width: '15%' }]}>{formatCurrency(getAmountParams(invoiceDetails?.payment_details)?.cgstAmount)}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={[styles.tableCell, { width: '55%' }]}></Text>
                            <Text style={[styles.tableCell, styles.rightAlign, { width: '15%' }]}>SGST ({getTaxDetails(invoiceDetails?.tax_details)?.sgst}%)</Text>
                            <Text style={[styles.tableCell, { width: '15%' }]}></Text>
                            <Text style={[styles.tableCell, { width: '15%' }]}>{formatCurrency(getAmountParams(invoiceDetails?.payment_details)?.sgstAmount)}</Text>
                        </View>
                        <View style={styles.tableRow}>
                            <Text style={[styles.tableCell, { width: '55%' }]}></Text>
                            <Text style={[styles.tableCell, styles.rightAlign, { width: '15%' }]}>Total</Text>
                            <Text style={[styles.tableCell, { width: '15%' }]}></Text>
                            <Text style={[styles.tableCell, { width: '15%' }]}>{formatCurrency(getAmountParams(invoiceDetails?.payment_details)?.totalPriceWithTax)}</Text>
                        </View>
                    </View>
                </View>

                {/* Invoice Total in Words */}
                <View style={styles.section}>
                    <Text style={styles.bold}>Invoice Total in Words</Text>
                    <Text>{formatAmountInWords(getAmountParams(invoiceDetails?.payment_details)?.totalPriceWithTax)}.</Text>
                </View>

                {/* Signature Section */}
                {/* <View style={[styles.section, styles.rightAlign]}>
                    <Text style={styles.bold}>Tech Leads IT</Text>
                    <Text>Digitally Signed by</Text>
                    <Text>Tech Leads IT</Text>
                    <Text>{new Date(invoiceDetails?.updated_at).toLocaleDateString()}</Text>
                    <Image src={digitalSign} style={{ "height": "50px", "width": "150px", "transform": "translate(-10px, 18px)", "position": "absolute" }} />
                    <Image src={stamp} style={{ "height": "90px !important", "width": "150px", "marginLeft": "-30px", "position": "relative" }} />
                    <Text style={styles.bold}>Authorised Signatory</Text>
                </View> */}

                <View style={[styles.section, styles.rightAlign, { alignItems: 'flex-end', position: 'relative' }]}>
                    <Text style={styles.bold}>Tech Leads IT</Text>
                    <Text>Digitally Signed by</Text>
                    <Text>Tech Leads IT</Text>
                    <Text>{new Date(invoiceDetails?.updated_at)?.toLocaleDateString()}</Text>

                    {/* Stamp Image */}
                    <Image
                        src="/images/payment_gateway/stamp.png"
                        style={{ height: 90, width: 150, position: 'relative', marginRight: 0 }}
                    />

                    {/* Digital Signature (Overlapping the Stamp) */}
                    <Image
                        src="/images/payment_gateway/digital-sign.png"
                        style={{
                            height: 50,
                            width: 150,
                            position: 'absolute',
                            right: 10,
                            bottom: 30,
                            transform: 'translateX(-50%)' // Centers the signature over the stamp
                        }}
                    />

                    <Text style={styles.bold}>Authorised Signatory</Text>
                </View>

                {/* Footer */}
                <View style={styles.footer}>
                    <Text>Tech Leads IT</Text>
                    <Text>44/A, Geetanjali Apartments, SR Nagar Main road, Hyderabad, Telangana, 500038, India</Text>
                    <Text>+91 8125323232 | info@techleadsit.com</Text>
                </View>
            </Page>
        </Document>
    );
};

export default DirectPaymentInvoiceReact;
