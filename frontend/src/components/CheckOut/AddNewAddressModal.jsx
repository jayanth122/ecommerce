import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { addNewAddress } from "../../api/endpoints/address";

const AddNewAddressModal = ({
  open,
  handleClose,
  onAddressAdded,
  isAuthenticated,
}) => {
  const [newAddress, setNewAddress] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    unitNumber: "",
    streetNumber: "",
    streetName: "",
    postalCode: "",
    city: "",
    stateProvince: "",
    country: "",
    latitude: "",
    longitude: "",
    default: false,
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    unitNumber: "",
    streetNumber: "",
    streetName: "",
    postalCode: "",
    city: "",
    stateProvince: "",
    country: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAddress((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    // Check required fields
    if (!newAddress.firstName) {
      newErrors.firstName = "First Name is required";
      isValid = false;
    }
    if (!newAddress.lastName) {
      newErrors.lastName = "Last Name is required";
      isValid = false;
    }
    if (!newAddress.phoneNumber) {
      newErrors.phoneNumber = "Phone Number is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(newAddress.phoneNumber)) {
      newErrors.phoneNumber = "Phone Number must be 10 digits";
      isValid = false;
    }
    if (!newAddress.unitNumber) {
      newErrors.unitNumber = "Unit Number is required";
      isValid = false;
    }
    if (!newAddress.streetNumber) {
      newErrors.streetNumber = "Street Number is required";
      isValid = false;
    }
    if (!newAddress.streetName) {
      newErrors.streetName = "Street Name is required";
      isValid = false;
    }
    if (!newAddress.postalCode) {
      newErrors.postalCode = "Postal Code is required";
      isValid = false;
    }
    if (!newAddress.city) {
      newErrors.city = "City is required";
      isValid = false;
    }
    if (!newAddress.stateProvince) {
      newErrors.stateProvince = "State/Province is required";
      isValid = false;
    }
    if (!newAddress.country) {
      newErrors.country = "Country is required";
      isValid = false;
    }

    // Validate latitude and longitude if provided
    if (newAddress.latitude && isNaN(newAddress.latitude)) {
      newErrors.latitude = "Latitude must be a valid number";
      isValid = false;
    }
    if (newAddress.longitude && isNaN(newAddress.longitude)) {
      newErrors.longitude = "Longitude must be a valid number";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      if (isAuthenticated) {
        const response = await addNewAddress(newAddress);
        onAddressAdded(response.data);
      } else {
        const guestAddress = localStorage.getItem("guestAddress");
        console.log("#######" + guestAddress);
        if (guestAddress != null) {
          localStorage.removeItem("guestAddress");
        }
        localStorage.setItem("guestAddress", JSON.stringify(newAddress));

        onAddressAdded(newAddress);
      }
    } catch (err) {
      console.error("Error adding address:", err);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={modalStyle}>
        <Typography variant="h6" gutterBottom>
          Add New Delivery Address
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={newAddress.firstName}
              onChange={handleInputChange}
              error={!!errors.firstName}
              helperText={errors.firstName}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={newAddress.lastName}
              onChange={handleInputChange}
              error={!!errors.lastName}
              helperText={errors.lastName}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phoneNumber"
              value={newAddress.phoneNumber}
              onChange={handleInputChange}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              label="Unit Number"
              name="unitNumber"
              value={newAddress.unitNumber}
              onChange={handleInputChange}
              error={!!errors.unitNumber}
              helperText={errors.unitNumber}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Street Number"
              name="streetNumber"
              value={newAddress.streetNumber}
              onChange={handleInputChange}
              error={!!errors.streetNumber}
              helperText={errors.streetNumber}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Street Name"
              name="streetName"
              value={newAddress.streetName}
              onChange={handleInputChange}
              error={!!errors.streetName}
              helperText={errors.streetName}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Postal Code"
              name="postalCode"
              value={newAddress.postalCode}
              onChange={handleInputChange}
              error={!!errors.postalCode}
              helperText={errors.postalCode}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="City"
              name="city"
              value={newAddress.city}
              onChange={handleInputChange}
              error={!!errors.city}
              helperText={errors.city}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="State/Province"
              name="stateProvince"
              value={newAddress.stateProvince}
              onChange={handleInputChange}
              error={!!errors.stateProvince}
              helperText={errors.stateProvince}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Country"
              name="country"
              value={newAddress.country}
              onChange={handleInputChange}
              error={!!errors.country}
              helperText={errors.country}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Latitude"
              name="latitude"
              value={newAddress.latitude}
              onChange={handleInputChange}
              error={!!errors.latitude}
              helperText={errors.latitude}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Longitude"
              name="longitude"
              value={newAddress.longitude}
              onChange={handleInputChange}
              error={!!errors.longitude}
              helperText={errors.longitude}
            />
          </Grid>
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={newAddress.default}
                  onChange={(e) =>
                    setNewAddress({
                      ...newAddress,
                      default: e.target.checked,
                    })
                  }
                />
              }
              label="Set as Default Address"
            />
          </Grid>
        </Grid>
        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button onClick={handleClose} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{
              backgroundColor: "#ccff00",
              color: "black",
              fontWeight: "bold",
              "&:hover": { backgroundColor: "#b8e600" },
            }}
          >
            Save Address
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600, // Increased width for better spacing
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
  borderRadius: 2,
};

export default AddNewAddressModal;
