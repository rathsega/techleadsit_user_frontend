import React from 'react';
import Image from 'next/image'
const PricingPlans = ({ details, openForm }) => {
    return (
        <section className="Choose-right-plan-section">
            <h1 className="Choose-right-plan-section-h"> Choose Your Right Plan</h1>
            <p className="Choose-right-plan-section-p">Choose the perfect learning mode based on your schedule, learning style,
                and career goals. Get industry-leading training with expert guidance.</p>
            <div className="row">
                {details?.map((plan) => (
                    <div className="col-lg-4 pricing-section" key={plan._id}>
                        <div className="pricing-card position-relative">
                            {plan.plantype === "Live Training" && <span className="emi-badge">Easy EMI Options</span>}
                            <h2>{plan.plantype}</h2>
                            <p className="pricing-card-p">{plan?.shortDescription}</p>
                            <div className="price">
                                {new Intl.NumberFormat("en-IN", {
                                    style: "currency",
                                    currency: "INR",
                                    maximumFractionDigits: 0,
                                }).format(plan.price)}
                            </div>

                            <div className="plan-points-section">
                                {plan.features.map((feature, index) => (
                                    <div className="plans-points" key={feature._id || index}>
                                        <Image
                                            src='/images/demo/pricing details tick icon.svg'
                                            height="25"
                                            className="plans-points-img"
                                            alt="✔"
                                        />
                                        <p>{feature.title}</p>
                                    </div>
                                ))}
                            </div>
                            <button className="plans-btn" onClick={() => openForm("Buy Now")}>
                                Buy Now <Image src='/images/demo/Right-plan-arrow.png' height="15" className="ms-2" alt="→" />
                            </button>
                        </div>
                    </div>
                ))}
                <div className="col-lg-4 pricing-section">
                    <div className="pricing-card">
                        <h2>Corporate Training</h2>
                        <p className="pricing-card-p">Upskill your team with tailor-made corporate training programs. Get
                            customized content & dedicated support.</p>
                        <h3 className="price">Let’s Discuss</h3>
                        <div className="plan-points-section">
                            <div className="plans-points">
                                <Image src='/images/demo/pricing details tick icon.svg' height="25"
                                    className="plans-points-img" />
                                <p>Customized training for teams</p>
                            </div>
                            <div className="plans-points">
                                <Image src='/images/demo/pricing details tick icon.svg' height="25"
                                    className="plans-points-img" />
                                <p>Flexible batch scheduling</p>
                            </div>
                            <div className="plans-points">
                                <Image src='/images/demo/pricing details tick icon.svg' height="25"
                                    className="plans-points-img" />
                                <p>Industry-focused curriculum</p>
                            </div>
                            <div className="plans-points">
                                <Image src='/images/demo/pricing details tick icon.svg' height="25"
                                    className="plans-points-img" />
                                <p>One-on-one mentorship</p>
                            </div>
                            <div className="plans-points">
                                <Image src='/images/demo/pricing details tick icon.svg' height="25"
                                    className="plans-points-img" />
                                <p>Dedicated support team</p>
                            </div>
                        </div>
                        <button className="plans-btn d-flex align-items-center justify-content-center" onClick={() => {
                            openForm("Book A Call");
                        }}>
                            <Image src='/images/demo/Right-plan-call.png' height="18" className="me-2" /> Book a Call
                        </button>
                    </div>

                </div>
            </div>
        </section>
    )
}

export default PricingPlans;