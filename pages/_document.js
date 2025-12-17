import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* DNS prefetch for performance */}
        <link rel="dns-prefetch" href="//cdnjs.cloudflare.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />

        {/* REMOVE OR CONDITIONALLY LOAD: Only preload if actually used */}
        {/* <link rel="preload" href="/fonts/mont-latin.woff2" as="font" type="font/woff2" crossOrigin="anonymous" /> */}
        {/* <link rel="preload" as="image" href="/images/courses/Main-Course-Banner-Hero-R-Img.webp" /> */}

        {/* Load critical CSS immediately */}
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.3/css/bootstrap.min.css"
          integrity="sha512-jnSuA4Ss2PkkikSOLtYs8BlYIeeIK1h99ty4YfvRPAlzr377vr3CXDb7sb7eEEBYjDtcYj+AjBH3FLv5uSJuXg=="
          crossOrigin="anonymous"
        />

        {/* Load system fonts immediately - no custom font loading */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* {
              font-family: Montserrat,Arial,sans-serif !important;
            }*/
            
            /* Prevent font swap issues */
            body {
              font-family: Montserrat,Arial,sans-serif !important;
              font-display: swap;
            }
          `
        }} />

        {/* Load non-critical CSS asynchronously */}
        <link rel="stylesheet" href="/styles/all.min.css" media="print" onLoad="this.media='all'" />
        <link rel="stylesheet" href="/styles/bootstrap-icons.min.css" media="print" onLoad="this.media='all'" />

        {/* Simplified CSS loading without custom fonts */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                function loadCSS(href, media, onload) {
                  var link = document.createElement('link');
                  link.rel = 'stylesheet';
                  link.href = href;
                  link.media = media || 'all';
                  if (onload) {
                    link.onload = onload;
                  }
                  document.head.appendChild(link);
                  return link;
                }

                // Load non-critical CSS after initial paint
                setTimeout(function() {
                  // Font Awesome (icons) - Load after initial render
                  loadCSS('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css');
                  
                  // Bootstrap Icons - Load after initial render
                  loadCSS('https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.10.5/font/bootstrap-icons.min.css');
                }, 100);
              })();
            `,
          }}
        />

        <style>{`
          .phone-wrapper {
            position: relative;
            width: 500px;
            height: 600px;
            margin: 0 auto;
            flex-shrink: 0;
            overflow-x: hidden;
          }
          @media (min-width:992px) and (max-width:1400px) {
            .phone-wrapper {
              width: 450px;
              height: 470px;
              margin-top: 20px;
            }
          }
          @media (min-width:576px) and (max-width:992px) {
            .phone-wrapper {
              width: 500px;
              height: 520px;
            }
          }
          @media (max-width:576px) {
            .phone-wrapper {
              width: auto;
            }
          }
          @media (max-width:480px) {
            .phone-wrapper {
              height: auto;
              margin-top: 25px;
            }
          }
        `}</style>
      </Head>
      <body tabIndex={0}>
        <Main />
        <NextScript />
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-T4DLNHHR');
            `,
          }}
        />
      </body>
    </Html>
  );
}
