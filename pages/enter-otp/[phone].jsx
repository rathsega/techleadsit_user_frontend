import { useRouter } from 'next/router';
import { useContext, useState, useEffect } from 'react';
import Image from 'next/image';
import httpService from '../../services/httpService';
import { useLoader } from "../../contexts/LoaderContext";

const EnterOtp = () => {
    const router = useRouter();
    const { phone } = router.query;
    const { setLoading } = useLoader();
    const [timer, setTimer] = useState(60);

    const [otp, setOtp] = useState(['', '', '', '']);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState("");

    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => setTimer((t) => t - 1), 1000);
        }
        return () => clearInterval(interval);
    }, [timer]);

    const resendOtp = async () => {
        try {
            setLoading(true)
            let response = await httpService.post('auth/getOtp', { phone: phone });
            //console.log(response);
            if (response && response.status === 200) {
                setLoading(false)
                setSuccessMessage( response?.data?.message || 'Request successful. Please check your phone for further instructions.');
                setTimer(60);
            } else {
                setLoading(false)
                setError('Something went wrong. Please try again later.');
            }
        } catch (error) {
            setLoading(false)
            if (error.response && error.response.data) {
                // Specific error message from server
                setError(error.response.data.message || 'Something went wrong. Please try again later.');
            } else {
                // Generic network error
                setError('Network error. Please check your connection and try again.');
            }
        } finally {
            setLoading(false); // Stop loading after request completes
        }
    }

    const handleChange = (index, value) => {
        if (/^\d?$/.test(value)) {
            const newOtp = [...otp];
            newOtp[index] = value;
            setOtp(newOtp);

            // Auto-focus next box
            if (value && index < 3) {
                document.getElementById(`otp-${index + 1}`).focus();
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const enteredOtp = otp.join('');

        if (enteredOtp.length !== 4) {
            setError('Please enter a valid 4-digit OTP');
            return;
        }

        try {
            setLoading(true);
            const response = await httpService.post('/auth/validateOtp', {
                phone,
                otp: enteredOtp
            });

            setLoading(false);
            if (response?.data?.status == 'success') {
                router.push('/my-courses');
            }
        } catch (err) {
            setLoading(false);
            setError(err.response?.data?.message || 'Invalid OTP. Please try again');
        }
    };

    return (
        <section className="Main-Course-User-Authentication-Screens-Section">
            <div className="Main-Course-User-Authentication-Screens-Section-Container">
                <div className="Main-Course-User-Authentication-Enter-The-OTP-left-side">
                    <div className="Main-Course-User-Authentication-Enter-The-OTP-slider">
                        {[1, 2, 3, 4].map((img, i) => (
                            <Image key={i} src={`/images/auth/Main-Course-SignUI-Rotating-Img-${img}.svg`} className="Main-Course-User-Authentication-Enter-The-OTP-slide-img" alt={`Slide-${img}`} width={200} height={200} />
                        ))}
                    </div>
                    <img src="/images/auth/Main-Course-TechLeads-Logo.svg" className="Main-Course-TechLeads-Logo" alt="TechLeads Logo" />
                </div>
                <div className="Main-Course-User-Authentication-Enter-The-OTP-right-side">
                    <h2 className="Main-Course-UA-EO-Main-heading">Enter OTP</h2>
                    <p className="Main-Course-UA-EO-Main-Para">
                        We have sent an OTP to <span className="Main-Course-EO-Number-Color">{phone}</span>
                        <a onClick={() => router.push('/forgotpassword')} className="Main-Course-EO-Edit-Icon" style={{ cursor: 'pointer' }}>
                            Edit <i className="fas fa-edit"></i>
                        </a>
                    </p>

                    <form onSubmit={handleSubmit} className="Main-Course-User-Authentication-Enter-The-OTP-form">
                        <div className="Main-Course-User-Authentication-OTP-group">
                            <div className="Main-Course-User-Authentication-OTP-inputs">
                                {otp.map((digit, i) => (
                                    <input
                                        key={i}
                                        id={`otp-${i}`}
                                        type="text"
                                        maxLength="1"
                                        className="otp-box"
                                        value={digit}
                                        onChange={(e) => handleChange(i, e.target.value)}
                                    />
                                ))}
                            </div>
                        </div>

                        {error && (
                            <div className="Main-Course-User-Authentication-EOTP-Message-Container">
                                <img src="/images/auth/Error_Icon.svg" className="Main-Course-User-Authentication-Enter-The-OTP-error-icon" alt="Error-Icon" />
                                <p className="Main-Course-User-Authentication-Enter-The-OTP-error-Message">{error}</p>
                            </div>
                        )}

                        <div className="Main-Course-User-Authentication-Enter-The-OTP-signin-link">
                            Didn't get the OTP?{" "}
                            {timer > 0 ? (
                                <span className="Main-Course-Resend-OTP-Text">Resend OTP in {timer}s</span>
                            ) : (
                                <a  className="cursor-pointer" onClick={resendOtp}>
                                    Resend OTP
                                </a>
                            )}
                        </div>

                        {successMessage && <div className="Main-Course-User-Authentication-Message-Container mt-2">
                                    <img src="/images/auth/Success_Icon.svg" className="Main-Course-User-Authentication-Create-New-Password-success-icon" alt="Success-Icon" />
                                    <p className="Main-Course-User-Authentication-Create-New-Password-Success-Message">{successMessage}</p>
                                </div>}

                        <button type="submit" className="Main-Course-User-Authentication-Enter-The-OTP-Button">Verify</button>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default EnterOtp;
