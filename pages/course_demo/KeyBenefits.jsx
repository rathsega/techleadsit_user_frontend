import React, { useState, useEffect, useRef } from 'react';
import httpService from "./../../services/httpService";

const KeyBenefits = ({ details }) => {

    const [keyBenefitsIconSrc, setKeyBenefitsIconSrc] = useState("");
    useEffect(() => {

        const fetchHighlightsIcons = async () => {
            try {
                // Extract the file paths from details
                let iconPaths = [];
                iconPaths = details?.benefits
                    ?.filter(detail => detail?.icon?.path) // Filter out details with icon paths
                    ?.map(detail => detail?.icon?.path);  // Extract only the icon paths

                // Make the API call
                const response = await httpService.post('fileupload/fetchFiles', { filePaths: iconPaths });

                if (response.data) {
                    // Map the response to base64 image sources
                    const newIconSrcs = response.data.map((fileSrc, index) => ({
                        [iconPaths[index]]: `data:${fileSrc.type};base64,${fileSrc.data}`
                    }));
                    //console.log(newIconSrcs);
                    // Update the state with all new icons at once
                    setKeyBenefitsIconSrc(prevIconSrc => [...prevIconSrc, ...newIconSrcs]);
                } else {
                    console.error('No data received from the API');
                }
            } catch (error) {
                console.error('Error fetching icons:', error);
            }
        };

        details && fetchHighlightsIcons();
    }, [details]);

    const getIconSrc = (key) => {
        if (!key || !keyBenefitsIconSrc) {
            return "true";
        }
        const foundItem = keyBenefitsIconSrc.find((obj) => obj[key] !== undefined);
        return foundItem ? foundItem[key] : null; // Return the value if found, otherwise null
    };

    const cardRefs = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                    } else {
                        entry.target.classList.remove("visible");
                    }
                });
            },
            { threshold: 0.5 }
        );

        cardRefs.current.forEach((card) => {
            if (card) observer.observe(card);
        });

        return () => {
            cardRefs.current.forEach((card) => {
                if (card) observer.unobserve(card);
            });
        };
    }, [details]);

    return (
        <>

            <section className="key-benefits">
                <h1 className="key-benefits-h">
                    Key Benefits
                </h1>
                <p className="key-benefits-p">{details?.shortDescription}
                </p>
                <div className="key-benefits-segments">
                    {details?.benefits && details?.benefits.map((benefit, kbindex) => (
                        <div key={benefit._id} ref={(el) => (cardRefs.current[kbindex] = el)} className="key-segment-card fade-in-card" id={'animatedCard' + kbindex}>
                            <img src={getIconSrc(benefit.icon.path)} className="m-3 key-segment-icon" />
                            <div className="key-sub-segment">
                                <h1>
                                    {benefit?.title}
                                </h1>
                                <p>{benefit?.shortDescription}</p>
                            </div>

                        </div>
                    ))}
                </div>
            </section>
        </>

    )
}

export default KeyBenefits;