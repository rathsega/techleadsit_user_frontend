import React from 'react'
import Image from "next/image";

const WhoCanAttend = ({ details }) => {

    return (
        <section className="Who-can-attend-section">
            <h1 className="Who-can-attend-section-h"> Who Can Attend the Session</h1>
            <p className="Who-can-attend-section-p">{details?.shortDescription}</p>
            <div className="Who-can-attend-sub-section">
                {
                    details?.attendees && details?.attendees.map((attendee, index) => (
                        <div className="attendees" key={index}>
                            <div className="attendees-sub">
                                <Image src={process.env.NEXT_PUBLIC_FILES_URL + attendee?.image?.path} alt={attendee.userType} width={1200}
                                    height={600}
                                    sizes="(max-width: 600px) 100vw, (max-width: 1200px) 80vw, 50vw"
                                    fetchPriority="low"  />
                                <div className="">
                                    <h1 className="attendees-h">{attendee.userType}</h1>
                                    <ul className="attendees-ul">
                                        {
                                            attendee.reasons && attendee.reasons.map((reason, rind) => (
                                                <li key={rind}>{reason.title}</li>
                                            ))
                                        }
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}

export default WhoCanAttend;