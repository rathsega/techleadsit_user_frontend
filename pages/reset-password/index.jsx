import { useState } from "react";
import { useRouter } from 'next/router';
import httpService from "../../services/httpService";
import { useLoader } from "../../contexts/LoaderContext";

const ResetPassword = () => {

    // Access the router to get query parameters
    const router = useRouter();

    // Get the token from the query params
    const { token } = router.query;

    // State to hold the input values and error messages
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState({
        password: '',
        confirmPassword: '',
    });
    const [isSubmitted, setIsSubmitted] = useState(false);  // Track if the form has been submitted
    const { setLoading } = useLoader();
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);

    // Regex pattern for validating password
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // Password change handler
    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);

        // If form has been submitted, validate immediately
        if (isSubmitted) {
            validatePassword(value, confirmPassword);
        }
    };

    // Confirm password change handler
    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value;
        setConfirmPassword(value);

        // If form has been submitted, validate immediately
        if (isSubmitted) {
            validateConfirmPassword(password, value);
        }
    };

    // Submit handler
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Mark form as submitted to trigger validation
        setIsSubmitted(true);

        // Perform final validation
        const passwordValidationError = validatePassword(password, confirmPassword);
        const confirmPasswordValidationError = validateConfirmPassword(password, confirmPassword);

        // If any errors exist, prevent form submission
        if (passwordValidationError || confirmPasswordValidationError) {
            return; // Prevent submission if there are errors
        }

        // Handle the form submission here (e.g., API call)
        //console.log('Form submitted', { password, confirmPassword });

        const requestPayload = {
            password,
            confirmPassword,
            token,
        };

        try {
            setLoading(true);
            const response = await httpService.post('/auth/resetPassword', requestPayload);
            setLoading(false);
            if (response && response.data) {
                setShowSuccessMessage(true);
            }
        } catch (error) {
            setLoading(false);
            console.error('Error:', error.customMessage || error.message || error);
            setErrors({global: error.customMessage || 'Something went wrong, please try again.'});
        }

    };

    const validatePassword = (password, confirmPassword) => {
        let passwordError = '';

        if (!password.match(passwordRegex)) {
            passwordError = 'Password must have uppercase, lowercase, number, special character and min 8 characters.';
        }

        // Set the error for password directly in the state
        setErrors(prev => ({
            ...prev,
            password: passwordError,
        }));

        return passwordError;
    };

    const validateConfirmPassword = (password, confirmPassword) => {
        let confirmPasswordError = '';

        if (password !== confirmPassword) {
            confirmPasswordError = 'Passwords do not match.';
        }

        // Set the error for confirm password directly in the state
        setErrors(prev => ({
            ...prev,
            confirmPassword: confirmPasswordError,
        }));

        return confirmPasswordError;
    };


    const closePopup = () => {
        setShowSuccessMessage(prev => !prev)
    }


    return (
        <section className="Main-Course-User-Authentication-Screens-Section">
            <div className="Main-Course-User-Authentication-Screens-Section-Container">
                <div className="Main-Course-User-Authentication-Create-New-Password-left-side">
                    <div className="Main-Course-User-Authentication-Create-New-Password-slider">
                        <img src="/images/auth/Create-New-Password-Img-1.svg" className="Main-Course-User-Authentication-Create-New-Password-slide-img" />
                        <img src="/images/auth/Create-New-Password-Img-2.svg" className="Main-Course-User-Authentication-Create-New-Password-slide-img" />

                    </div>
                    <img src="/images/auth/Main-Course-TechLeads-Logo.svg" className="Main-Course-TechLeads-Logo" alt="TechLeads Logo" />
                </div>
                <div className="Main-Course-User-Authentication-Create-New-Password-right-side">
                    <h2 className="Main-Course-UA-CNP-Main-heading">Create New Password</h2>
                    <p className="Main-Course-UA-CNP-Main-Para">Secure your account with a fresh password</p>
                    <form id="Create-New-Password-form" className="Main-Course-User-Authentication-Create-New-Password-form" onSubmit={handleSubmit}>
                        <div className="Main-Course-User-Authentication-Create-New-Password-form-row">
                            <div className="Main-Course-User-Authentication-Create-New-Password-form-group" style={{ flex: 1 }}>
                                <label htmlFor="password">New Password</label>
                                <div className="Main-Course-User-Authentication-Create-New-Password-password-wrapper">
                                    <input
                                        id="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Enter your password"
                                        className={`${errors.password ? 'Main-Course-User-Authentication-Form-FB' : ''}`}
                                        value={password}
                                        onChange={handlePasswordChange}
                                    />
                                    <span
                                        className="Main-Course-User-Authentication-Create-New-Password-toggle-eye"
                                        onClick={() => setShowPassword(prev => !prev)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <img src={showPassword ? "/images/auth/Hide-Password.svg" : "/images/auth/Show-Password.svg"} alt="Show Password" />
                                    </span>
                                </div>
                                {errors.password && <div className="Main-Course-User-Authentication-Message-Container">
                                    <img src="/images/auth/Error_Icon.svg" className="Main-Course-User-Authentication-Create-New-Password-error-icon" alt="Error-Icon" />
                                    <p className="Main-Course-User-Authentication-Create-New-Password-error-Message">{errors.password}</p>
                                </div>}
                            </div>
                            <div className="Main-Course-User-Authentication-Create-New-Password-form-group" style={{ flex: 1 }}>
                                <label htmlFor="confirm">Re-enter new Password</label>
                                <div className="Main-Course-User-Authentication-Create-New-Password-password-wrapper">
                                    <input
                                        id="confirm"
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        placeholder="Re-enter your password"
                                        className={`${errors.confirmPassword ? 'Main-Course-User-Authentication-Form-FB' : ''}`}
                                        value={confirmPassword}
                                        onChange={handleConfirmPasswordChange}
                                    />
                                    <span
                                        className="Main-Course-User-Authentication-Create-New-Password-toggle-eye"
                                        onClick={() => setShowConfirmPassword(prev => !prev)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <img src={showConfirmPassword ? "/images/auth/Hide-Password.svg" : "/images/auth/Show-Password.svg"} alt="Show Password" />
                                    </span>
                                </div>
                                {errors.confirmPassword && <div className="Main-Course-User-Authentication-Message-Container">
                                    <img src="/images/auth/Error_Icon.svg" className="Main-Course-User-Authentication-Create-New-Password-error-icon" alt="Error-Icon" />
                                    <p className="Main-Course-User-Authentication-Create-New-Password-error-Message">{errors.confirmPassword}</p>
                                </div>}
                                {isSubmitted && !errors.global && !errors.password && !errors.confirmPassword && <div className="Main-Course-User-Authentication-Message-Container mt-2">
                                    <img src="/images/auth/Success_Icon.svg" className="Main-Course-User-Authentication-Create-New-Password-success-icon" alt="Success-Icon" />
                                    <p className="Main-Course-User-Authentication-Create-New-Password-Success-Message">Strong password! You're good to go</p>
                                </div>}
                                {errors.global && <div className="Main-Course-User-Authentication-Message-Container mt-3">
                                    <img src="/images/auth/Error_Icon.svg" className="Main-Course-User-Authentication-Create-New-Password-error-icon" alt="Error-Icon" />
                                    <p className="Main-Course-User-Authentication-Create-New-Password-error-Message">{errors.global}</p>
                                </div>}
                            </div>
                        </div>

                        <button type="submit" className="Main-Course-User-Authentication-Create-New-Password-Button">Update Password</button>
                    </form>
                </div>

                {
                    showSuccessMessage && <section className="Main-Course-Successful-loader-overlay">
                        <div className="Main-Course-Successful-S-Text-Container">
                            <div className="Main-Course-User-Authentication-Create-New-Password-S-Text-Container">
                                <button className="Universal-Cross-Mark-Rounded-Btn" onClick={closePopup} style={{"position":"absolute","right":"15px","top":"15px","fontSize":"20px","background":"rgb(1, 98, 140)","padding":"0px 9px","borderRadius":"50%","border":"none"}}>
          <i className="fa-solid fa-xmark Universal-Cross-Mark" style={{color:"white"}}></i>
        </button>
                                <img src="/images/auth/Successfully-Changed-Img.svg" alt="Successfully Changed" className="Main-Course-User-Authentication-Create-New-Password-Successfully-Changed-Img" />
                                <h2 className="Main-Course-Create-New-Password-S-Heading">Password Reset Successful</h2>
                                <p className="Main-Course-Create-New-Password-S-Para">Your new password has been set successfully. You can now log in with your updated credentials.</p>
                            </div>
                        </div>
                    </section>
                }

            </div>
        </section>
    )
}

export default ResetPassword;