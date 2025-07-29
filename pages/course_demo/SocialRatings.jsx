import React from 'react';
import Image from 'next/image'

const SocialRatings = () => {
    return (
        <section className="trusted-learners">
            <h1>"Trusted by 10,000+ learners | Rated Top on Google, Justdial & Trustpilot"</h1>
            <div className="d-flex align-items-center justify-content-between mt-3">
                <div>
                    <Image src="/images/demo/Trusted-Google.png" height="60" className="trusted-img1" alt="Google Icon" />
                    <div className="demo_stars">
                        <Image src="/images/demo/review rating icon.svg" alt='Full Rating' />
                        <Image src="/images/demo/review rating icon.svg" alt='Full Rating' />
                        <Image src="/images/demo/review rating icon.svg" alt='Full Rating' />
                        <Image src="/images/demo/review rating icon.svg" alt='Full Rating' />
                        <Image src="/images/demo/half star.svg" alt='Half Rating' />
                    </div>
                </div>
                <div>
                    <Image src="/images/demo/Trusted-Justdial.png" height="47" className="trusted-img2" alt="JustDial Icon" />
                    <div className="demo_stars">
                        <Image src="/images/demo/review rating icon.svg" alt='Full Rating' />
                        <Image src="/images/demo/review rating icon.svg" alt='Full Rating' />
                        <Image src="/images/demo/review rating icon.svg" alt='Full Rating' />
                        <Image src="/images/demo/review rating icon.svg" alt='Full Rating' />
                        <Image src="/images/demo/review rating icon white.svg" alt='Empty Rating' />
                    </div>
                </div>
                <div>
                    <Image src="/images/demo/Trusted-Trustpilot.png" height="50" className="trusted-img3" alt="TrustPilot Icon" />
                    <div className="demo_stars">
                        <Image src="/images/demo/review rating icon.svg" alt='Full Rating' />
                        <Image src="/images/demo/review rating icon.svg" alt='Full Rating' />
                        <Image src="/images/demo/review rating icon.svg" alt='Full Rating' />
                        <Image src="/images/demo/review rating icon.svg" alt='Full Rating' />
                        <Image src="/images/demo/review rating icon white.svg" alt='Empty Rating' />
                    </div>
                </div>
            </div>
        </section>
    )
}
export default SocialRatings;