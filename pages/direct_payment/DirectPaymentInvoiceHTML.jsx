import React, { forwardRef } from 'react';
import { format } from 'date-fns';
import { toWords } from 'number-to-words';

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  }).format(amount);

const formatAmountInWords = (amount) => {
  if (!amount) return "Zero Rupees Only";
  return toWords(amount).replace(/\b\w/g, c => c.toUpperCase()) + " Rupees Only";
};

const getAmountParams = (amountString) =>
  amountString ? JSON.parse(amountString) : {};

const getTaxDetails = (taxString) =>
  taxString ? JSON.parse(taxString) : {};

const DirectPaymentInvoiceHTML = forwardRef(({ invoiceDetails }, ref) => {
  if (!invoiceDetails || Object.keys(invoiceDetails).length === 0) return null;

  const amountParams = getAmountParams(invoiceDetails?.payment_details);
  const taxParams = getTaxDetails(invoiceDetails?.tax_details);

  return (
    <div ref={ref} style={styles.container}>
      <div style={styles.header}>
        <img src="/images/logoDark.webp" alt="Tech Leads IT" style={styles.logo} />
      </div>

      <table style={styles.table}>
        <tbody>
          <tr>
            <td style={styles.section}>
              <strong>Billing Address</strong>
              <p>{invoiceDetails?.name}</p>
              <p>{invoiceDetails?.address}</p>
              <p>{invoiceDetails?.state_name}, {invoiceDetails?.country_name}</p>
              <p>{invoiceDetails?.email}</p>
              <p>{invoiceDetails?.phone}</p>
            </td>
            <td style={styles.section}>
              <strong>Invoice Date</strong>
              <p>{format(new Date(invoiceDetails?.updated_at), 'dd-MM-yyyy')}</p>
            </td>
            <td style={styles.section}>
              <strong>Invoice of (Rupees)</strong>
              <p style={styles.amount}>{formatCurrency(amountParams?.totalPriceWithTax)}</p>
              <p style={styles.paymentMode}>Payment Mode: {invoiceDetails?.payment_type}</p>
            </td>
          </tr>
        </tbody>
      </table>

      <hr />

      <table style={styles.detailsTable}>
        <thead>
          <tr>
            <th>Subject</th>
            <th>Invoice Number</th>
            <th>Reference Number</th>
            <th>GSTIN Number</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Course Purchase</td>
            <td>{invoiceDetails?.invoice_id}</td>
            <td>-</td>
            <td>{invoiceDetails?.gstin_number}</td>
          </tr>
        </tbody>
      </table>

      <table style={styles.courseTable}>
        <thead>
          <tr>
            <th>Course Details</th>
            <th>HSN Code</th>
            <th>Qty</th>
            <th>Rate</th>
            <th>Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{invoiceDetails?.title}</td>
            <td>999293</td>
            <td>1</td>
            <td>{formatCurrency(amountParams?.discountedPrice)}</td>
            <td>{formatCurrency(amountParams?.discountedPrice)}</td>
          </tr>
        </tbody>
      </table>

      <table style={styles.totalTable}>
        <tbody>
          <tr>
            <td colSpan={2}>Subtotal</td>
            <td>{formatCurrency(amountParams?.discountedPrice)}</td>
          </tr>
          <tr>
            <td colSpan={2}>IGST ({taxParams?.igst ?? 0}%)</td>
            <td>{formatCurrency(amountParams?.igstAmount)}</td>
          </tr>
          <tr>
            <td colSpan={2}>CGST ({taxParams?.cgst ?? 0}%)</td>
            <td>{formatCurrency(amountParams?.cgstAmount)}</td>
          </tr>
          <tr>
            <td colSpan={2}>SGST ({taxParams?.sgst ?? 0}%)</td>
            <td>{formatCurrency(amountParams?.sgstAmount)}</td>
          </tr>
          <tr>
            <td colSpan={2}><strong>Total</strong></td>
            <td><strong>{formatCurrency(amountParams?.totalPriceWithTax)}</strong></td>
          </tr>
        </tbody>
      </table>

      <div style={{ marginTop: '20px' }}>
        <strong>Invoice Total in Words:</strong><br />
        <span>{formatAmountInWords(amountParams?.totalPriceWithTax)}</span>
      </div>

      <div style={styles.footer}>
        <div>
          <h3 style={{ margin: 0 }}>Tech Leads IT</h3>
          <p style={{ margin: '5px 0' }}>Police Station, 44/A, 302, Geetanjali Apartments,<br />SR Nagar Main Road, Hyderabad, Telangana, 500038</p>
          <p style={{ margin: '5px 0' }}>+91 8125323232 | info@techleadsit.com</p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <img src="/images/payment_gateway/digital-sign.png" alt="Signature" style={{ height: '50px' }} />
          <img src="/images/payment_gateway/stamp.png" alt="Stamp" style={{ height: '70px' }} />
          <p><strong>Authorised Signatory</strong></p>
        </div>
      </div>
    </div>
  );
});

const styles = {
  container: {
    maxWidth: '800px',
    margin: '20px auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    fontSize: '14px',
    color: '#333',
    backgroundColor: '#fff',
    border: '1px solid #ccc',
  },
  header: {
    textAlign: 'center',
    marginBottom: '20px',
  },
  logo: {
    height: '50px',
  },
  table: {
    width: '100%',
    marginBottom: '20px',
  },
  section: {
    verticalAlign: 'top',
    padding: '10px',
  },
  amount: {
    fontSize: '22px',
    fontWeight: 'bold',
    color: '#005CA9',
    marginBottom: '5px',
  },
  paymentMode: {
    fontSize: '12px',
    color: '#666',
  },
  detailsTable: {
    width: '100%',
    marginBottom: '20px',
    borderCollapse: 'collapse',
    textAlign: 'left',
  },
  courseTable: {
    width: '100%',
    marginBottom: '20px',
    borderCollapse: 'collapse',
    border: '1px solid #ddd',
    textAlign: 'left',
  },
  totalTable: {
    width: '100%',
    textAlign: 'right',
    marginTop: '10px',
  },
  footer: {
    marginTop: '30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: '1px solid #ccc',
    paddingTop: '15px',
  },
};

export default DirectPaymentInvoiceHTML;
