import { useRouter } from 'next/router';

const Breadcrumb = ({ pageDetails }) => {
  const router = useRouter();
  
  const navigateTo = (page) => {
    if(page === 'home'){
      router.push("/");
      return;
    }
    router.push(`/${page}`);
  };

  return (
    <div className="breadcrumb-container">
      {/* Blogs > Blog Detail */}
      {
        pageDetails?.pageName === "blogDetail" && (
          <div className="breadcrumb">
            <i className="fa-solid fa-house"></i>
            <span className="breadcrumb-link" onClick={() => navigateTo("home")}>Home</span>
            <span className="breadcrumb-separator">›</span>
            <span className="breadcrumb-link" onClick={() => navigateTo("blogs")}>Blogs</span>
            <span className="breadcrumb-separator">›</span>
            <span className="breadcrumb-current">Blog Detail</span>
          </div>
        )
      }
      {/* Career > CareerJobDescription > CareerJobApply */}
      {
        pageDetails?.pageName === "careerJobApply" && (
          <div className="breadcrumb">
            <i className="fa-solid fa-house"></i>
            <span className="breadcrumb-link" onClick={() => navigateTo("home")}>Home</span>
            <span className="breadcrumb-separator">›</span>
            <span className="breadcrumb-link" onClick={() => navigateTo("careers")}>Career</span>
        <span className="breadcrumb-separator">›</span>
        <span className="breadcrumb-link" onClick={() => navigateTo(`career/${pageDetails?.jobId}`)}>CareerJobDescription</span>
        <span className="breadcrumb-separator">›</span>
        <span className="breadcrumb-current">CareerJobApply</span>
      </div>
        )
      }
      {/* Career > CareerJobDescription */}
      {
        pageDetails?.pageName === "careerJobDescription" && (
          <div className="breadcrumb">
            <i className="fa-solid fa-house"></i>
            <span className="breadcrumb-link" onClick={() => navigateTo("home")}>Home</span>
            <span className="breadcrumb-separator">›</span>
            <span className="breadcrumb-link" onClick={() => navigateTo("careers")}>Career</span>
            <span className="breadcrumb-separator">›</span>
            <span className="breadcrumb-current">CareerJobDescription</span>
          </div>
        )
      }
      {/* Course > Payment */}
      {
        pageDetails?.pageName === "coursePayment" && (
          <div className="breadcrumb">
            <i className="fa-solid fa-house"></i>
            <span className="breadcrumb-link" onClick={() => navigateTo("home")}>Home</span>
            <span className="breadcrumb-separator">›</span>
            <span className="breadcrumb-link" onClick={() => navigateTo(pageDetails?.slug)}>Course</span>
            <span className="breadcrumb-separator">›</span>
            <span className="breadcrumb-current">Payment</span>
          </div>
        )
      }
    </div>
  );
};
export default Breadcrumb;