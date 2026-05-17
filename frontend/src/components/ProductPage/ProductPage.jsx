import React from "react";
import { Container, Box, Grid2 as Grid } from "@mui/material";
import ProductImage from "./ProductImage";
import ProductDetails from "./ProductDetails";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProduct } from "../../api/endpoints/products";
import CustomerReviews from "../CustomerReviews/CustomerReviews";


const ProductPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await getProduct(id);
        setProduct(productData);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch product data.");
      }
    };

    fetchProduct();
  }, [id]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>Loading...</div>;
  }
  return (
    <>
      <Box
        sx={{
          height: "25px",
          backgroundColor: "#BBFF0F",
          marginBottom: 2,
        }}
      />
      <Container>
        <Grid container spacing={3} sx={{ marginTop: "20px" }}>
          <Grid size={{ xs: 12, md: 4 }}>
            <ProductImage product={product} />
          </Grid>
          <Grid size={{ xs: 12, md: 8 }}>
            <ProductDetails product={product} />
          </Grid>

          <Grid size={{ xs: 12, md: 12 }}>
            <CustomerReviews product={product} />
          </Grid>
        
        </Grid>
      </Container>
    </>
  );
};

export default ProductPage;
