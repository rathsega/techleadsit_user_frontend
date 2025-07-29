import RenderEditorContent from "../blog/details/RenderEditorContent ";
import { useRouter } from "next/navigation";

const Description = ({ details }) => {
    const router = useRouter();
    const applyJob = () => {
        router.push("/career/job-application/" + details?.career?._id);
    }

    return (
        <div className="Main-Course-CJD-Responsibilities-Section">

            {
                details?.career?.description?.map((item, index) => (
                    <div key={index}>
                        {item?.title && <h3 className="Main-Course-CJD-Main-R-Heading">{item?.title}</h3>}
                        <div className="Main-Course-CJD-Main-R-Para">
                            <RenderEditorContent data={item?.description} />
                        </div>
                    </div>
                ))
            }

            <h3 className="Main-Course-CJD-E-and-R-Para mb-3 CJD-mt-32px">Key Skills:</h3>
            <div className="Main-Course-CJD-Key-Skills-Section">
                {details?.primarySkill?.title && <p className="Main-Course-CJD-Key-Skills-Name">{details?.primarySkill?.title}</p>}
                {
                    details?.career?.basic?.requiredSkills?.split(',').map((skill, index) => (
                        <p className="Main-Course-CJD-Key-Skills-Name" key={index}>
                            {skill.trim()}
                        </p>
                    ))
                }
            </div>

            <button className="Main-Course-CJD-Apply-Btn" onClick={applyJob}>Apply Job</button>
        </div >
    )
}

export default Description;