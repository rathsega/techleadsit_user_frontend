// AutoDownloadInvoice.js
import React, { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { useReactToPrint } from "react-to-print";
import DirectPaymentInvoice from "./DirectPaymentInvoice";
import DirectPaymentInvoiceHTML from './DirectPaymentInvoiceHTML';


const DirectInvoiceAutoDownload = forwardRef((props, ref) => {
  const invoiceRef = useRef(null);
  //console.log(props);
  //console.log(ref);
  const handlePrint = useReactToPrint({
    contentRef: invoiceRef,
    documentTitle: "Invoice",
    onAfterPrint: () => {
      if (props?.onComplete) props?.onComplete(); // Callback after download
      if (props?.onComplete) props?.handleStatus(props?.paymentStatus); // Callback after download
    },
  });


  useEffect(() => {
    if (!props?.invoiceDetails) return;

    const timeout = setTimeout(() => {
      // Avoid printing until ref is available
      if (invoiceRef.current) {
        handlePrint();
      } else {
        console.warn("Invoice ref not ready at print time.");
      }
    }, 1000); // Delay helps with DOM readiness on iOS

    return () => clearTimeout(timeout);
  }, [props?.downloadProp, props?.invoiceDetails]);

  return props?.invoiceDetails ? (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      zIndex: -1,
      visibility: 'hidden'
    }}>
      <DirectPaymentInvoiceHTML invoiceDetails={props?.invoiceDetails} ref={invoiceRef} />
    </div>
  ) : null;

});

export default DirectInvoiceAutoDownload;
