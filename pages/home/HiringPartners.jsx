import React from 'react';
import Image from 'next/image'; // Importing Image component from next.js for optimized image handling
const HiringPartners = () => {
    return (
        <section className="Main-Course-Home-Page-Hiring-Partners-Trusted-By-Top-Companies-Section">
            <h2 className="Home-Page-Hiring-Partners-Trusted-By-Top-Companies-Heading mb-0 text-center">Our Hiring
                Partners
            </h2>
            <h2 className="Home-Page-Hiring-Partners-Trusted-By-Top-Companies-Heading mb-4 text-center">
Trusted by Top Companies in Industry</h2>
            <div className="Home-Page-Hiring-Partners-Trusted-By-Top-Companies-track">
                <div className="Home-Page-Hiring-Partners-Trusted-By-Top-Companies-slide" id="cardSliding">
                    <div className="Home-Page-Hiring-Partners-Trusted-By-Top-Companies-slide-images"
                        id="imageSetofCompanies">
                        <Image height={254} width={88} loading='lazy' priority={false} src="/images/home/HP-C-AAIS-Icon.png" alt="Company-Icon" />
                        <Image height={254} width={88} loading='lazy' priority={false} src="/images/home/HP-C-accenture-Icon.png" alt="Company-Icon" />
                        <Image height={254} width={88} loading='lazy' priority={false} src="/images/home/HP-C-aingenious-Icon.png" alt="Company-Icon" />
                        <Image height={254} width={88} loading='lazy' priority={false} src="/images/home/HP-C-AWC-Icon.png" alt="Company-Icon" />
                        <Image height={254} width={88} loading='lazy' priority={false} src="/images/home/HP-C-cognizant-Icon.png" alt="Company-Icon" />
                        <Image height={254} width={88} loading='lazy' priority={false} src="/images/home/HP-C-Dhanush-Icon.png" alt="Company-Icon" />
                        <Image height={254} width={88} loading='lazy' priority={false} src="/images/home/HP-C-DOYENSYS-Icon.png" alt="Company-Icon" />
                        <Image height={254} width={88} loading='lazy' priority={false} src="/images/home/HP-C-FORTINET-Icon.png" alt="Company-Icon" />
                        <Image height={254} width={88} loading='lazy' priority={false} src="/images/home/HP-C-Lenovo-Icon.png" alt="Company-Icon" />
                        <Image height={254} width={88} loading='lazy' priority={false} src="/images/home/HP-C-LTIMindtree-Icon.png" alt="Company-Icon" />
                        <Image height={254} width={88} loading='lazy' priority={false} src="/images/home/HP-C-MOURITECH-Icon.png" alt="Company-Icon" />
                        <Image height={254} width={88} loading='lazy' priority={false} src="/images/home/HP-C-Mphasis-Icon.png" alt="Company-Icon" />
                        <Image height={254} width={88} loading='lazy' priority={false} src="/images/home/HP-C-NTTDATA-Icon.png" alt="Company-Icon" />
                        <Image height={254} width={88} loading='lazy' priority={false} src="/images/home/HP-C-SLK-Icon.png" alt="Company-Icon" />
                        <Image height={254} width={88} loading='lazy' priority={false} src="/images/home/HP-C-splashBI.png" alt="Company-Icon" />
                        <Image height={254} width={88} loading='lazy' priority={false} src="/images/home/HP-C-TechMahindra-Icon.png" alt="Company-Icon" />

                    </div>
                </div>
            </div>
        </section>
    )
}

export default HiringPartners;