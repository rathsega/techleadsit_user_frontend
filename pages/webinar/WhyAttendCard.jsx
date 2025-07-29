const WhyAttendCard = ({ imgSrc, title, description }) => {
    return (<div className="C-Webinar-Page-card p-3">
        <div className="C-Webinar-Page-inside-card">
            <img src={imgSrc} width="50" alt={title} />
            <p>{title}</p>
        </div>
        <span className="C-Webinar-Page-card-content">{description}</span>
    </div>)
}

export default WhyAttendCard;