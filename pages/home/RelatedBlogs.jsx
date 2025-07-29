import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import httpService from "../../services/httpService";
import { useLoader } from "../../contexts/LoaderContext";

const RelatedBlogs = () => {
    const { setLoading } = useLoader();
    const router = useRouter();
    const openBlog = (titleSlug, id) => {
        setLoading(true)
        localStorage.setItem(titleSlug, id);
        router.push("/blog/details/" + titleSlug);
        setLoading(false)
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

        return sluggifiedTitle;
    }
    
    const [latestPopularBlogs, setLatestPopularBlogs] = useState([]);
    useEffect(() => {
        const getLatestPopularBlogs = async () => {
            try {
                const response = await httpService.get(`blogs/getLatestPopularBlogs`);
                if (response?.data) {
                    setLatestPopularBlogs(response?.data);
                }
            } catch (e) {
                console.log("unepected error", e);
            }
        }

        getLatestPopularBlogs();
    }, [])
    return (
        <section className="Main-Course-Home-Page-Related-Blogs-S-section">
            <h1 className="Main-Course-Home-Page-Related-Blogs-S-heading text-center mb-3">Explore Our Related Blogs
            </h1>
            <p className="Main-Course-Home-Page-Related-Blogs-S-para text-center">"Explore our latest blogs &
                articles for expert
                insights, industry trends, and tips to boost your skills and stay ahead in your career."</p>
            <div className="Main-Course-Home-Page-Related-Blogs-S-sub-section">
                {
                    latestPopularBlogs?.map((blog, bindex) => (
                        <div className="Main-Course-Home-Page-Related-Blogs-S-card cursor-pointer" key={bindex} onClick={() => openBlog(slugify(blog?.basic?.title), blog?._id)}>
                            <img src={process.env.NEXT_PUBLIC_FILES_URL + blog?.basic?.thumbnailImage?.path}
                                className="Main-Course-Home-Page-Related-Blogs-S-img" width="400" height="210"
                                style={{ "color": "transparent", "maxWidth": "100%", "width": "-webkit-fill-available", "height": "auto" }}
                                alt="blog-card-img" />
                            <div className="Main-Course-Home-Page-Related-Blogs-S-content">
                                <div className="d-flex justify-content-between mb-2">
                                    <div className="d-flex align-items-center">
                                        <img src="/images/home/Main-Course-Home-Page-Our-Latest-Blogs-User-Icon.svg"
                                            height="20" width="20" className="me-1" alt="blog-user-img" /><span
                                                className="Main-Course-Home-Page-Related-Blogs-S-user-name">{blog?.basic?.authorName}</span>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <img src="/images/home/Main-Course-Home-Page-Our-Latest-Blogs-View-Count-Icon.svg"
                                            height="20" width="20" className="me-1" alt="blog-view-count-img" />
                                        <span className="Main-Course-Home-Page-Related-Blogs-S-view-count">{blog?.views} {blog?.views == 1 ? " View" : " Views"}</span>
                                    </div>
                                </div>
                                <p className="Main-Course-Home-Page-Related-Blogs-S-content-h">{blog?.basic?.title}</p>
                                <p className="Main-Course-Home-Page-Related-Blogs-S-content-p">{blog?.seo?.metaDescription}</p>
                                <a href="#"  onClick={() => openBlog(slugify(blog?.basic?.title), blog?._id)} className="Main-Course-Home-Page-Related-Blogs-S-content-span">
                                    <span className="Main-Course-Home-Page-Related-Blogs-S-underline-text">learn more</span>
                                    <img src="/images/home/Main-Course-Home-Page-Our-Latest-Blogs-Read-More-Arrow-Icon.svg"
                                        height="23" width="23" className="Main-Course-Home-Page-Related-Blogs-S-arrow"
                                        alt="Right-arrow" />
                                </a>
                            </div>
                        </div>
                    ))
                }



            </div>
        </section>
    )
}

export default RelatedBlogs;