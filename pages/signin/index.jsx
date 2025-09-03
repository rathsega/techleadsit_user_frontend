import React, { useState, useEffect } from 'react';
import httpService from '../../services/httpService';
import GoogleSignIn from '../common/GoogleSignIn';
import { useRouter } from 'next/router';
import { useLoader } from '../../contexts/LoaderContext';

// let JSEncrypt;

const Signin = () => {
    const [input, setInput] = useState({ emailOrPhone: '', password: '' });
    const [emailOrPhoneError, setEmailOrPhoneError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [globalError, setGlobalError] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [publicKey, setPublicKey] = useState('');
    const [encryptor, setEncryptor] = useState(null);
    const router = useRouter();
    const [submitted, setSubmitted] = useState(false);
    const { setLoading } = useLoader();

    const navigateToMyCourses = () => {
        router.replace('/my-courses');
    }

    useEffect(() => {

        const remembered = localStorage.getItem('rememberedUser');
        if (rememberMe) {
            localStorage.setItem('rememberedUser', JSON.stringify({ emailOrPhone: input.emailOrPhone }));
        } else {
            localStorage.removeItem('rememberedUser');
        }

        // Dynamically import to ensure it's only run in the browser
        /*import('jsencrypt').then(module => {
            JSEncrypt = module.JSEncrypt;
        }).then(() => {
            getPublicKey()
        })*/

        const getPublicKey = async () => {
            const response = await httpService.get('/config/getPublicKey');
            //console.log(response?.data);
            if (response && response?.data && response?.data?.publicKey) {
                setPublicKey(response?.data?.publicKey);
            }
        }
        getPublicKey();
    }, []);

    const validateInput = () => {
        let valid = true;
        setEmailOrPhoneError('');
        setPasswordError('');
        setGlobalError('');

        const isEmail = /\S+@\S+\.\S+/.test(input.emailOrPhone);
        const isPhone = /^\+?[1-9]\d{9,14}$/.test(input.emailOrPhone);

        if (!input.emailOrPhone) {
            setEmailOrPhoneError("Please enter a valid Email");
            valid = false;
        } else if (!isEmail && !isPhone) {
            setEmailOrPhoneError("Invalid Email format");
            valid = false;
        }

        if (!input.password) {
            setPasswordError("Please enter a password");
            valid = false;
        }

        return valid;
    };

    const handleEncryptData = async (credentials) => {
        // Dynamically import jsencrypt in browser
        const { JSEncrypt } = await import('jsencrypt');
        const jsEncrypt = new JSEncrypt();
        jsEncrypt.setPublicKey(publicKey);

        const encrypted = jsEncrypt.encrypt(JSON.stringify(credentials));
        return encrypted;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);

        if (!validateInput()) return;

        try {


            if (rememberMe) {
                localStorage.setItem('rememberedUser', JSON.stringify({ emailOrPhone: input.emailOrPhone, password: input.password }));
            } else {
                localStorage.removeItem('rememberedUser');
            }

            const res = await httpService.post('/auth/validate-user', {
                emailOrPhone: input.emailOrPhone,
                password: input.password
            });

            const data = res.data;

            if (data && data.user) {
                let postData = await handleEncryptData({ email: input.emailOrPhone, password: input.password });
                autoLogin(postData);
                // navigateToMyCourses();
            } else {
                setGlobalError("Your account is suspended or inactive. Contact support.");
            }
        } catch (err) {
            //console.log(err);
            if (err.response?.status === 401) {
                setGlobalError(err.response.data.error || "Incorrect credentials.");
            } else {
                setGlobalError("Something went wrong. Please try again.");
            }
        }
    };

    const autoLogin = (encodedCreds) => {
        const url = process.env.NEXT_PUBLIC_LMS_URL + `login/autologin`;
        openInNewTab(url, { token: encodedCreds });
    };

    const openInNewTab = (url, data) => {
        const form = document.createElement('form');
        form.method = 'GET';
        form.action = url;
        form.target = '_blank';

        for (let key in data) {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = data[key];
            form.appendChild(input);
        }

        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
    };

    const openInNewTabPost = (url, data) => {
        const form = document.createElement('form');
        form.method = 'POST';
        form.action = url;
        form.target = '_blank';

        for (let key in data) {
            const input = document.createElement('input');
            input.type = 'hidden';
            input.name = key;
            input.value = data[key];
            form.appendChild(input);
        }

        document.body.appendChild(form);
        form.submit();
        document.body.removeChild(form);
    };

    const handleUsername = (e) => {
        const value = e.target.value;
        setInput({ ...input, emailOrPhone: value });

        // Live email or phone validation
        const isEmail = /\S+@\S+\.\S+/.test(value);
        const isPhone = /^\+?[1-9]\d{9,14}$/.test(input.emailOrPhone);


        if (!value || (!isEmail && !isPhone)) {
            setEmailOrPhoneError("Invalid Email format");
        } else {
            setEmailOrPhoneError("");
        }
    }

    const handlePassword = (e) => {
        const value = e.target.value;
        setInput({ ...input, password: value });

        // Live password error removal
        if (!value) {
            setPasswordError("Please enter a password");
        } else {
            setPasswordError("");
        }
    }

    const navigateToSignup = () => {
        setLoading(true)
        router.replace('/signup');
        setLoading(false)
    }

    const [showPassword, setShowPassword] = useState(false);


    return (
        <section className="Main-Course-User-Authentication-Screens-Section">
            <div className="Main-Course-User-Authentication-Screens-Section-Container Sign-in-Screen-height position-relative">
                <button className="border-0 Main-Course-Close-Btn" style={{ position: "absolute", right: "27px", top: "27px" }} onClick={() => router.back()}>
                    <i className="fa fa-times Main-Course-Fa-Times Universal-Cross-Mark" aria-hidden="true"></i>
                </button>
                <div className="Main-Course-User-Authentication-Signin-left-side">
                    <div className="Main-Course-User-Authentication-Signin-slider">
                        <img src="/images/auth/Main-Course-SignUI-Rotating-Img-1.svg" className="Main-Course-User-Authentication-Signin-slide-img" />
                        <img src="/images/auth/Main-Course-SignUI-Rotating-Img-2.svg" className="Main-Course-User-Authentication-Signin-slide-img" />
                        <img src="/images/auth/Main-Course-SignUI-Rotating-Img-3.svg" className="Main-Course-User-Authentication-Signin-slide-img" />
                        <img src="/images/auth/Main-Course-SignUI-Rotating-Img-4.svg" className="Main-Course-User-Authentication-Signin-slide-img" />
                    </div>
                    <img src="/images/auth/Main-Course-TechLeads-Logo.svg" className="Main-Course-TechLeads-Logo" alt="TechLeads Logo" />
                </div>
                <div className="Main-Course-User-Authentication-Signin-right-side">
                    <h1 className="Main-Course-UA-Main-heading">Sign In</h1>
                    <p className="Main-Course-UA-Main-Para">Enter your details to empower yourself with knowledge</p>
                    <form id="Signin-form" onSubmit={handleSubmit} className="Main-Course-User-Authentication-Signin-form">
                        <div className="Main-Course-User-Authentication-Signin-form-group">
                            <label htmlFor="email">E-mail</label>
                            <input
                                id="email"
                                type="text"
                                placeholder="Enter your email"
                                className={`${submitted && emailOrPhoneError ? 'Main-Course-User-Authentication-Form-FB' : ''}`}
                                value={input.emailOrPhone}
                                name='username'
                                autoComplete='username'
                                onChange={(e) => handleUsername(e)}
                            />
                            {submitted && emailOrPhoneError && (
                                <div className="Main-Course-User-Authentication-Message-Container">
                                    <img src="/images/auth/Error_Icon.svg" className="Main-Course-User-Authentication-Signin-error-icon" alt="Error-Icon" />
                                    <p className="Main-Course-User-Authentication-Signin-error-Message">{emailOrPhoneError}</p>
                                </div>
                            )}
                        </div>


                        <div className="Main-Course-User-Authentication-Signin-form-row">
                            <div className="Main-Course-User-Authentication-Signin-form-group" style={{ flex: 1 }}>
                                <label htmlFor="password">Password</label>
                                <div className="Main-Course-User-Authentication-Signin-password-wrapper">
                                    <input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter your password"
                                        className={`${submitted && passwordError ? 'Main-Course-User-Authentication-Form-FB' : ''}`}
                                        value={input.password}
                                        onChange={(e) => handlePassword(e)}
                                        name='password'
                                        autoComplete='current-password'
                                    />
                                    <span className="Main-Course-User-Authentication-Signin-toggle-eye" onClick={() => setShowPassword(prev => !prev)}
                                        style={{ cursor: "pointer" }}>
                                        <img src={showPassword ? "/images/auth/Hide-Password.svg" : "/images/auth/Show-Password.svg"} alt="Show Password" />
                                    </span>
                                </div>
                                {submitted && passwordError && (
                                    <div className="Main-Course-User-Authentication-Message-Container">
                                        <img src="/images/auth/Error_Icon.svg" className="Main-Course-User-Authentication-Signin-error-icon" alt="Error-Icon" />
                                        <p className="Main-Course-User-Authentication-Signin-error-Message">{passwordError}</p>
                                    </div>
                                )}
                            </div>

                        </div>


                        {globalError && (
                            <div className="Main-Course-User-Authentication-Message-Container">
                                <img src="/images/auth/Error_Icon.svg" className="Main-Course-User-Authentication-Signin-error-icon" alt="Error-Icon" />
                                <p className="Main-Course-User-Authentication-Signin-error-Message">{globalError}</p>
                            </div>
                        )}

                        <div className="Main-Course-checkbox-wrapper">
                            <input
                                type="checkbox"
                                id="cbx-46"
                                className="Main-Course-Remember-me-input-Checkbox"
                                checked={rememberMe}
                                onChange={(e) => setRememberMe(e.target.checked)}
                            />
                            <label htmlFor="cbx-46" className="Main-Course-Remember-me-Checkbox">
                                <span>
                                    <svg viewBox="0 0 12 10" height="10px" width="12px">
                                        <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
                                    </svg>
                                </span>
                                <span className="Main-Course-Remember-Me-Text">Remember Me</span>
                            </label>
                        </div>

                        <button type="submit" className="Main-Course-User-Authentication-Signin-Button">Sign in</button>

                        <div className="Main-Course-User-Authentication-Signin-signin-link">
                            <a href="/forgotpassword">Forgot Password?</a>
                        </div>
                    </form>
                    <div className="d-flex justify-content-center mt-3">
                        {/* <button className="Main-Course-User-Authentication-Signin-Google-Button">
                            <img src="https://img.icons8.com/color/48/google-logo.png" alt="Google logo" />
                            Sign up with Google
                        </button> */}
                        <GoogleSignIn />
                    </div>
                    <div className="Main-Course-User-Authentication-Signin-signin-link">
                        Don't have an account? <a href="#" onClick={navigateToSignup}>Sign up</a>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Signin;