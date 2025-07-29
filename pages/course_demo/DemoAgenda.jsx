import React from 'react';
const DemoAgenda = ({details, openForm}) => {
    return (<section className="Demo-Agenda-section">
        <div className="cd-main-options">
            <h3 className="cd-main-options-h">Demo Agenda</h3>
            {
                details && details?.modules && details?.modules.map((module, index)=>(
                    <h3 className={index == -1 ? "cd-main-options-h":"cd-other-options" } key={module._id}>{module.title}</h3>
                ))
            }
        </div>
        <div className="d-flex flex-column justify-content-evenly sub-main-option">
            <h3 className="options-heading mt-3">Why You Shouldn’t Miss This Free Demo?</h3>
            <p className="options-para mt-2">{details?.shortDescription}</p>
            <div className="">
                <p className="options-h-res">Reserve Your Spot for the Free Demo!</p>
                <button className="btn-1 demo_register-btn" onClick={() => {
                        openForm("Start Your Free Demo Now");
                    }}>Start Your Free Demo Now <img src="/images/demo/Right-plan-arrow.png" alt='Arrow icon'
                    className="ms-2" height="12" /></button>
                <p className="below-content mt-3">Seats are Limited – Sign Up Now Before It’s Too Late!</p>
            </div>
        </div>

    </section >)
}

export default DemoAgenda;