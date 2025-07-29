const HeroCard = () => {
    return (
        <section className="Hero-notify">
            <div className="Hero-notify-banner">
                {/* ✅ Move the background image to an <img> tag */}
                <img 
                    src="/images/blogs/newsletter-frame.png" 
                    alt="Newsletter Frame" 
                    className="Hero-notify-banner-img-2"
                    width="1200" 
                    height="600" 
                    fetchpriority="high"
                />
                <div className="Hero-notified-card">
                    <h1 className="Hero-notified-h">Learn, Upskill &amp; Grow with Tech Leads IT</h1>
                    <p className="Hero-notified-p">Empowering Your Learning Journey with Expert Insights, Career Tips, and Industry Trends!</p>
                </div>
            </div>
        </section>
    );
};

export default HeroCard;
