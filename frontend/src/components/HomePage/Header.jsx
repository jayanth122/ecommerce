import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";
import "../../styles/HomePage/Header.css";

import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Badge from "@mui/material/Badge";
import { Link, useNavigate } from "react-router-dom";
import Search from "../Search/Search";
import { useCart } from "../ShoppingCart/CartContext";

const Header = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  let user = JSON.parse(localStorage.getItem("loggedInUser"));
  // const [cartSize, setCartSize] = useState(0);

  const { cartSize } = useCart();

  const updateCartSize = () => {
    const cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
    // setCartSize(cartItems.length);
  };

  useEffect(() => {
    updateCartSize();
  }, []);

  const Logo = "../../images/HomePage/T2R_Logo.png";

  const onSearch = (e) => {
    setSearch(e.target.value);
  };

  const onProfileClick = () => {
    setProfileMenuOpen(!profileMenuOpen);
    navigate("/my-account");
  };

  const onProfileMenuClick = () => {
    setProfileMenuOpen(!profileMenuOpen);
  };

  const onSignOut = () => {
    localStorage.removeItem("loggedInUser");
    localStorage.removeItem("token");
    localStorage.removeItem("cartItems");
    localStorage.removeItem("guestAddress");
    localStorage.removeItem("deliveryInstructions");
    navigate("/");
  };

  return (
    <>
      <div class="main-header">
        <Grid
          container
          direction={"row"}
          spacing={16}
          columns={16}
          wrap="noWrap"
        >
          <Grid size={2}>
            <a href="/">
              <img src={Logo} class="logo"></img>
            </a>
          </Grid>

          <Grid size={3}></Grid>

          <Grid size={6}>
            <Search />
          </Grid>

          <Grid size={3} class="iconed-item-link">
            {user === null ? ( // if user isn't signed in
              <Link class="header-link" to="/login">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                  class="icon-link"
                >
                  <PermIdentityIcon /> <span>Sign In</span>
                </div>
              </Link>
            ) : (
              // if user is signed in
              <div>
                <button
                  class="header-icon-dropdown"
                  onClick={onProfileMenuClick}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                    class="icon-link"
                  >
                    <PermIdentityIcon />{" "}
                    <span>
                      Hello {user.firstname} {user.lastname}!
                    </span>
                    {profileMenuOpen ? (
                      <ArrowDropDownIcon />
                    ) : (
                      <ArrowRightIcon />
                    )}
                  </div>
                </button>
                {profileMenuOpen ? (
                  <div class="profile-dropdown">
                    <h3 class="dropdown-title">Your Account</h3>
                    <button class="dropdown-option" onClick={onProfileClick}>
                      <b>Your Account</b>
                    </button>
                    <button class="dropdown-option">
                      <b>Your Orders</b>
                    </button>
                    <button class="dropdown-option" onClick={onSignOut}>
                      <b>Sign Out</b>
                    </button>
                  </div>
                ) : (
                  <></>
                )}
              </div>
            )}
          </Grid>

          <Grid size={2}>
            <Link class="header-item" to="/cart">
              <div class="icon-link">
                <Badge
                  badgeContent={cartSize}
                  color="primary"
                  sx={{
                    "& .MuiBadge-badge": {
                      backgroundColor: "white",
                      color: "black",
                      top: 5,
                      right: 5,
                      fontSize: "0.6rem",
                      minWidth: "16px",
                      height: "16px",
                      borderRadius: "50%",
                    },
                  }}
                >
                  <ShoppingCartOutlinedIcon sx={{ fontSize: 30 }} />
                </Badge>
              </div>
            </Link>
          </Grid>
        </Grid>
      </div>
      {profileMenuOpen && user !== null ? (
        <div class="black-overlay"></div>
      ) : (
        <></>
      )}
    </>
  );
};

export default Header;
