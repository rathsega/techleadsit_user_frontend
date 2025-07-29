const DontMiss = () => {

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (<section className="C-Webinar-Page-Opportunity">

    <div className="C-Webinar-Page-Oppurtunity-banner">
      <h2>Don't Miss This Opportunity!</h2>
      <p>
        Join thousands of successful professionals who have transformed their
        careers through our webinar
      </p>
      <a href="javascript:void(0)" className="C-Webinar-Page-Oppurtunity-cta-button" onClick={(e) => {
        e.preventDefault();
        scrollToSection("register-form");
      }}>Register Now - Limited Seats Available</a>
    </div>

  </section>)
}

export default DontMiss;