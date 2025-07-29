const WhoShouldAttend = ({ details }) => {
    return (
        <section className="C-Webinar-Page-Who-should-attend-section mt-5">
            <h2 className="C-Webinar-Page-c-heading mb-0">WHO SHOULD ATTEND ?</h2>
            <h1 className="C-Webinar-Page-c-subhead mt-2">IS THIS WEBINAR RIGHT FOR YOU</h1>
            <p className="C-Webinar-Page-c-para mt-2">Explore how this webinar can align with your learning objectives, equip you
                with valuable
                skills, and help you take significant strides toward achieving your professional aspirations.</p>
            <div className="my-4">
                <div className="C-Webinar-Page-Who-should-attend-container row">
                    {details && details.length > 0 && <div className="col-lg-5 d-flex align-items-stretch">
                        <div className="C-Webinar-Page-Who-should-attend-card d-fl-cl-between p-5 p-30px-25px">
                            <span className="text-left">
                                <h3>{details[0]?.audienceType}</h3>
                                <p>{details[0]?.description}</p>
                            </span>
                            <img src={process.env.NEXT_PUBLIC_FILES_URL + details[0]?.image?.path} alt="Students learning together"
                                className="img-fluid p-10-20px" />
                        </div>
                    </div>}
                    {details && details.length > 1 && <div className="col-lg-7 C-Webinar-Page-Who-should-attend-grid mt-25px">
                        {
                            details?.map((sec, secInd) => (
                                secInd > 0 && <div className={`C-Webinar-Page-Who-should-attend-card${secInd} d-fl-cl-between`} key={secInd}>
                                    <span className="text-left p-4 p-20px-10px">
                                        <h3>{sec?.audienceType}</h3>
                                        <p>{sec?.description}</p>
                                    </span>
                                    <img src={process.env.NEXT_PUBLIC_FILES_URL + sec?.image?.path} alt="Beginner learning"
                                        className="img-fluid p-0-25px" />
                                </div>
                            ))
                        }
                        
                    </div>}



                </div>
            </div>
        </section>
    )
}

export default WhoShouldAttend;