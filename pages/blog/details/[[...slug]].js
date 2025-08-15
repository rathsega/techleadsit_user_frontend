import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import Banner from "./Banner";
import SummaryContainer from "./SummaryContainer";
import httpService from "../../../services/httpService";
import Seo from "../../Seo";
import SubscribeSection from "./SubscribeSection";
import RelatedBlogs from "./RelatedBlogs";
import FloatingLabel from "./FloattingLabel";
import MobileView from "./MobileView";
import SocialShare from "./SocialShare";
import { useLoader } from "../../../contexts/LoaderContext";

export default function BlogDetailsPage({ initialBlogDetails }) {
    const router = useRouter();
    const { slug } = router.query;

    const slugify = (title) => {
        return title
            .toString()
            .normalize('NFKD') // Normalize accented characters
            .replace(/[\u0300-\u036f]/g, '') // Remove diacritics
            .replace(/[^a-zA-Z0-9\s-]/g, '') // Remove non-alphanumerics (excluding space & hyphen)
            .trim() // Trim whitespace
            .replace(/\s+/g, '-') // Replace spaces with hyphen
            .replace(/-+/g, '-') // Collapse multiple hyphens
            .toLowerCase();
    }

    const unslugify = (slug) => {
        return slug
            .toString()
            .replace(/-/g, ' ') // Replace hyphens with spaces
            .replace(/\b\w/g, char => char.toUpperCase()); // Capitalize first letters
    }
    // slug will be:
    // - ['master-human-capital-management-with-oracle-fusion-hcm-training', '180']
    // - OR ['master-human-capital-management-with-oracle-fusion-hcm-training']

    const titleSlug = slug?.[0]; // always present
    const blogId = slug?.[1]; // may be undefined

    const [blogDetails, setBlogDetails] = useState(initialBlogDetails || {});
    const [userDetailsSubmitted, setUserDetailsSubmitted] = useState(false);
    const [currentBlogId, setCurrentBlogId] = useState(null);
    const [likeCount, setLikeCount] = useState(0);
    const [refreshLikeCount, setRefreshLikeCount] = useState(false);
    const [categories, setCategories] = useState([]);
    const [topBlogsList, setTopBlogsList] = useState([]);
    const [isMobile, setIsMobile] = useState(false);
    const [openSocialSharePopup, setOpenSocialSharePopup] = useState(false);
    const { setLoading } = useLoader();

    const handleRefreshLikeCount = () => {
        setRefreshLikeCount((prev) => !prev);
    };

    const toggleSocialSharePopup = () => {
        setOpenSocialSharePopup((prev) => !prev);
    };

    // Check screen size for mobile layout
    useEffect(() => {
        const checkScreenSize = () => {
            setIsMobile(window.innerWidth < 769);
        };
        checkScreenSize();
        window.addEventListener("resize", checkScreenSize);
        return () => window.removeEventListener("resize", checkScreenSize);
    }, []);

    // Set userDetails from localStorage and add view
    useEffect(() => {
        const userDetails = localStorage.getItem("userDetails");
        if (userDetails) {
            try {
                const parsed = JSON.parse(userDetails);
                setUserDetailsSubmitted(Object.keys(parsed).length > 0);
            } catch (e) {
                console.error("Error parsing userDetails:", e);
                setUserDetailsSubmitted(false);
            }
        }

    }, [titleSlug]);

    // Fetch dynamic data on client (likes, categories, top blogs)
    useEffect(() => {
        if (!titleSlug) return;

        const fetchData = async () => {
            try {
                setLoading(true)
                let blog_id = localStorage.getItem('blog_id');
                const [categoriesRes, blogRes] = await Promise.all([
                    httpService.get(`blogs/getActiveBlogCategories`),
                    httpService.get(`blogs/${unslugify(titleSlug)}`, {
                        headers: { 'blog-id': localStorage.getItem(titleSlug) }
                    }),
                ]);
                setCategories(categoriesRes?.data?.data || []);
                setBlogDetails(blogRes?.data || {});
                if (blogRes?.data?._id) {
                    setCurrentBlogId(blogRes?.data?._id);
                    httpService.put(`blogs/${blogRes?.data?._id}/view`);
                    const [likesRes, topBlogsRes] = await Promise.all([
                        httpService.get(`/blogs/likesCount/${blogRes?.data?._id}`),
                        httpService.get(`blogs/topBlogs/${blogRes?.data?._id}`),
                    ]);
                    setLikeCount(likesRes?.data?.likeCount || 0);
                    setTopBlogsList(topBlogsRes?.data || []);
                    setLoading(false)
                } else {
                    setLoading(false)
                }

            } catch (error) {
                console.error("Error fetching blog data:", error);
            }
        };

        fetchData();
    }, [titleSlug, refreshLikeCount]);

    //console.log("Blog details : ", blogDetails);
    if (!blogDetails?.basic) {
        // Optional: render fallback/loading state or redirect
        return <div>Loading blog...</div>;
    }

    return (
        <>
            <Seo details={blogDetails?.seo} />
            <Banner details={blogDetails?.basic} />

            <div className="Blog-Summary">
                {isMobile ? (
                    <MobileView
                        details={blogDetails?.basic}
                        overviewDetails={blogDetails?.overview}
                        keywords={blogDetails?.basic?.blogKeywords}
                        advertisement={blogDetails?.advertisement}
                        viewsCount={blogDetails?.views}
                        currentBlogId={currentBlogId}
                        likeCount={likeCount}
                        categories={categories}
                        topBlogsList={topBlogsList}
                        toggleSocialSharePopup={toggleSocialSharePopup}
                        category={blogDetails?.basic?.category?._id}
                    />
                ) : (
                    <SummaryContainer
                        likeCount={likeCount}
                        details={blogDetails?.overview}
                        keywords={blogDetails?.basic?.blogKeywords}
                        advertisement={blogDetails?.advertisement}
                        viewsCount={blogDetails?.views}
                        currentBlogId={currentBlogId}
                        categories={categories}
                        topBlogsList={topBlogsList}
                        toggleSocialSharePopup={toggleSocialSharePopup}
                        category={blogDetails?.basic?.category?._id}
                    />
                )}

                <section className="margin-section">
                    <SubscribeSection currentBlogId={currentBlogId} />
                    <RelatedBlogs category={blogDetails?.basic?.category?._id} currentBlogId={currentBlogId} />
                </section>
            </div>


            <FloatingLabel
                currentBlogId={currentBlogId}
                likeCount={likeCount}
                handleRefreshLikeCount={handleRefreshLikeCount}
            />

            {openSocialSharePopup && <SocialShare toggleSocialSharePopup={toggleSocialSharePopup} />}
        </>
    );
}
