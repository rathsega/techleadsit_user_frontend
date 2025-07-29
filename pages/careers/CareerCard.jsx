import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import relativeTime from 'dayjs/plugin/relativeTime';
import timezone from 'dayjs/plugin/timezone';
import { useRouter } from "next/navigation";

dayjs.extend(utc);
dayjs.extend(relativeTime);
dayjs.extend(timezone);

const getRelativeTimeIST = (createdAt) => {
    // Convert UTC timestamp to IST and calculate relative time
    return dayjs().tz("Asia/Kolkata").to(dayjs(createdAt).tz("Asia/Kolkata"));
};

const CareerCard = ({ data }) => {
    const router = useRouter();
    const requiredSkills = data?.basic?.requiredSkills.split(',').map(skill => skill.trim());

    const viewJob = (id) => {
        router.push("/career/" + id);
    }

    const applyJob = (id) => {
        router.push("/career/job-application/" + id);
    }
    return (
        <div className="Main-Course-CP-FYNJ-Right-Part-Card cursor-pointer" onClick={() => viewJob(data?._id)}>
            <div class="Main-Course-FYNJ-About-Job-Company-Logo-Wrapper">
                <img alt="FYNJ-About-Job" height="72" width="72" class="rounded-1" src={process.env.NEXT_PUBLIC_FILES_URL + data?.basic?.companyLogo?.path} style={{ "maxWidth": "100%", "maxHeight": "100%", "objectFit": "contain", "padding": "2px" }}
                />
            </div>
            <div className="Main-Course-CP-FYNJ-Right-Part-Card-Right-Side">
                <h2 className="Main-Course-CP-FYNJ-Right-Part-Card-Right-Side-Heading">{data?.basic?.companyName}</h2>
                <p className="Main-Course-CP-FYNJ-Right-Part-Card-Right-Side-Para">{data?.basic?.jobTitle}</p>
                <div className="d-flex row-gap-0.5 column-gap-3 align-items-center flex-wrap">
                    <div className="d-flex gap-1 align-items-center">
                        <img src="/images/careers/CP-FYNJ-Experience-Icon.svg"
                            alt="CP-FYNJ-Experience-Icon" width="18" height="18" className="CP-FYNJ-Small-Icons" />
                        <p className="FYNJ-Sub-Option-align-Para">{data?.basic?.experience}</p>
                    </div>
                    <span className="align-self-center mb-2">.</span>
                    <div className="d-flex gap-1 align-items-center">
                        <img src="/images/careers/CP-FYNJ-Currency-Icon.svg"
                            alt="CP-FYNJ-Currency-Icon" width="18" height="18" className="CP-FYNJ-Small-Icons" />
                        <p className="FYNJ-Sub-Option-align-Para">{data?.basic?.salary}</p>
                    </div>
                    <span className="align-self-center mb-2">.</span>
                    <div className="d-flex gap-1 align-items-center">
                        <img src="/images/careers/CP-FYNJ-Location-Icon.svg"
                            alt="CP-FYNJ-Location-Icon" width="18" height="18" className="CP-FYNJ-Small-Icons" />
                        <p className="FYNJ-Sub-Option-align-Para">{data?.basic?.location}</p>
                    </div>
                    <span className="align-self-center mb-2">.</span>
                    <div className="d-flex gap-1 align-items-center">
                        <img src="/images/careers/CP-FYNJ-JobType-Icon.svg"
                            alt="CP-FYNJ-Currency-Icon" width="18" height="18" className="CP-FYNJ-Small-Icons" />
                        <p className="FYNJ-Sub-Option-align-Para">{data?.basic?.employmentType}</p>
                    </div>
                </div>
                <p className="FYNJ-Sub-Option-align-Para mt-3 mb-3">{data?.basic?.jobShortDescription}</p>
                <div className="d-flex row-gap-0.5 column-gap-3 align-items-center flex-wrap">
                    {data?.primarySkillInfo?.title !== "Other" && <p className="FYNJ-Sub-Option-align-Para">{data?.primarySkillInfo?.title}</p>}
                    {
                        requiredSkills?.slice(0, data?.primarySkillInfo?.title == "Other" ? 5 : 4).map((skill, index) => (
                            <>
                                <span className="align-self-center mb-2">.</span>
                                <p className="FYNJ-Sub-Option-align-Para">{skill}</p>
                            </>
                        ))
                    }

                </div>
                <div className="d-flex justify-content-between mt-3">
                    <div className="d-flex gap-1 align-items-center">
                        <img src="/images/careers/CP-FYNJ-Calender-Icon.svg"
                            alt="CP-FYNJ-Calender-Icon" width="18" height="18" className="CP-FYNJ-Small-Icons" />
                        <p className="FYNJ-Sub-Option-align-Para">{getRelativeTimeIST(data?.createdAt)}</p>
                    </div>

                    <div className="d-flex align-items-center">
                        <button className="Main-Course-CJD-Apply-Btn-2 Careers-Home-Apply-Btn-P" onClick={()=>applyJob(data?._id)}>Apply Job</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CareerCard;