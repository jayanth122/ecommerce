import React from 'react';
import { Paper, Button, Stack } from '@mui/material';
import { useState } from 'react';



const ProductImage = ({ product }) => {

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [isZoomed, setIsZoomed] = useState(false);

  const images = product.imageUrls;

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
  };

  return (
    <>
      <Paper
        elevation={3}
        style={{
          width: '100%',
          height: '250px',
          backgroundColor: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onClick={() => setIsZoomed(!isZoomed)}
      >
        <img
        src={images[currentImageIndex]}
        alt={product.productName}
        style={{
          height: '100%',
          width: '100%',
          objectFit: 'contain',
          transition: 'transform 0.3s ease, box-shadow 0.3s ease',
          transform: isZoomed ? 'scale(1.5)' : 'scale(1)', // Apply zoom based on state
          boxShadow: isZoomed ? '0px 8px 15px rgba(0, 0, 0, 0.2)' : 'none', // Shadow on zoom
          cursor: isZoomed ? 'zoom-out' : 'zoom-in', // Pointer cursor to indicate interactivity
        }}
      />
      </Paper>

      <Stack direction="row" spacing={1} justifyContent="center" sx={{
        marginTop: "15px"
      }}>

        {images.map((_, index) => (
          <Button
            key={index}
            onClick={() => handleThumbnailClick(index)}
            sx={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              backgroundColor: currentImageIndex === index ? "grey.500" : "grey.600",
              padding: 0,
              minWidth: "0",
            }}
          />
        ))}
      </Stack>
    </>
  );
};

export default ProductImage;