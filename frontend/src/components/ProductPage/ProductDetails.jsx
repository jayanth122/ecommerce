import React from "react";
import {
  Typography,
  Button,
  Grid2 as Grid,
  Card,
  CardContent,
  Box,
} from "@mui/material";
import { useState } from "react";
import QuantityInput from "./QuantityInput";
import { useCart } from "../ShoppingCart/CartContext";
import useToast from "../utils/Toast";
import { addToShoppingCart } from "../../api/endpoints/cart";
const ProductDetails = ({ product }) => {
  const sizes = product.stock.map((item) => item.size);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(null);
  const { updateCartSize } = useCart();
  const { showToast, ToastComponent } = useToast();

  const availableStock = selectedSize
    ? product.stock.find((item) => item.size === selectedSize)?.quantity || 0
    : product.stock.reduce((total, item) => total + item.quantity, 0);

  const hasSize = product.stock.length >= 1 && product.stock[0].size != null;

  const addItemToCart = async () => {
    if (selectedSize === null && hasSize && availableStock > 0) {
      showToast("Please select size before adding item to the cart.", "error");
      return;
    }

    const cartItem = {
      quantity: quantity,
      size: selectedSize,
      productId: product.id
    };

    const token = localStorage.getItem("token");

    if (token) {
      // User is logged in -> Send item to backend
      try {
        const responseData = await addToShoppingCart(cartItem);
        if (responseData === "Item Added to Cart") {
          showToast("Item successfully added to cart", "success");
        }
      } catch (error) {
        showToast("Failed to add item to cart", "error");
      }
    } else {
      // User is not logged in -> Save item in local storage
      let cartList = JSON.parse(localStorage.getItem("cartItems")) || [];

      const existingItem = cartList.find(
        (item) => item.productId === product.id && item.size === selectedSize
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cartList.push({
          productId: product.id,
          quantity: quantity,
          size: selectedSize,
          active: true,
          cartItemId: crypto.randomUUID(),
        });
      }

      localStorage.setItem("cartItems", JSON.stringify(cartList));
      showToast("Item saved in cart (Login to sync)", "info");
    }

    updateCartSize();
  };

  // todo
  const notifyWhenInStock = () => null;

  return (
    <Grid container spacing={2}>
      {/* DETAILS */}
      <Grid size={{ xs: 12, md: 8 }}>
        <Typography variant="h5" sx={{ fontWeight: "bold" }}>
          {product.productName}
        </Typography>
        <Typography variant="h6" sx={{ marginBottom: 2 }}>
          ${product.listPrice}
        </Typography>

        <Typography
          variant="subtitle2"
          sx={{ marginBottom: 2, fontWeight: "bold" }}
        >
          Item Description:
        </Typography>

        <Typography variant="body2" sx={{ color: "black" }}>
          {product.productDescription}
        </Typography>

        {/* SIZES */}
        {hasSize && (
          <>
            <Typography
              variant="subtitle2"
              sx={{ marginTop: 4, fontWeight: "bold" }}
            >
              Size:
            </Typography>
            <Grid size={{ xs: 12, md: 12 }}>
              {sizes.map((size) => {
                const stockForSize =
                  product.stock.find((item) => item.size === size)?.quantity ||
                  0;

                return (
                  <Button
                    key={size}
                    variant="outlined"
                    sx={{
                      position: "relative",
                      color:
                        stockForSize === 0
                          ? "grey"
                          : selectedSize === size
                          ? "white"
                          : "black",
                      borderColor: stockForSize === 0 ? "grey" : "black",
                      backgroundColor:
                        selectedSize === size
                          ? "black"
                          : stockForSize === 0
                          ? "#f0f0f0"
                          : "transparent",
                      width: 40,
                      height: 40,
                      borderRadius: 2,
                      justifyContent: "center",
                      alignItems: "center",
                      margin: 1,
                      "&:hover": {
                        borderWidth: "2px",
                      },
                    }}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}

                    {stockForSize <= 0 && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: 0,
                          left: 0,
                          width: "100%",
                          height: "100%",
                          background:
                            "linear-gradient(45deg, transparent 49%, grey 49%, grey 51%, transparent 51%)",
                          opacity: 0.6,
                          borderRadius: 2,
                          pointerEvents: "none",
                        }}
                      />
                    )}
                  </Button>
                );
              })}
            </Grid>
          </>
        )}
      </Grid>

      {/* ADD TO CART CARD */}
      <Grid size={{ xs: 12, md: 4 }}>
        <Card
          variant="outlined"
          sx={{ borderColor: "black", marginTop: "20px" }}
        >
          <CardContent>
            <Typography variant="h6">${product.listPrice}</Typography>

            {/* STOCK INFO */}
            {availableStock > 0 ? (
              <Typography
                variant="subtitle2"
                sx={{ color: "#5FD542", marginBottom: 1, fontWeight: "bold" }}
              >
                In Stock
              </Typography>
            ) : (
              <Typography
                variant="subtitle2"
                sx={{ color: "#DB3C34", marginBottom: 1, fontWeight: "bold" }}
              >
                Out of Stock
              </Typography>
            )}

            <Typography
              variant="body2"
              sx={{
                color:
                  availableStock > 0 && availableStock < 10
                    ? "orange"
                    : "transparent",
                marginBottom: 1,
                fontWeight: "bold",
                visibility:
                  availableStock > 0 && availableStock < 10
                    ? "visible"
                    : "hidden",
                fontSize: "0.75rem",
              }}
            >
              Only {availableStock} left in stock
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography variant="body2" sx={{ color: "black" }}>
                Quantity:
              </Typography>

              <QuantityInput quantity={quantity} setQuantity={setQuantity} />
            </Box>

            <Button
              variant="contained"
              fullWidth
              sx={{
                marginTop: 2,
                textTransform: "none",
                borderRadius: "99px",
                backgroundColor: "#B1FF49",
                color: "black",
                whiteSpace: "nowrap",
              }}
              onClick={
                availableStock > 0 ? () => addItemToCart() : notifyWhenInStock()
              }
            >
              {availableStock > 0 ? "Add to Cart" : "Notify when available"}
            </Button>
          </CardContent>
        </Card>
      </Grid>

      {ToastComponent}
    </Grid>
  );
};

export default ProductDetails;
