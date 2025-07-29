"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const AlignMeFour = ({ categories, topBlogsList }) => {
    const router = useRouter();
    const handleBlogRedirection = (titleSlug, id) => {
        localStorage.setItem(titleSlug, id);
        router.push("/blog/details/" + titleSlug);
    }
    const handleBlogsRedirection = (id) => {
        router.push("/blogs/" + id);
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
    };
    return (
        <div className="align-me-4">
            <div className="centering">
                <div className="categories">
                    <h2 className="promotional-h">Categories</h2>
                    {(Array.isArray(categories) ? categories : [])
                        .filter(category => category?.activeBlogCount > 0)
                        .map((category, index) => (
                            <button className="category-btn" key={index} onClick={e => handleBlogsRedirection(category?._id)}>
                                <span>{category?.title}</span>
                                <span>{category?.activeBlogCount}</span>
                            </button>
                        ))}


                </div>
            </div>

            <div className="main-content centering">
                <div className="top-posts">
                    <h2 className="promotional-h">Top Posts</h2>

                    {
                        topBlogsList?.map((tb, tbi) => (
                            <div className="top-post-card cursor-pointer" key={tbi} onClick={e => handleBlogRedirection(slugify(tb?.basic?.title), tb?._id)}>
                                <p className="numbering-post" style={{ "paddingRight": "11px" }}>{tbi + 1}</p>
                                <Image src={process.env.NEXT_PUBLIC_FILES_URL + tb?.basic?.thumbnailImage?.path} height="80" width="100" className="post-image" alt={tb?.basic?.title} />
                                <p className="top-post-p">{tb?.basic?.title}</p>
                            </div>
                        ))
                    }

                </div>
            </div>
        </div>
    )
}

export default AlignMeFour;