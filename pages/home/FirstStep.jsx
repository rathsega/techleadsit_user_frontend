const FirstStep = ({ openForm }) => {
    return (
        <section className="Home-Page-CTA-Banner">
            <a href="#" onClick={() => { openForm("Start Your Journey"); }} className="cta-banner" aria-label="Kickstart Your Career">
                <picture>
                    <source media="(max-width: 360px)" srcSet="/images/home/Trial-1.webp" />
                    <source media="(max-width: 576px)" srcSet="/images/home/Trial-2.webp" />
                    <source media="(max-width: 768px)" srcSet="/images/home/Trial-3.webp" />
                    <source media="(max-width: 1120px)" srcSet="/images/home/Trial-4.webp" />
                    <img
                        style={{color: "transparent", width: "100%", height: "100%", objectFit: "cover", display: "block"}}
                        height="468"
                        width="3900"
                        src="/images/home/Trial-5.webp"
                        alt="No Experience? No Problem. We Train You Right. Kickstart Your Career."
                        loading="lazy"
                    />
                </picture>
            </a>
        </section>
    )
}

export default FirstStep;