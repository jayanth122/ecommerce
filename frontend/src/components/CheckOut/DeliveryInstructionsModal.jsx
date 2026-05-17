import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

const DeliveryInstructionsModal = ({
  open,
  handleClose,
  setDeliveryInstructions,
}) => {
  const [instructions, setInstructions] = useState("");

  // Load saved instructions if available
  useEffect(() => {
    const savedInstructions = localStorage.getItem("deliveryInstructions");
    if (savedInstructions) {
      setInstructions(savedInstructions);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("deliveryInstructions", instructions);
    setDeliveryInstructions(instructions);
    handleClose();
  };

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
          boxShadow: 24,
          p: 3,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" mb={2}>
          Add Delivery Instructions
        </Typography>
        <TextField
          fullWidth
          multiline
          rows={3}
          label="Instructions"
          variant="outlined"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        />
        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button onClick={handleClose} sx={{ mr: 2 }}>
            Cancel
          </Button>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default DeliveryInstructionsModal;
