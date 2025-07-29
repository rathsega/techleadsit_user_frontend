const Learn = ({ details }) => {
    return (<section className="C-Webinar-Page-takeaways-section pt-4">
        <h2 className="C-Webinar-Page-c-heading mb-0 mt-3">TAKEAWAYS</h2>
        <h1 className="C-Webinar-Page-c-subhead mt-2">What You Will Learn</h1>
        <div className="C-Webinar-Page-takeaways-section">
            <div className="C-Webinar-Page-takeaways-segment">
                {
                    details?.map((learn, ind) => (
                        <div className="C-Webinar-Page-takeaways-card" key={ind}>
                            <div>
                                <img src={process.env.NEXT_PUBLIC_FILES_URL + learn?.icon?.path}
                                    className="C-Webinar-Page-takeaway-img" />
                                <h3>{learn?.title}</h3>
                            </div>
                            <p>{learn?.description}</p>
                        </div>
                    ))
                }
            </div>
        </div>
    </section>)
}

export default Learn;