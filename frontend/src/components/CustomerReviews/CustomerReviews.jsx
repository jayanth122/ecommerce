import React, { useState, useEffect } from "react";
import {
  Box,
  Typography,
  Rating,
  LinearProgress,
  Button,
  Divider,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useNavigate } from "react-router-dom";
import { getReviews } from "../../api/endpoints/reviews";

const CustomerReviews = ({ product }) => {
  const [reviews, setReviews] = useState([]);
  const [showAllReviews, setShowAllReviews] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const fetchReviews = async () => {
    try {
      const reviewsData = await getReviews(product.id);
      setReviews(reviewsData || []);
      setLoading(false);
    } catch (err) {
      setError("Failed to fetch reviews");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const calculateRatings = (reviews) => {
    if (!Array.isArray(reviews) || reviews.length === 0) {
      return { ratingsCount: { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 } };
    }

    const ratingsCount = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach((review) => {
      ratingsCount[review.rating]++;
    });
    return { ratingsCount };
  };

  const { ratingsCount } = calculateRatings(reviews);

  const visibleReviews = showAllReviews ? reviews : reviews.slice(0, 2);

  const handleWriteReview = () => {
    navigate("/write-review", { state: { product } });
  };

  if (loading) {
    return (
      <Box sx={{ padding: 2 }}>
        <Typography variant="body2" color="textSecondary">
          Loading reviews...
        </Typography>
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ padding: 2 }}>
        <Typography variant="body2" color="error">
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 2 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography variant="h7" fontWeight="bold" gutterBottom>
          Customer Ratings & Reviews
        </Typography>
        <Button
          variant="contained"
          onClick={handleWriteReview}
          sx={{
            textTransform: "none",
            borderRadius: "20px",
            fontWeight: "bold",
            padding: "6px 16px",
            backgroundColor: "black",
            color: "white",
            "&:hover": {
              backgroundColor: "#333",
            },
          }}
        >
          Write a Review
        </Button>
      </Box>

      {product.numberOfReviews === 0 ? (
        <Typography variant="body2" color="textSecondary">
          No reviews available
        </Typography>
      ) : (
        <>
          {/* Overall Rating */}
          <Box display="flex" alignItems="center" gap={1} mb={2}>
            <Typography variant="h6" fontWeight="bold">
              {product.averageRating}/5
            </Typography>
            <Rating
              value={parseFloat(product.averageRating)}
              precision={0.1}
              readOnly
            />
            <Typography color="textSecondary">
              ({product.numberOfReviews} Reviews)
            </Typography>
          </Box>

          <Box sx={{ width: "80%", maxWidth: "600px", mx: "auto", mb: 2 }}>
            {Object.entries(ratingsCount)
              .reverse()
              .map(([stars, count]) => {
                const percentage = (
                  (count / product.numberOfReviews) *
                  100
                ).toFixed(0);
                return (
                  <Box key={stars} display="flex" alignItems="center" mb={1}>
                    <Typography
                      width="40px"
                      fontSize="14px"
                      color="textSecondary"
                    >
                      {stars} Star
                    </Typography>
                    {/* Progress bar */}
                    <LinearProgress
                      variant="determinate"
                      value={percentage}
                      sx={{
                        flexGrow: 1,
                        mx: 1,
                        height: 12,
                        borderRadius: 2,
                        "& .MuiLinearProgress-bar": {
                          backgroundColor: "#FFC107",
                        },
                      }}
                    />
                    <Typography fontSize="14px" color="textSecondary">
                      {percentage}%
                    </Typography>{" "}
                    {/* Display percentage */}
                  </Box>
                );
              })}
          </Box>

          <Divider sx={{ my: 2 }} />

          {visibleReviews.map((review) => (
            <Box key={review.id} mb={3}>
              <Grid container spacing={1} alignItems="center">
                <Grid xs={8}>
                  <Rating value={review.rating} readOnly size="small" />
                </Grid>
                <Grid xs={4} textAlign="right">
                  <Typography variant="body2" color="textSecondary">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </Typography>
                </Grid>
              </Grid>
              <Typography variant="body2" mt={1} sx={{ color: "text.primary" }}>
                {`"${review.description}"`}
              </Typography>

              <Typography
                variant="caption"
                color="textSecondary"
                sx={{ fontStyle: "italic" }}
              >
                - {review.userFullName}
              </Typography>
            </Box>
          ))}

          <Box sx={{ display: "flex", justifyContent: "center", mt: 2 }}>
            <Button
              variant="contained"
              onClick={() => setShowAllReviews(!showAllReviews)}
              sx={{
                backgroundColor: "#BBFF0F",
                color: "black",
                textTransform: "none",
                borderRadius: "20px",
                padding: "8px 16px",
                fontWeight: "bold",
              }}
            >
              {showAllReviews ? "Show Less" : "View All Reviews"}
            </Button>
          </Box>
        </>
      )}
    </Box>
  );
};

export default CustomerReviews;
