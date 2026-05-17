import { Popover } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/material/styles";
import React from "react";
import { useNavigate } from "react-router-dom";
import '../../../styles/HomePage/SubCategoryPopover.css';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
}));

const SubcategoryPopover = ({ anchorEl, open, onClose, categories, setAnchorEl }) => {
  const navigate = useNavigate();
  // Function to handle subcategory navigation
  const handleSubCategoryClick = (category) => {
    navigate(`/category/${category}`);
    setAnchorEl(null);
  };


  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={onClose}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "center",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "center",
      }}
    >
      <Grid size={1} sx={{ p: 1 }}>
        <Stack direction="row" spacing={1}>
          {categories.map((category, index) => (
            <Item onClick={() => handleSubCategoryClick(category.subcategoryName)} key={index} sx={{ width: 150, height: 220 }} className="subcategory">
              <img
                src={category.ImageURL}
                alt={category.subcategoryName}
                style={{ width: "100%", transition: '0.5s ease', cursor: 'pointer' }}
              />
              <p className="subcategory-label">
                <b>{category.subcategoryName}</b>
              </p>
            </Item>
          ))}
        </Stack>
      </Grid>
    </Popover>
  );
};

export default SubcategoryPopover;
