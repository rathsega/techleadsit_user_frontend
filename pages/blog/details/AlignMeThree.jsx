import React, { useEffect, useRef } from 'react'
import RenderEditorContent from "./RenderEditorContent ";

const AlignMeThree = ({ details, summaryId }) => {
    const refMap = useRef({}); // Store refs in an object

    // Function to get or create refs dynamically
    const getRef = (key) => {
        if (!refMap.current[key]) {
            refMap.current[key] = React.createRef();
        }
        return refMap.current[key];
    };
    useEffect(()=>{
        refMap.current[summaryId]?.current?.scrollIntoView({ behavior: "smooth" });
    }, [summaryId])
    // Function to format the title into an ID
    const formatString = (str) => str.toLowerCase().replace(/\s+/g, "_");
    return (

        details?.map((item, index) => (
            <div className="align-me-3" key={index} id={item?.title ? formatString(item?.title) : null} ref={item?.title ? getRef(formatString(item?.title)) : null}>
                {item?.title && <h2 className="summary-h">{item?.title}</h2>}
                <div className="summary-p">
                    <RenderEditorContent data={item?.description} />
                </div>
            </div>
        ))

    )
}

export default AlignMeThree;