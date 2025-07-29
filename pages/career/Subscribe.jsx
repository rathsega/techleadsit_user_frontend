import { useState } from "react";
import httpService from "../../services/httpService";

const Subscribe = ({ handleOpenPopup }) => {

    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [errorMsg, setErrorMsg] = useState("Please Enter Valid Email Address");

    const handleSubscribe = async () => {
        setError(false);
        setSuccess(false);
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            setError(true);
            setErrorMsg("Enter a valid email address");
            return;
        }

        try {
            const response = await httpService.post("blogs/subscribeNewsLetter/" + null, { email });
            if (response.status === 200) {

                setSuccess(true);
                setEmail("");
                setTimeout(() => {
                    handleOpenPopup();
                }, 3000)
            }
        } catch (error) {
            setError(true);
            setErrorMsg(error?.response?.data?.message);
        }
    };

    return (
        <div id="Main-Course-CP-CJD-SendMe-Jobs-Like-This-ov-share-popup"
            className="Main-Course-CP-CJD-SendMe-Jobs-Like-This-ov-share-popup">
            <div className="Main-Course-CP-CJD-Job-ov-share-popup-content">
                <h1 className="Main-Course-CP-CJD-Job-ov-share-popup-h">Send me jobs like this</h1>
                <span className="Main-Course-CP-CJD-Job-ov-share-close" onClick={handleOpenPopup}><i
                    className="fa-solid fa-xmark"></i></span>
                <p className="Main-Course-CP-CJD-Job-ov-share-popup-p">Stay updated! Enter your email below to receive alerts
                    for similar job openings at Tech Leads IT.</p>
                <input type="email" placeholder="Enter your Email ID" className="Main-Course-CP-CJD-SMJLT-input" value={email}
                    onChange={(e) => setEmail(e.target.value)} />
                <div className="text-end">
                    <button className="Main-Course-CP-SMJLT-Submit-Button" onClick={handleSubscribe}>Submit</button>
                </div>
                {success && <div className="Main-Course-CP-CJD-SMJLT-Mail-Submit ">
                    <img src="/images/careers/CP-CJD-ov-Req-m-info-tick-img.svg"
                        alt="CP-CJD-ov-Req-m-info-tick-img" className="CP-CJD-ov-Req-m-info-img" height="40" width="40" />
                    <div>
                        <p className="Main-Course-CP-CJD-SMJLT-input-Sf-Message">Thank you! </p>
                        <p className="Main-Course-CP-CJD-SMJLT-input-Sf-Message">You'll now receive job updates </p>
                    </div>
                </div>}
                {error && errorMsg && <div className="Main-Course-CP-CJD-SMJLT-Mail-Submit ">
                    <img src="/images/careers/CP-CJD-ov-Req-m-info-invalid-img.svg"
                        alt="CP-CJD-ov-Req-m-info-tick-img" className="CP-CJD-ov-Req-m-info-img" height="40" width="40" />
                    <div>
                        <p className="Main-Course-CP-CJD-SMJLT-input-Sf-Message">{errorMsg}</p>
                    </div>
                </div>}
            </div>
        </div>
    )
}

export default Subscribe;