import { useEffect, useState } from "react";
import AllCourses from "./AllCourses";
import SearchFilter from "./SearchFilter";
import SideFilters from "./SideFilters";
import { useSearchParams } from 'next/navigation';
import LiveChatButton from "../../components/LiveChatButton";

const MainSection = ({ openForm }) => {
    const searchParams = useSearchParams();
    const subCategoryId = searchParams.get('subCategoryId') ?? "";
    const subCategoryNameQp = searchParams.get('subCategoryName') ?? "";
    const [clearSideFilterFlag, setClearSideFilterFlag] = useState(false);
    useEffect(()=>{
        setSubCategory(searchParams.get('subCategoryId') ?? "");
    },[subCategoryId])
    useEffect(()=>{
        setSubCategoryName(searchParams.get('subCategoryName') ?? "");
    },[subCategoryNameQp])

    const [category, setCategory] = useState("");
    const [subCategory, setSubCategory] = useState(subCategoryId);
    const [skillLevel, setSkillLevel] = useState("");
    const [courseType, setCourseType] = useState("");
    const [courseTracks, setCourseTracks] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [subCategoryName, setSubCategoryName] = useState("");
    const removeCategoryFilter = () => {
        subCategory ? setSubCategory("") : setCategory("");
        subCategory ? setSubCategoryName("") : setCategoryName("");
        setClearSideFilterFlag(prev => !prev);
    }
    const [searchText, setSearchText] = useState("");
    const [sortByValue, setSortByValue] = useState("popularity");
    const [totalCoursesCount, setTotalCoursesCount] = useState(0);
    return (
        <section className="All-category-Main-Section">
            <SideFilters {...{ openForm, setCategory, setSubCategory, setSkillLevel, setCourseType, setCourseTracks, setCategoryName, setSubCategoryName, category, categoryName, clearSideFilterFlag }} />


            <section>
                <SearchFilter setSearchText={setSearchText} searchText={searchText} setSortByValue={setSortByValue} totalCoursesCount={totalCoursesCount}></SearchFilter>
                {(categoryName || subCategoryName) && <div className="All-Category-Selected-option">
                    <i className="fa-solid fa-xmark cursor-pointer" onClick={removeCategoryFilter}></i>
                    <p className="mb-0 ms-2">{subCategoryName ? subCategoryName : (categoryName ? categoryName : "")}</p>
                </div>}
                <AllCourses {...{ category, subCategory, courseType, courseTracks, skillLevel, categoryName, subCategoryName, searchText, sortByValue, setTotalCoursesCount }}></AllCourses>

                <div className="MB-AC-have-que-section">
                    <h2 className="AC-have-que-heading">
                        Feeling Stuck ?
                    </h2>
                    <h2 className="AC-have-que-subheading">We are here to help You</h2>
                    <img src="/images/courses/AC-sidebar-enquiry-img.svg" loading="lazy" alt="have-questions-img"
                        className="img-fluid" width="300" height="188"
                        style={{ "color": "transparent", "maxWidth": "100%", "width": "auto", "height": "auto" }} />
                    <LiveChatButton className="AC-live-chat"></LiveChatButton>
                    <button className="AC-request-a-call" onClick={() => openForm("Request A Call back")}>Request a Call Back</button>
                </div>
            </section>
        </section>
    )
}

export default MainSection;