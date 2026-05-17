import Grid from "@mui/material/Grid2";
import { useEffect } from "react";
import "../../styles/HomePage/Header.css";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Badge from "@mui/material/Badge";
import { Link } from "react-router-dom";
import { useCart } from "../ShoppingCart/CartContext";
import { Typography } from "@mui/material";

const CheckoutHeader = () => {
  const { cartSize } = useCart();
  const Logo = "../../images/HomePage/T2R_Logo.png";

  return (
    <header>
      <Grid container alignItems="center" justifyContent="space-between" spacing={2} className="header-container" sx={{ backgroundColor: "#000000" }}>
        <Grid item>
          <a href="/">
            <img src={Logo} className="logo" alt="Logo" />
          </a>
        </Grid>

        <Grid item>
          <Typography variant="h3" color="white">SECURE CHECKOUT</Typography>
        </Grid>

        <Grid item className="cart-icon-container" sx={{marginRight: 1}}>
          <Link className="header-item" to="/cart">
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
          </Link>
        </Grid>
      </Grid>
    </header>
  );
};

export default CheckoutHeader;
