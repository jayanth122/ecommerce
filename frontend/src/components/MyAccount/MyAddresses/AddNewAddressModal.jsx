import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
} from "@mui/material";
import { addNewAddress } from "../../../api/endpoints/address";

const phoneNumberRegex = /^[0-9]{10}$/;

const postalCodeRegex = /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/;

const AddNewAddressModal = ({ open, handleClose, onAddressAdded }) => {
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
    let isValid = true;
    let newErrors = {};

    const requiredFields = [
      "firstName",
      "lastName",
      "phoneNumber",
      "streetNumber",
      "streetName",
      "postalCode",
      "city",
      "stateProvince",
      "country",
    ];

    requiredFields.forEach((field) => {
      if (!newAddress[field]) {
        newErrors[field] = `${field} is required`;
        isValid = false;
      }
    });

    if (
      newAddress.phoneNumber &&
      !phoneNumberRegex.test(newAddress.phoneNumber)
    ) {
      newErrors.phoneNumber = "Phone number must be 10 digits";
      isValid = false;
    }

    if (newAddress.postalCode && !postalCodeRegex.test(newAddress.postalCode)) {
      newErrors.postalCode =
        "Postal code must be a valid format (e.g., 12345 or 12345-6789)";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const response = await addNewAddress(newAddress);
      onAddressAdded(response);

      setNewAddress({
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

      handleClose();
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
          {[
            { label: "First Name", name: "firstName" },
            { label: "Last Name", name: "lastName" },
            { label: "Phone Number", name: "phoneNumber" },
            { label: "Unit Number", name: "unitNumber" },
            { label: "Street Number", name: "streetNumber" },
            { label: "Street Name", name: "streetName" },
            { label: "Postal Code", name: "postalCode" },
            { label: "City", name: "city" },
            { label: "State/Province", name: "stateProvince" },
            { label: "Country", name: "country" },
          ].map(({ label, name }) => (
            <Grid item xs={12} sm={6} key={name}>
              <TextField
                fullWidth
                label={label}
                name={name}
                value={newAddress[name]}
                onChange={handleInputChange}
                error={!!errors[name]}
                helperText={errors[name]}
              />
            </Grid>
          ))}
          <Grid item xs={12}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={newAddress.default}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, default: e.target.checked })
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
            sx={{ backgroundColor: "#ccff00", color: "black" }}
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
  width: 600,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 3,
  borderRadius: 2,
};

export default AddNewAddressModal;
