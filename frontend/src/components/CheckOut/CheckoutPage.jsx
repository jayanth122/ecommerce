import React from "react";
import {
  Card,
  CardContent,
  Box,
  Typography,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Divider,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import Stack from "@mui/material/Stack";
import { useEffect, useState } from "react";
import { getShoppingCart } from "../../api/endpoints/cart";
import { getProductsByIds } from "../../api/endpoints/products";
import { getDefaultUserAddress } from "../../api/endpoints/address";
import checkoutItemCard from "./CheckoutItemCard";
import { Link, useNavigate } from "react-router-dom";
import AddressSelectionModal from "./AddressSelectionModal";
import DeliveryInstructionsModal from "./DeliveryInstructionsModal";

const CheckoutPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [products, setProducts] = useState(null);
  const [defaultAddress, setDefaultAddress] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isDeliveryModalOpen, setIsDeliveryModalOpen] = useState(false);
  const [deliveryInstructions, setDeliveryInstructions] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const tax_percentage = 0.15;
  const subtotal = cartItems.reduce((total, item) => {
    if (item.active) {
      const productDetails = products?.find(
        (product) => product.id === item.productId
      );
      return (
        total + (productDetails ? productDetails.listPrice * item.quantity : 0)
      );
    }
    return total;
  }, 0);
  const taxes = subtotal * tax_percentage;
  const totalPrice = subtotal + taxes;

  useEffect(() => {
    const loggedIn = localStorage.getItem("loggedInUser") !== null;
    const storedCartItems = localStorage.getItem("cartItems");
    const parsedItems = storedCartItems ? JSON.parse(storedCartItems) : [];

    if (!loggedIn) {
      // If user is not logged in, use only localStorage cart
      setCartItems(parsedItems.filter((item) => item.active === true));
    } else {
      // If user is logged in, fetch backend cart and merge with localStorage cart
      const fetchCart = async () => {
        try {
          const cartData = await getShoppingCart();
          const backendCartItems = cartData?.cartItems || [];
          setCartItems(backendCartItems.filter((item) => item.active === true));
        } catch (err) {
          console.error("Error fetching cart:", err);
        }
      };

      fetchCart();
    }
  }, []);

  // Check if the user is logged in
  const loggedIn = localStorage.getItem("loggedInUser") !== null;
  // Fetch address based on whether the user is logged in or a guest
  useEffect(() => {
    const fetchAddress = () => {
      if (loggedIn) {
        // Fetch address for logged-in user
        const fetchDefaultAddress = async () => {
          try {
            const address = await getDefaultUserAddress();
            setDefaultAddress(address);
          } catch (err) {
            console.error("Error fetching default address:", err);
          }
        };
        fetchDefaultAddress();
      } else {
        // For guest users, check localStorage for saved address
        const storedAddress = localStorage.getItem("guestAddress");
        if (storedAddress) {
          setDefaultAddress(JSON.parse(storedAddress)); // Set the stored address
        } else {
          setDefaultAddress(null); // No address saved
        }
      }
    };

    fetchAddress();
  }, [loggedIn]);

  useEffect(() => {
    const savedInstructions = localStorage.getItem("deliveryInstructions");
    if (savedInstructions) {
      setDeliveryInstructions(savedInstructions);
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

  if (!cartItems || !products) {
    return <div>Loading ...</div>;
  }
  return (
    <Grid container spacing={2} sx={{ padding: 2, backgroundColor: "#eae8e8" }}>
      {/* Delivery Section */}
      <Grid size={9}>
        <Stack spacing={2} marginLeft={4}>
          <Grid size={12}>
            <Card>
              <CardContent>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h6">
                    Delivering to:{" "}
                    <strong>
                      {defaultAddress
                        ? `${defaultAddress.firstName} ${defaultAddress.lastName}`
                        : "No address saved"}
                    </strong>
                  </Typography>
                  <Typography
                    variant="body2"
                    color="primary"
                    sx={{ cursor: "pointer", mt: 1 }}
                    onClick={() => setIsModalOpen(true)}
                  >
                    Change
                  </Typography>
                </Box>
                {defaultAddress && (
                  <Typography variant="body2">
                    {defaultAddress.unitNumber &&
                      `${defaultAddress.unitNumber}, `}
                    {defaultAddress.streetNumber} {defaultAddress.streetName},{" "}
                    {defaultAddress.city}, {defaultAddress.stateProvince},{" "}
                    {defaultAddress.postalCode}, {defaultAddress.country}
                  </Typography>
                )}

                <Typography
                  variant="body2"
                  color="primary"
                  sx={{ cursor: "pointer", mt: 1 }}
                  onClick={() => setIsDeliveryModalOpen(true)}
                >
                  {deliveryInstructions
                    ? "Edit Delivery Instructions"
                    : "Add Delivery Instructions"}
                </Typography>

                {/* Show saved instructions */}
                {deliveryInstructions && (
                  <Typography
                    variant="body2"
                    sx={{ mt: 1, fontStyle: "italic" }}
                  >
                    "{deliveryInstructions}"
                  </Typography>
                )}

                {/* Delivery Instructions Modal */}
                <DeliveryInstructionsModal
                  open={isDeliveryModalOpen}
                  handleClose={() => setIsDeliveryModalOpen(false)}
                  setDeliveryInstructions={setDeliveryInstructions}
                />
              </CardContent>
            </Card>
          </Grid>

          {/* Payment Details */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="h6">
                    Paying with American Express 1000
                  </Typography>
                  <Typography
                    variant="body2"
                    color="primary"
                    sx={{ cursor: "pointer", mt: 1 }}
                  >
                    Change
                  </Typography>
                </Box>
                <Typography variant="body2">
                  $300.00 gift card balance
                </Typography>
                <Typography variant="body2">
                  Use Rewards points: $0.00 available
                </Typography>
                <Typography
                  variant="body2"
                  color="primary"
                  sx={{ cursor: "pointer", mt: 1 }}
                >
                  Use a gift card, voucher, or promo code
                </Typography>
              </CardContent>
            </Card>
          </Grid>

          {/* Item Section */}
          <Grid item xs={12}>
            <Card>
              <CardContent>
                {/* Delivery */}
                <Typography variant="h6">Arriving Jan 5, 2025</Typography>
                <Box display="flex" alignItems="center">
                  <Typography variant="body2">
                    If you order in the next 8 hours
                  </Typography>
                  <Typography
                    variant="body2"
                    color="primary"
                    sx={{ cursor: "pointer", ml: 1 }}
                  >
                    Details
                  </Typography>
                </Box>
                <RadioGroup sx={{ mt: 2 }}>
                  <FormControlLabel
                    value="jan3"
                    control={<Radio />}
                    label="Tomorrow, Jan 3 - FREE One Day Delivery"
                  />
                  <FormControlLabel
                    value="jan5"
                    control={<Radio />}
                    label="Sunday, Jan 5 - FREE 3 Day Delivery"
                  />
                </RadioGroup>

                {/* Items */}
                <Stack>
                  {cartItems.map((item) => {
                    const productDetails = products.find(
                      (product) => product.id === item.productId
                    );

                    return checkoutItemCard({
                      key: item.cartItemId,
                      productDetails: productDetails,
                      item: item,
                    });
                  })}
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Payment Section */}
          <Card>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "16px",
                  borderRadius: "8px",
                }}
              >
                <Button
                  sx={{
                    backgroundColor: "#CCFF00",
                    color: "black",
                    fontWeight: "bold",
                    textTransform: "none",
                    padding: "10px 20px",
                    borderRadius: "8px",
                    "&:hover": { backgroundColor: "#B8E600" },
                  }}
                  variant="contained"
                >
                  Place your order
                </Button>

                <Box>
                  <Typography variant="h6" fontWeight="bold">
                    Order Total: ${totalPrice.toFixed(2)}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    By placing your order, you agree to FDM’s{" "}
                    <Link to="/privacy-policy" underline="hover">
                      privacy notice
                    </Link>{" "}
                    and{" "}
                    <Link to="/content-of-use" underline="hover">
                      conditions of use
                    </Link>
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Stack>
        {/* Address Selection Modal */}
        <AddressSelectionModal
          open={isModalOpen}
          handleClose={() => setIsModalOpen(false)}
          setDefaultAddress={setDefaultAddress}
          isAuthenticated={loggedIn} // Add this prop to handle guest user logic
        />
      </Grid>
      <Grid size={3}>
        <Box
          sx={{
            width: "300px",
            backgroundColor: "white",
            borderRadius: "8px",
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)",
            padding: "16px",
          }}
        >
          {/* Place Order Button */}
          <Button
            fullWidth
            variant="contained"
            sx={{
              backgroundColor: "#ccff00",
              color: "black",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#b8e600" },
            }}
          >
            Place your order
          </Button>

          {/* Privacy Notice & Conditions */}
          <Typography variant="body2" sx={{ mt: 1, textAlign: "center" }}>
            By placing your order, you agree to FDM’s{" "}
            <Link href="/privacy-notice" underline="hover">
              privacy notice
            </Link>{" "}
            and{" "}
            <Link href="/conditions-of-use" underline="hover">
              conditions of use
            </Link>
            .
          </Typography>

          <Divider sx={{ my: 2 }} />

          {/* Order Details */}
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2">Items:</Typography>
            <Typography variant="body2">${subtotal.toFixed(2)}</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography variant="body2">Shipping & handling:</Typography>
            <Typography variant="body2">$0.00</Typography>
          </Box>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography variant="body2">
              Estimated tax to be collected:
            </Typography>
            <Typography variant="body2">${taxes.toFixed(2)}</Typography>
          </Box>

          <Divider sx={{ mb: 2, borderBottomWidth: 2 }} />

          {/* Order Total */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              fontWeight: "bold",
            }}
          >
            <Typography variant="h6" fontWeight="bold">
              Order Total:
            </Typography>
            <Typography variant="h6" fontWeight="bold">
              ${totalPrice.toFixed(2)}
            </Typography>
          </Box>
        </Box>
      </Grid>
    </Grid>
  );
};

export default CheckoutPage;
