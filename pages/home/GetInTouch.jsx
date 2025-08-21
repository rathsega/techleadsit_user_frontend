const GetInTouch = () => {
    return (
        <section className="Main-Course-Home-Page-Get-In-Touch-Section">
            <div style={{ "flex": "1.5" }}>
                <h2 className="Main-Course-Home-Page-Get-In-Touch-Heading">Get in touch</h2>
                <p className="Main-Course-Home-Page-Get-In-Touch-Para">Have questions or need assistance? Reach out
                    to us via
                    email or call our support team. We're here to help!"</p>
            </div>
            <div style={{ "flex": "2" }}>
                <div className="row">
                    <div className="col-md-6">
                        <a href="mailto:info@techleadsit.com" style={{textDecoration:"none"}}>
                            <div className="d-flex align-items-center gap-2 mt-3">
                                <img src="/images/home/Main-Course-Home-Page-Get-In-Touch-Mail-Us-Icon.svg"
                                    alt="Mail-Us-Icon" height="56" width="56"
                                    className="Main-Course-Home-Page-Get-In-Touch-Icon-S" />
                                <div>
                                    <h3 className="Main-Course-Home-Page-Get-In-Touch-Segment-Heading">Our mail address
                                    </h3>
                                    <p className="Main-Course-Home-Page-Get-In-Touch-Segment-Para">info@techleadsit.com
                                    </p>
                                </div>
                            </div>
                        </a>
                    </div>

                    <div className="col-md-6">
                        <div className="d-flex align-items-center gap-2 mt-3">
                            <img src="/images/home/Main-Course-Home-Page-Get-In-Touch-Call-Us-Icon.svg"
                                alt="Call-Us-Icon" height="56" width="56"
                                className="Main-Course-Home-Page-Get-In-Touch-Icon-S" />
                            <div>
                                <h3 className="Main-Course-Home-Page-Get-In-Touch-Segment-Heading">Our Contact info
                                </h3>
                                <p className="Main-Course-Home-Page-Get-In-Touch-Segment-Para"><a href="tel:+918125323232"  style={{textDecoration:"none"}}>+91 8125323232</a></p>
                            </div>
                        </div>
                    </div>
                </div>

                <a href="https://maps.app.goo.gl/MdpESQfm7xGgP7pw7" target="_blank" rel="noopener noreferrer" style={{ textDecoration: "none" }}>
                    <div className="d-flex align-items-start gap-2 mt-3">
                        <img alt="Location-Icon" height="56" width="56" className="MMain-Course-Home-Page-Get-In-Touch-Icon-S" src="/images/courses/Main-Course-Get-In-Touch-Our-Location-Icon.svg" />
                        <div>
                            <h3 className="Main-Course-Get-In-Touch-Segment-Heading">Our address</h3>
                            <p className="Main-Course-Get-In-Touch-Segment-Para">4th Floor, Eashan Arcade, Plot no 3-164, Trendz Arcade, Kavuri Hills Road, Doctor's Colony, Hyderabad, Telangana 500033</p>
                        </div>
                    </div>
                </a>
            </div>
        </section>
    )
}

export default GetInTouch;