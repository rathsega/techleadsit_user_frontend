import { useEffect, useState } from 'react';
const SearchBar = ({ searchTerm, setSearchTerm, handleSidebar }) => {

    const [localInput, setLocalInput] = useState(searchTerm);

    useEffect(() => {
        const timer = setTimeout(() => {
            setSearchTerm(localInput);
        }, 500); // debounce time in ms
        //console.log(localInput);
        return () => clearTimeout(timer); // cleanup on input change
    }, [localInput, setSearchTerm]);

    return (
        <div>
            <h2 className="Main-Course-CP-FYNJ-Heading">Find your New job today</h2>
            <p className="Main-Course-CP-FYNJ-Para">Thousands of jobs in the computer, engineering and technology
                sectors are waiting for you.</p>
            <div className="Main-Course-CP-FYNJ-What-To-Learn-CTA-S-container">
                <div className="Main-Course-CP-FYNJ-What-To-Learn-container">
                    <i className="fas fa-search ms-3"></i>
                    <input type="email" className="Main-Course-CP-FYNJ-What-To-Learn-btn"
                        placeholder="What position are you looking for ?" value={localInput}
                        onChange={(e) => {setLocalInput(e.target.value)}} />
                </div>
                <button className="Main-Course-CP-FYNJ-What-To-Learn-Search-btn">
                    Search job
                </button>
            </div>
            <div className="Main-Course-CP-FYNJ-Filter-Icon-Section">
                <button className="Main-Course-CP-FYNJ-Filter-Icon" onClick={handleSidebar}>Filters <i className="fa-solid fa-filter"></i></button>
            </div>
        </div>
    )
}

export default SearchBar;