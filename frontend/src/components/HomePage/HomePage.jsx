import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CloseIcon from '@mui/icons-material/Close';
import Grid from '@mui/material/Grid2';
import { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import '../../styles/HomePage/HomePage.css';
import LatestBestseller from "./LatestBestseller";

const HomePage = () => {

  // Pictures
  const computer = "/images/HomePage/computer.png";
  const snowflakes = "/images/HomePage/snowflakes.png";
  const mobilePhones = "/images/HomePage/mobilePhones.png";
  const computers = "/images/HomePage/computers.png";
  const wiresCables = "/images/HomePage/wiresCables.png";
  const gaming = "/images/HomePage/gaming.png";
  const speakers = "/images/HomePage/speakers.png";
  const miscElectronics = "/images/HomePage/miscElectronics.png";
  const womens = "/images/HomePage/womens.png";
  const mens = "/images/HomePage/mens.png";
  const childrens = "/images/HomePage/children.png";
  const footwear = "/images/HomePage/footwear.png";
  const accessories = "/images/HomePage/accessories.png";
  const miscClothing = "/images/HomePage/miscClothing.png";

  let user = JSON.parse(localStorage.getItem('loggedInUser'));
  const location = useLocation();
  const [popupOpen, setPopupOpen] = useState(true);
  const navigate = useNavigate();

  const closePopup = () => {
    setPopupOpen(false);
    navigate('/', {
      state: {},
    });
  };

  // Function to handle category navigation
  const handleCategoryClick = (category) => {
    navigate(`/category/${category}`);
  };

  return (
    <>
      <div className="home-body">

        {popupOpen && user != null && location.state != null && location.state.justCreated ?
          (<div className="popup">
            <button className="close-btn" onClick={closePopup}>
              <CloseIcon />
            </button>
            <b className="popup-text">Your account has been successfully created!</b>
          </div>
        ) : null}

        <div className="slider">
          <div className="slider-content">
            <button className="back-btn"><ArrowLeftIcon fontSize='large' /></button>
            <img src={snowflakes} className="slider-pic" alt="Snowflakes"></img>
            <h2 className="slider-text">Make the holidays <br /> special for your <br />electronic fanatic.</h2>
            <img src={computer} className="slider-pic" alt="Computer"></img>
            <img src={snowflakes} className="slider-pic" alt="Snowflakes"></img>
            <button className="next-btn"><ArrowRightIcon fontSize='large' /></button>
          </div>
        </div>

        {/* Row 1 */}
        <div className="store-categories">
          <Grid container direction={'row'} spacing={2} columns={6} wrap="noWrap">
            <Grid size={1}>
              <div className="store-section">
                <p className="store-label"><b>Mobile Phones</b></p>
                <div className="store-link" onClick={() => handleCategoryClick("Mobile Phones")}>
                  <img src={mobilePhones} className="category-pic" alt="Mobile Phones"></img>
                </div>
              </div>
            </Grid>

            <Grid size={1}>
              <div className="store-section">
                <p className="store-label"><b>Computers</b></p>
                <div className="store-link" onClick={() => handleCategoryClick("Computers")}>
                  <img src={computers} className="category-pic" alt="Computers"></img>
                </div>
              </div>
            </Grid>

            <Grid size={1}>
              <div className="store-section">
                <p className="store-label"><b>Electrical Wires and Cables</b></p>
                <div className="store-link" onClick={() => handleCategoryClick("Electrical Wires and Cables")}>
                  <img src={wiresCables} className="category-pic" alt="Wires and Cables"></img>
                </div>
              </div>
            </Grid>

            <Grid size={1}>
              <div className="store-section">
                <p className="store-label"><b>Home Electronics</b></p>
                <div className="store-link" onClick={() => handleCategoryClick("Home Electronics")}>
                  <img src={speakers} className="category-pic" alt="Home Electronics"></img>
                </div>
              </div>
            </Grid>

            <Grid size={1}>
              <div className="store-section">
                <p className="store-label"><b>Gaming</b></p>
                <div className="store-link" onClick={() => handleCategoryClick("Gaming")}>
                  <img src={gaming} className="category-pic" alt="Gaming"></img>
                </div>
              </div>
            </Grid>

            <Grid size={1}>
              <div className="store-section">
                <p className="store-label"><b>Miscellaneous Electronics</b></p>
                <div className="store-link" onClick={() => handleCategoryClick("Miscellaneous Electronics")}>
                  <img src={miscElectronics} className="category-pic" alt="Miscellaneous Electronics"></img>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>

        {/* Row 2 */}
        <div className="store-categories">
          <Grid container direction={'row'} spacing={2} columns={6} wrap="noWrap">
            <Grid size={1}>
              <div className="store-section">
                <p className="store-label"><b>Women's</b></p>
                <div className="store-link" onClick={() => handleCategoryClick("Women's")}>
                  <img src={womens} className="category-pic" alt="Women's"></img>
                </div>
              </div>
            </Grid>

            <Grid size={1}>
              <div className="store-section">
                <p className="store-label"><b>Men's</b></p>
                <div className="store-link" onClick={() => handleCategoryClick("Men's")}>
                  <img src={mens} className="category-pic" alt="Men's"></img>
                </div>
              </div>
            </Grid>

            <Grid size={1}>
              <div className="store-section">
                <p className="store-label"><b>Children's</b></p>
                <div className="store-link" onClick={() => handleCategoryClick("Children's")}>
                  <img src={childrens} className="category-pic" alt="Children's"></img>
                </div>
              </div>
            </Grid>

            <Grid size={1}>
              <div className="store-section">
                <p className="store-label"><b>Footwear</b></p>
                <div className="store-link" onClick={() => handleCategoryClick("Footwear")}>
                  <img src={footwear} className="category-pic" alt="Footwear"></img>
                </div>
              </div>
            </Grid>

            <Grid size={1}>
              <div className="store-section">
                <p className="store-label"><b>Accessories</b></p>
                <div className="store-link" onClick={() => handleCategoryClick("Accessories")}>
                  <img src={accessories} className="category-pic" alt="Accessories"></img>
                </div>
              </div>
            </Grid>

            <Grid size={1}>
              <div className="store-section">
                <p className="store-label"><b>Miscellaneous Clothing</b></p>
                <div className="store-link" onClick={() => handleCategoryClick("Miscellaneous Clothing")}>
                  <img src={miscClothing} className="category-pic" alt="Miscellaneous Clothing"></img>
                </div>
              </div>
            </Grid>
          </Grid>
        </div>
        <LatestBestseller />
      </div>
    </>
  );
};

export default HomePage;
