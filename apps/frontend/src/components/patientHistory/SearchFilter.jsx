import "./SearchFilter.css";

import { FaSearch } from "react-icons/fa";

const SearchFilter = ({
  searchTerm,
  setSearchTerm,
}) => {
  return (

    <div className="search-filter">

      <div className="search-box">

        <FaSearch className="search-icon" />

        <input
          type="text"
          placeholder="Search by User ID or Patient Name..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
        />

      </div>

      <div className="filter-buttons">

        <button className="active">
          All
        </button>

        <button>High</button>

        <button>Medium</button>

        <button>Low</button>

      </div>

    </div>

  );
};

export default SearchFilter;