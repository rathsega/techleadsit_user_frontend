const TestimonialReadMorePopup = ({handleTextPopupVisibility, textPopupData}) => {
    return (
        <>
            <div className="C-Webinar-Page-read-more-overlay"></div>
            <div className="C-Webinar-Page-read-more-popup">
                <button className="C-Webinar-Page-read-more-close border-0" onClick={handleTextPopupVisibility}><i className="fa fa-times C-fa-times" aria-hidden="true"></i></button>
                <div className="C-Webinar-Page-read-more-align">
                    <div>
                        <img src="/images/webinar_page_asstes/Vector.png" height="25" />
                            <p className="C-Webinar-Page-read-more-popup-text">{textPopupData?.review}</p>
                    </div>

                    <div className="C-Webinar-Page-popup-reviewer d-flex align-items-center">
                        <img className="C-Webinar-Page-popup-reviewer-img" src={process.env.NEXT_PUBLIC_FILES_URL + textPopupData?.image?.path} alt="reviewer-image" height="40" />
                            <div className="d-flex flex-column C-Webinar-Page-role-adj">
                                <span className="C-Webinar-Page-popup-reviewer-name C-Webinar-Page-role-h">{textPopupData?.name}</span>
                                <p className="C-Webinar-Page-popup-reviewer-role C-Webinar-Page-role">{textPopupData?.designation}</p>
                            </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TestimonialReadMorePopup;