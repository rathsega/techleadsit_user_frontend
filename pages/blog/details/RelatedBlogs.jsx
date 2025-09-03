import { useEffect, useState } from "react";
import httpService from "../../../services/httpService";
import Image from "next/image";
import { useRouter } from "next/navigation";

const RelatedBlogs = ({ category, currentBlogId }) => {
    const [relatedBlogsList, setRelatedBlogsList] = useState([]);
    useEffect(() => {
        const relatedBlogsByCategory = async () => {
            try {
                const response = await httpService.get(`blogs/relatedBlogs/${category}/${currentBlogId}`);
                if (response?.data) {
                    setRelatedBlogsList(response?.data);
                }
            } catch (error) {
                console.error("Error fetching related blogs:", error);
            }
        }

        relatedBlogsByCategory();
    }, [category])

    const router = useRouter();
    const openBlog = (titleSlug, id) => {
        localStorage.setItem(titleSlug, id);
        router.push("/blog/details/"+titleSlug);
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
        <section className="related-blogs-section">
            <h2 className="related-blogs-heading">Explore Our Related Blogs</h2>
            <div className="related-blogs-sub-section">
                {
                    relatedBlogsList.map((rb, rbi) => (
                        <div className="related-blog-card cursor-pointer" key={rbi} onClick={()=> openBlog(slugify(rb?.basic?.title), rb?._id)}>   
                            <Image src={process.env.NEXT_PUBLIC_FILES_URL + rb?.basic?.thumbnailImage?.path} width="552" height="288" className="img-fluid blog-card-img" alt="blog-card-img" />
                            <div className="blog-content">
                                <div className="d-flex justify-content-between mb-2">
                                    <div className="d-flex align-items-center">
                                        <Image src="/images/blog-user.svg" height="20" width="20" className="me-1" alt="blog-user-img" /><span
                                            className="user-name">{rb?.basic?.authorName}</span>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <Image src="/images/view-count.svg" height="20" width="20" className="me-1" alt="blog-view-count-img" />
                                        <span className="view-count">{rb?.views.length} {rb?.views.length == 1 ? " View" : " Views" }</span>
                                    </div>
                                </div>
                                <p className="blog-content-h">{rb?.basic?.title}</p>
                                <p className="blog-content-p">{rb?.seo?.metaDescription}</p>
                                <a href="#" onClick={()=> openBlog(slugify(rb?.basic?.title), rb?._id)} className="blog-content-span"><span className="underline-text">learn more</span>
                                    <Image src="/images/arrow-mark.svg" height="20" width="20" className="arrow" alt="Right-arrow" /></a>
                            </div>
                        </div>
                    ))
                }

            </div>
        </section>
    )
}

export default RelatedBlogs;