import React, { useCallback, useEffect, useState, lazy, Suspense } from "react";
import httpService from "../services/httpService";
import { useRouter } from 'next/router';
import { useLoader } from "../contexts/LoaderContext";
const QuickForm = lazy(() => import("./QuickForm"));
const BackToTop = lazy(() => import("./BackToTop"));
const WhatsAppIcon = lazy(() => import("./WhatsAppIcon"));
import Image from "next/image"; // Importing Image component from next.js for optimized image handling

const Footer = React.memo(() => {
    const [topCourses, setTopCourses] = useState([]);
    const [categories, setCategories] = useState([])
    const router = useRouter();
    const { setLoading } = useLoader();

    const openHome = useCallback(() => {
        setLoading(true);
        router.push(`/`);
        setLoading(false);
    }, [setLoading, router]);

    const getTopCourses = useCallback(async () => {
        try {
            let response = await httpService.get('/courses/getTopCourses');
            //console.log(response);
            if (response && response?.data && response?.data?.courses) {
                setTopCourses(response?.data?.courses)
            }
        } catch (e) {
            console.log("unepected error", e);
        }
    }, [])

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

    useEffect(() => {

        getTopCourses();
        getActiveSubcategoriesWithCourseCount();

    }, [])

    return (
        <>


            <section className="Main-Course-Footer-Section">
                <div className="Main-Course-Footer-Section-Nav-Section">
                    <Image loading="lazy" src="/images/Main-Course-Page-Techleads-Logo.svg" className="cursor-pointer" width="236" height="40" onClick={openHome} alt="Footer-Techleads-Logo" />
                    <p><a href="tel:+918125323232">Phone: +91 8125323232</a></p>
                    <p><a href="mailto:info@techleadsit.com">Email: info@techleadsit.com</a></p>
                </div>
                <div className="Main-Course-Footer-Wrap-Section">
                    <div className="Main-Course-Footer-Section-Nav-Section">
                        <h2>Top Categories</h2>
                        {categories.length === 0
                            ? Array.from({ length: 5 }).map((_, i) => (
                                <div key={i} style={{ height: 24, background: "#f0f0f0", margin: "8px 0", borderRadius: 4 }} />
                            ))
                            : categories.slice(0, 5).map((cat, catIndex) => (
                                <a href={`/courses?subCategoryId=${cat?.subCategoryId}&subCategoryName=${cat?.subCategoryName}`} key={catIndex} target="_blank">
                                    <p>{cat?.subCategoryName}</p>
                                </a>
                            ))}
                    </div>
                    <div className="Main-Course-Footer-Section-Nav-Section">
                        <h2>Popular Courses</h2>
                        {topCourses.length === 0
                            ? Array.from({ length: 5 }).map((_, i) => (
                                <div
                                    key={i}
                                    style={{
                                        height: 24,
                                        background: "#f0f0f0",
                                        margin: "8px 0",
                                        borderRadius: 4
                                    }}
                                />
                            ))
                            : topCourses.map((tc, tci) => (
                                <a href={'/' + tc?.basic?.slug} key={tci} target="_blank">
                                    <p>{tc?.basic?.title}</p>
                                </a>
                            ))
                        }
                    </div>
                    <div className="Main-Course-Footer-Section-Nav-Section">
                        <h2>Useful Links</h2>
                        <a href="/comingsoon" target="_blank"><p>Upcoming Batches</p></a>
                        <a href="/blogs" target="_blank"><p>Blogs</p></a>
                        <a href="/interview_questions" target="_blank"><p>Interview Questions</p></a>
                        <a href="/careers" target="_blank"><p>Careers</p></a>
                    </div>
                    <div className="Main-Course-Footer-Section-Nav-Section">
                        <h2>Support & Policies</h2>
                        <a href="/terms-conditions" target="_blank"><p>Terms and conditions</p></a>
                        <a href="/privacy-policy" target="_blank"><p>Privacy policy</p></a>
                        <a href="/refund-policy" target="_blank"><p>Refund policy</p></a>
                        <a href="/contactus" target="_blank"><p>Contact Us</p></a>
                    </div>
                </div>
            </section>
            <div className="Main-Course-Footer-Copyright-Section">
                <p className="Main-Course-Copyright-Text">&copy; Copyright Tech Leads IT. All Rights Reserved </p>
                <div className="Main-Course-Stay-Connected-Div">
                    <p className="Main-Course-Stay-Connected-Para">Stay Connected with us </p>
                    <div className="d-flex gap-4">
                        <a href="https://www.facebook.com/techleadsitinstitute" target="_blank"
                            rel="noopener noreferrer">
                            <Image loading="lazy" priority={false} src="/images/Main-Course-Follow-Facebook-Icon.svg" alt="Footer-Facebook-Logo" className="Main-Course-Footer-Social-Media-Icons" width={46} height={46} />
                        </a>
                        <a href="https://www.instagram.com/techleadsit" target="_blank" rel="noopener noreferrer">
                            <Image loading="lazy" priority={false} src="/images/Main-Course-Follow-Instagram-Icon.svg" alt="Footer-Insta-Logo" className="Main-Course-Footer-Social-Media-Icons" width={46} height={46} />
                        </a>
                        <a href="https://www.linkedin.com/company/techleadsit1" target="_blank" rel="noopener noreferrer">
                            <Image loading="lazy" priority={false} src="/images/Main-Course-Follow-LinkedIn-Icon.svg" alt="Footer-Linkedin-Logo" className="Main-Course-Footer-Social-Media-Icons" width={46} height={46} />
                        </a>
                        <a href="https://www.youtube.com/@TechLeadsIT" target="_blank" rel="noopener noreferrer">
                            <Image loading="lazy" priority={false} src="/images/Main-Course-Follow-Youtube-Icon.svg" alt="Footer-YT-Icon" className="Main-Course-Footer-Social-Media-Icons" width={46} height={46} />
                        </a>
                    </div>
                </div>
            </div>
            <Suspense fallback={<div>Loading...</div>}>
                <QuickForm />
                <BackToTop />
                <WhatsAppIcon />
            </Suspense>
        </>
    )
})

export default Footer;