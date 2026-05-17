import React from "react";
import { Box, Stack } from "@mui/material";
import { Checkbox, Typography, Paper } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { CartQuantityInput } from "../ProductPage/QuantityInput";
import { deleteCartItem, updateQuantity } from "../../api/endpoints/cart";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';


export default function CartItemCard({ productDetails, item, setCartItems, toast }) {
    const loggedIn = localStorage.getItem("loggedInUser") !== null;
    const availableStock =
        item.size
            ? productDetails.stock.find((stock) => stock.size === item.size)?.quantity || 0
            : productDetails.stock.reduce((total, stock) => total + stock.quantity, 0);


    const handleRemove = (cartItemId) => {
        setCartItems((prevItems) => {
            if (!prevItems) return [];

            const updatedItems = prevItems.filter((cartItem) => cartItem.cartItemId !== cartItemId);

            // Update localStorage inside the state update function
            if (!loggedIn) {
                localStorage.setItem("cartItems", JSON.stringify(updatedItems));
            }
            toast("Item removed from cart", "success");
            return updatedItems;
        });
        if (loggedIn) {
            handleDeleteItem(cartItemId);
        }
    };

    const handleUpdateQuantity = async (cartItemId, newQuantity) => {
        try {
            await updateQuantity(cartItemId, newQuantity);
        } catch (error) {
            console.log(error);
        }
    };

    const handleDeleteItem = async (cartItemId) => {
        try {
            await deleteCartItem(cartItemId);
        } catch (error) {
            console.log(error);
        }
    };



    const setQuantity = (cartItemId, newQuantity) => {
        setCartItems((prevItems) => {
            if (!prevItems) return [];

            const updatedItems = prevItems.map((cartItem) => {
                if (cartItem.cartItemId === cartItemId) {
                    // Check if new quantity exceeds available stock
                    if (newQuantity > availableStock) {
                        toast(`Cannot increase quantity: Only ${availableStock} left in stock.`, "error");
                        return cartItem;
                    }

                    return { ...cartItem, quantity: newQuantity };
                }
                return cartItem;
            }).filter((cartItem) => cartItem.quantity > 0); // Remove items where quantity < 1

            // Update localStorage inside the state update function
            if (!loggedIn) {
                localStorage.setItem("cartItems", JSON.stringify(updatedItems));
            }
            return updatedItems;
        });

        if (!loggedIn) {
            return;
        }
        if (newQuantity <= 0) {
            handleDeleteItem(cartItemId);
            return;
        }
        if (newQuantity > availableStock) {
            toast(`Cannot increase quantity: Only ${availableStock} left in stock.`, "error");
            return;
        }
        handleUpdateQuantity(cartItemId, newQuantity);
    };

    return (
        <Grid item xs={12} key={item.cartItemId} sx={{ width: "97%" }}>
            <Paper
                sx={{
                    display: "flex",
                    alignItems: "flex-start",
                    padding: 2,
                    marginBottom: 2,
                    width: "100%",
                }}
            >
                <Checkbox
                    checked={Boolean(item.active)}
                    onChange={(e) => {
                        setCartItems((prevItems) => {
                            const updatedItems = prevItems.map((cartItem) =>
                                cartItem.productId === item.productId
                                    ? { ...cartItem, active: e.target.checked }
                                    : cartItem
                            );
                            localStorage.setItem("cartItems", JSON.stringify(updatedItems));
                            return updatedItems;
                        }
                        );
                    }}
                    color="primary"
                    sx={{ marginRight: 2, alignSelf: "center" }}
                />

                <Box sx={{ marginRight: 2 }}>
                    <img
                        src={productDetails.imageUrls?.[0] || "https://placehold.co/150"}
                        alt={`Product ${item.productId}`}
                        style={{
                            width: "150px",
                            height: "150px",
                            objectFit: "cover",
                        }}
                    />
                </Box>

                <Box sx={{ flex: 1 }}>
                    <Typography variant="body1" gutterBottom>
                        <strong>{productDetails.productName}</strong>
                    </Typography>

                    {availableStock > 0 ? (
                        <Typography
                            variant="subtitle2"
                            sx={{ color: "#5FD542", fontWeight: "bold" }}
                        >
                            In Stock
                        </Typography>
                    ) : (
                        <Typography
                            variant="subtitle2"
                            sx={{ color: "#DB3C34", fontWeight: "bold" }}
                        >
                            Out of Stock
                        </Typography>
                    )}

                    {availableStock > 0 && availableStock < 9 && (
                        <Typography
                            variant="body2"
                            sx={{
                                color: "orange",
                                fontWeight: "bold",
                                fontSize: "0.75rem",
                            }}
                        >
                            Only {availableStock} left in stock
                        </Typography>
                    )}

                    {item.size && (
                        <Typography variant="body2" color="textSecondary">
                            <strong>Size:</strong> {item.size}
                        </Typography>
                    )}

                    <Stack
                        sx={{
                            display: "flex",
                            alignItems: "flex-start", // Align items to the top
                            marginTop: 1
                        }}
                        flexDirection="row"
                    >
                        <Box>
                            <CartQuantityInput
                                quantity={item.quantity}
                                setQuantity={setQuantity}
                                cartItemId={item.cartItemId}
                                min={0}
                            />
                        </Box >
                        <IconButton
                            aria-label="delete"
                            onClick={() => handleRemove(item.cartItemId)}
                            size="large"
                            sx={{ alignSelf: "flex-start" }} // Move to top & add spacing
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Stack>


                </Box>

                <Box sx={{ marginLeft: 2, textAlign: "right" }}>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                        ${Math.round(productDetails.listPrice * item.quantity * 100) / 100 || "0.00"}
                    </Typography>
                </Box>
            </Paper>
        </Grid>
    );
}