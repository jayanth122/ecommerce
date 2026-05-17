import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, Button, TextField, Grid } from "@mui/material";
import { updateAddress } from "../../../api/endpoints/address";

const EditAddressModal = ({ open, handleClose, address, onAddressUpdated }) => {
  const [formData, setFormData] = useState({
    id: "",
    firstName: "",
    lastName: "",
    unitNumber: "",
    streetNumber: "",
    streetName: "",
    city: "",
    stateProvince: "",
    country: "",
    postalCode: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (address) {
      setFormData({
        id: address.id,
        firstName: address.firstName,
        lastName: address.lastName,
        unitNumber: address.unitNumber || "",
        streetNumber: address.streetNumber || "",
        streetName: address.streetName,
        city: address.city,
        stateProvince: address.stateProvince,
        country: address.country,
        postalCode: address.postalCode,
        phoneNumber: address.phoneNumber,
      });
    }
  }, [address]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName) newErrors.firstName = "First Name is required";
    if (!formData.lastName) newErrors.lastName = "Last Name is required";
    if (!formData.phoneNumber)
      newErrors.phoneNumber = "Phone Number is required";
    if (!formData.streetName) newErrors.streetName = "Street Name is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      await updateAddress(formData);
      onAddressUpdated();
      handleClose();
    } catch (error) {
      console.error("Error updating address", error);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 600,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography variant="h6" sx={{ mb: 2, textAlign: "center" }}>
          <strong>Edit Address</strong>
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleInputChange}
              error={!!errors.firstName}
              helperText={errors.firstName}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleInputChange}
              error={!!errors.lastName}
              helperText={errors.lastName}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Street Name"
              name="streetName"
              value={formData.streetName}
              onChange={handleInputChange}
              error={!!errors.streetName}
              helperText={errors.streetName}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Street Number"
              name="streetNumber"
              value={formData.streetNumber}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Unit Number"
              name="unitNumber"
              value={formData.unitNumber}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="City"
              name="city"
              value={formData.city}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="State/Province"
              name="stateProvince"
              value={formData.stateProvince}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Postal Code"
              name="postalCode"
              value={formData.postalCode}
              onChange={handleInputChange}
            />
          </Grid>

          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Country"
              name="country"
              value={formData.country}
              onChange={handleInputChange}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Phone Number"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleInputChange}
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber}
            />
          </Grid>
        </Grid>

        <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }}>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="contained" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default EditAddressModal;
