import dynamic from 'next/dynamic';
import "./../public/styles/globals.css"
import { HelmetProvider } from 'react-helmet-async';
import { useEffect } from "react";
import { useRouter } from 'next/router';
import { LoaderProvider } from '../contexts/LoaderContext';
// Dynamically import Loader and Header with ssr: false
import Header from '../components/header';
import Loader from '../components/Loader';
import Footer from "../components/footer";
import QuickCall from './QuickCall';

function MyApp({ Component, pageProps }) {

  const router = useRouter();

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


  return (
    <HelmetProvider>
      <LoaderProvider>
        <Header></Header>
        <Loader />
        <Component {...pageProps} />
        <QuickCall></QuickCall>
        <Footer></Footer>
      </LoaderProvider>
    </HelmetProvider>
  );
}

export default MyApp;
