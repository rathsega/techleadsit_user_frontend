"use client";
import Image from "next/image";
import RequestForMoreInfo from "../blog/details/RequestForMoreInfo";
import HappyStudentsCarousel from "../blog/details/HappyStudentsCarousel";
import { useState, useEffect, useMemo, useRef } from "react";
import httpService from "../../services/httpService";
import { useRouter } from "next/navigation";
import { useLoader } from "../../contexts/LoaderContext";
import LiveChatButton from "../../components/LiveChatButton";
import NoResultsFound from "../../components/no_results_found";


const AllBlogs = ({ activeCategory, searchText, handlePopupformVisibility, handlePopupFormProps, sortByValue, blogType }) => {
    const [blogs, setBlogs] = useState([]);
    const [topBlogsList, setTopBlogsList] = useState([]);
    const [categories, setCategories] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalBlogCount, setTotalBlogCount] = useState(0);
    const { setLoading } = useLoader();
    const allBlogsRef = useRef(null);

    const blogsPerPage = 14;
    const currentBlogId = 0;
    const router = useRouter();
    const handleBlogRedirection = (titleSlug, id) => {
        localStorage.setItem(titleSlug, id);
        router.push("/blog/details/" + titleSlug);
    }

    const scrollToBlogsIfNotVisible = () => {
        const element = allBlogsRef.current;
        if (!element) return;

        const rect = element.getBoundingClientRect();
        const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;

        if (!isVisible) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    // Debounced search to optimize API calls
    const debouncedText = (value, delay = 500) => {
        const [debouncedValue, setDebouncedValue] = useState(value);

        useEffect(() => {
            const handler = setTimeout(() => setDebouncedValue(value), delay);
            return () => clearTimeout(handler);
        }, [value, delay]);

        return debouncedValue;
    };

    // ✅ Fetch Categories and Top Blogs on Mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                setLoading(true)
                const response = await httpService.get("blogs/getActiveBlogCategories");
                setLoading(false)
                if (response?.data?.data) {
                    setCategories(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching blog categories:", error);
            }
        };

        const getTopBlogs = async () => {
            try {
                setLoading(true)
                const response = await httpService.get("blogs/topBlogs");
                setLoading(false)
                if (response?.data) {
                    setTopBlogsList(response.data);
                }
            } catch (error) {
                console.error("Error fetching top blogs:", error);
            }
        };

        fetchCategories();
        getTopBlogs();
    }, []);

    // ✅ Fetch Blogs when `activeCategory`, `currentPage`, or `searchText` changes
    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const url = activeCategory === 0
                    ? `blogs/allActiveBlogs/${blogType}/${currentPage}/${blogsPerPage}/${sortByValue}`
                    : `blogs/allActiveBlogs/${blogType}/${currentPage}/${blogsPerPage}/${sortByValue}/${activeCategory}`;
                setLoading(true)
                const response = await httpService.post(url, { searchText: searchText });
                if (response?.data?.blogs) {
                    setBlogs(response.data.blogs);
                    setTotalBlogCount(response.data.totalActiveBlogsCount);
                }
                setLoading(false)
            } catch (error) {
                setLoading(false)
                console.error("Error fetching blogs:", error);
            }
        };

        fetchBlogs();
    }, [activeCategory, currentPage, searchText, sortByValue, blogType]);

    // ✅ Reset to first page when category or search text changes
    useEffect(() => {
        setCurrentPage(1);
    }, [activeCategory, searchText, sortByValue]);

    // ✅ Memoized values to prevent unnecessary re-renders
    const memoizedTopBlogsList = useMemo(() => topBlogsList, [topBlogsList]);
    const memoizedBlogs = useMemo(() => blogs, [blogs]);
    const memoizedTotalBlogCount = useMemo(() => totalBlogCount, [totalBlogCount]);

    // ✅ Pagination logic
    const totalPages = Math.ceil(memoizedTotalBlogCount / blogsPerPage);

    const openBlog = (titleSlug, id) => {
        localStorage.setItem(titleSlug, id);
        router.push("/blog/details/" + titleSlug);
    }

    const slugify = (title) => {
        let sluggifiedTitle = title
            .toString()
            .normalize('NFKD') // Normalize accented characters
            .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
            .replace(/[^a-zA-Z0-9\s-]/g, '') // Remove non-alphanumerics (excluding space & hyphen)
            .trim() // Trim whitespace
            .replace(/\s+/g, '-') // Replace spaces with hyphen
            .replace(/-+/g, '-') // Collapse multiple hyphens
            .toLowerCase();

        console.log("Sluggified Title: ", sluggifiedTitle);

        return sluggifiedTitle;
    }

    return (
        <div className="Category-blog-sides">
            <div className="Category-blogs">
                <div className="Category-blogs-inner" ref={allBlogsRef}>
                    {memoizedBlogs.map((blog) => (
                        <div className="related-category-card cursor-pointer" onClick={() => openBlog(slugify(blog?.basic?.title), blog?._id)} key={blog._id}>
                            <Image src={process.env.NEXT_PUBLIC_FILES_URL + blog?.basic?.thumbnailImage?.path} alt={blog?.basic?.title}
                                className="category-card-img blog-category-blog-img" style={{ "maxWidth": "100%", "width": "auto", "height": "auto" }} width="440" height="230" />
                            <div className="category-content">
                                <div className="d-flex justify-content-between mb-2">
                                    <div className="d-flex align-items-center">
                                        <Image src="/images/blogs/cateogry-blog-user.svg" alt="Blog-user-image"
                                            height="18" width="18" className="me-1" />
                                        <span className="category-user-name">{blog?.basic?.authorName}</span>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <Image src="/images/blogs/category-view-count.svg" alt="Blog-view-count"
                                            height="18" width="18" className="me-1" />
                                        <span className="category-view-count">{blog?.viewsCount} {blog?.viewsCount === 1 ? " View" : " Views"}</span>
                                    </div>
                                </div>
                                <p className="blog-content-h">{blog?.basic?.title}</p>
                                <p className="blog-content-p">{blog?.seo?.metaDescription}</p>
                                <a href="#"  onClick={e => handleBlogRedirection(slugify(blog?.basic?.title), blog?._id)} className="category-content-span">
                                    <span className="category-underline-text">learn more</span>
                                    <Image src="/images/blogs/category-arrow-mark.svg" alt="Right-arrow" height="20" width="20"
                                        className="category-arrow" />
                                </a>
                            </div>
                        </div>
                    ))}

                </div>
                '{
                    memoizedBlogs.length === 0 && (
                        <NoResultsFound mt="0"></NoResultsFound>
                    )
                }'


                {/* Pagination Controls */}
                {totalPages > 1 && (
                    <div className="pagination-container">
                        {/* Left Scroll Button */}
                        <button
                            className={`category-scroll-btn left ${currentPage === 1 ? "disabled" : "active-pagination-button"}`}
                            onClick={() => { setCurrentPage(prev => Math.max(prev - 1, 1)); scrollToBlogsIfNotVisible(); }}
                            disabled={currentPage === 1}
                        >
                            ««
                        </button>

                        {/* Page Number Buttons */}
                        <div className="pagination-scroll">
                            {[...Array(totalPages)].map((_, index) => {
                                const pageNumber = index + 1;
                                return (
                                    <button
                                        key={pageNumber}
                                        className={`page-item ${currentPage === pageNumber ? "active active-pagination-button" : ""}`}
                                        onClick={() => { setCurrentPage(pageNumber); scrollToBlogsIfNotVisible(); }}
                                    >
                                        {pageNumber}
                                    </button>
                                );
                            })}
                        </div>

                        {/* Right Scroll Button */}
                        <button
                            className={`category-scroll-btn right ${currentPage === totalPages ? "disabled" : "active-pagination-button"}`}
                            onClick={() => { setCurrentPage(prev => Math.min(prev + 1, totalPages)); scrollToBlogsIfNotVisible(); }}
                            disabled={currentPage === totalPages}
                        >
                            »»
                        </button>
                    </div>
                )}

            </div>

            <div className="Category-side-bar">
                <div className="category-top-posts">
                    <h2 className="category-promotional-h">Top Posts</h2>

                    {memoizedTopBlogsList.map((tb, tbi) => (
                        <div className="category-blog-top-post-card cursor-pointer" key={tbi} onClick={e => handleBlogRedirection(slugify(tb?.basic?.title), tb?._id)}>
                            <p className="category-numbering-post" style={{ paddingRight: "11px" }}>{tbi + 1}</p>
                            <Image src={process.env.NEXT_PUBLIC_FILES_URL + tb?.basic?.thumbnailImage?.path} height="80" width="100" className="blog-category-post-image" alt={tb?.basic?.title} />
                            <p className="category-top-post-p">{tb?.basic?.title}</p>
                        </div>
                    ))}
                </div>

                <HappyStudentsCarousel />

                <h2 className="Side-heading-h mt-5">Upcoming Demos</h2>
                <div className="mb-4">
                    <Image src="/images/blogs/category-training-session-1.png" alt="training-session-image" height="570" width="570"
                        style={{ maxWidth: "100%", height: "auto", border: "6px solid rgba(0, 186, 255, 0.8)" }} className="img-fluid" />
                </div>

                <RequestForMoreInfo currentBlogId={currentBlogId} />

                <h2 className="Side-heading-h">Upcoming Events</h2>
                <div className="mt-4">
                    <Image src="/images/blogs/category-training-session-2.png" alt="training-session-image" height="570" width="570"
                        style={{ maxWidth: "100%", height: "auto", border: "6px solid", borderImage: "linear-gradient(180deg, rgba(221, 221, 221, 0.8) 0%, rgba(255, 255, 255, 0.8) 100%) 1" }}
                        className="img-fluid" />
                </div>

                <div className="blog-category-have-que-section">
                    <h2 className="blog-category-have-que-heading">Have any questions</h2>
                    <h2 className="blog-category-have-que-subheading">We are Here to Help You</h2>
                    <Image src="/images/blogs/category-blog-have-que.png" alt="have-questions-img" loading="lazy" className="blog-category-blog-img" style={{ "maxWidth": "100%", "width": "100%", "height": "auto" }} width="300" height="188" />
                    <LiveChatButton className="blog-category-live-chat"></LiveChatButton>
                    <button className="blog-category-request-a-call" onClick={() => {
                        handlePopupformVisibility();
                        handlePopupFormProps({ title: 'Request A Call back', buttonName: 'Submit' });
                    }}>Request a Call Back</button>
                </div>
            </div>
        </div>
    );
};

export default AllBlogs;
