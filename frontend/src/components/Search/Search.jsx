import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Search() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const onSearch = (e) => {
    setSearch(e.target.value);
  }

  // Handle Enter key press for search bar
  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      navigateToSearch();
    }
  };

  // Handle search button click for search bar
  const handleSearchClick = () => {
    navigateToSearch();
  };

  // Navigate to "/search" with the search state
  const navigateToSearch = () => {
    if (search.trim()) { // Check if the search term is not empty
      navigate('/search', { state: { query: search } }); // Pass the search value as state
    }
  };


  return (

    <TextField
      fullWidth={true}
      className="search-bar"
      placeholder="Search"
      variant="outlined"
      value={search}
      onChange={onSearch}
      onKeyPress={handleKeyPress}
      size="small"
      slotProps={{
        input:
        {
          endAdornment:
            <InputAdornment position="end"><p class="search-icon"><SearchIcon onClick={handleSearchClick} style={{ cursor: 'pointer' }} /></p></InputAdornment>
        }
      }}
    >

    </TextField>

  )
}
