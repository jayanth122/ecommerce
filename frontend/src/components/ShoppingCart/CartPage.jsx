import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Box, Stack } from "@mui/material";
import { COLORS } from "../utils/colors";
import { useState, useEffect } from "react";
import CartHeader from "./CartHeader";
import { Button, Checkbox, Typography, Paper } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { getProductsByIds } from "../../api/endpoints/products";
import { getShoppingCart } from "../../api/endpoints/cart";
import CartItemCard from "./CartItemCard";
import useToast from "../utils/Toast";

function CartPage() {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState(null);
  const { showToast, ToastComponent } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedInUser") !== null;
    const storedCartItems = localStorage.getItem("cartItems");
    const parsedItems = storedCartItems ? JSON.parse(storedCartItems) : [];

    if (!loggedIn) {
      // If user is not logged in, use only localStorage cart
      setCartItems(parsedItems);
    } else {
      // If user is logged in, fetch backend cart and merge with localStorage cart
      const fetchCart = async () => {
        try {
          const cartData = await getShoppingCart();
          const backendCartItems = cartData?.cartItems || [];
          setCartItems(backendCartItems);

        } catch (err) {
          console.error("Error fetching cart:", err);
        }
      };

      fetchCart();
    }
  }, []);

  useEffect(() => {

    const fetchProducts = async () => {
      try {
        const ids = cartItems.map((item) => item.productId);
        if (ids.length > 0) {
          const productData = await getProductsByIds(ids);
          setProducts(productData);
        } else {
          setProducts([]);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, [cartItems]);

  const selectAllItems = () => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) => ({ ...item, active: true }));

      localStorage.setItem("cartItems", JSON.stringify(updatedItems));

      return updatedItems;
    });
  };

  const deselectAllItems = () => {
    setCartItems((prevItems) => {
      const updatedItems = prevItems.map((item) => ({ ...item, active: false }));

      // Update localStorage
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));

      return updatedItems;
    });
  };

  const hasSelectedItems = cartItems.some((item) => item.active);

  const totalPrice = cartItems.reduce((total, item) => {
    if (item.active) {
      const productDetails = products?.find((product) => product.id === item.productId);
      return total + (productDetails ? productDetails.listPrice * item.quantity : 0);
    }
    return total;
  }, 0);

  const onCheckoutClick = () => {
    navigate("/checkoutPage");
  };

  return (
    <Box
      sx={{
        backgroundColor: COLORS.shoppingCartBackGround,
        width: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box sx={{ backgroundColor: COLORS.fdmGreen, height: "25px", width: "100%" }} />
      <Box
        sx={{
          backgroundColor: "white",
          width: "94%",
          margin: "0px auto",
          padding: "20px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
          minHeight: cartItems.length !== 0 ? "34%" : "auto",
        }}
      >
        {cartItems.length === 0 || !products || products.length === 0 ? (
          <>
            <h1>
              <b>Your shopping cart is empty</b>
            </h1>
            <Link
              to="/"
              style={{
                textDecoration: "none",
                color: "blue",
                cursor: "pointer",
                display: "block",
                marginTop: "10px",
              }}
            >
              Continue shopping to fill your cart
            </Link>
          </>
        ) : (
          <>
            <CartHeader
              hasSelectedItems={hasSelectedItems}
              selectAllItems={selectAllItems}
              deselectAllItems={deselectAllItems}
            />
            <span style={{ float: "right" }}>Price</span>
            <hr />
            <Box>
              <Stack spacing={2}>
                {cartItems.map((item) => {
                  const productDetails = products.find(
                    (product) => product.id === item.productId
                  );

                  return CartItemCard({ key: item.cartItemId, productDetails: productDetails, item: item, setCartItems: setCartItems, toast: showToast })
                })}
              </Stack>
            </Box>
            <hr />

            {hasSelectedItems ? (
              <>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <b>Total: </b> ${totalPrice.toFixed(2)}
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    marginTop: "10px",
                    width: "100%",
                  }}
                >
                  <Button
                    sx={{
                      backgroundColor: COLORS.fdmGreen,
                      color: "black",
                      borderRadius: "10px",
                      fontWeight: "bold",
                      textTransform: "none",
                      padding: "5px 15px",
                      fontSize: "0.75rem",
                    }}
                    variant="contained"
                    onClick={onCheckoutClick}
                  >
                    Proceed to Checkout
                  </Button>
                </Box>
              </>
            ) : (
              <span style={{ float: "right" }}>No items are selected</span>
            )}
          </>
        )}
      </Box>
      {ToastComponent}
    </Box>
  );
}

export default CartPage;