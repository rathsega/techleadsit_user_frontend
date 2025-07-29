import React from 'react';
import Image from 'next/image'
const GetInTouch = () => {
    return (
        <section className="Get-in-touch-section">
            <div className="Contact-us">
                <div className="row">
                    <div className="col-lg-6">
                        <h1 className="get-in-touch-main-h">Get in touch</h1>
                        <p className="get-in-touch-main-p">Have questions or need assistance? Reach out to us via email or call our support team. We're here to help!"</p>
                    </div>
                    <div className="col-lg-3 col-6">
                        <a href="mailto:info@techleadsit.com" style={{textDecoration:"none"}}>
                            <Image src="/images/demo/contact us mail icon.svg" height="40" alt='Mail icon' className="contactus-img" />
                            <p className="get-in-touch-sub">Our mail address</p>
                            <p className="get-in-touch-main-p"><a href="mailto:info@techleadsit.com">info@techleadsit.com</a></p>
                        </a>
                    </div>
                    <div className="col-lg-3 col-6">
                        <Image src='/images/demo/contact us phone icon.svg' alt='Phone icon' height="40" className="contactus-img" />
                        <p className="get-in-touch-sub">Our Contact info</p>
                        <p className="get-in-touch-main-p"><a href="tel:+918125323232"  style={{textDecoration:"none"}}>+91-8125323232</a></p>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default GetInTouch;