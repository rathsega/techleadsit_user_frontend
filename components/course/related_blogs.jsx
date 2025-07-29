import Image from "next/image";
import { useRouter } from "next/navigation";
import React, {useCallback} from "react";

const RelatedBlogs = React.memo(({ blogs }) => {
    const router = useRouter();

    const slugify = useCallback((title) => {
        let sluggifiedTitle = title
            .toString()
            .normalize('NFKD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-zA-Z0-9\s-]/g, '')
            .trim()
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .toLowerCase();
        return sluggifiedTitle;
    }, []);

    const openBlog = useCallback((titleSlug, id) => {
        localStorage.setItem(titleSlug, id);
        router.push("/blog/details/" + titleSlug);
    }, [router]);

    return (
        <section className="Main-Course-Related-Blogs-S-section">
            <h2 className="Main-Course-Related-Blogs-S-heading text-center mb-3">Explore Our Related Blogs</h2>
            <p className="Main-Course-Related-Blogs-S-para text-center">"Explore our latest blogs & articles for expert
                insights, industry trends, and tips to boost your skills and stay ahead in your career."</p>
            <div className="Main-Course-Related-Blogs-S-sub-section">
                {
                    blogs?.map((rb, rbi) => (
                        <div className="Main-Course-Related-Blogs-S-card cursor-pointer" key={rbi} onClick={() => openBlog(slugify(rb?.basic?.title), rb?._id)}>
                            <Image src={process.env.NEXT_PUBLIC_FILES_URL + rb?.basic?.thumbnailImage?.path} width="400" height="210" style={{ "color": "transparent", "maxWidth": "100%", "width": "-webkit-fill-available", "height": "auto" }} className="Main-Course-Related-Blogs-S-img" alt="blog-card-img" priority={rbi === 0} />
                            <div className="Main-Course-Related-Blogs-S-content">
                                <div className="d-flex justify-content-between mb-2">
                                    <div className="d-flex align-items-center">
                                        <Image priority={false} loading="lazy" src="/images/courses/Main-Course-Our-Latest-Blogs-User-Icon.svg" 
                                            height="20" width="20" className="me-1" alt="blog-user-img" /><span
                                                className="Main-Course-Related-Blogs-S-user-name">{rb?.basic?.authorName}</span>
                                    </div>
                                    <div className="d-flex align-items-center">
                                        <Image priority={false} loading="lazy" src="/images/courses/Main-Course-Our-Latest-Blogs-View-Count-Icon.svg" 
                                            height="20" width="20" className="me-1" alt="blog-view-count-img" />
                                        <span className="Main-Course-Related-Blogs-S-view-count">{rb?.views.length} {rb?.views.length == 1 ? " View" : " Views"}</span>
                                    </div>
                                </div>
                                <p className="Main-Course-Related-Blogs-S-content-h">{rb?.basic?.title}</p>
                                <p className="Main-Course-Related-Blogs-S-content-p">{rb?.seo?.metaDescription}</p>
                                <a href="#" onClick={() => openBlog(slugify(rb?.basic?.title), rb?._id)} className="Main-Course-Related-Blogs-S-content-span">
                                    <span className="Main-Course-Related-Blogs-S-underline-text">learn more</span>
                                    <Image priority={false} loading="lazy" src="/images/courses/Main-Course-Our-Latest-Blogs-Read-More-Arrow-Icon.svg" 
                                        height="23" width="23" className="Main-Course-Related-Blogs-S-arrow" alt="Right-arrow" />
                                </a>
                            </div>
                        </div>
                    ))
                }
            </div>
        </section>
    )
});

export default RelatedBlogs;