import dynamic from 'next/dynamic';
import "./../public/styles/globals.css"
import "./../public/styles/Webinar.css"
import "./../public/styles/chatbot-ui.css"
import { HelmetProvider } from 'react-helmet-async';
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';
import { LoaderProvider } from '../contexts/LoaderContext';
// Dynamically import Loader and Header with ssr: false
import Header from '../components/header';
import Loader from '../components/Loader';
import Footer from "../components/footer";
import QuickCall from './../components/QuickCall';
import Head from 'next/head';

import CourseRegistrationForm from '../components/course/RegistrationForm';
import AlreadySubmitted from './blog/details/already_submitted';
import useLmsStore from '../store/lmsStore';

import { PAGE_TITLES } from '../config/pageTitles';
import {META_DATA} from '../config/metaData';

function MyApp({ Component, pageProps }) {

  const router = useRouter();
  const popupFormProps = useLmsStore((state) => state.popupFormProps);
  const formVisibility = popupFormProps?.visible || false;
  const alreadySubmitted = popupFormProps?.alreadySubmitted || false;
  const [pageTitle, setPageTitle] = useState('');
  const [metaDetails, setMetaDetails] = useState({});
  const [robotsContent, setRobotsContent] = useState('');

  const [fullUrl, setFullUrl] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const currentUrl =
        window.location.protocol +
        '//' +
        window.location.host +
        router.asPath; // includes pathname + query + hash
      setFullUrl(currentUrl);
    }
  }, [router.asPath]);


  useEffect(() => {
    const updateTitle = () => {
      const currentPath = router.asPath.split('?')[0].split('#')[0];
      const title = PAGE_TITLES[currentPath] || 'Techleads IT - IT Training Institute';
      setPageTitle(title);
    };

    const updateMetaDetails = () => {
      const currentPath = router.asPath.split('?')[0].split('#')[0];
      // Mapping of slugs to meta info
      const meta = META_DATA[currentPath] || {};
      setRobotsContent(meta.robots || 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
      setMetaDetails(meta);
    };


    // Update title on route change
    updateTitle();
    updateMetaDetails();

    // Listen for route changes
    router.events.on('routeChangeComplete', updateTitle);
    router.events.on('hashChangeComplete', updateTitle);

    return () => {
      router.events.off('routeChangeComplete', updateTitle);
      router.events.off('hashChangeComplete', updateTitle);
    };
  }, [router.asPath, router.events]);


  useEffect(() => {
    const loadRouteCSS = () => {
      const route = router.pathname;

      // Remove any previously injected route-based CSS
      const existingLink = document.getElementById('route-style');
      if (existingLink) {
        existingLink.parentNode.removeChild(existingLink);
      }

      const link = document.createElement('link');
      link.id = 'route-style';
      link.rel = 'stylesheet';
      link.type = 'text/css';
      // link.href = '/styles/globals.css';

      // Apply correct href
      if (route.includes('/direct_payment/')) {
        link.href = '/styles/direct_payments.css';
      }
      // Append to head after setting up a load listener
      link.onload = () => {
        //console.log(`Stylesheet loaded: ${link.href}`);
      };

      link.onerror = () => {
        console.error(`Failed to load CSS file: ${link.href}`);
      };

      document.head.appendChild(link);
    };

    loadRouteCSS();
    router.events.on('routeChangeComplete', loadRouteCSS);

    window.onerror = function (message, source, lineno, colno, error) {
      console.error("Global error:", { message, source, lineno, colno, error });
    };

    window.onunhandledrejection = function (event) {
      console.error("Unhandled Promise Rejection:", event.reason);
    };

    return () => {
      router.events.off('routeChangeComplete', loadRouteCSS);
    };
  }, [router]);

  const getOgUrl = typeof window !== 'undefined' ? window.location.href : '';
  const getOgType = typeof window !== 'undefined' && window.location.href === process.env.NEXT_PUBLIC_APPLICATION_URL ? 'website' : 'article';


  return (
    <HelmetProvider>
      <LoaderProvider>
        <Header></Header>
        <Loader />
        <Head>
          {Object.keys(metaDetails).length > 0 &&
            <>
              <meta name="description" content={metaDetails?.metaDescription} />
              <meta name="keywords" content={metaDetails?.metaKeywords} />
              <meta property="og:title" content={metaDetails?.metaTitle} />
              <meta property="og:description" content={metaDetails?.metaTitle} />
              <meta property="og:image" content={metaDetails?.home ? metaDetails?.ogImage?.path : process.env.NEXT_PUBLIC_FILES_URL + metaDetails?.ogImage?.path} />
              <meta property="og:url" content={getOgUrl} />
              <meta property="og:type" content={getOgType} />
              <link rel="canonical" href={fullUrl} />
            </>
          }
          <title>{pageTitle}</title>
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="robots" content={robotsContent} />
        </Head>
        <Component {...pageProps} />
        <QuickCall></QuickCall>
        {formVisibility && <><div className="Main-Course-Overlay"></div>
          <CourseRegistrationForm></CourseRegistrationForm></>}
        {alreadySubmitted && <><div className="Main-Course-Overlay"></div><AlreadySubmitted></AlreadySubmitted></>}
        <Footer></Footer>
      </LoaderProvider>
    </HelmetProvider>
  );
}

export default MyApp;

