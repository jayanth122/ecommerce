import React, { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Rating,
  Divider,
  Snackbar,
  Alert,
} from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";
import { useLocation } from "react-router-dom";
import Grid from "@mui/material/Grid2";

const WriteReview = () => {
  const [rating, setRating] = useState(0);
  const [heading, setHeading] = useState("");
  const [comment, setComment] = useState("");
  const [file, setFile] = useState(null);
  const [errors, setErrors] = useState({});
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const { state } = useLocation();
  const product = state?.product;

  if (!product) {
    return (
      <Box textAlign="center" marginTop={4}>
        <Typography variant="h6" color="error">
          No product data available. Please try again.
        </Typography>
      </Box>
    );
  }

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const validateFields = () => {
    const newErrors = {};
    if (rating === 0) newErrors.rating = "Please provide a rating.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateFields()) {
      console.log({
        rating,
        heading,
        comment,
        file,
      });

      setSnackbar({
        open: true,
        message: "Review added successfully!",
        severity: "success",
      });

      setRating(0);
      setHeading("");
      setComment("");
      setFile(null);
      setErrors({});
    } else {
      setSnackbar({
        open: true,
        message: "Please fix the errors and try again.",
        severity: "error",
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <>
      <Box
        sx={{
          height: "25px",
          backgroundColor: "#BBFF0F",
          marginBottom: 2,
        }}
      />
      <Box
        sx={{
          padding: 4,
          maxWidth: "500px",
          margin: "auto",
          backgroundColor: "#fff",
          marginTop: 2,
        }}
      >
        <Typography
          variant="h6"
          fontWeight="bold"
          gutterBottom
          marginBottom={2}
          sx={{ textAlign: "center" }}
        >
          Create Review
        </Typography>

        <Grid container spacing={2} alignItems="center" mb={3}>
          <Grid item xs={3}>
            <Box
              component="img"
              src={product.imageUrls}
              alt={product.productName}
              sx={{
                width: "80px",
                height: "80px",
                borderRadius: "8px",
                objectFit: "cover",
              }}
            />
          </Grid>
          <Grid item xs={9}>
            <Typography variant="body1" fontWeight="bold">
              {product.productName}
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 2 }} />

        <Box mb={3}>
          <Typography variant="body2" fontWeight="bold" gutterBottom>
            Overall rating
          </Typography>
          <Rating
            value={rating}
            onChange={(event, newValue) => {
              setRating(newValue);
              if (newValue > 0)
                setErrors((prev) => ({ ...prev, rating: null }));
            }}
            size="large"
          />
          {errors.rating && (
            <Typography variant="body2" color="error">
              {errors.rating}
            </Typography>
          )}
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box mb={3}>
          <Typography variant="body2" fontWeight="bold" gutterBottom>
            Add a headline
          </Typography>
          <TextField
            placeholder="What’s most important to know about this product?"
            fullWidth
            value={heading}
            onChange={(e) => {
              setHeading(e.target.value);
            }}
            variant="outlined"
            size="small"
          />
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box mb={3}>
          <Typography variant="body2" fontWeight="bold" gutterBottom>
            Add a photo or video
          </Typography>
          <Button
            variant="outlined"
            component="label"
            startIcon={<PhotoCamera />}
            sx={{
              textTransform: "none",
              borderRadius: "8px",
              padding: "6px 16px",
              border: "1px dashed gray",
            }}
          >
            Upload
            <input
              type="file"
              hidden
              accept="image/*,video/*"
              onChange={(e) => handleFileChange(e)}
            />
          </Button>
          {file && (
            <Typography variant="body2" mt={1}>
              {file.name}
            </Typography>
          )}
        </Box>

        <Divider sx={{ my: 2 }} />

        <Box mb={3}>
          <Typography variant="body2" fontWeight="bold" gutterBottom>
            Add a Comment
          </Typography>
          <TextField
            placeholder="What did you like or dislike? What did you use this product for?"
            multiline
            rows={4}
            fullWidth
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            variant="outlined"
            size="small"
          />
        </Box>
        <Box textAlign="center">
          <Button
            variant="contained"
            onClick={handleSubmit}
            sx={{
              backgroundColor: "#BBFF0F",
              color: "black",
              textTransform: "none",
              borderRadius: "20px",
              padding: "8px 16px",
              fontWeight: "bold",
              "&:hover": {
                backgroundColor: "#BBFF0F",
              },
            }}
          >
            Submit
          </Button>
        </Box>
      </Box>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
};

export default WriteReview;
