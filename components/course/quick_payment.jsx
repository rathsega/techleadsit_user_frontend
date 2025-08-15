import React, { useState } from 'react';
import PhoneInput from 'react-phone-number-input';
import { isValidPhoneNumber } from 'libphonenumber-js';
import 'react-phone-number-input/style.css';
import { useLoader } from '../../contexts/LoaderContext';
import { useRouter } from 'next/router';
import useLmsStore from '../../store/lmsStore';
import httpService from '../../services/httpService';

const QuickPayment = ({ courseData }) => {

    const buyingCourse = useLmsStore((state) => state.buyingCourse);
    const setQuickPaymentVisibility = useLmsStore((state) => state.setQuickPaymentVisibility);
    const setBuyingCourse = useLmsStore((state) => state.setBuyingCourse);
    const setCartVisitor = useLmsStore((state) => state.setCartVisitor);
    console.log("Buying Course: ", buyingCourse);

    const router = useRouter();
    const { setLoading } = useLoader();

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: ''
    });

    const [formErrors, setFormErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user starts typing AND validate immediately if there was an error
        if (formErrors[name]) {
            // Validate this specific field
            const fieldError = validateSingleField(name, value);
            setFormErrors(prev => ({
                ...prev,
                [name]: fieldError
            }));
        }
    };

    const handlePhoneChange = (value) => {
        setFormData(prev => ({
            ...prev,
            phone: value || ''
        }));

        // Clear error when user starts typing AND validate immediately if there was an error
        if (formErrors.phone) {
            const phoneError = validateSingleField('phone', value);
            setFormErrors(prev => ({
                ...prev,
                phone: phoneError
            }));
        }
    };

    const validateSingleField = (fieldName, value) => {
        switch (fieldName) {
            case 'fullName':
                if (!value.trim()) {
                    return 'Full name is required';
                }
                if (!/^[A-Za-z\s]+$/.test(value)) {
                    return 'Full name can only contain letters and spaces';
                }
                return '';

            case 'email':
                if (!value.trim()) {
                    return 'Email is required';
                }
                if (!/\S+@\S+\.\S+/.test(value)) {
                    return 'Please enter a valid email';
                }
                return '';

            case 'phone':
                if (!value) {
                    return 'Phone number is required';
                }
                if (!isValidPhoneNumber(value)) {
                    return 'Please enter a valid phone number';
                }
                return '';

            default:
                return '';
        }
    };

    const validateForm = () => {
        const errors = {};

        const fullNameError = validateSingleField('fullName', formData.fullName);
        if (fullNameError) errors.fullName = fullNameError;

        const emailError = validateSingleField('email', formData.email);
        if (emailError) errors.email = emailError;

        const phoneError = validateSingleField('phone', formData.phone);
        if (phoneError) errors.phone = phoneError;

        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const errors = validateForm();
        if (Object.keys(errors).length > 0) {
            setFormErrors(errors);
            return;
        }

        setIsSubmitting(true);
        setLoading(true);
        try {
            // Add your payment processing logic here
            console.log('Form submitted:', formData);
            httpService.post('/payment/cartVisitor', {
                ...formData,
                courseId: buyingCourse?.id,
            }).then(response => {
                if (response.data.success) {
                    setSuccess(true);
                    setTimeout(() => {
                        setQuickPaymentVisibility(false);
                        router.push('/direct_payment/' + buyingCourse?.id); // Redirect to thank you page or payment success page
                        setLoading(false);
                        setFormData({
                            fullName: '',
                            email: '',
                            phone: '',
                        });
                        setCartVisitor(formData);
                        setFormErrors({});
                        setIsSubmitting(false);
                        setBuyingCourse(null); // Clear the buying course after successful payment
                    }, 3000);
                } else {
                    setFormErrors({ submit: 'Payment submission failed. Please try again.' });
                }
            }).catch(err => {
                console.error('Payment submission error:', err);
                setFormErrors({ submit: 'Payment submission failed. Please try again.' });
            });

            // Redirect to payment gateway or process payment
            // Example: window.location.href = paymentUrl;

        } catch (error) {
            console.error('Payment submission error:', error);
            setFormErrors({ submit: 'Something went wrong. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    const onClose = () => {
        setQuickPaymentVisibility(false);
        setBuyingCourse(null); // Clear the buying course when closing the popup
    }

    return (
        <div className="Quick-Payment-Checkout-Wrapper">
            <div className="Quick-Payment-Checkout-Content">
                <div className="Quick-Payment-Checkout-Header">
                    <span>Billing Details</span>
                    <span className="Quick-Payment-Checkout-Close" onClick={onClose}>
                        &times;
                    </span>
                </div>

                <div className="Quick-Payment-Checkout-CourseBox">
                    <img
                        src={process.env.NEXT_PUBLIC_FILES_URL + buyingCourse?.thumbnail || "/images/course-placeholder.png"}
                        alt="Course Image"
                    />
                    <div className="Quick-Payment-Checkout-Text">
                        <div className="Quick-Payment-Checkout-Title">
                            {buyingCourse?.title || "Oracle Fusion SCM Online Training"}
                        </div>
                        <div className="Quick-Payment-Checkout-PriceBox">
                            {buyingCourse?.discountedPrice ? (
                                <>
                                    <span className="Quick-Payment-Checkout-OldPrice">
                                        ₹{buyingCourse?.price?.toLocaleString("en-IN") || "30,000"}
                                    </span>
                                    <span className="Quick-Payment-Checkout-NewPrice">
                                        ₹{buyingCourse?.discountedPrice?.toLocaleString("en-IN") || "25,000"}
                                    </span>
                                </>
                            ) : (
                                <span className="Quick-Payment-Checkout-NewPrice">
                                    ₹{buyingCourse?.price?.toLocaleString("en-IN") || "30,000"}
                                </span>
                            )}
                            <span className="Quick-Payment-Checkout-Taxes-txt">+Taxes</span>
                        </div>
                    </div>
                </div>

                <form className="Quick-Payment-Checkout-Form" onSubmit={handleSubmit}>
                    <div className="Quick-Payment-Checkout-FormTitle">
                        Please enter your basic details to proceed
                    </div>

                    <div className="Quick-Payment-Checkout-FormGroup">
                        <input
                            type="text"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleChange}
                            placeholder=" "
                            id="full-name"
                        />
                        <label htmlFor="full-name">
                            Full Name<span className="Quick-Payment-Checkout-Required">*</span>
                        </label>
                        {formErrors.fullName && (
                            <small className="text-danger Quick-Payment-Error-Message">{formErrors.fullName}</small>
                        )}
                    </div>

                    <div className="Quick-Payment-Checkout-FormGroup">
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder=" "
                            id="email"
                        />
                        <label htmlFor="email">
                            Email<span className="Quick-Payment-Checkout-Required">*</span>
                        </label>
                        {formErrors.email && (
                            <small className="text-danger Quick-Payment-Error-Message">{formErrors.email}</small>
                        )}
                    </div>

                    <div className="Quick-Payment-Checkout-FormGroup Quick-Payment-Checkout-PhoneGroup">
                        <PhoneInput
                            international
                            defaultCountry="IN"
                            value={formData.phone}
                            onChange={handlePhoneChange}
                            placeholder="Phone Number*"
                            className="Quick-Payment-Phone-Input Quick-Payment-phone"
                        />

                    </div>
                    {formErrors.phone && (
                        <small className="text-danger Quick-Payment-Error-Message">{formErrors.phone}</small>
                    )}

                    {formErrors.submit && (
                        <div className="text-danger Quick-Payment-Submit-Error">{formErrors.submit}</div>
                    )}


                </form>
            </div>
            <div className="Quick-Payment-Checkout-Footer mt-4">
                <div className="Quick-Payment-Checkout-Note">
                    We are always available at{' '}
                    <a href="mailto:info@techleadsit.com">info@techleadsit.com</a>
                </div>
                <button
                    type="submit"
                    className="Quick-Payment-Checkout-Button"
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                >
                    {isSubmitting ? 'Processing...' : 'Proceed to Checkout'}{' '}
                    <i className="fa-solid fa-arrow-right Quick-Payment-Checkout-Button-arrow"></i>
                </button>
            </div>
        </div>
    );
};

export default QuickPayment;