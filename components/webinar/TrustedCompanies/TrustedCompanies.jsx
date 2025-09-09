import React, { useEffect, useRef, useState } from "react";

export default function TrustedCompanies() {
  const companies = [
    { name: "Company 1",  logo: "/images/webinar/accenture-img.png" },
    { name: "Company 2",  logo: "/images/webinar/aingenious-img.png" },
    { name: "Company 3",  logo: "/images/webinar/Fortinet-img.png" },
    { name: "Company 4",  logo: "/images/webinar/Cognizant-img.png" },
    { name: "Company 5",  logo: "/images/webinar/Infolob-img.png" },
    { name: "Company 6",  logo: "/images/webinar/Lenovo-img.png" },
    { name: "Company 7",  logo: "/images/webinar/Ltimindtree-img.png" },
    { name: "Company 8",  logo: "/images/webinar/Mouritech-img.png" },
    { name: "Company 9",  logo: "/images/webinar/Mphasis-img.png" },
    { name: "Company 10", logo: "/images/webinar/Nttdata-img.png" },
    { name: "Company 11", logo: "/images/webinar/Shahgaron-img.png" },
    { name: "Company 12", logo: "/images/webinar/Techmahindra-img.png" },
    { name: "Company 13", logo: "/images/webinar/Vithi-img.png" },
    { name: "Company 14", logo: "/images/webinar/Yash-img.png" }
  ];

  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  const seg1Ref  = useRef(null);

  const [segW, setSegW] = useState(0);

  // Measure the width of one segment (after images load + on resize)
  useEffect(() => {
    const measure = () => {
      if (seg1Ref.current) setSegW(seg1Ref.current.scrollWidth || 0);
    };
    measure();

    const ro = new ResizeObserver(measure);
    if (wrapRef.current) ro.observe(wrapRef.current);
    if (seg1Ref.current) ro.observe(seg1Ref.current);

    // Re-measure when logos load
    const imgs = seg1Ref.current ? seg1Ref.current.querySelectorAll("img") : [];
    imgs.forEach((img) => img.addEventListener("load", measure, { once: true }));

    return () => {
      ro.disconnect();
    };
  }, []);

  // Smooth RAF marquee
  useEffect(() => {
    if (!trackRef.current || !segW) return;

    let raf = 0;
    let last = performance.now();
    let x = 0;                // current translateX in px
    const speed = 40;         // px/sec (tune as you like)
    const reduce = window.matchMedia &&
                   window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const tick = (now) => {
      const dt = (now - last) / 1000;
      last = now;

      if (!reduce) {
        x -= speed * dt;

        if (-x >= segW) x += segW;
        trackRef.current.style.transform = `translate3d(${x}px,0,0)`;
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [segW]);

  return (
    <section className="trusted-companies" aria-label="Companies that trust us">
      <div className="container d-flex align-items-center Our-CP-Container">
        <h2 className="section-title Trusted-heading">Our Client Portfolio</h2>

        <div className="companies-slider" ref={wrapRef}>
          <div className="companies-track" ref={trackRef}>
            {/* Segment 1 */}
            <div className="track-segment" ref={seg1Ref}>
              {companies.map((c, i) => (
                <div key={i} className="company-card" aria-label={c.name}>
                  <img
                    src={c.logo}
                    alt={c.name}
                    width={140}
                    height={48}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </div>

            {/* Segment 2 (clone) */}
            <div className="track-segment" aria-hidden="true">
              {companies.map((c, i) => (
                <div key={`dup-${i}`} className="company-card">
                  <img
                    src={c.logo}
                    alt=""
                    width={140}
                    height={48}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
