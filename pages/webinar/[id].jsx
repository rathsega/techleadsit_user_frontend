import httpService from "../../services/httpService";
import Hero from "./Hero"
import WhyAttend from "./WhyAttend";
import SessionOverview from "./SessionOverview";
import Testimonials from "./Testimonials"
import Faq from "./Faq";
import DontMiss from "./DontMiss";
import About from "./About";
import Learn from "./Learn";
import { useRouter } from 'next/router';
import MentorOverview from "./MentorOverview";
import WhoShouldAttend from "./WhoShouldAttend";
import Seo from "../Seo";

const Webinar = ({ webinar, userType }) => {
  //console.log(webinar);
  const router = useRouter();
  const { webinarId } = router.query;
  return (
    <>
      <Seo details={webinar?.seo} />
      <div className="webinar-webinar_body">
        <Hero details={webinar?.hero}></Hero>
        <section className="C-Webinar-Page-margin-section">
          <WhyAttend details={webinar?.whyAttend} id={webinarId}></WhyAttend>
          <About details={webinar?.aboutWebinar}></About>
          <Learn details={webinar?.whatYouWillLearn}></Learn>
          <SessionOverview details={webinar?.sessionOverview}></SessionOverview>
          <MentorOverview details={webinar?.aboutMentor}></MentorOverview>
          <WhoShouldAttend details={webinar?.whoShouldAttend}></WhoShouldAttend>
        </section>
        <Testimonials details={webinar?.testimonials}></Testimonials>
        <section className="C-Webinar-Page-margin-section">
          <Faq details={webinar?.faqs}></Faq>
          <DontMiss></DontMiss>
        </section>
        {/* <Footer></Footer> */}

      </div>
    </>
  )
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  const userType = context.query.userType || null;

  const convertWebinarDateFormat = (date) => {
    const newDate = new Date(date);
    return newDate.toISOString().slice(0, 10) + 'T' + newDate.toTimeString().slice(0, 5);
  }

  try {
    let webinar = { hero: {}, whyAttend: [], sessionOverview: {}, testimonials: [], faqs: [] };
    const response = await httpService.get(`webinar/getWebinarById/${id}`);
    //console.log("The response is", response)
    if (response && response.data) {
      webinar = response.data.webinar;
      webinar.hero.date = convertWebinarDateFormat(webinar?.hero?.date);

      return {
        props: {
          webinar,
          userType,
        },
      };
    } else {
      console.error('No data received from the API');
      return {
        notFound: true,
      };
    }
  } catch (error) {
    console.error('Error fetching webinars:', error);
    return {
      notFound: true,
    };
  }
}

export default Webinar;