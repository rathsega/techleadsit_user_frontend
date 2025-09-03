import React from 'react';
// import './WebinarCTA.css';

const WebinarCTA = ({ onCTA }) => {
    return (
      <div className='container'>
        <button
          type="button"
          className="cta-banner"
          aria-label="Kickstart Your Career"
          onClick={() => onCTA("Contact Us")}
          style={{ border: "none", background: "none", padding: 0, cursor: "pointer" }}
        >
          <picture>
            <source media="(max-width: 360px)" srcSet="/images/webinar/Webinar-CTA-Banner-sm.webp" />
            <source media="(max-width: 576px)" srcSet="/images/webinar/Webinar-CTA-Banner-md.webp" />
            <source media="(max-width: 768px)" srcSet="/images/webinar/Webinar-CTA-Banner-l.webp" />
            <source media="(max-width: 1120px)" srcSet="/images/webinar/Webinar-CTA-Banner-O.webp" />
            <img
              src="/images/webinar/Webinar-CTA-Banner-O.webp"
              alt="No Experience? No Problem. We Train You Right. Kickstart Your Career."
              loading="lazy"
            />
          </picture>
        </button>
      </div>
    );
};

export default WebinarCTA;