import React from 'react'
import Head from "next/head";
const Seo = ({details}) => {
    //console.log("Meta Details : ", details)
    return (<Head>
        <title>{details?.metaTitle}</title>
        <meta name="description" content={details?.metaDescription} />
        <meta name="keywords" content={details?.metaKeywords} />

        {/* Open Graph (OG) Meta Tags for Social Media */}
        <meta property="og:title" content={details?.metaTitle} />
        <meta property="og:description" content={details?.metaTitle} />
        <meta property="og:image" content={details?.home ? details?.ogImage?.path: process.env.NEXT_PUBLIC_FILES_URL + details?.ogImage?.path} />
    </Head>)
}

export default Seo;