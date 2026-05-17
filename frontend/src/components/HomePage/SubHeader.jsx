import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { Divider, Drawer, IconButton } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getAllSubCategories } from "../../api/endpoints/category";
import "../../styles/HomePage/SubHeader.css";
import useToast from "../utils/Toast";
import SubcategoryPopover from "./SubHeader/SubcategoryPopover";

const SubHeader = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentCategories, setCurrentCategories] = useState([]);
  const [electronicsOpen, setElectronicsOpen] = useState(false);
  const [fashionOpen, setFashionOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [electronicsDropdown, setElectronicsDropdown] = useState(false);
  const [fashionDropdown, setFashionDropdown] = useState(false);
  const [electronicSubcategories, setElectronicSubcategories] = useState([]);
  const [fashionSubcategories, setFashionSubcategories] = useState([]);
  const { showToast, ToastComponent } = useToast();
  let user = JSON.parse(localStorage.getItem("loggedInUser"));

  const open = Boolean(anchorEl);

  const fetchSubCategories = async (categoryId) => {
    setLoading(true);
    try {
      const data = await getAllSubCategories(categoryId);

      const transformedCategories = data.map((item) => ({
        subcategoryName: item.subCategoryName,
        ImageURL: item.thumbnailURL,
      }));
      setCurrentCategories(transformedCategories);
    } catch (err) {
      console.log("inside catch error");
      showToast("Failed to fetch subcategories", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (event, categoryId, category) => {
    setAnchorEl(event.currentTarget);
    if (category === "fashion") {
      fetchSubCategories(categoryId);
      setElectronicsOpen(false);
      setFashionOpen(true);
    } else if (category === "electronics") {
      fetchSubCategories(categoryId);
      setElectronicsOpen(true);
      setFashionOpen(false);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
    setCurrentCategories([]);
    setElectronicsOpen(false);
    setFashionOpen(false);
  };

  const toggleDrawer = (drawerOpen) => (event) => {
    setDrawerOpen(drawerOpen);
    if(!drawerOpen){
      if(electronicsDropdown){
        toggleElectronicsDropdown();
      }
      if(fashionDropdown){
        toggleFashionDropdown();
      }
    }
  }

  const fetchElectronicSubcategories = async () => {
    setLoading(true);
    try {
      const data = await getAllSubCategories(1);

      const transformedCategories = data.map((item) => ({
        subcategoryName: item.subCategoryName,
        ImageURL: item.thumbnailURL,
      }));
      setElectronicSubcategories(transformedCategories);
    } catch (err) {
      console.log("inside catch error");
      showToast("Failed to fetch subcategories", "error");
    } finally {
      setLoading(false);
    }
  };

  const fetchFashionSubcategories = async () => {
    setLoading(true);
    try {
      const data = await getAllSubCategories(2);

      const transformedCategories = data.map((item) => ({
        subcategoryName: item.subCategoryName,
        ImageURL: item.thumbnailURL,
      }));
      setFashionSubcategories(transformedCategories);
    } catch (err) {
      console.log("inside catch error");
      showToast("Failed to fetch subcategories", "error");
    } finally {
      setLoading(false);
    }
  };

  const toggleElectronicsDropdown = () => {
    fetchElectronicSubcategories();
    setElectronicsDropdown(!electronicsDropdown);
  }

  const toggleFashionDropdown = () => {
    fetchFashionSubcategories();
    setFashionDropdown(!fashionDropdown);
  }

  const onSignOut = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("token");
    localStorage.removeItem("cartItems");
    toggleDrawer(false);
  };

  return (
    <>
      <div className="subheader">
        <div className="sub-iconed-item">
          <button className="subheader-icon" onClick={toggleDrawer(true)}>
            <b>
              <MenuOutlinedIcon />
            </b>
          </button>
          <div className="subheader-link" onClick={toggleDrawer(true)}>
            <p className="subheader-item">
              <b> All</b>
            </p>
          </div>
        </div>

        <Drawer open={drawerOpen} onClose={toggleDrawer(false)}>
          <p className="drawer-item">
            {user === null ? (
              <h1>Hello Guest</h1>
              ) : (
              <h1>Hello {user.firstname}</h1>
              )}
          <IconButton>
            <CloseIcon onClick = {toggleDrawer(false)} />
          </IconButton>
          </p>
          <Divider/>

          <h1 className="drawer-header">Trending</h1>
          <div className="subheader-link"> {/* TODO: Change to <Link> when Latest Products page is created*/}
            <p className="drawer-item"><h3>Latest</h3></p>
          </div>
          <div className="subheader-link"> {/* TODO: Change to <Link> when Best Sellers page is created*/}
            <p className="drawer-item"><h3>Best Sellers</h3></p>
          </div>
          <Divider/>

          <h1 className="drawer-header">Shop by Category</h1>
          <div className="subheader-link" onClick={toggleElectronicsDropdown}>
            <p className="drawer-item">
              <h3>Electronics</h3>
              <ArrowDropDownIcon/>
            </p>
          </div>
          {electronicsDropdown &&
            <>
            {electronicSubcategories.map((subcategory) => (
              <Link key={subcategory.subcategoryName} className="subheader-link" to={`/category/${subcategory.subcategoryName}`} onClick={toggleDrawer(false)}>
                <p className="drawer-dropdown-link">{subcategory.subcategoryName}</p>
              </Link>
            ))}
            </>
          }
          <div className="subheader-link" onClick={toggleFashionDropdown}>
            <p className="drawer-item">
              <h3>Fashion</h3>
              <ArrowDropDownIcon/>
            </p>
          </div>
          {fashionDropdown &&
            <>
            {fashionSubcategories.map((subcategory) => (
              <Link key={subcategory.subcategoryName} className="subheader-link" to={`/category/${subcategory.subcategoryName}`} onClick={toggleDrawer(false)}>
                <p className="drawer-dropdown-link">{subcategory.subcategoryName}</p>
              </Link>
            ))}
            </>
          }
          <Divider/>

          <h1 className="drawer-header">Help and Settings</h1>
          <div className="subheader-link"> {/* TODO: Change to <Link> when Help page is created*/}
            <p className="drawer-item"><h3>Help</h3></p>
          </div>

          {user === null ? (
          <Link className="subheader-link" to={'/login'}>
            <p className="drawer-item"><h3>Sign In</h3></p>
          </Link>
          ) : (
            <><Link className="subheader-link" to={'/my-account'} onClick={toggleDrawer(false)}>
              <p className="drawer-item"><h3>Account Details</h3></p>
            </Link>
            <Link className="subheader-link" to={'/login'} onClick={onSignOut}>
                <p className="drawer-item"><h3>Sign Out</h3></p>
            </Link></>
          )}
        </Drawer>

        <div className="divider"></div>

        <div>
          <div
            className="subheader-link"
            onClick={(e) => handleCategoryClick(e, 1, "electronics")} // TODO: 1 as category ID for electronics is hardcoded
          >
            <p
              className={`subheader-item ${electronicsOpen ? "highlight" : ""}`}
            >
              <b>Electronics</b>
              <ArrowDropDownIcon sx={{ margin: -0.5 }} />
            </p>
          </div>
        </div>

        <div>
          <div
            className="subheader-link"
            onClick={(e) => handleCategoryClick(e, 2, "fashion")} // TODO: 2 as category ID for fashion is Hardcoded
          >
            <p className={`subheader-item ${fashionOpen ? "highlight" : ""}`}>
              <b>Fashion</b>
              <ArrowDropDownIcon sx={{ margin: -0.5 }} />
            </p>
          </div>
        </div>

        <div>
          <div className="subheader-link"> {/* TODO: Change to <Link> when Latest Products page is created*/}
            <p className="subheader-item">
              <b> What's New</b>
            </p>
          </div>
        </div>

        <div>
          <div className="subheader-link"> {/* TODO: Change to <Link> when Best Sellers page is created*/}
            <p className="subheader-item">
              <b> Best Sellers</b>
            </p>
          </div>
        </div>

        <SubcategoryPopover
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          categories={currentCategories}
          setAnchorEl={setAnchorEl}
        />
      </div>
      {open === true ? <div className="black-overlay"></div> : <></>}

      {ToastComponent}
    </>
  );
};

export default SubHeader;
