import { Typography, Box } from "@mui/material";
import Grid from "@mui/material/Grid2";

export default function checkoutItemCard({ item, productDetails }) {
  // console.log(item);
  // console.log(productDetails);

  if (!item || !productDetails) {
    return <div>Loading ...</div>;
  }

  return (
    <Box display="flex" alignItems="center" sx={{ mt: 1 }}>
      {/* Image container with fixed width */}
      <Box sx={{ width: "80px", display: "flex", justifyContent: "center" }}>
        <img
          src={productDetails.imageUrls?.[0] || "https://placehold.co/75"}
          alt={`Product ${item.productId}`}
          style={{
            width: "75px",
            height: "75px",
            objectFit: "cover",
          }}
        />
      </Box>

      {/* Product details with fixed margin */}
      <Box sx={{ flexGrow: 1, ml: 2 }}>
        <Typography variant="body1" fontWeight="bold">
          {productDetails.productName}
        </Typography>
        <Typography variant="body2">{item.size}</Typography>
        <Typography variant="body2" sx={{ mt: 1 }}>
          ${productDetails.listPrice}
        </Typography>
      </Box>

      {/* Quantity and Change link */}
      <Box display="flex" alignItems="center">
        <Typography variant="body2">Quantity: {item.quantity}</Typography>
        <Typography
          variant="body2"
          color="primary"
          sx={{ cursor: "pointer", ml: 1 }}
        >
          Change
        </Typography>
      </Box>
    </Box>
  );
}
