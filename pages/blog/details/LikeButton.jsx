import { useState, useEffect } from "react";
import httpService from "../../../services/httpService";

const LikeButton = ({ blogId, handleRefreshLikeCount }) => {
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        checkIfLiked();
    }, []);

    const checkIfLiked = async () => {
        try {
            const response = await httpService.get(`/blogs/like/${blogId}`);
            setLiked(response.data.liked);
        } catch (error) {
            console.error("Error fetching like status", error);
        }
    };

    const handleLike = async () => {
        try {
            const response = await httpService.post(`/blogs/like/${blogId}`);
            setLiked(response.data.liked);
            handleRefreshLikeCount();
        } catch (error) {
            console.error("Like Error:", error);
        }
    };

    return (
        <button id="like-btn" aria-label="like-here" className="heart-btn" onClick={handleLike}>
            <i
                className={`fa-heart ${liked ? "fa-solid" : "fa-regular"}`}
                style={{ color: liked ? "#006FAA" : "rgba(200, 200, 200, 1)" }}
            ></i>
        </button>
    );
};

export default LikeButton;
