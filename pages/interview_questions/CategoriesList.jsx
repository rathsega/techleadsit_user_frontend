import React, { useEffect, useState, useRef } from "react";
import httpService from "../../services/httpService";

const CategoriesList = ({activeCategory, setActiveCategory, searchText, blogType}) => {
    const [categories, setCategories] = useState([]);
    const [totalBlogs, setTotalBlogs] = useState(0);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);
    
    //console.log(activeCategory);
    const scrollContainerRef = useRef(null);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await httpService.get(`blogs/getActiveBlogCategories/${blogType}/${searchText}`);
                if (response?.data?.data) {
                    setCategories(response?.data?.data);
                    let totalBlogs = (Array.isArray(response?.data?.data) ? response?.data?.data : [])
                        .reduce((sum, category) => sum + (category?.activeBlogCount || 0), 0);
                    setTotalBlogs(totalBlogs);
                }
            } catch (error) {
                console.error("Error fetching blog categories:", error);
            }
        };
        fetchCategories();
    }, [searchText, blogType]);

    useEffect(() => {
        const checkScroll = () => {
            const scrollElement = scrollContainerRef.current;
            if (scrollElement) {
                setCanScrollLeft(scrollElement.scrollLeft > 0);
                setCanScrollRight(scrollElement.scrollLeft < scrollElement.scrollWidth - scrollElement.clientWidth);
            }
        };

        const scrollElement = scrollContainerRef.current;
        if (scrollElement) {
            scrollElement.addEventListener("scroll", checkScroll);
            checkScroll();
        }

        return () => {
            if (scrollElement) {
                scrollElement.removeEventListener("scroll", checkScroll);
            }
        };
    }, [categories]);

    const scrollLeft = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: -200, behavior: "smooth" });
        }
    };

    const scrollRight = () => {
        if (scrollContainerRef.current) {
            scrollContainerRef.current.scrollBy({ left: 200, behavior: "smooth" });
        }
    };

    return (
        <div className="category-container">
            <button
                className={`scroll-btn left ${canScrollLeft ? "active-scroll" : ""}`}
                onClick={scrollLeft}
                aria-label="scrolling-left-indicator"
                disabled={!canScrollLeft}
            >
                <i className="fa fa-arrow-left" aria-hidden="true"></i>
            </button>

            <div className="category-scroll" ref={scrollContainerRef}>
                <button
                    className={`category-item ${activeCategory === 0 ? "category-item-click" : ""}`}
                    onClick={() => setActiveCategory(0)}
                >
                    All <span className="No-of-blogs">{totalBlogs}</span>
                </button>

                {(Array.isArray(categories) ? categories : [])
                    .filter(category => category?.activeBlogCount > 0)
                    .map((category, index) => (
                        <button
                            key={index}
                            className={`category-item ${activeCategory === category?._id ? "category-item-click" : ""}`}
                            onClick={() => setActiveCategory(category?._id)}
                        >
                            <span>{category?.title}</span>
                            <span className="No-of-blogs">{category?.activeBlogCount}</span>
                        </button>
                    ))}
            </div>

            <button
                className={`scroll-btn right ${canScrollRight ? "active-scroll" : ""}`}
                onClick={scrollRight}
                aria-label="scrolling-right-indicator"
                disabled={!canScrollRight}
            >
                <i className="fa fa-arrow-right" aria-hidden="true"></i>
            </button>
        </div>
    );
};

export default CategoriesList;
