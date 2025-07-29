import { useState, useEffect } from "react";
import httpService from "../../../services/httpService";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { isValidPhoneNumber } from "libphonenumber-js";

const CommentForm = ({ blogId, viewsCount, likeCount }) => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [comment, setComment] = useState("");
    const [errors, setErrors] = useState({});
    const [defaultCountry, setDefaultCountry] = useState("IN");
    const [buttonText, setButtonText] = useState("Submit Now")
    const [errorMsg, setErrorMsg] = useState(false);
    const [successMsg, setSuccessMsg] = useState(false);

    const validateForm = () => {
        let errors = {};
        if (!fullName.trim()) errors.fullName = true;
        if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) errors.email = true;
        if (!phone || !isValidPhoneNumber(phone)) errors.phone = true;
        if (!comment.trim()) errors.comment = true;
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        let validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        } else {
            setErrors({});
        }
        setButtonText("Submitting...")
        try {
            await httpService.post(`blogs/comment/${blogId}`, {
                fullName,
                email,
                phone,
                comment,
            });
            setSuccessMsg(true)
            setFullName("");
            setEmail("");
            setPhone("");
            setComment("");
            setErrors({});
            setTimeout(()=>{setSuccessMsg(false)}, 3000)
        } catch (error) {
            if (error.response) {
                setErrorMsg(error.response.data.message);
                setTimeout(()=>{setErrorMsg(false)}, 3000)
            } else if (error.request) {
                // Request was made but no response received
                console.error("No response received:", error.request);
            }
        }
    };

    useEffect(() => {
        const getCountryCodeByIP = async () => {
            try {
                // Simulating API response (Replace this with real API call)
                const country = "IN"; // Example response
                setDefaultCountry(country);
            } catch (error) {
                console.error("Error fetching country code:", error);
            }
        };

        const getCommentByIp = async () => {
            const response = await httpService.get(`blogs/comment/${blogId}`);
            if (response && response?.data && response?.data?.length > 0) {
                setComment(response.data[0].comment)
                setFullName(response.data[0].fullName)
                setEmail(response.data[0].email)
                setPhone(response.data[0].phone)
            }
        }
        getCountryCodeByIP();
        //getCommentByIp();
    }, []);

    return (
        <form id="leave-comment-form" onSubmit={handleSubmit}>
            <div className="d-flex align-items-center justify-content-between mb-2">
                <h2 className="summary-h">Leave a comment</h2>
                <div className="leave-comment-in-mob">
                    <div>
                        <i className="fa fa-eye" aria-hidden="true"></i>
                        <span className="ms-2">
                            {viewsCount} {viewsCount === 1 ? "View" : "Views"}
                        </span>
                    </div>
                    <div>
                        <i className="fa fa-heart" aria-hidden="true"></i>
                        <span className="ms-2">{likeCount} {likeCount == 1 ? " Like" : " Likes"}</span>
                    </div>
                </div>
            </div>

            <textarea
                name="message"
                placeholder="Type your message..."
                className={`textarea ${errors.comment ? "input-field-error" : ""}`}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
            />

            <div className="Comment-form">
                <div className="Comment-input-container">
                    <input
                        type="text"
                        id="full-name"
                        className={`Comment-input-field ${errors.fullName ? "input-field-error" : ""}`}
                        placeholder=" "
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                    <label htmlFor="full-name" className="Comment-input-label">
                        Full Name<span className="required">*</span>
                    </label>
                </div>
                <div className="Comment-input-container">
                    <input
                        type="email"
                        id="email"
                        className={`Comment-input-field ${errors.email ? "input-field-error" : ""}`}
                        placeholder=" "
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label htmlFor="email" className="Comment-input-label">
                        Email<span className="required">*</span>
                    </label>
                </div>
                <div className="Comment-input-container">
                    <PhoneInput
                        international
                        id="mobile-number"
                        className={`Comment-input-field demo_register_phone ${errors.phone ? "input-field-error" : ""}`}
                        defaultCountry={defaultCountry}
                        value={phone}
                        onChange={setPhone}
                        placeholder="Phone Number*"
                        required
                    />
                    <label htmlFor="mobile-number" className="Comment-input-label">
                        Phone Number<span className="required">*</span>
                    </label>
                </div>
            </div>

            {(!successMsg && !errorMsg) && <div className="text-end">
                <button className="Comment-s-btn" type="submit">Submit</button>
            </div>}
            {successMsg && <div className="Course-text-blinking text-center mt-3">
                    <img src="/images/blog-overview-tick.svg" className="blog-overview-cmnt-tick-img" alt="Tick" />
                    <span className="blog-overview-cmnt-message">Thanks for sharing your thoughts</span>
                  </div>}
            {errorMsg && <div className="">
                <img src="/images/blog-overview-invalid.svg"
                    className="blog-overview-Newsletter-invalid-img" />
                <span className="blog-overview-Newsletter-message">{errorMsg} </span>
            </div>}
        </form>
    );
};

export default CommentForm;
