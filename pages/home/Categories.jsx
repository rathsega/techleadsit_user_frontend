import { useEffect, useState } from "react";
import httpService from './../../services/httpService'
import { useRouter } from "next/navigation";
import { useLoader } from "../../contexts/LoaderContext";
import React from "react";
import Image from 'next/image'; // Importing Image component from next.js for optimized image handling
const Categories = () => {
    const [categories, setCategories] = useState([])
    const { setLoading } = useLoader();
    useEffect(() => {
        const getActiveSubcategoriesWithCourseCount = async () => {
            try {
                const response = await httpService.get('courses/getActiveSubcategoriesWithCourseCount');
                if (response?.data) {
                    setCategories(response?.data)
                }
            } catch (e) {
                console.log("unepected error", e);
            }
        }
        getActiveSubcategoriesWithCourseCount();
    }, [])

    const router = useRouter();
    const openCourses = (id, name) => {
        setLoading(true)
        router.push("/courses?subCategoryId=" + id + "&subCategoryName=" + name);
        setLoading(false)
    }

    return (
        <section className="Main-Course-HP-Success-Stories-Of-Our-Proud-Achievers-Section">
            <h2 className="Main-Course-Home-Page-C-Section-Heading mb-2">
                Featured Courses by Category
            </h2>
            <p className="Main-Course-Home-Page-C-Section-Para">“Upskill with Industry-Relevant Courses Specializing
                in
                Oracle Fusion & ERP Solutions.”</p>
            <div className="Home-Section-CC-grid">
                {
                    categories?.length > 0 && categories.map((category, cindex) => (
                        <article key={cindex} className="Home-Section-CC-card" onClick={() => openCourses(category?._id, category?.title)}>
                            <img src={process.env.NEXT_PUBLIC_FILES_URL + category?.icon?.path} alt={category?.name} className="Home-Section-CC-image-T1" loading="lazy" />
                            <h3>{category?.title}</h3>
                            <p>{category?.subTitle}</p>
                            <div className="Home-Section-CC-meta">
                                <span className="Home-Section-CC-count">{category?.courseCount} Courses</span>
                                <span className="Home-Section-CC-rating">
                                    <img src="/images/home/Course-Category-Star.svg" className="Home-Section-CC-Star-Icon" alt="Star" /> {category?.rating}
                                </span>
                            </div>
                        </article>
                    ))}

            </div>
        </section>
    )
}

export default Categories;