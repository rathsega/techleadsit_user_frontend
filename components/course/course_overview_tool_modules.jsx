import React from "react";
const CourseOverviewToolsAndModules = React.memo(({ data }) => {
    return (
        <section className="Main-Course-Tools-and-Modules-Section">
            <h3 className="Main-Course-T-and-M-Card-heading text-center">
                Tools & Modules You Will Master
            </h3>
            <div className="Main-Course-T-and-M-Card-Section" style={{ "display": "flex", "flexWrap": "wrap", "justifyContent": "center", "gap": "20px" }}>
                {
                    data?.map((tm, tmi) => {
                        const imageName = tm.replace(/\s*&\s*/g, " ") + '.svg'; // filename only
                        return (
                            <div className="Main-Course-T-and-M-Card" key={tmi}>
                                <img
                                    src={`/images/courses/tools_modules/${imageName}`}
                                    className="Main-Course-T-and-M-Card-img"
                                    alt={tm}
                                    width="60"
                                    height="60"
                                />
                                <p className="mt-2 mb-0">{tm}</p> {/* keeps the original title with spaces */}
                            </div>
                        );
                    })
                }

                
            </div>
        </section>
    )
})

export default CourseOverviewToolsAndModules;