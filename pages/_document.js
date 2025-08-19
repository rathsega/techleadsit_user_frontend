import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-N8ML9N5');
            `,
          }}
        /> */}

        <link rel="dns-prefetch" href="//cdnjs.cloudflare.com" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />

        <script src="https://www.gstatic.com/recaptcha/releases/07cvpCr3Xe3g2ttJNUkC6W0J/recaptcha__en.js" defer></script>

        <link rel="preload" href="/fonts/mont-latin.woff2" as="font" type="font/woff2" crossorigin />

        {/* <link rel="stylesheet" href="/styles/bootstrap.min.css" media="print" onLoad="this.media='all'" /> */}
        <link rel="stylesheet" href="/styles/all.min.css" media="print" onLoad="this.media='all'" />
        <link rel="stylesheet" href="/styles/bootstrap-icons.min.css" media="print" onLoad="this.media='all'" />
        <link rel="preload" as="image" href="/images/courses/Main-Course-Banner-Hero-R-Img.webp" />
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
      </body>
    </Html>
  );
}