import React, { useEffect } from 'react';
const AlreadySubmitted = ({handleDetailsSubmitted}) => {
    //click on outside to close the popup and should close if we click on escape key
    useEffect(() => {
        const handleClickOutside = (event) => {
            const popup = document.querySelector('.Main-Course-Already-Sub-Suc-Section');
            if (popup && !popup.contains(event.target)) {
                handleDetailsSubmitted();
            }
        };

        const handleEscapeKey = (event) => {
            if (event.key === 'Escape') {
                handleDetailsSubmitted();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscapeKey);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscapeKey);
        };
    }, [handleDetailsSubmitted]);

    

    return (
        <section className="Main-Course-Already-Sub-Suc-Section">
        <div className="d-flex align-items-center justify-content-between">
            <h2 className="Main-Course-Already-Sub-Suc-heading">Registration Form</h2>
            <button className="Main-Course-Already-Sub-Suc-CrossMark" onClick={handleDetailsSubmitted}><i className="fa-solid fa-xmark Universal-Cross-Mark"></i></button>
        </div>
        <div className="Main-Course-Already-Sub-Suc-Content-Sec">
            <img src="/images/Icon.svg" alt="Main-Course-Already-Sub-Suc" width="64" height="64" className="mb-3" />
            <p className="Main-Course-Already-Submitted-Para">You’ve already registered with us! Our team will get back to you. No need to fill the form again.</p>
        </div>
    </section>
    )
}

export default AlreadySubmitted;