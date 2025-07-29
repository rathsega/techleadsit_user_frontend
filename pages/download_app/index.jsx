import { useEffect } from "react";

const AppRedirect = () => {
  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;

    if (/android/i.test(userAgent)) {
      window.location.href =
        "https://play.google.com/store/apps/details?id=com.techleadsit.academy_app&pli=1";
    } else if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
      window.location.href =
        "https://apps.apple.com/in/app/tech-leads-it/id6615066544";
    } else {
      // Optional fallback for desktop or unknown devices
      window.location.href = "https://techleadsit.com";
    }
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <h2>Redirecting you to the app store...</h2>
      <p>If you are not redirected, <a href="https://techleadsit.com">click here</a>.</p>
    </div>
  );
};

export default AppRedirect;
