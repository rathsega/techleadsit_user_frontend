import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* GTM Script */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-N8ML9N5');
            `,
          }}
        />

        {/* DNS prefetch and preconnect for faster loading */}
        <link rel="dns-prefetch" href="//cdnjs.cloudflare.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />

        {/* Inline Critical CSS - This eliminates render blocking */}
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Critical CSS - Above the fold styling */
            * {
              box-sizing: border-box;
              margin: 0;
              padding: 0;
            }
            
            body {
              font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif;
              line-height: 1.6;
              -webkit-font-smoothing: antialiased;
              -moz-osx-font-smoothing: grayscale;
            }
            
            /* Critical Bootstrap classes - Only what's needed for above the fold */
            .container, .container-fluid { 
              width: 100%; 
              padding-right: 15px; 
              padding-left: 15px; 
              margin-right: auto; 
              margin-left: auto; 
            }
            
            .row { 
              display: flex; 
              flex-wrap: wrap; 
              margin-right: -15px; 
              margin-left: -15px; 
            }
            
            .col, [class*="col-"] { 
              position: relative; 
              width: 100%; 
              padding-right: 15px; 
              padding-left: 15px; 
            }
            
            .d-flex { display: flex !important; }
            .d-none { display: none !important; }
            .justify-content-center { justify-content: center !important; }
            .align-items-center { align-items: center !important; }
            .text-center { text-align: center !important; }
            
            .btn { 
              display: inline-block; 
              font-weight: 400; 
              text-align: center; 
              white-space: nowrap; 
              vertical-align: middle; 
              user-select: none; 
              border: 1px solid transparent; 
              padding: 0.375rem 0.75rem; 
              font-size: 1rem; 
              line-height: 1.5; 
              border-radius: 0.25rem; 
              cursor: pointer; 
              text-decoration: none;
              transition: color 0.15s ease-in-out, background-color 0.15s ease-in-out;
            }
            
            .btn-primary { 
              color: #fff; 
              background-color: #007bff; 
              border-color: #007bff; 
            }
            
            .btn-primary:hover { 
              background-color: #0056b3; 
              border-color: #004085; 
            }
            
            /* Loading state */
            .loading { 
              display: flex; 
              justify-content: center; 
              align-items: center; 
              min-height: 100vh; 
              font-size: 16px; 
            }

            /* Hero section critical styles */
            .hero-section {
              min-height: 60vh;
              display: flex;
              align-items: center;
              padding: 2rem 0;
            }

            /* Navigation critical styles */
            .navbar {
              padding: 0.5rem 1rem;
              position: relative;
              display: flex;
              flex-wrap: wrap;
              align-items: center;
              justify-content: space-between;
            }

            /* Font fallback with proper font-display */
            @font-face {
              font-family: 'Poppins Fallback';
              src: local('Arial'), local('Helvetica'), local('sans-serif');
              font-display: swap;
              ascent-override: 105%;
              descent-override: 35%;
              line-gap-override: 10%;
            }
            
            /* Use fallback font initially */
            body, .hero-title, .main-heading {
              font-family: 'Poppins Fallback', system-ui, sans-serif;
            }
          `
        }} />

        {/* Non-blocking CSS loader script */}
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

                function loadCSSAsync(href, integrity, crossorigin) {
                  var link = document.createElement('link');
                  link.rel = 'stylesheet';
                  link.href = href;
                  if (integrity) link.integrity = integrity;
                  if (crossorigin) link.crossOrigin = crossorigin;
                  link.media = 'print';
                  link.onload = function() { 
                    this.media = 'all';
                    this.onload = null;
                  };
                  document.head.appendChild(link);
                }

                // Load critical CSS immediately but non-blocking
                loadCSSAsync(
                  'https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.3/css/bootstrap.min.css',
                  'sha512-jnSuA4Ss2PkkikSOLtYs8BlYIeeIK1h99ty4YfvRPAlzr377vr3CXDb7sb7eEEBYjDtcYj+AjBH3FLv5uSJuXg==',
                  'anonymous'
                );

                // Load fonts with font-display swap
                loadCSS('https://fonts.googleapis.com/css2?family=Montserrat:wght@100..900&family=Poppins:wght@100..900&display=swap');

                // Load non-critical CSS after initial paint
                setTimeout(function() {
                  // Font Awesome (icons) - Load after initial render
                  loadCSS('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css');
                  
                  // Bootstrap Icons - Load after initial render
                  loadCSS('https://cdnjs.cloudflare.com/ajax/libs/bootstrap-icons/1.10.5/font/bootstrap-icons.min.css');
                }, 100);

                // Update font family once custom fonts load
                if ('fonts' in document) {
                  Promise.all([
                    document.fonts.load('400 1em Poppins'),
                    document.fonts.load('600 1em Poppins'),
                    document.fonts.load('400 1em Montserrat')
                  ]).then(function() {
                    document.body.style.fontFamily = 'Poppins, system-ui, sans-serif';
                    
                    // Update specific elements that need custom fonts
                    var heroTitles = document.querySelectorAll('.hero-title, .main-heading, h1, h2, h3');
                    heroTitles.forEach(function(el) {
                      el.style.fontFamily = 'Poppins, system-ui, sans-serif';
                    });
                  }).catch(function() {
                    console.log('Custom fonts failed to load, using fallback');
                  });
                }
              })();
            `,
          }}
        />

        {/* Preload critical font files to eliminate FOIT */}
        <link
          rel="preload"
          href="https://fonts.gstatic.com/s/poppins/v20/pxiEyp8kv8JHgFVrJJfecnFHGPc.woff2"
          as="font"
          type="font/woff2"
          crossOrigin=""
        />
        <link
          rel="preload"
          href="https://fonts.gstatic.com/s/poppins/v20/pxiByp8kv8JHgFVrLEj6Z1xlFd2JQEk.woff2"
          as="font"
          type="font/woff2"
          crossOrigin=""
        />

        {/* Service Worker for caching */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(reg) {
                      console.log('SW registered');
                    })
                    .catch(function(err) {
                      console.log('SW registration failed');
                    });
                });
              }
            `,
          }}
        />

        {/* Fallback for no-JS users - Only essential CSS */}
        <noscript>
          <link
            rel="stylesheet"
            href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.3/css/bootstrap.min.css"
            integrity="sha512-jnSuA4Ss2PkkikSOLtYs8BlYIeeIK1h99ty4YfvRPAlzr377vr3CXDb7sb7eEEBYjDtcYj+AjBH3FLv5uSJuXg=="
            crossOrigin="anonymous"
            referrerPolicy="no-referrer"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap"
          />
        </noscript>
      </Head>
      
      <body>
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-N8ML9N5"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}