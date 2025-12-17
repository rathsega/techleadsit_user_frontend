import React from 'react'
import Head from "next/head";
const Seo = ({details}) => {
    const getOgUrl = typeof window !== 'undefined' ? window.location.href : '';
    const getOgType = typeof window !== 'undefined' && window.location.href === process.env.NEXT_PUBLIC_APPLICATION_URL ? 'website' : 'article';
    //console.log("Meta Details : ", details)
    return (<Head>
        <title>{details?.metaTitle}</title>
        <meta name="description" content={details?.metaDescription} />
        <meta name="keywords" content={details?.metaKeywords} />

        {/* Open Graph (OG) Meta Tags for Social Media */}
        <meta property="og:title" content={details?.metaTitle} />
        <meta property="og:description" content={details?.metaTitle} />
        <meta property="og:image" content={details?.home ? details?.ogImage?.path: process.env.NEXT_PUBLIC_FILES_URL + details?.ogImage?.path} />
        <meta property="og:url" content={getOgUrl} />
        <meta property="og:type" content={getOgType} />
        <meta name='robot' content={details?.robots || 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1'} />
    </Head>)
}

export default Seo;
