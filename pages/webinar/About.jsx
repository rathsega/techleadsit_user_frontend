const About = ({ details }) => {
    return (<section className="C-Webinar-Page-About">
        <div className="row col-rev C-Webinar-Page-About-content">
            <div className="col-lg-6 col-md-6 text-end">
                <img src={process.env.NEXT_PUBLIC_FILES_URL + details?.image?.path} className="C-Webinar-Page-About-img-m w-100 C-Webinar-Page-About-img" />
            </div>
            <div className="col-lg-6 col-md-6">
                <h1 className="C-Webinar-Page-about-heading mt-2">About Webinar</h1>
                <p className="C-Webinar-Page-about-para">{details?.description}</p>
                {details?.highlights?.map((_, ind) => {
                    if (ind % 2 !== 0) return null; // Skip odd indices, handle in pairs
                    return (
                        <div key={ind} className="C-Webinar-Page-about-b-m">
                            {details.highlights[ind] && (
                                <button className="C-Webinar-Page-about-btn">{details.highlights[ind]}</button>
                            )}
                            {details.highlights[ind + 1] && (
                                <button className="C-Webinar-Page-about-btn">{details.highlights[ind + 1]}</button>
                            )}
                        </div>
                    );
                })}

            </div>


        </div>

    </section>)
}

export default About;