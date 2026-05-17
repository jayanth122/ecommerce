import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Rating,
  Typography,
  Dialog,
  DialogActions,
  IconButton,
  DialogContent,
  DialogTitle,
  CircularProgress,
  Grid2 as Grid,
  Snackbar,
  Alert,
  Divider,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../ShoppingCart/CartContext";
import useToast from "../utils/Toast";
import { addToShoppingCart } from "../../api/endpoints/cart";
export default function ProductCard({ product }) {
  const {
    id,
    productName,
    productDescription,
    brandName,
    listPrice,
    imageUrls,
    averageRating,
    numberOfReviews,
    stock, // Get the stock data directly
  } = product;

  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState("");
  const [loading, setLoading] = useState(false);
  const [sizeError, setSizeError] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const { updateCartSize } = useCart();
  const sizes = stock.map((item) => item.size);
  const { showToast, ToastComponent } = useToast();
  const availableStock = selectedSize
    ? product.stock.find((item) => item.size === selectedSize)?.quantity || 0
    : product.stock.reduce((total, item) => total + item.quantity, 0);

  const hasSize = stock.length >= 1 && stock[0].size != null;

  const addItemToCart = async () => {
    if (selectedSize === null && hasSize && availableStock > 0) {
      showToast("Please select size before adding item to the cart.", "error");
      return;
    }

    const cartItem = {
      quantity: quantity,
      size: selectedSize,
      productId: product.id,
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

      const hasSize =  product.stock.length >= 1 && product.stock[0].size != null;

      const existingItem = cartList.find(
        (item) => item.productId === product.id && (!hasSize || item.size === selectedSize)
      );

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cartList.push({
          productId: product.id,
          quantity: quantity,
          size: selectedSize || null,
          active: true,
          cartItemId: crypto.randomUUID(),
        });
      }

      localStorage.setItem("cartItems", JSON.stringify(cartList));
      showToast("Item saved in cart (Login to sync)", "info");
    }

    updateCartSize();
  };

  const handleProductClick = () => {
    navigate(`/product/${id}`);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedSize("");
    setSizeError(false);
  };

  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value);
    setSizeError(false);
  };

  const handleAddToCart = () => {
    if (hasSize && !selectedSize) {
      setSizeError(true);
      return;
    }
    setLoading(true);

    addItemToCart();
    setTimeout(() => {
      setLoading(false);

      handleCloseModal();
    }, 1000);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <>
      <Card
        style={{ cursor: "pointer" }}
        sx={{
          maxWidth: 345,
          height: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* Product Image */}
        <CardMedia
          onClick={handleProductClick}
          component="img"
          height="200"
          image={imageUrls[0]}
          alt={productName}
          sx={{ objectFit: "cover" }}
        />

        {/* Card Content */}
        <CardContent sx={{ flexGrow: 1 }} onClick={handleProductClick}>
          {/* Brand Name */}
          <Typography variant="h6" component="div" fontWeight="bold">
            {brandName}
          </Typography>

          {/* Product Name */}
          <Typography variant="h5" component="div">
            {productName}
          </Typography>

          {/* Rating and Reviews */}
          <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
            <Rating
              name="product-rating"
              value={averageRating}
              precision={0.5}
              readOnly
            />
            <Typography variant="body2" color="text.secondary" sx={{ ml: 1 }}>
              ({numberOfReviews} reviews)
            </Typography>
          </Box>

          {/* Price */}
          <Typography
            variant="h6"
            component="div"
            fontWeight="bold"
            sx={{ mt: 1 }}
          >
            ${listPrice.toFixed(2)} {/* Format price to 2 decimal places */}
          </Typography>

          {/* Description */}
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            {productDescription}
          </Typography>
        </CardContent>

        {/* Add to Cart Button */}
        <Box sx={{ p: 2 }}>
          <Button
            variant="contained"
            fullWidth
            sx={{ backgroundColor: "#bbff0f", color: "black", fontWeight: 700 }}
            onClick={handleOpenModal}
          >
            Add to Cart
          </Button>
        </Box>
      </Card>

      {/* Modal for Size Selection */}
      <Dialog
        open={openModal}
        onClose={handleCloseModal}
        sx={{
          "& .MuiDialog-paper": {
            width: "600px",
            maxWidth: "600px",
          },
        }}
      >
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "space-between",
            background: "#e0e0e0",
            height: 8,
            marginBottom: 1,
          }}
        >
          <IconButton
            edge="end"
            color="inherit"
            onClick={handleCloseModal}
            sx={{
              ml: "auto",
            }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          {/* Product Image in Modal */}
          <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
            <CardMedia
              component="img"
              image={imageUrls[0]}
              alt={productName}
              sx={{
                width: 150,
                height: 190,
                objectFit: "cover",
                mr: 2,
                marginRight: 5,
              }}
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                ml: 2,
              }}
            >
              <Typography variant="h7" fontWeight="bold" sx={{ mb: 1 }}>
                {brandName}
              </Typography>
              <Typography variant="h6" sx={{ mb: 2 }}>
                {productName}
              </Typography>
              <Typography variant="h6" fontWeight="bold">
                ${listPrice.toFixed(2)}
              </Typography>

              {/* Button or Link for product details */}
              <Typography variant="h7" sx={{ mt: 8 }}>
                <RouterLink
                  to={`/product/${id}`}
                  style={{ textDecoration: "none" }}
                >
                  <Button sx={{ textDecoration: "underline" }}>
                    See Full Product Details
                  </Button>
                </RouterLink>
              </Typography>
            </Box>
          </Box>
          <Divider />
          {/* Check if sizes exist and display */}
          {hasSize && (
            <>
              <Typography
                variant="subtitle2"
                sx={{ marginTop: 2, fontWeight: "bold" }}
              >
                Size:
              </Typography>
              <Grid container spacing={1}>
                {sizes.map((size) => {
                  const stockForSize =
                    stock.find((item) => item.size === size)?.quantity || 0;

                  return (
                    <Grid item key={size} xs={4} md={3}>
                      <Button
                        variant="outlined"
                        fullWidth
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
                          "&:hover": {
                            borderWidth: "2px",
                          },
                        }}
                        onClick={() => setSelectedSize(size)}
                        disabled={stockForSize === 0}
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
                    </Grid>
                  );
                })}
              </Grid>
              {/* Error message when no size is selected */}
              {sizeError && (
                <Typography
                  variant="body2"
                  color="error"
                  sx={{
                    marginTop: 2,
                    textAlign: "right",
                    fontWeight: "bold",
                  }}
                >
                  Please select a size before adding to cart
                </Typography>
              )}
            </>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCloseModal}
            sx={{
              border: 1,
              color: "black",
              textTransform: "none",
              borderRadius: "10px",
              padding: "8px 16px",
              fontWeight: "bold",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleAddToCart}
            disabled={hasSize && !selectedSize}
            sx={{
              backgroundColor: "#BBFF0F",
              color: "black",
              textTransform: "none",
              borderRadius: "10px",
              padding: "8px 16px",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#9c9c09",
              },
              opacity: hasSize && !selectedSize ? 0.5 : 1,
            }}
          >
            {loading ? (
              <CircularProgress size={24} sx={{ color: "black" }} />
            ) : (
              "Add to Cart"
            )}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for success message */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      {ToastComponent}
    </>
  );
}
