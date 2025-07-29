import CareersGrid from "./CareersGrid";
import CareerFilters from "./CareerFilters";
import SearchBar from "./SearchBar";
import { useState } from "react";

const ManiContent = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [filters, setFilters] = useState({ location: "", skill: "", experience: "", jobTypes: [] }); // e.g., {location: '', experience: '', workMode: ''}

    const [openFilter, setOpenFliter] = useState(false);

    const handleSidebar = () => {
        setOpenFliter(prev => !prev)
    }
    return (
        <section className="Main-Course-CP-FYNJ-Section">
            <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleSidebar={handleSidebar} />
            <div className="Main-Course-CP-FYNJ-Main-Content-Part-Section">
                <CareerFilters filters={filters} setFilters={setFilters} openFilter={openFilter} handleSidebar={handleSidebar} />
                <CareersGrid searchTerm={searchTerm} filters={filters} />
            </div>
        </section>
    )
}

export default ManiContent;