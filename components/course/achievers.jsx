const achieverSlugs = [
  "oracle-fusion-scm-online-training-course",
  "oracle/oracle-fusion/oracle-fusion-scm-training/oracle-fusion-scm-online-training",
  "oracle/oracle-fusion-certification/oracle-scm-certification/oracle-fusion-scm-certification-training",
  "oracle/oracle-self-paced-training/oracle-fusion-scm-video-course/oracle-fusion-scm-self-paced-training"
];
import Image from "next/image";

const Achievers = ({ slug }) => {
  const isSCMSlug = achieverSlugs.includes(slug);

  const images = isSCMSlug
    ? Array.from({ length: 10 }, (_, i) => `/images/courses/achievers/ss ${i + 1}.webp`)
    : [
        "/images/courses/Success-Stories-Placed-Learner-1.webp",
        "/images/courses/Success-Stories-Placed-Learner-2.webp",
        "/images/courses/Success-Stories-Placed-Learner-3.webp",
        "/images/courses/Success-Stories-Placed-Learner-4.webp",
        "/images/courses/Success-Stories-Placed-Learner-5.webp",
        "/images/courses/Success-Stories-Placed-Learner-6.webp",
        "/images/courses/Success-Stories-Placed-Learner-7.webp",
        "/images/courses/Success-Stories-Placed-Learner-8.webp",
        "/images/courses/Success-Stories-Placed-Learner-9.webp",
        "/images/courses/Success-Stories-Placed-Learner-10.webp",
        "/images/courses/Success-Stories-Placed-Learner-11.webp",
        "/images/courses/Success-Stories-Placed-Learner-12.webp",
        "/images/courses/Success-Stories-Placed-Learner-13.webp",
        "/images/courses/Success-Stories-Placed-Learner-14.webp"
      ];

  return (
    <section className="Main-Course-Success-Stories-Of-Our-Proud-Achievers-Section mt-1">
      <h2 className="Main-Course-Success-Stories-Of-Our-Proud-Achievers-Heading text-center mb-2">
        Success Stories of Our Proud Achievers
      </h2>
      <div className="Success-Stories-Of-Our-Proud-Achievers-track">
        <div className="Success-Stories-Of-Our-Proud-Achievers-Companies-slide" id="successStoryCompaniesSection">
          <div className="Success-Stories-Of-Our-Proud-Achievers-Companies-slide-images" id="successStoryCompanies">
            {images.map((src, idx) => (
              <Image
                key={src}
                loading="lazy"
                priority={false}
                width={242}
                height={342}
                src={src}
                alt="Success-Stories-Img"
                className="Success-Stories-Of-Our-Proud-Achievers-Companies-slide-img"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievers;