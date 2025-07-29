import React from 'react';
const Alumni = ({ details }) => {
    
    return (
        <section className="Alumni-section">
            <div>
                <h1 className="Alumni-h">
                    Hear From Our Successful Alumni
                </h1>
                <p className="Alumni-p">{details?.shortDescription}e</p>
            </div>
            <div className="Alumni-subsection">
                <div className="grid-container">
                    {
                        details?.list && details?.list.map((alumni, alumni_ind) => (
                            <div key={alumni_ind}>
                                <div className="card">
                                    <div className="card-inner">
                                        {/* Front Side of Card */}
                                        <div className="card-front">
                                            <img src={process.env.NEXT_PUBLIC_FILES_URL + alumni?.image?.path} alt={alumni.name} loading='lazy' width={298} // Maximum size (desktop)
      height={340} // Aspect ratio maintained
      sizes="(max-width: 600px) 100vw, 
             (max-width: 1200px) 80vw, 
             50vw" />
                                        </div>

                                        {/* Back Side of Card */}
                                        <div className="card-back">
                                            <div className="Alumni-stars pb-2">
                                                {/* Full Stars */}
                                                {Array.from({ length: Math.floor(alumni.rating) }, (_, i) => (
                                                    <img key={i} src="/images/demo/star icon for alumni.svg" className="star-h" alt="⭐" height="21px" width="20px" loading='lazy' />
                                                ))}
                                                {/* Half Star if applicable */}
                                                {alumni.rating % 1 !== 0 && (
                                                    <img src="/images/demo/half star icon for alumni.svg" className="star-h" alt="⭐" height="21px" width="20px" loading='lazy' />
                                                )}
                                            </div>

                                            {/* Review */}
                                            <p className="flipped-content mb-2">{alumni.review}</p>

                                            {/* Salary Hike */}
                                            <div className="d-flex align-items-center">
                                                <p className="flipped-content mb-0">Salary Hiked By</p>
                                                <p className="amnt-flip ms-2 mb-0">{alumni.hikePercentage}%</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Alumni Details Section */}
                                <div className="p-1">
                                    <h4 className="alumni-sub-h">
                                        {alumni.designation} | {alumni.location}
                                    </h4>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <p className="alumni-sub-p">{alumni.name}</p>
                                        <span className="alumni-sub-span-1">Salary Hike</span>
                                        <span className="alumni-sub-span-2">{alumni.hikePercentage}%</span>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-between">
                                        <div>
                                            <span className="alumni-CC-1">Pre Tech Leads IT</span>
                                            <p className="alumni-CC-2">{alumni.previousCompany}</p>
                                        </div>
                                        <div className="d-flex">
                                            <img src="/images/demo/alumni arrow icon.svg" alt='Arrow icon 1' loading='lazy' />
                                            <img src="/images/demo/alumni arrow icon.svg" alt='Arrow icon 2' loading='lazy' />
                                            <img src="/images/demo/alumni arrow icon.svg" alt='Arrow icon 3' loading='lazy' />
                                        </div>
                                        <div>
                                            <span className="alumni-CC-1">Post Tech Leads IT</span>
                                            <p className="alumni-CC-21">{alumni.currentCompany}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }

                </div>
            </div>

        </section>
    )
}

export default Alumni;