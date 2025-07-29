import React from "react";
import Image from "next/image"; // Importing Image component from next.js for optimized image handling
const IsthisCourseRightForYou = React.memo(({ data }) => {
    return (
        <section className="Is-this-course-right-for-you-Section">
            <h2 className="Is-this-course-right-for-you-M-Heading mb-2 text-center">
                Is This Course Right for You?
            </h2>
            <p className="Is-this-course-right-for-you-M-Para text-center">
                {data?.shortDescription}
            </p>
            <div className="Is-This-Course-Right-Segments">
                <div className="Is-This-Course-Right-Segment">
                    <div className="d-flex align-items-flex-start mb-4">
                        <Image priority={false} loading="lazy" src="/images/courses/Fresher-Graduates-icon.svg"
                            alt="Fresher-Graduates-icon" className="Is-This-Course-Right-card-Icon" height="24"
                            width="24" />
                        <h3 className="Is-This-Course-Right-Heading">
                            {data?.details[0]?.studentType}
                        </h3>
                    </div>
                    {
                        data?.details[0]?.points?.map((pnt, pnti) => (
                            <div className="Is-This-Course-Right-Points" key={pnti}>
                                <Image priority={false} loading="lazy" src="/images/courses/Is-this-course-pointer.svg"
                                    alt="Is-this-course-pointer" width="10" height="23" />
                                <p className="mb-0">
                                    {pnt}
                                </p>
                            </div>
                        ))
                    }

                    
                </div>
                <Image priority={false} loading="lazy" src="/images/courses/Main-Course-Is-this-Course-Right.webp"
                    alt="Is-this-course-right-for-you-img" width="365" height="450" style={{"width":"100%","height":"100%","objectFit":"cover","borderRadius":"20px","display":"block"}} className="Is-this-course-right-for-you-img" />
                <div className="Is-This-Course-Right-Segment">
                    <div className="d-flex align-items-flex-start mb-4">
                        <Image priority={false} loading="lazy" src="/images/courses/Working-Professional-icon.svg"
                            alt="Working-Professional-icon" className="Is-This-Course-Right-card-Icon"
                            height="22" width="22" />
                        <h3 className="Is-This-Course-Right-Heading">
                            {data?.details[1]?.studentType}
                        </h3>
                    </div>
                    {
                        data?.details[1]?.points?.map((pnt, pnti) => (
                            <div className="Is-This-Course-Right-Points" key={pnti}>
                                <Image priority={false} loading="lazy" src="/images/courses/Is-this-course-pointer.svg"
                                    alt="Is-this-course-pointer" width="10" height="23" />
                                <p className="mb-0">
                                    {pnt}
                                </p>
                            </div>
                        ))
                    }
                </div>
            </div>
        </section>
    )
});

export default IsthisCourseRightForYou;