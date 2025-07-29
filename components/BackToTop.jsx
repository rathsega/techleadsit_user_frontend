import { useEffect, useState } from "react";

const BackToTop = () => {
    const [visible, setVisible] = useState(false);
    // const [bottomOffset, setBottomOffset] = useState("6%");

    useEffect(() => {
        const handleScroll = () => {
            const scrollY = window.scrollY || window.pageYOffset;
            const windowHeight = window.innerHeight;
            const docHeight = document.documentElement.scrollHeight;

            // Show if not at bottom and scrolled down 100px
            if (scrollY > 100 && scrollY + windowHeight < docHeight - 10) {
                setVisible(true);
            } else {
                setVisible(false);
            }

            /*const scrolledToBottom =
                window.innerHeight + window.scrollY >= document.body.scrollHeight;
            setBottomOffset(scrolledToBottom ? "12%" : "6%");*/
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleClick = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (!visible) return null;

    return (
        <button className="BTT-Btn"  onClick={handleClick}>
            <i className="fas fa-arrow-up BTT-Arrow"></i>
            <p className="BTT-Text">Back to Top</p>
        </button>
    );
};

export default BackToTop;