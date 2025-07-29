const MentorOverview = ({ details }) => {
    return (
        <section className="mt-5">
            <section className="Mentor-overview">
                <div className="row d-flex align-items-center">
                    <div className="col-lg-4 col-md-5 position-relative">
                        <img src={process.env.NEXT_PUBLIC_FILES_URL + details?.image?.path} className="C-Webinar-Page-mentor-img" />
                        <div className="C-Webinar-Page-img-content">
                            <h1>{details?.name}</h1>
                            <p>{details?.designation}</p>
                        </div>
                    </div>
                    <div className="col-lg-8 col-md-7">
                        <h1 className="C-Webinar-Page-Mentor-heading">{details?.title}</h1>
                        <p className="C-Webinar-Page-Mentor-para mb-m2">{details?.about}</p>
                        {
                            details?.highlights.map((h, hi) => (
                                <ul className="C-Webinar-Page-Mentor-ul mb-m2" key={hi}>
                                    <li style={{ padding: '7px' }}>{h}</li>
                                </ul>
                            ))
                        }

                        <div className="C-Webinar-Page-Mentor-message">
                            <h1 className="C-Webinar-Page-Mentor-message-h">
                                A message from {details?.name}
                            </h1>
                            <p className="C-Webinar-Page-Mentor-message-p mb-m2">{details?.message}</p>
                        </div>
                    </div>
                </div>

            </section>

        </section>
    )
}

export default MentorOverview;