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
          <img className="TLI-logo-Spinner" src="/images/Tech_Leads_IT_Logo.svg" alt="Logo" />
        </div>
      </section>
      <style jsx>{`
        .TLI-logo-Spinner{
  width: 50px;
  height: 50px;
  animation: logospinPause 2s ease-in-out infinite;
}
 
@keyframes logospinPause {
  0%   { transform: rotate(0deg); }
  50%  { transform: rotate(360deg); }
  100% { transform: rotate(360deg); }
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
