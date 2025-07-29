import LikeButton from "./LikeButton";
const socialLinks = {
    linkedin: "https://www.linkedin.com/company/techleadsit1/posts/?feedView=all",
    youtube: "https://www.youtube.com/@TechLeadsIT?sub_confirmation=1",
    instagram: "https://www.instagram.com/techleadsit/",
    facebook: "https://www.facebook.com/techleadsitinstitute"
};
const FloatingLabel = ({currentBlogId, likeCount, handleRefreshLikeCount}) => {
    // Function to scroll to a specific section by ID, smoothly scrolling into view, and that section view should be visible in the middle of the screen
    // This function can be used to scroll to the "Drop Your Thoughts" section or any other section on the page
    // It takes an ID of the section as an argument and uses the scrollIntoView method  
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            // Calculate the position to scroll to, so that the section is in the middle of the screen
            const elementRect = element.getBoundingClientRect();
            const elementTop = elementRect.top + window.scrollY;
            const elementHeight = elementRect.height;
            const windowHeight = window.innerHeight;
            const scrollToPosition = elementTop - (windowHeight / 2) + (elementHeight / 2);
            // Scroll to the calculated position
            window.scrollTo({ top: scrollToPosition, behavior: "smooth" });
            // Alternatively, you can use element.scrollIntoView if you want to scroll the element into view directly
            // //   
            //element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (<div className="blog-floating-label">
        <div className="d-flex align-items-center">
            <LikeButton blogId={currentBlogId} handleRefreshLikeCount={handleRefreshLikeCount}></LikeButton>
            <div className="ms-1"><p className="float-No-of-likes">{likeCount}</p><span className="likes-text"> {likeCount == 1 ? " Like" : " Likes"}</span>  </div>
        </div>
        <span className="dividing-line-mb">&nbsp;</span>
        <button className="blog-floating-btn" onClick={() => scrollToSection("leave-comment-form")}>Drop Your Thoughts</button>
        <button className="yt-mb-icon"><img src="/images/logos_youtube-icon.svg" height="20" width="32" alt="float-mb-yt-icon"  onClick={() => window.open("https://www.youtube.com/@TechLeadsIT?sub_confirmation=1", "_blank", "noopener,noreferrer")} /></button>
        <span className="dividing-line">&nbsp;</span>
        <div className="float-social-media">
            <p className="blog-connect-text">Connect with us</p>
            <img src="/images/float-instagram.svg" onClick={() => window.open(socialLinks.instagram, "_blank", "noopener,noreferrer")} height="30" width="30" className="cursor-pointer" alt="float-insta-icon" />
            <img src="/images/float-linkedin.svg" onClick={() => window.open(socialLinks.linkedin, "_blank", "noopener,noreferrer")} height="30" width="30" className="cursor-pointer" alt="float-linkedin-icon" />
            <img src="/images/float-facebook.svg" onClick={() => window.open(socialLinks.facebook, "_blank", "noopener,noreferrer")} height="30" width="30" className="cursor-pointer" alt="float-facebook-icon" />
        </div>

        <span className="dividing-line">&nbsp;</span>
        <div className="float-blog-subs">
            <p className="blog-sub-text">Subscribe</p>
            <button className="blog-floating-sub-btn"  onClick={() => window.open("https://www.youtube.com/@TechLeadsIT?sub_confirmation=1", "_blank", "noopener,noreferrer")}>
                <img src="/images/float-youtube.svg" height="20" width="30" alt="float-yt-icon" />
                <span className="Yt-text">Tech Leads IT</span>
            </button>
        </div>
    </div>)
}

export default FloatingLabel;
