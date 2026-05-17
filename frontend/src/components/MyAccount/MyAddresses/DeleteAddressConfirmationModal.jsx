import React from "react";
import { Modal, Box, Typography, Button } from "@mui/material";

const DeleteAddressConfirmationModal = ({
  open,
  handleClose,
  handleDelete,
  address,
}) => {
  if (!address) return null;

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}
      >
        <Typography
          variant="h6"
          sx={{ mb: 2, mt: -1, color: "error.main", textAlign: "center" }}
        >
          <strong>Confirm Deletion</strong>
        </Typography>

        <Typography sx={{ mb: 2 }}>
          Are you sure you want to delete this address?
        </Typography>
        <Typography sx={{ mb: 1 }}>
          <strong>Name:</strong> {address.firstName} {address.lastName}
        </Typography>
        <Typography sx={{ mb: 1 }}>
          <strong>Address:</strong> {address.unitNumber}, {address.streetNumber}{" "}
          {address.streetName}, {address.city}, {address.stateProvince},{" "}
          {address.country} - {address.postalCode}
        </Typography>
        <Typography sx={{ mb: 2 }}>
          <strong>Phone:</strong> {address.phoneNumber}
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => handleDelete(address.id)}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeleteAddressConfirmationModal;
