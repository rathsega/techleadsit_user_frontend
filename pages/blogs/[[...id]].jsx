import AllBlogs from "./AllBlogs";
import CategoriesList from "./CategoriesList";
import Filters from "./Filters";
import HeroCard from "./HeroCard";
import UpcomingDemos from "./UpcomingDemos";
import RelevantCourses from "./RelevantCourses";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import useLmsStore from '../../store/lmsStore';
import { useExpiringLocalStorage } from "../../services/useExpiringLocalStorage";

const Blogs = () => {
    const router = useRouter();
    const { id } = router.query;
    /*const [activeCategory, setActiveCategory] = useState(id && id[0] != 'interview_questions' ? id[0] : 0);
    const [blogType, setBlogType] = useState(id && id[0] == 'interview_questions' ? 'interview_questions' : 'all');*/
    const [activeCategory, setActiveCategory] = useState(0);
    const [blogType, setBlogType] = useState('all');
    const [searchText, setSearchText] = useState("");
    const [sortByValue, setSortByValue] = useState("popularity");
    const setPopupFormProps = useLmsStore((state) => state.setPopupFormProps);

    /*useEffect(() => {
        if (id && id !== 'interview_questions') {
            setActiveCategory(id);
            setBlogType('interview_questions');
        } else {
            setActiveCategory(0); // default for interview_questions or no id
            setBlogType('all');
        }
    }, [id]);*/


    const formConfigs = {
        "Reserve Your Seat": {
            fields: ["fullName", "email", "phone", "qualification"],
            heading: "Reserve Your Seat",
            buttonLabel: "Register Now",
        },
        "Request A Call back": {
            fields: ["fullName", "email", "phone", "qualification"],
            heading: "Request A Call back",
            buttonLabel: "Submit",
        },
    };

    const now = new Date();
    const endOfDay = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 23, 59, 59, 999).getTime();

    const [userDetails, setUserDetails, clearUserDetails] = useExpiringLocalStorage(
        "userDetails",
        null,
        endOfDay
    );

    const openForm = (formType, onSuccessCallback, hiddenFields) => {
        const config = formConfigs[formType];
        console.log(formType, config    );
        // let userDetails = localStorage.getItem("userDetails");
        // Double-check localStorage directly as well
        const currentUserDetails = userDetails || localStorage.getItem("userDetails");
        if (currentUserDetails) {
            setPopupFormProps({ visible: false, alreadySubmitted: true });
        } else {
            if (config) {
                setPopupFormProps({
                    visible: true,
                    alreadySubmitted: false,
                    fields: config.fields,
                    heading: config.heading,
                    buttonLabel: config.buttonLabel,
                    pageName: "Blogs Page - " + formType,
                    onSuccess: onSuccessCallback,
                    hiddenFields: hiddenFields || {}
                });
            }
        }

    };

    useEffect(() => {
        if (id && id !== activeCategory) {
            setActiveCategory(id);
        } else if (!id && activeCategory !== 0) {
            setActiveCategory(0);
        }
        setBlogType('all');

    }, [id]);



    return (<section className="Category-Section">
        <UpcomingDemos openForm={openForm}></UpcomingDemos>
        <HeroCard></HeroCard>
        <section className="mt-4">
            <Filters setSearchText={setSearchText} searchText={searchText} setSortByValue={setSortByValue}></Filters>
            <CategoriesList activeCategory={activeCategory} setActiveCategory={setActiveCategory} searchText={searchText} blogType={blogType}></CategoriesList>
            <AllBlogs activeCategory={activeCategory} blogType={blogType} searchText={searchText} openForm={openForm}
                sortByValue={sortByValue}></AllBlogs>
        </section>
        <RelevantCourses activeCategory={activeCategory}></RelevantCourses>
        {/* {showPopupform && <PopupForm handlePopupformVisibility={handlePopupformVisibility} popupProps={popupProps} handleUserDetailsSubmissionStatus={handleUserDetailsSubmissionStatus} />} */}
        {/* {showReserveSeatForm && <ReserveYourSeatPopupForm handleReserveSeatVisibility={handleReserveSeatVisibility} popupProps={popupProps} handleUserDetailsSubmissionStatus={handleUserDetailsSubmissionStatus} courseName={courseName} demoDate={demoDate} />}
        {alreadySubmittedVisibility && <><div className="Main-Course-Overlay"></div><AlreadySubmitted handleDetailsSubmitted={handleDetailsSubmitted} /></>} */}
    </section>)
}

export default Blogs;