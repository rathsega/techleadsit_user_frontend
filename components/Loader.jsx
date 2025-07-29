import { useLoader } from '../contexts/LoaderContext'; // Correct path to context

const Loader = () => {
  const { loading, setLoading } = useLoader(); // Destructure both loading and setLoading

  // Example of how you might use setLoading
  const toggleLoading = () => {
    setLoading((prevState) => !prevState); // Toggling loading state as an example
  };

  // Only render the loader if 'loading' is true
  if (!loading) return null;

  return (
    <div>
      <section className="Main-Course-Successful-loader-overlay">
        <div className="Main-Course-Successful-load-spinner-position">
          <div className="Main-Course-Successful-load-spinner">
            <div className="Main-Course-Successful-load-spinner__dot"></div>
            <div className="Main-Course-Successful-load-spinner__dot"></div>
            <div className="Main-Course-Successful-load-spinner__dot"></div>
            <div className="Main-Course-Successful-load-spinner__dot"></div>
            <div className="Main-Course-Successful-load-spinner__dot"></div>
            <div className="Main-Course-Successful-load-spinner__dot"></div>
            <div className="Main-Course-Successful-load-spinner__dot"></div>
            <div className="Main-Course-Successful-load-spinner__dot"></div>
          </div>
        </div>
      </section>
      <style jsx>{`
        .Main-Course-Successful-load-spinner {
          --uib-size: 2.8rem;
          --uib-speed: .9s;
          --uib-color: #f4f5f7;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          height: var(--uib-size);
          width: var(--uib-size);
        }

        .Main-Course-Successful-load-spinner__dot {
          position: absolute;
          top: 0;
          left: 0;
          display: flex;
          align-items: center;
          justify-content: flex-start;
          height: 100%;
          width: 100%;
        }

        .Main-Course-Successful-load-spinner__dot::before {
          content: '';
          height: 20%;
          width: 20%;
          border-radius: 50%;
          background-color: var(--uib-color);
          transform: scale(0);
          opacity: 0.5;
          animation: Main-Course-Successful-pulse0112 calc(var(--uib-speed) * 1.111) ease-in-out infinite;
          box-shadow: 0 0 20px rgba(18, 31, 53, 0.3);
        }

        .Main-Course-Successful-load-spinner__dot:nth-child(2) {
          transform: rotate(45deg);
        }

        .Main-Course-Successful-load-spinner__dot:nth-child(2)::before {
          animation-delay: calc(var(--uib-speed) * -0.875);
        }

        .Main-Course-Successful-load-spinner__dot:nth-child(3) {
          transform: rotate(90deg);
        }

        .Main-Course-Successful-load-spinner__dot:nth-child(3)::before {
          animation-delay: calc(var(--uib-speed) * -0.75);
        }

        .Main-Course-Successful-load-spinner__dot:nth-child(4) {
          transform: rotate(135deg);
        }

        .Main-Course-Successful-load-spinner__dot:nth-child(4)::before {
          animation-delay: calc(var(--uib-speed) * -0.625);
        }

        .Main-Course-Successful-load-spinner__dot:nth-child(5) {
          transform: rotate(180deg);
        }

        .Main-Course-Successful-load-spinner__dot:nth-child(5)::before {
          animation-delay: calc(var(--uib-speed) * -0.5);
        }

        .Main-Course-Successful-load-spinner__dot:nth-child(6) {
          transform: rotate(225deg);
        }

        .Main-Course-Successful-load-spinner__dot:nth-child(6)::before {
          animation-delay: calc(var(--uib-speed) * -0.375);
        }

        .Main-Course-Successful-load-spinner__dot:nth-child(7) {
          transform: rotate(270deg);
        }

        .Main-Course-Successful-load-spinner__dot:nth-child(7)::before {
          animation-delay: calc(var(--uib-speed) * -0.25);
        }

        .Main-Course-Successful-load-spinner__dot:nth-child(8) {
          transform: rotate(315deg);
        }

        .Main-Course-Successful-load-spinner__dot:nth-child(8)::before {
          animation-delay: calc(var(--uib-speed) * -0.125);
        }

        @keyframes Main-Course-Successful-pulse0112 {
          0%, 100% {
            transform: scale(0);
            opacity: 0.5;
          }
          50% {
            transform: scale(1);
            opacity: 1;
          }
        }

        .Main-Course-Successful-load-spinner-position {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
        }

        .Main-Course-Successful-loader-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100vh;
          background: rgba(255, 255, 255, 0.2); 
          backdrop-filter: blur(10px);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }
      `}</style>
    </div>
  );
};

export default Loader;
