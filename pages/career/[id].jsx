import { useRouter } from "next/router";
import { useCallback, useEffect, useState, useRef } from "react";
import httpService from "../../services/httpService";
import { useLoader } from "../../contexts/LoaderContext";
import Hero from "./Hero";
import Description from "./Description";
import SocialLinks from "./SocialLinks";
import StartYourJourney from "./StartYourourney";
import RelatedJobs from "./RelatedJobs";
import ExploreBlogs from "./ExploreBlogs";
const Career = () => {
    const router = useRouter();
    const { id } = router.query;
    const hasFetched = useRef(false);

    const [jobDetails, setJobDetails] = useState({});
    const [relatedJobs, setRelatedJobs] = useState([]);
    const { setLoading } = useLoader();

    const getRelatedJobs = useCallback(async (primarySkillId) => {
        setLoading(true)
        const response = await httpService.get('careers/related-jobs?primarySkillId=' + primarySkillId + '&currentJobId=' + id);
        setLoading(false)
        if (response?.data ?? false) {
            setRelatedJobs(response?.data)
        }

    })

    const getJobDetails = useCallback(async (id) => {
        try {
            setLoading(true);
            const response = await httpService.get('careers/getCareerDetails?careerId=' + id);
            setLoading(false);
            if (response?.data ?? false) {
                setJobDetails(response.data);
                getRelatedJobs(response?.data?.career?.basic?.primarySkill);
            }
        } catch (err) {
            setLoading(false);
            //console.log(err);
        }
    })

    useEffect(() => {
        if (id) {
            getJobDetails(id);
            httpService.put(`careers/${id}/view`);
            hasFetched.current = true;
        }
    }, [id]);
    return (
        <section className="Main-Course-CJD-Main-Section career-body">
             <div>
                <Hero details={jobDetails}></Hero>
                <Description details={jobDetails}></Description>
            </div>
            <div>
                <SocialLinks></SocialLinks>
                <StartYourJourney></StartYourJourney>
                {relatedJobs?.length > 0 && <RelatedJobs jobs={relatedJobs}></RelatedJobs>}
                <ExploreBlogs></ExploreBlogs>
            </div>
        </section>
    )
}

export default Career;