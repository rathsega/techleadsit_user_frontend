import React, { useState, useEffect } from "react";
// import { useParams, useLocation } from 'react-router-dom';
import { useRouter } from 'next/router';
import Hero from "./webinar/Hero";
import WhyAttend from "./webinar/WhyAttend";
import SessionOverview from "./webinar/SessionOverview";
import Testimonials from "./webinar/Testimonials"
import Faq from "./webinar/Faq";
import DontMiss from "./webinar/DontMiss";
import httpService from "./../services/httpService";
import Footer from "./Footer";

function convertWebinarDateFormat(date) {
    const newDate = new Date(date);
    return newDate.toISOString().slice(0, 10) + 'T' + newDate.toTimeString().slice(0, 5);
}

const Webinar = ({ props }) => {
    const [webarDetails, setWebinarDetails] = useState({ hero: {}, whyAttend: [], sessionOverview: {}, testimonials: [], faqs: [] });
    // const location = useLocation();
    const router = useRouter();
    const { id } = router.query;
    // Get query parameters from the location object
    const queryParams = new URLSearchParams(router.asPath.search);
    //console.log(queryParams.get('userType'));
    useEffect(() => {
        const fetchWebinarDetails = async () => {
            try {
                const response = await httpService.get('webinar/getWebinarById/' + id);
                if (response && response.data) {
                    response.data.webinar.hero.date = convertWebinarDateFormat(response.data.webinar.hero.date)
                    setWebinarDetails(response.data.webinar); // Set formatted webinars data// Assuming the data is under response.data
                } else {
                    console.error('No data received from the API');
                }
            } catch (error) {
                console.error('Error fetching webinars:', error);
            }
        };

        fetchWebinarDetails();
    }, [])

    return (
        <div className="webinar_body">
            <Hero details={webarDetails.hero}></Hero>
            <section className="container-fluid">
                <WhyAttend details={webarDetails.whyAttend}></WhyAttend>
                <SessionOverview details={webarDetails.sessionOverview}></SessionOverview>
                <Testimonials details={webarDetails.testimonials}></Testimonials>
                <Faq details={webarDetails.faqs}></Faq>
                <DontMiss></DontMiss>
                <Footer></Footer>
            </section></div>

    );
}

export default Webinar;