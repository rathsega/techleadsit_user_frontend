import React, { useState, useRef, useEffect } from 'react';
import dynamic from 'next/dynamic';
const PhoneInput = dynamic(() => import('react-phone-number-input'), { ssr: false });
import 'react-phone-number-input/style.css';
import { isValidPhoneNumber } from 'react-phone-number-input';
import classNames from 'classnames';
import httpService from '../../services/httpService';
import { useRouter } from "next/router";
import { useLoader } from '../../contexts/LoaderContext';

const JobApplication = () => {

    const router = useRouter();
    const { job_id } = router.query;
    const { setLoading } = useLoader();
    const [formData, setFormData] = useState({
        jobId: "become-an-instructor",
        name: '',
        email: '',
        phone: '',
        experience: '',
        linkedin: '',
        brief: '',
        resume: null,
    });

    const [formErrors, setFormErrors] = useState({});
    const [submitted, setSubmitted] = useState(false);
    const [defaultCountry, setDefaultCountry] = useState("IN");
    const [submissionSuccess, setSubmissionSuccess] = useState(false);
    const [fileUpload, setFileUpload] = useState(false);
    const fileRef = useRef(null);
    const [pageReady, setPageReady] = useState(false);

    // Refs for scrolling to error fields
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const phoneRef = useRef(null);
    const experienceRef = useRef(null);
    const linkedinRef = useRef(null);
    const resumeRef = useRef(null);

    const validate = async () => {
        const errors = {};
        const name = formData.name?.trim();

        if (!name) {
            errors.name = "Name is required";
        } else if (!/^[A-Za-z ]+$/.test(name)) {
            errors.name = "Name can only contain letters and spaces";
        }
        if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) errors.email = 'Valid email is required';
        if (!formData.phone) errors.phone = 'Valid phone number required';
        if (!errors.hasOwnProperty('phone') && (typeof formData.phone !== "string" || !isValidPhoneNumber(formData.phone))) errors.phone = "Phone number is invalid";
        if (!formData.experience.trim()) errors.experience = 'Experience is required';
        if (formData.linkedin && !/^https?:\/\/.+/.test(formData.linkedin)) errors.linkedin = 'Enter a valid URL';
        if (!formData.resume) errors.resume = 'Resume is required';
        if (formData.resume) {
            const allowedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
            if (!allowedTypes.includes(formData.resume.type)) errors.resume = 'Only PDF or DOCX allowed';
            if (formData.resume.size > 5 * 1024 * 1024) errors.resume = 'Max file size is 5MB';
        }
        return errors;
    };

    const handleChange = async (e) => {
        const { name, value, files } = e.target;
        if (name === 'resume') {
            setFormData({ ...formData, resume: files[0] });
        } else {
            setFormData({ ...formData, [name]: value });
        }

        if (submitted) {
            const errors = await validate();
            setFormErrors(errors);
        }
    };

    const handlePhoneChange = async (value) => {
        setFormData({ ...formData, phone: value });
        if (submitted) {
            const errors = await validate();
            setFormErrors(errors);
        }
    };

    const handleFieldChange = async (path, newValue, maxSize = 0) => {
        setFileUpload(false)
        const keys = path.split(',');

        if (maxSize) {
            const fileSizeInKB = newValue.size / 1024;
            if (fileSizeInKB > maxSize) {
                return null;
            } else {
                newValue = await uploadFile(newValue, keys[0], maxSize);
            }
        }

        setFormData({ ...formData, resume: newValue });

        return true;
    };

    const uploadFile = async (data, tabName) => {
        setLoading(true)
        const response = await httpService.post('fileupload/upload', { isFile: true, file: data, folder: tabName });
        setLoading(false)
        if (response.hasOwnProperty('data') && response.data && response.data.hasOwnProperty('file') && response.data.file) {
            const uploadResponse = response.data;
            setFileUpload(uploadResponse);
            return uploadResponse.file;
        } else {
            return null;
        }
    }

    const deleteFile = async () => {
        setLoading(true)
        const response = await httpService.post('fileUpload/delete', { filePath: fileUpload?.file?.path });
        if (fileRef.current) fileRef.current.value = '';
        setLoading(false)
        setFileUpload(false)
        setFormData({ ...formData, resume: false });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitted(true);
        const errors = await validate();
        setFormErrors(errors);

        // Scroll to first error field if any
        if (Object.keys(errors).length > 0) {
            if (errors.name && nameRef.current) nameRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            else if (errors.email && emailRef.current) emailRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            else if (errors.phone && phoneRef.current) phoneRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            else if (errors.experience && experienceRef.current) experienceRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            else if (errors.linkedin && linkedinRef.current) linkedinRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            else if (errors.resume && resumeRef.current) resumeRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        setLoading(true)
        const response = await httpService.post('careers/apply', formData);
        setLoading(false)
        if (response?.data ?? null) {
            setSubmissionSuccess(true);
            setTimeout(() => { setSubmissionSuccess(false); }, 3000)
        } else {
            setSubmissionSuccess(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        const timer = setTimeout(() => {
            setLoading(false);
            setPageReady(true);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    if (!pageReady) {
        return null;
    }

    return (
        <section className="Main-Course-CP-BAI-Main-Section">
            <div className="Main-Course-CP-BAI-Main-Content-Section">
                <img src="/images/job_applys/TechLeads-Logo.svg" alt="BAI-About-Job" height="42" width="249" className="rounded-1 Main-Course-BAI-About-Job-Company-Logo" />

                <h3 className="BAI-Form-Heading">Submit your application</h3>
                <div className="Main-Course-CP-BAI-form-container">
                    <form className="Main-Course-CP-Form-Content" onSubmit={handleSubmit} noValidate>
                        <div className='Form-MB-Gap-32'>
                            <label>Name<span className="Main-Course-CP-Form-Content-Required-Mark">*</span></label>
                            <input
                                ref={nameRef}
                                type="text"
                                name="name"
                                placeholder="Enter your Full name"
                                className={classNames("Main-Course-CP-BAI-input", { "input-field-error": submitted && formErrors.name })}
                                value={formData.name}
                                onChange={handleChange}
                            />
                            {formErrors.name && <small className="text-danger">{formErrors.name}</small>}
                        </div>

                        <div className='Form-MB-Gap-32'>
                            <label>Email Address<span className="Main-Course-CP-Form-Content-Required-Mark">*</span></label>
                            <input
                                ref={emailRef}
                                type="email"
                                name="email"
                                placeholder="Enter your email address"
                                className={classNames("Main-Course-CP-BAI-input", { "input-field-error": submitted && formErrors.email })}
                                value={formData.email}
                                onChange={handleChange}
                            />
                            {formErrors.email && <small className="text-danger">{formErrors.email}</small>}
                        </div>

                        <div className='Form-MB-Gap-32'>
                            <label>Phone Number<span className="Main-Course-CP-Form-Content-Required-Mark">*</span></label>
                            <PhoneInput
                                ref={phoneRef}
                                international
                                id="phone"
                                className={`input-field demo_register_phone Main-Course-CP-BAI-input ${submitted && formErrors.phone ? 'input-field-error' : ''}`}
                                defaultCountry={defaultCountry}
                                value={formData.phone}
                                onChange={handlePhoneChange}
                                placeholder="Phone Number*"
                                inputProps={{ name: 'phone', required: true }}
                            />
                            {formErrors.phone && <small className="text-danger">{formErrors.phone}</small>}
                        </div>

                        <div className='Form-MB-Gap-32'>
                            <label>Experience<span className="Main-Course-CP-Form-Content-Required-Mark">*</span></label>
                            <input
                                ref={experienceRef}
                                type="number"
                                step="0.1"
                                min="0"
                                name="experience"
                                placeholder="Enter your No of Years Experience"
                                className={classNames("Main-Course-CP-BAI-input", { "input-field-error": submitted && formErrors.experience })}
                                value={formData.experience}
                                onChange={handleChange}
                            />
                            {formErrors.experience && <small className="text-danger">{formErrors.experience}</small>}
                        </div>

                        <div className='Form-MB-Gap-32'>
                            <label>LinkedIn Profile</label>
                            <input
                                ref={linkedinRef}
                                type="url"
                                name="linkedin"
                                placeholder="Enter your Linkedin Profile"
                                className={classNames("Main-Course-CP-BAI-input", { "input-field-error": submitted && formErrors.linkedin })}
                                value={formData.linkedin}
                                onChange={handleChange}
                            />
                            {formErrors.linkedin && <small className="text-danger">{formErrors.linkedin}</small>}
                        </div>

                        <div className="Main-Course-CP-BAI-textarea-container">
                            <label className="Main-Course-CP-BAI-label">Brief About Yourself</label>
                            <textarea
                                name="brief"
                                placeholder="Add a cover letter or anything else you want to share"
                                className="Main-Course-CP-BAI-textarea"
                                maxLength="500"
                                value={formData.brief}
                                onChange={handleChange}
                            ></textarea>
                            <div className="d-flex justify-content-between">
                                <p className="Main-Course-CP-BAI-helper-text">Maximum 500 characters</p>
                                <p className="Main-Course-CP-BAI-helper-text">{formData.brief.length} / 500</p>
                            </div>
                        </div>
                        <label>Attach Your Resume<span className="Main-Course-CP-Form-Content-Required-Mark">*</span></label>
                        <div className="BAI-Resume-File-Upload-container">
                            {fileUpload && <div className="BAI-Delete-The-Resume-Icon-Section cursor-pointer">
                                <img src="/images/job_applys/BAI-Delete-The-Resume-Icon.svg" alt="BAI-Delete-The-Resume-Icon" height="26" width="26" onClick={deleteFile} />
                            </div>}
                            <div className="BAI-Resume-File-Upload-folder">
                                <div className="BAI-Resume-File-Upload-front-side">
                                    <div className="BAI-Resume-File-Upload-tip"></div>
                                    <div className="BAI-Resume-File-Upload-cover"></div>
                                </div>
                                <div className="BAI-Resume-File-Upload-back-side BAI-Resume-File-Upload-cover"></div>
                            </div>
                            <label className="BAI-Resume-File-Upload-custom-file-upload">
                                <input
                                    ref={resumeRef}
                                    type="file"
                                    name="resume"
                                    accept=".pdf,.docx"
                                    className={classNames("BAI-Resume-File-Upload-title", { "input-field-error": submitted && formErrors.resume })}
                                    onChange={(e) => handleFieldChange('job', e.target.files[0], '5120')}
                                />
                                {fileUpload ? "File uploaded successfully." : "Choose a file"}
                            </label>
                            {fileUpload ? <label>{formData?.resume?.name}</label> : <p className="BAI-Resume-Upload-Supported-Size-Message">Supported file type: Pdf; Docx (max 5MB)</p>}
                        </div>
                        {submitted && !fileUpload && formErrors.resume && <small className="text-danger">{formErrors.resume}</small>}

                        <button type="submit" className="BAI-Form-Submit-Button">Submit Application</button>

                        {submissionSuccess && <div className="BAI-Resume-File-Upload-Overlay active" id="BAI-Resume-File-Upload-Overlay">
                            <div className="BAI-Resume-File-Upload-OverlayBox">
                                <button className="Universal-Cross-Mark-Rounded-Btn" onClick={() => setSubmissionSuccess(prev => !prev)} fdprocessedid="gnnx9" style={{"position":"absolute","right":"15px","top":"15px","fontSize":"20px","background":"#01628C","padding":"0px 9px","borderRadius":"50%"}}><i className="fa-solid fa-xmark Universal-Cross-Mark " style={{color:"white"}}></i></button>
                                <img src="/images/job_applys/Main-Course-BAI-Submitted-Sucessfully-GIF.gif" alt="Submitted-Message-Gif" height="285" width="260" />
                                <p className="Main-Course-BAI-Form-Submit-Suc-Message">Your Application has Submitted Successful</p>
                            </div>
                        </div>}
                    </form>
                </div>

            </div>
        </section>
    )
}

export default JobApplication;