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
            <div className="Main-Course-Home-Page-Featured-Courses-Card-Section">
                {
                    categories?.length > 0 && categories.map((category, cindex) => (
                        <div className="Main-Course-Home-Page-Featured-Courses-Card cursor-pointer" key={cindex} onClick={() => openCourses(category?.subCategoryId, category?.subCategoryName)}>
                            <Image height={75} width={75} loading='lazy' priority={false} src={`/images/home/${category?.subCategoryName}.svg`}
                                alt="Featured-Courses-Icon" className="Main-Course-Home-Page-Featured-Courses-Icon" />
                            <h3 className="Main-Course-Home-Page-Featured-Courses-Card-heading">{category?.subCategoryName}</h3>
                            <p className="Main-Course-Home-Page-Featured-Courses-Card-para">{category?.courseCount > 9 ? category?.courseCount : '0' + category?.courseCount} {category?.courseCount == 1 ? ' Course' : " Courses"}</p>
                        </div>
                    ))
                }
            </div>
        </section>
    )
}

export default Categories;