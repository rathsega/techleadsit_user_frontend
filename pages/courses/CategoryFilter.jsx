import React, { useState, useEffect } from "react";

const CategoryFilter = ({ categories, onSelect, handleSubCategorySelect, category, clearSideFilterFlag }) => {
    const [expanded, setExpanded] = useState({});
    const [selectedCategory, setSelectedCategory] = useState(category ?? "");
    const [selectedSubCategory, setSelectedSubCategory] = useState("");
    //console.log(selectedCategory);
    const toggleExpand = (parentId) => {
        setExpanded((prev) => ({ ...prev, [parentId]: !prev[parentId] }));
    };

    const unselectAllRadioButtons = () => {
        const radioButtons = document.querySelectorAll("#categoriesRadioButtons input[type='radio']");
        radioButtons.forEach(radio => (radio.checked = false));
    };

    useEffect(() => {
        setSelectedCategory("");
        setSelectedSubCategory("");
        setExpanded({});
        unselectAllRadioButtons();
    }, [clearSideFilterFlag]);

    return (
        <div className="Course-AC-sub-section">
            <h2>Categories</h2>
            <ul id="categoriesRadioButtons">
                {categories && categories["root"]?.map((category) => {
                    const hasChildren = categories[category._id]?.length > 0;

                    return (
                        <li
                            key={category._id}
                            className={`${expanded[category._id] ? "Course-AC-active" : ""} ${selectedCategory === category._id ? "Course-AC-selected category-selected" : ""}`}
                        >
                            <div
                                className="d-flex align-items-center justify-content-between"
                                onClick={() => {
                                    if (hasChildren) {
                                        toggleExpand(category._id);
                                    } else {
                                        setSelectedCategory(category._id); // Highlight category without children
                                        onSelect(category._id, category.title);
                                    }
                                }}
                            >
                                <span className="cursor-pointer">{category.title}</span>
                                {hasChildren && (
                                    <i className={`fa-solid ${expanded[category._id] ? "fa-minus" : "fa-plus"} rotate`}></i>
                                )}
                            </div>
                            {hasChildren && expanded[category._id] && (
                                <div className="Course-AC-sub-menu Course-AC-radio-group">
                                    {categories[category._id].map((child) => (
                                        <div className="Course-AC-radio-group" key={child._id}>
                                            <input
                                                type="radio"
                                                id={`radio-${child._id}`}
                                                name="subcategory"
                                                value={child._id}
                                                className="AC-sub-menu-input specific-radio"
                                                onChange={() => {
                                                    setSelectedCategory(child._id); // Highlight subcategory
                                                    handleSubCategorySelect(child._id, child.title);
                                                    setSelectedSubCategory(child._id);
                                                }}
                                            />
                                            <label htmlFor={`radio-${child._id}`} className="AC-sub-menu-label specific-label">
                                                {child.title}
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </li>
                    );
                })}
                <li key="All Categories"
                    className={`${selectedCategory === "" && selectedSubCategory == "" ? "Course-AC-active" : ""} ${selectedCategory === "" && selectedSubCategory == "" ? "Course-AC-selected category-selected" : ""}`}>
                    <div
                        className="d-flex align-items-center justify-content-between"
                        onClick={() => {
                            setSelectedCategory(""); // Highlight category without children
                            onSelect("", "");
                            setSelectedSubCategory("");
                            handleSubCategorySelect("", "");
                            unselectAllRadioButtons();
                        }}
                    >
                        <span className="cursor-pointer">All Categories</span>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default CategoryFilter;
