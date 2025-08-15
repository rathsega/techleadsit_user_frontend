import Image from "next/image";
const Banner = ({ details }) => {

    return (
        // <div className="blog-banner">
        //     <Image src={process.env.NEXT_PUBLIC_FILES_URL + details?.heroImage?.path} width="1600" height="285" alt="banner-img" className="img-fluid" priority />
        //         <div className="inside-content">
        //             <span className="main-blog-clr">{details?.category?.title}</span>
        //             <span className="main-blog-caption">{details?.durationInMinutes}-minutes read</span>
        //             <div className="d-flex align-items-center justify-content-between mt-2">
        //                 <p className="main-blog-h">{details?.title}</p>
        //                 <div className="author-section">
        //                     <Image src={process.env.NEXT_PUBLIC_FILES_URL + details?.authorImage?.path} alt="blog-person-img" style={{borderRadius:"30px"}} height="50" width="50" />
        //                         <div className="ms-1">
        //                             <p className="mb-0 blog-author-h">Author</p>
        //                             <p className="mb-0 blog-author-name">{details?.authorName}</p>
        //                         </div>
        //                 </div>
        //             </div>
        //         </div>
        // </div>
        <div className="blog-banner">
            <div className="insta-fill-bg"></div>
            <img src={process.env.NEXT_PUBLIC_FILES_URL + details?.heroImage?.path} alt="banner-img" className="banner-img" />
            <div className="blur-overlay"></div>
            <div className="dark-overlay"></div>
            <img src={process.env.NEXT_PUBLIC_FILES_URL + details?.heroImage?.path} alt="banner-img" className="banner-img Blog-Banner-Mb-Image" style={{ "zIndex": "3", "height": "400px", "width": "300px", "transform": "translate(-50%, -50%)", "left": "50%", "top": "40%" }} />
            <div className="inside-content">
                <span className="main-blog-clr">{details?.category?.title}</span>
                <span className="main-blog-caption">{details?.durationInMinutes}-minutes read</span>
                <div className="d-flex align-items-center justify-content-between mt-2">
                    <p className="main-blog-h">{details?.title}</p>
                    <div className="author-section">
                        <img src={process.env.NEXT_PUBLIC_FILES_URL + details?.authorImage?.path} alt="blog-person-img" height="50" width="50" />
                        <div className="ms-1">
                            <p className="mb-0 blog-author-h">Author</p>
                            <p className="mb-0 blog-author-name">{details?.authorName}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Banner;