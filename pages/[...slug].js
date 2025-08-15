import { useRouter } from "next/router";
import CoursePage from "./course"; // Import the courses page component
import { readFile } from 'fs/promises';
import path from 'path';
import { useEffect, useState } from "react";
import Home from "./home/Home";
import httpService from "../services/httpService";

// Predefined list of slugs that should load /courses content
const courseSlugs = [
    "oracle-fusion-scm-online-training-course",
    "oracle-fusion-hcm-online-training-course",
    "oracle/oracle-fusion/oracle-fusion-financials-training/oracle-fusion-financials-course",
    "oracle-fusion-technical-training-course",
    "oracle/oracle-fusion/oracle-warehouse-management-training/oracle-wms-training",
    "ERP/SAP/sap-cpi-training/sap-cpi-course",
    "ERP/SAP/sap-sd-online-training/sap-sd-course-online",
    "data-science-online-training-course",
    "ERP/workday-hcm/workday-hcm-online-training/workday-hcm-techno-functional-training",
    "oracle-fusion-procurement-online-training-course",
    "oracle-fusion-technical-training",
    "oracle/oracle-fusion/orc-training/oracle-recruiting-cloud-training",
    "oracle/oracle-fusion/otm-training/oracle-transportation-management-training",
    "oracle/oracle-fusion/oracle-gtm-online-training/oracle-global-trade-management-training",
    "oracle/oracle-fusion/oracle-integration-cloud-training/oracle-fusion-technical-oic-online-training",
    "oracle-fusion-manufacturing-online-training-course",
    "oracle-fusion-ppm-online-training",
    "oracle-fusion-adf-certification-training-course",
    "oracle-r12-scm-online-training-course",
    "oracle-ebs-r12-financials-training",
    "oracle-r12-project-accounting-online-training",
    "oracle-r12-technical-training-course",
    "oracle-oaf-online-training-course",
    "oracle/oracle-fusion/oracle-fusion-scm-training/oracle-fusion-scm-online-training",
    "oracle/oracle-fusion-certification/oracle-scm-certification/oracle-fusion-scm-certification-training",
    "oracle/oracle-self-paced-training/oracle-fusion-scm-video-course/oracle-fusion-scm-self-paced-training",
    "oracle/oracle-fusion/oracle-fusion-hcm-online-training/oracle-fusion-hcm-training",
    "oracle/oracle-fusion-certification/oracle-hcm-certification/oracle-fusion-hcm-certification-training",
    "oracle/oracle-self-paced-training/oracle-fusion-hcm-video-course/oracle-fusion-hcm-self-paced-training",
    "oracle-fusion-financials-online-training-course",
    "oracle/oracle-fusion-certification/oracle-financials-certification/oracle-fusion-financials-certification-training",
    "oracle/oracle-self-paced-training/oracle-fusion-financials-video-course/oracle-fusion-financials-self-paced-training",
    "oracle/oracle-fusion-certification/oracle-fusion-technical-training/oic-certification-training",
    "oracle/oracle-self-paced-training/oracle-fusion-technical-video-course/oracle-fusion-technical-self-paced-training",
    "oracle/oracle-self-paced-training/oracle-warehouse-management-training/oracle-wms-self-paced-training",
    "ERP/salesforce-training/salesforce-crm-training/salesforce-online-training",
    "ERP/SAP/sap-mm-online-training/sap-mm-course-online",
    "ERP/SAP/sap-abap-course-online/sap-abap-training-online",
    "oracle-fusion-planning-central-online-training",
    "oracle-fusion-cloud-crm-online-training-course"
];

export default function DynamicPage(props) {
    const router = useRouter();
    const { slug } = router.query;
    const [courseTax, setCourseTax] = useState({});

    useEffect(() => {
        // Only fetch if needed
        const getTaxDetails = async () => {
            try {
                const response = await httpService.get('course/getCourseSellingTax');
                if (response?.data && JSON.stringify(response.data) !== JSON.stringify(courseTax)) {
                    setCourseTax(response.data);
                }
            } catch (error) { }
        };
        getTaxDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [slug]);

    if (slug) {
        if (props.isCourse) {
            return (
                <CoursePage
                    key={Array.isArray(slug) ? slug.join("/") : slug}
                    slug={slug?.join(" / ")}
                    filePath={props.filePath}
                    courseData={props.courseData}
                    nativeCourse={props.nativeCourse}
                    changedData={props.changedData}
                    courseId={props.courseId}
                    courseTax={courseTax}
                    demos={props.demos}
                    upcomingDemoDate={props.upcomingDemoDate}
                    relatedBlogs={props.relatedBlogs}
                    relatedCourses={props.relatedCourses}
                />
            );
        } else {
            return <Home />;
        }
    } else {
        // If slug is not defined, render the Home component
        return <Home />;
    }
}

// Server-side logic to determine if the slug should serve /courses
/*export async function getServerSideProps({ params }) {
    const { slug } = params;
    const slugPath = Array.isArray(slug) ? slug.join("/") : slug;

    if (courseSlugs.includes(slugPath)) {
        const course_data_filename = slug.join("_");
        const filePath = path.join(process.cwd(), 'data', course_data_filename + '.json');
        const changesFilePath = path.join(process.cwd(), 'data/changes.json');

        let data = {};
        let nativeCourse = {};
        let changedData = {};
        let changedParsedData = [];
        let courseId = "";

        try {
            const jsonData = fs.readFileSync(filePath, 'utf-8');
            const changedJsonData = fs.readFileSync(changesFilePath, 'utf-8');
            data = JSON.parse(jsonData);
            changedParsedData = JSON.parse(changedJsonData)

            changedData = changedParsedData.find(cpd => cpd.courseId == data?.id) || {}

            const response = await httpService.get(`courses/getCourseDetailsByCourseId?courseId=${data?.id}`);

            if (response?.status === 404) {
                return { notFound: true };
            }

            if (response?.data) {
                nativeCourse = response.data;
            }
        } catch (error) {
            console.error("Error in getServerSideProps:", error);
            return { notFound: true };
        }

        try {
            const response = await httpService.post('course/getCourseIdBySlug', { slug: slug?.join(" / ") })
            if (response?.data) {
                courseId = response?.data?.id;
            }
        } catch (error) {
            console.error("Error in getServerSideProps:", error);
            return { notFound: true };
        }



        return {
            props: {
                isCourse: true,
                courseData: data,
                filePath,
                nativeCourse,
                changedData,
                courseId: courseId
            },
        };
    }

    return { props: { isCourse: false } };
}*/

function getNearestUpcomingDate(data) {
    if (!Array.isArray(data)) return null; // <-- Fix: guard clause

    const now = new Date();

    const nearest = data
        .map(item => new Date(item.date))
        .filter(date => date > now)
        .sort((a, b) => a - b)[0];

    if (!nearest) return null;

    return nearest.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    });
}

export async function getStaticProps({ params }) {
    const { slug } = params;
    const slugPath = Array.isArray(slug) ? slug.join('/') : slug;

    if (!courseSlugs.includes(slugPath)) {
        return { props: { isCourse: false } };
    }

    const course_data_filename = slug.join('_');
    const filePath = path.join(process.cwd(), 'data', `${course_data_filename}.json`);
    const changesFilePath = path.join(process.cwd(), 'data', 'changes.json');
    console.log(course_data_filename, filePath)
    let data = {};
    let changedData = {};
    let changedParsedData = [];
    try {
        // ✅ Parallelize file reads
        const [jsonData, changedJsonData] = await Promise.all([
            readFile(filePath, 'utf-8'),
            readFile(changesFilePath, 'utf-8')
        ]);
        data = JSON.parse(jsonData);
        changedParsedData = JSON.parse(changedJsonData);
        changedData = changedParsedData.find(cpd => cpd.courseId == data?.id) || {};

        // ✅ Parallelize API calls
        const [courseDetailRes, slugIdRes, upcomingDemosRes, blogsAndCoursesRes] = await Promise.all([
            httpService.get(`courses/getCourseDetailsByCourseId?courseId=${data?.id}`),
            httpService.post('course/getCourseIdBySlug', { slug: slug?.join(' / ') }),
            httpService.post("courses/getUpcomingDemos", { courseId: data?.id }),
            httpService.get(`courses/getBlogsAndCoursesByCategory?categoryName=${encodeURIComponent(data?.category)}`)
        ]);


        if (courseDetailRes?.status === 404) {
            return { notFound: true };
        }

        let demos, upcomingDemoDate;
        if (upcomingDemosRes && upcomingDemosRes.data) {
            demos = upcomingDemosRes.data.upcomingDemos || [];
            upcomingDemoDate = getNearestUpcomingDate(upcomingDemosRes.data);
        }

        let relatedBlogs, relatedCourses;
        if (blogsAndCoursesRes && blogsAndCoursesRes.data) {
            relatedBlogs = blogsAndCoursesRes.data.blogs || [];
            relatedCourses = blogsAndCoursesRes.data.courses || [];
        }

        const nativeCourse = courseDetailRes?.data || {};
        const courseId = slugIdRes?.data?.id || '';
        return {
            props: {
                isCourse: true,
                courseData: data,
                filePath,
                nativeCourse,
                changedData,
                courseId,
                demos,
                upcomingDemoDate,
                relatedBlogs,
                relatedCourses
            },
            revalidate: 43200,
        };
    } catch (error) {
        console.error('Error in getStaticProps:', error);
        return { notFound: true };
    }
}

export async function getStaticPaths() {
    const courseSlugs = [
        "oracle-fusion-scm-online-training-course",
        "oracle-fusion-hcm-online-training-course",
        "oracle/oracle-fusion/oracle-fusion-financials-training/oracle-fusion-financials-course",
        "oracle-fusion-technical-training-course",
        "oracle/oracle-fusion/oracle-warehouse-management-training/oracle-wms-training",
        "ERP/SAP/sap-cpi-training/sap-cpi-course",
        "ERP/SAP/sap-sd-online-training/sap-sd-course-online",
        "data-science-online-training-course",
        "ERP/workday-hcm/workday-hcm-online-training/workday-hcm-techno-functional-training",
        "oracle-fusion-procurement-online-training-course",
        "oracle-fusion-technical-training",
        "oracle/oracle-fusion/orc-training/oracle-recruiting-cloud-training",
        "oracle/oracle-fusion/otm-training/oracle-transportation-management-training",
        "oracle/oracle-fusion/oracle-gtm-online-training/oracle-global-trade-management-training",
        "oracle/oracle-fusion/oracle-integration-cloud-training/oracle-fusion-technical-oic-online-training",
        "oracle-fusion-manufacturing-online-training-course",
        "oracle-fusion-ppm-online-training",
        "oracle-fusion-adf-certification-training-course",
        "oracle-r12-scm-online-training-course",
        "oracle-ebs-r12-financials-training",
        "oracle-r12-project-accounting-online-training",
        "oracle-r12-technical-training-course",
        "oracle-oaf-online-training-course",
        "oracle/oracle-fusion/oracle-fusion-scm-training/oracle-fusion-scm-online-training",
        "oracle/oracle-fusion-certification/oracle-scm-certification/oracle-fusion-scm-certification-training",
        "oracle/oracle-self-paced-training/oracle-fusion-scm-video-course/oracle-fusion-scm-self-paced-training",
        "oracle/oracle-fusion/oracle-fusion-hcm-online-training/oracle-fusion-hcm-training",
        "oracle/oracle-fusion-certification/oracle-hcm-certification/oracle-fusion-hcm-certification-training",
        "oracle/oracle-self-paced-training/oracle-fusion-hcm-video-course/oracle-fusion-hcm-self-paced-training",
        "oracle-fusion-financials-online-training-course",
        "oracle/oracle-fusion-certification/oracle-financials-certification/oracle-fusion-financials-certification-training",
        "oracle/oracle-self-paced-training/oracle-fusion-financials-video-course/oracle-fusion-financials-self-paced-training",
        "oracle/oracle-fusion-certification/oracle-fusion-technical-training/oic-certification-training",
        "oracle/oracle-self-paced-training/oracle-fusion-technical-video-course/oracle-fusion-technical-self-paced-training",
        "oracle/oracle-self-paced-training/oracle-warehouse-management-training/oracle-wms-self-paced-training",
        "ERP/salesforce-training/salesforce-crm-training/salesforce-online-training",
        "ERP/SAP/sap-mm-online-training/sap-mm-course-online",
        "ERP/SAP/sap-abap-course-online/sap-abap-training-online",
        "oracle-fusion-planning-central-online-training",
        "oracle-fusion-cloud-crm-online-training-course"
    ];

    const paths = courseSlugs.map((slug) => {
        return {
            params: {
                slug: slug.split("/") // split into array for [...slug]
            }
        };
    });

    return {
        paths,
        fallback: 'blocking' // allows on-demand generation if not prebuilt
    };
}
