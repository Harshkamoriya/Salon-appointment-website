import React from "react";

const SearchBox = ({ searchTerm, setSearchTerm }) => {
  const handleChange = (e) => {
    setSearchTerm(e.target.value); // Update the search term in the parent component
  };

  return (
    <input
      type="text"
      placeholder="Search appointments..."
      value={searchTerm}
      onChange={handleChange}
      style={{
        padding: "8px",
        borderRadius: "4px",
        border: "1px solid #ccc",
        width: "100%",
      }}
    />
  );
};

export default SearchBox;
