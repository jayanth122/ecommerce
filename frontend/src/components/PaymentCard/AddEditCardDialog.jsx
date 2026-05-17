import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import axios from "axios";

const AddEditCardDialog = ({ open, onClose, showToast }) => {
  const [formData, setFormData] = useState({
    cardNumber: "",
    cardName: "",
    expirationMonth: 1,
    expirationYear: new Date().getFullYear().toString(),
    cvv: "",
    savePayment: false,
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    const cardNumberRegex = /^(?:4\d{15}|5[1-5]\d{14})$/;

    if (!formData.cardNumber) {
      newErrors.cardNumber = "Card number is required";
    } else if (!cardNumberRegex.test(formData.cardNumber)) {
      newErrors.cardNumber = "Only Visa and MasterCard are accepted";
    }

    if (!formData.cardName) {
      newErrors.cardName = "Name on card is required";
    } else if (formData.cardName.length < 2) {
      newErrors.cardName = "Name must be at least 2 characters";
    }

    if (!formData.expirationMonth) {
      newErrors.expirationMonth = "Expiration month is required";
    }

    if (!formData.expirationYear) {
      newErrors.expirationYear = "Expiration year is required";
    }

    if (!formData.cvv) {
      newErrors.cvv = "CVV is required";
    } else if (!/^[0-9]{3}$/.test(formData.cvv)) {
      newErrors.cvv = "CVV must be 3 digits";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `/api/v1/cards/`,
        {
          cardName: formData.cardName,
          cardNumber: formData.cardNumber,
          expirationMonth: parseInt(formData.expirationMonth, 10),
          expirationYear: parseInt(formData.expirationYear, 10),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response);
      showToast("Card added successfully!");

      setFormData({
        cardNumber: "",
        cardName: "",
        expirationMonth: 1,
        expirationYear: new Date().getFullYear().toString(),
        cvv: "",
        savePayment: false,
      });
      onClose();
    } catch (error) {
      console.error("Error adding card:", error);
      showToast("Failed to add card. Please try again.", "error");
    }
  };

  if (!open) return null;

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: {
            maxHeight: "600px",
            overflow: "hidden",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            backgroundColor: "#d9d9d9",
          }}
        >
          <DialogTitle>Add a credit or debit card</DialogTitle>
          <IconButton onClick={onClose} sx={{ marginRight: 2 }}>
            <CloseIcon sx={{ color: "black" }} />
          </IconButton>
        </Box>
        <DialogContent>
          <Box sx={{ display: "flex", gap: 1 }}>
            {/* Left Column */}
            <Box sx={{ width: "60%" }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  marginBottom: 2,
                }}
              >
                <Typography sx={{ width: "30%" }}>Card number</Typography>
                <TextField
                  name="cardNumber"
                  placeholder="1234 1234 1234 1234"
                  value={formData.cardNumber}
                  onChange={handleChange}
                  type="number"
                  fullWidth
                  error={!!errors.cardNumber}
                  helperText={errors.cardNumber}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  marginBottom: 2,
                }}
              >
                <Typography sx={{ width: "30%" }}>Name on card</Typography>
                <TextField
                  name="cardName"
                  placeholder="e.g. John Doe"
                  value={formData.cardName}
                  onChange={handleChange}
                  fullWidth
                  error={!!errors.cardName}
                  helperText={errors.cardName}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  marginBottom: 2,
                }}
              >
                <Typography>Expiration date</Typography>
                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    flexGrow: 1,
                  }}
                >
                  <TextField
                    name="expirationMonth"
                    value={formData.expirationMonth}
                    onChange={handleChange}
                    select
                    fullWidth
                    error={!!errors.expirationMonth}
                    helperText={errors.expirationMonth}
                  >
                    {Array.from({ length: 12 }, (_, i) => (
                      <MenuItem key={i + 1} value={i + 1}>
                        {String(i + 1).padStart(2, "0")}
                      </MenuItem>
                    ))}
                  </TextField>
                  <TextField
                    name="expirationYear"
                    value={formData.expirationYear}
                    onChange={handleChange}
                    select
                    fullWidth
                    error={!!errors.expirationYear}
                    helperText={errors.expirationYear}
                  >
                    {Array.from({ length: 10 }, (_, i) => (
                      <MenuItem key={i} value={new Date().getFullYear() + i}>
                        {new Date().getFullYear() + i}
                      </MenuItem>
                    ))}
                  </TextField>
                </Box>
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  marginBottom: 2,
                }}
              >
                <Typography sx={{ width: "30%" }}>CVV</Typography>
                <TextField
                  name="cvv"
                  type="number"
                  placeholder="123"
                  value={formData.cvv}
                  onChange={handleChange}
                  fullWidth
                  error={!!errors.cvv}
                  helperText={errors.cvv}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  marginTop: 2,
                }}
              >
                <Checkbox
                  name="savePayment"
                  checked={formData.savePayment}
                  onChange={handleChange}
                />
                <Typography>Save payment for later</Typography>
              </Box>
            </Box>

            {/* Right Column */}
            <Box sx={{ padding: 2, width: "40%" }}>
              <Typography variant="body1">
                We accept all major credit and debit cards:
              </Typography>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions sx={{ backgroundColor: "#d9d9d9" }}>
          <Button onClick={onClose} variant="outlined">
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            variant="contained"
            sx={{ backgroundColor: "#BBFF0F", color: "#000" }}
          >
            Add your card
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddEditCardDialog;
