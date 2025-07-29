import React, { useState, useRef, useCallback, useEffect } from 'react';
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import 'react-phone-number-input/style.css'; // Required for styling
import classNames from 'classnames';
import { useRouter } from "next/router";
import { useLoader } from '../../../contexts/LoaderContext';
import httpService from '../../../services/httpService';

const JobApplication = () => {

    const router = useRouter();
    const { job_id } = router.query;
    const [jobDetails, setJobDetails] = useState({});
    const { setLoading } = useLoader();
    const getJobDetails = useCallback(async (id) => {
        try {
            setLoading(true);
            const response = await httpService.get('careers/getCareerDetails?careerId=' + id);
            setLoading(false);
            if (response?.data ?? false) {
                setJobDetails(response.data);
            }
        } catch (err) {
            setLoading(false);
            //console.log(err);
        }
    })

    useEffect(() => {
        job_id && getJobDetails(job_id);
    }, [job_id])
    const [formData, setFormData] = useState({
        jobId: job_id,
        name: '',
        email: '',
        phone: '',
        experience: '',
        currentCtc: '',
        expectedCtc: '',
        noticePeriod: '',
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
        if (!errors.hasOwnProperty(phone) && (typeof formData.phone !== "string" || !isValidPhoneNumber(formData.phone))) errors.phone = "Phone number is invalid";
        if (!formData.experience.trim()) errors.experience = 'Experience is required';
        // Current CTC
        if (!formData.currentCtc.trim()) {
            errors.currentCtc = 'Current CTC is required';
        } else if (isNaN(formData.currentCtc)) {
            errors.currentCtc = 'Current CTC must be a number';
        }

        // Expected CTC
        if (!formData.expectedCtc.trim()) {
            errors.expectedCtc = 'Expected CTC is required';
        } else if (isNaN(formData.expectedCtc)) {
            errors.expectedCtc = 'Expected CTC must be a number';
        }

        // Notice Period
        if (!formData.noticePeriod.trim()) {
            errors.noticePeriod = 'Notice Period is required';
        } else if (!/^\d+$/.test(formData.noticePeriod)) {
            errors.noticePeriod = 'Notice Period must be a valid number of days';
        }
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
        //console.log(path, maxSize);
        const keys = path.split(',');

        if (maxSize) {
            // Validate file size before making the API call
            const fileSizeInKB = newValue.size / 1024; // Convert size from bytes to KB

            if (fileSizeInKB > maxSize) {
                // toast.error(`File size exceeds the limit of ${maxSize} KB.`, {
                //     position: "top-right",
                //     className: "error-toast-message",
                // });
                setFormErrors({...formErrors, resume: `File size exceeds the limit of ${maxSize/1024} MB.`})
                return null; // Don't proceed with the upload
            } else {
                newValue = await uploadFile(newValue, keys[0], maxSize);
                setFormErrors({...formErrors, resume: ""})
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
        if (Object.keys(errors).length === 0) {
            setFormData({ ...formData, jobId: job_id });
            // Submit logic here
            //console.log('Form submitted successfully:', { ...formData, jobId: job_id });
            setLoading(true)
            const response = await httpService.post('careers/apply', { ...formData, jobId: job_id });
            setLoading(false)
            if (response?.data ?? null) {
                setSubmissionSuccess(true);
                setTimeout(() => { setSubmissionSuccess(false); }, 3000)
            } else {
                setSubmissionSuccess(false);
            }
        }
    };

    return (
        <section className="Main-Course-CP-BAI-Main-Section">
            <div className="Main-Course-CP-BAI-Main-Content-Section">
                <div className="d-flex gap-2">
                    <img src={process.env.NEXT_PUBLIC_FILES_URL + jobDetails?.career?.basic?.companyLogo?.path} alt="CJA-About-Job"
                        height="72" width="72" className="rounded-1 Main-Course-CJA-About-Job-Company-Logo" />
                    <div>
                        <h2 className="Main-Course-CP-CJA-Job-Abouts-Company-Details-Heading">{jobDetails?.career?.basic?.jobTitle}</h2>
                        <div className="CJA-Jon-Preference-Div">
                            <p className="CJA-Main-Company-Heading-Job-Pref">{jobDetails?.career?.basic?.experience}</p>
                            <span className="align-self-center mb-2">.</span>
                            <p className="CJA-Main-Company-Heading-Job-Pref">{jobDetails?.career?.basic?.location}</p>
                            <span className="align-self-center mb-2">.</span>
                            <p className="CJA-Main-Company-Heading-Job-Pref">{jobDetails?.career?.basic?.employmentType}</p>
                        </div>
                    </div>
                </div>

                <h3 className="BAI-Form-Heading">Submit your application</h3>
                <div className="Main-Course-CP-BAI-form-container">
                    <form className="Main-Course-CP-Form-Content" onSubmit={handleSubmit} noValidate>
                        <div className='Form-MB-Gap-32'>
                            <label>Name<span className="Main-Course-CP-Form-Content-Required-Mark">*</span></label>
                            <input
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


                        {/* Current CTC */}
                        <div className='Form-MB-Gap-32'>
                            <label>
                                Current Salary
                                <span className="Main-Course-CP-Form-Content-Required-Mark">*</span>
                            </label>
                            <input
                                type="text"
                                name="currentCtc"
                                placeholder="Enter your Current Salary"
                                className={classNames(
                                    "Main-Course-CP-BAI-input",          // keep or swap for "Main-Course-CP-CJA-input" if that’s your standard
                                    { "input-field-error": submitted && formErrors.currentCtc }
                                )}
                                value={formData.currentCtc}
                                onChange={handleChange}
                            />
                            {formErrors.currentCtc && <small className="text-danger">{formErrors.currentCtc}</small>}
                        </div>


                        {/* Expected CTC */}
                        <div className='Form-MB-Gap-32'>
                            <label>
                                Expected Salary
                                <span className="Main-Course-CP-Form-Content-Required-Mark">*</span>
                            </label>
                            <input
                                type="text"
                                name="expectedCtc"
                                placeholder="Enter your Expected Salary"
                                className={classNames(
                                    "Main-Course-CP-BAI-input",
                                    { "input-field-error": submitted && formErrors.expectedCtc }
                                )}
                                value={formData.expectedCtc}
                                onChange={handleChange}
                            />
                            {formErrors.expectedCtc && <small className="text-danger">{formErrors.expectedCtc}</small>}
                        </div>


                        {/* Notice Period */}
                        <div className='Form-MB-Gap-32'>
                            <label>
                                Notice Period
                                <span className="Main-Course-CP-Form-Content-Required-Mark">*</span>
                            </label>
                            <input
                                type="text"            /* change to type="number" if you want numeric input only */
                                name="noticePeriod"
                                placeholder="Enter your Notice Period in days"
                                className={classNames(
                                    "Main-Course-CP-BAI-input",
                                    { "input-field-error": submitted && formErrors.noticePeriod }
                                )}
                                value={formData.noticePeriod}
                                onChange={handleChange}
                            />
                            {formErrors.noticePeriod && <small className="text-danger">{formErrors.noticePeriod}</small>}
                        </div>



                        <div className='Form-MB-Gap-32'>
                            <label>LinkedIn Profile</label>
                            <input
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
                                    type="file"
                                    name="resume"
                                    accept=".pdf,.docx"
                                    ref={fileRef}
                                    className={classNames("BAI-Resume-File-Upload-title", { "input-field-error": submitted && formErrors.resume })}
                                    onChange={(e) => handleFieldChange('job', e.target.files[0], '5120')}
                                />
                                {fileUpload ? "File uploaded successfully." : "Choose a file"}
                            </label>
                            {fileUpload ? <label>{formData?.resume?.name}</label> : <p className="BAI-Resume-Upload-Supported-Size-Message">Supported file type: Pdf; Docx (max 5MB)</p>}
                        </div>
                        {/* {fileUpload && <label>File uploaded successfully. Details : {formData?.resume?.name}</label>} */}
                        {formErrors.resume && <small className="text-danger">{formErrors.resume}</small>}

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