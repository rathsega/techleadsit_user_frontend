import Image from "next/image";
import RequestForMoreInfo from "./RequestForMoreInfo";
import { useState, useEffect } from "react";
import httpService from "../../../services/httpService";

const AlignMeTwo = ({advertisement, currentBlogId, category}) => {
    const [upComingAds, setUpComingAds] = useState([]);

    useEffect(()=>{
        const getAdvertisementsByCategory = async () => {
            try{
                const response = await httpService.get(`blogs/getAdvertisements/${category}`);
                if(response && response?.data){
                    setUpComingAds(response?.data);
                }
            } catch(e){
                console.log("Unexpected error : ", e);
            }
        }
        getAdvertisementsByCategory();
    }, [])
    return (
        <div className="align-me-2">
            {upComingAds && upComingAds.length >0 && <div className="mb-4 text-center">
                <Image src={process.env.NEXT_PUBLIC_FILES_URL + upComingAds[0]?.image?.path} className="img-fluid ADV-w-65" height="582" width="582" alt="training-session-image" />
            </div>}
            <div className="centering">
                <RequestForMoreInfo currentBlogId={currentBlogId}></RequestForMoreInfo>
            </div>

            {upComingAds && upComingAds.length > 1 && <div className="mt-4 text-center">
                <Image src={process.env.NEXT_PUBLIC_FILES_URL + upComingAds[1]?.image?.path} className="img-fluid ADV-w-65" height="582" width="582" alt="training-session-image" />
            </div>}
        </div>
    )
}

export default AlignMeTwo;