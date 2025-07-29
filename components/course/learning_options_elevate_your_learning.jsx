import React, { useEffect, useRef, useState } from 'react';

const tabContent = {
    live: 'Experience interactive, instructor-led sessions with real-time discussions and Q&A. Learn directly from industry experts and gain insights into Oracle with hands-on demonstrations.',
    lab: 'Get access to a dedicated hands-on lab environment where you can practice real-world scenarios, complete assignments, and apply your knowledge in a simulated live system.',
    quizzes: 'Test your understanding with module-wise quizzes and assessments. Reinforce your learning and track your progress with instant feedback and detailed explanations.',
    forum: 'Join an exclusive discussion forum to connect with peers and instructors. Share insights, ask questions, and stay updated with the latest industry trends.',
    certificate: 'Earn a globally recognized certification upon successful course completion. Validate your expertise and enhance your career opportunities across industries.',
    jobs: 'Explore the latest job openings tailored to your course domain. Gain access to career opportunities, connect with recruiters, and receive placement support to boost your professional growth.',
    rate: 'Provide feedback on your learning experience. Help us improve and guide future learners by sharing your insights on course content, instructor expertise, and overall training quality.',
};

const tabIcons = {
    live: '/images/courses/LMS-Live-Icon.svg',
    lab: '/images/courses/LMS-Lab-Icon.svg',
    quizzes: '/images/courses/LMS-Quiz-Icon.svg',
    forum: '/images/courses/LMS-Forum-Icon.svg',
    certificate: '/images/courses/LMS-Certificate-Icon.svg',
    jobs: '/images/courses/LMS-Current-Jobs.svg',
    rate: '/images/courses/LMS-Rate-Your-Course.svg',
};

const ElevateYourLearning = React.memo(() => {
    const [activeTab, setActiveTab] = useState('live');
    const underlineRef = useRef(null);
    const tabsRef = useRef([]);

    useEffect(() => {
        const updateUnderline = () => {
          const currentTab = tabsRef.current.find(tab => tab?.dataset.tab === activeTab);
          const underline = underlineRef.current;
          if (currentTab && underline) {
            const rect = currentTab.getBoundingClientRect();
            const parentRect = currentTab.parentElement.getBoundingClientRect();
            underline.style.width = `${rect.width}px`;
            underline.style.left = `${rect.left - parentRect.left}px`;
          }
        };
      
        updateUnderline();
        window.addEventListener('resize', updateUnderline);
        return () => window.removeEventListener('resize', updateUnderline);
      }, [activeTab]);

      useEffect(() => {
        const keys = Object.keys(tabContent);
        const interval = setInterval(() => {
          setActiveTab(prev => {
            const currentIndex = keys.indexOf(prev);
            const nextIndex = (currentIndex + 1) % keys.length;
            return keys[nextIndex];
          });
        }, 5000); // 5 seconds
      
        return () => clearInterval(interval);
      }, []);
      

    return (
        <div>
            <ul className="Main-Course-Lms-Portal-tabs">
                {Object.keys(tabContent).map((key, idx) => (
                    <li
                        key={key}
                        data-tab={key}
                        ref={el => tabsRef.current[idx] = el}
                        className={activeTab === key ? 'active' : ''}
                        onClick={() => setActiveTab(key)}
                    >
                        {key
                            .replace(/^\w/, c => c.toUpperCase()) // Capitalize first letter
                            .replace('-', ' ')
                            .replace('rate', 'Rate Your Course')
                            .replace('live', 'Live Class')
                            .replace('lab', 'Lab')
                            .replace('quizzes', 'Quizzes')
                            .replace('forum', 'Forum')
                            .replace('certificate', 'Certificate')
                            .replace('jobs', 'Current Jobs')}
                    </li>
                ))}
                <li ref={underlineRef} className="Main-Course-Lms-Portal-underline" />
            </ul>

            <div className="Main-Course-Lms-Portal-tab-contents">
                {Object.entries(tabContent).map(([key, content]) => (
                    <div
                        key={key}
                        id={key}
                        className={`Main-Course-Lms-Portal-tab-content Main-Course-Lms-Portal-card ${activeTab === key ? 'active' : ''
                            }`}
                    >
                        <div className="d-flex gap-2">
                            <img
                                src={tabIcons[key]}
                                height="22"
                                width="22"
                                alt={`LMS-${key}-icon`}
                                loading='lazy'
                            />
                            <h2 className="Main-Course-LMS-Portal-Sub-heading">
                                {key === 'rate'
                                    ? 'Rate Your Course'
                                    : key === 'jobs'
                                        ? 'Current Jobs'
                                        : key.charAt(0).toUpperCase() + key.slice(1)}
                            </h2>
                        </div>
                        <p className="Main-Course-LMS-Portal-Para">{content}</p>
                    </div>
                ))}
            </div>
        </div>
    )
});

export default ElevateYourLearning;