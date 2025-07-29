import AllBlogs from "./AllBlogs";
import CategoriesList from "./CategoriesList";
import Filters from "./Filters";
import HeroCard from "./HeroCard";
import UpcomingDemos from "./UpcomingDemos";
import RelevantCourses from "./RelevantCourses";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import PopupForm from './PopupForm'
import ReserveYourSeatPopupForm from './ReserveYourSeatPopupForm'
import AlreadySubmitted from "../blog/details/already_submitted";

const Blogs = () => {
    const router = useRouter();
    const { id } = router.query;
    /*const [activeCategory, setActiveCategory] = useState(id && id[0] != 'interview_questions' ? id[0] : 0);
    const [blogType, setBlogType] = useState(id && id[0] == 'interview_questions' ? 'interview_questions' : 'all');*/
    const [activeCategory, setActiveCategory] = useState(0);
    const [blogType, setBlogType] = useState('all');
    const [searchText, setSearchText] = useState("");
    const [sortByValue, setSortByValue] = useState("popularity");
    const [debouncedText, setDebouncedText] = useState("");
    const [showPopupform, setShowPopupform] = useState(false);
    const [showReserveSeatForm, setShowReserveSeatForm] = useState(false);
    const [popupProps, setPopupProps] = useState({ title: "", buttonName: "" });
    const [userDetailsSubmitted, setUserDetailsSubmitted] = useState(() => {
        if (typeof window !== "undefined") {
            return !!localStorage.getItem('userDetails');
        }
        return false;
    });
    const [alreadySubmittedVisibility, setAlreadySubmittedVisibility] = useState(false);
    const [courseName, setCourseName] = useState("");
    const [demoDate, setDemoDate] = useState("");

    /*useEffect(() => {
        if (id && id !== 'interview_questions') {
            setActiveCategory(id);
            setBlogType('interview_questions');
        } else {
            setActiveCategory(0); // default for interview_questions or no id
            setBlogType('all');
        }
    }, [id]);*/

    const handleUserDetailsSubmissionStatus = (status) => {
        setUserDetailsSubmitted(status);
    };

    const handleDetailsSubmitted = () => {
        setAlreadySubmittedVisibility(false);
    }

    const handlePopupformVisibility = () => {
        if (!showPopupform) {
            if (userDetailsSubmitted) {
                setAlreadySubmittedVisibility(true);
                return;
            }
        }
        setShowPopupform((prev) => !prev);
    };
    const handleReserveSeatVisibility = () => {
        if (!showPopupform) {
            if (userDetailsSubmitted) {
                setAlreadySubmittedVisibility(true);
                return;
            }
        }
        setShowReserveSeatForm((prev) => !prev);
        setPopupProps({ title: "Reserve Your Seat", buttonName: "Submit" })
    };

    const handlePopupFormProps = (newProps) => {
        setPopupProps(newProps);
    };

    useEffect(() => {
        if (searchText.length < 3) return; // Only trigger debounce if input is 3+ characters

        const handler = setTimeout(() => {
            setDebouncedText(searchText);
        }, 2000); // 1-second debounce time

        return () => clearTimeout(handler); // Cleanup on every change before 3 sec
    }, [searchText]);
    useEffect(() => {
            if (id && id !== activeCategory) {
                setActiveCategory(id);
            } else if (!id && activeCategory !== 0) {
                setActiveCategory(0);
            }
            setBlogType('all');
        
    }, [id]);



    return (<section className="Category-Section">
        <UpcomingDemos handleReserveSeatVisibility={handleReserveSeatVisibility} setCourseName={setCourseName} setDemoDate={setDemoDate}></UpcomingDemos>
        <HeroCard></HeroCard>
        <section className="mt-4">
            <Filters setSearchText={setSearchText} searchText={searchText} setSortByValue={setSortByValue}></Filters>
            <CategoriesList activeCategory={activeCategory} setActiveCategory={setActiveCategory} searchText={searchText} blogType={blogType}></CategoriesList>
            <AllBlogs activeCategory={activeCategory} blogType={blogType} searchText={searchText} handlePopupformVisibility={handlePopupformVisibility}
                handlePopupFormProps={handlePopupFormProps} sortByValue={sortByValue}></AllBlogs>
        </section>
        <RelevantCourses activeCategory={activeCategory}></RelevantCourses>
        {showPopupform && <PopupForm handlePopupformVisibility={handlePopupformVisibility} popupProps={popupProps} handleUserDetailsSubmissionStatus={handleUserDetailsSubmissionStatus} />}
        {showReserveSeatForm && <ReserveYourSeatPopupForm handleReserveSeatVisibility={handleReserveSeatVisibility} popupProps={popupProps} handleUserDetailsSubmissionStatus={handleUserDetailsSubmissionStatus} courseName={courseName} demoDate={demoDate} />}
        {alreadySubmittedVisibility && <><div className="Main-Course-Overlay"></div><AlreadySubmitted handleDetailsSubmitted={handleDetailsSubmitted} /></>}
    </section>)
}

export default Blogs;