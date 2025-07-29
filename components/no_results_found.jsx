const NoResultsFound = ({ mt = 4 }) => {   
  return (
    <section className={`mt-${mt} mb-4`}>
            <img src="/images/no-results-found.svg" alt="No Results Found" className="img-fluid" width="1500" height="500" />
        </section>
  );
}

export default NoResultsFound;