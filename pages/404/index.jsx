import Image from 'next/image';
import { useRouter } from 'next/router';
import { useLoader } from "./../../contexts/LoaderContext";
const PageNotFound = () => {

    const { setLoading } = useLoader();
    const router = useRouter();

    const openHome = () => {
        console.log("Navigating to home page");
        setLoading(true)
        router.push(`/`); // Example route: /slug-value
        setLoading(false)
    }

    return (
        <section className="Main-Course-Page-Error-Screen-Container">
            <div className="Main-Course-Page-Error-Screen-Content">
                <Image src="/images/page_not_found.svg" alt="404 Error Image" width="512" height="213" style={{ color: "transparent", maxWidth: "100%", marginBottom: "20px" }} />
                <h1 className="MC-Error-Screens-Heading">404 Page Not Found</h1>
                <p className="MC-Error-Screens-Para">The page you're looking for doesn't exist or may have been moved. Please check the URL or go back to the homepage.</p>
                <button className="Main-Course-Error-Screen-btn" onClick={openHome}> Back to previous page</button>
            </div>
        </section>
    )
};

export default PageNotFound;