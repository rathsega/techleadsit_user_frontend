import React from "react";
import Image from 'next/image'; // Importing Image component from next.js for optimized image handling

const PlacementPathSteps = React.memo(({ data }) => {
    return (
        <div className="Main-Course-Placements-Path-Steps-We-Follow-Right">
            {
                data && data.map((step, stepindex) => (
                    <div className="Main-Course-Placements-Path-Steps-We-Follow-Card"
                        id={`Main-Course-Placements-Path-Steps-We-Follow-Card${stepindex + 1}`} key={stepindex}>
                        <h2 className="Main-Course-Placements-Path-Steps-We-Follow-Step-Heading">STEP {stepindex + 1}</h2>
                        <div className="Main-Course-Placements-Path-Steps-We-Follow-Card-Section">
                            <h3 className="Main-Course-Placements-Path-Steps-We-Follow-Card-Sub-Heading">{step?.title}</h3>
                            {
                                step?.points?.map((stepPoint, stepPointIndex) => (
                                    <div className="Main-Course-Placements-Path-Steps-We-Follow-Card-Para-Section" key={stepPointIndex}>
                                        <Image priority={false} loading="lazy" src="/images/courses/Placement-Path-We-Follow-Check-Mark-Icon.svg"
                                            alt="Check Mark Icon" height="24" width="24"
                                            className="Main-Course-Placements-Path-Steps-We-Follow-Card-Para-Icon" />
                                        <p className="Main-Course-Placements-Path-Steps-We-Follow-Card-Para">{stepPoint}</p>
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                ))
            }
        </div>
    )
})

export default PlacementPathSteps;