import { Button, Checkbox, FormControlLabel, Grid, MenuItem, Pagination, Rating, Select, TextField, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ProductModel from '../models/ProductModel';
import ProductCard from '../ProductCard';
import productApi from '../services/products';

export default function CategoryProductList() {
  const { category } = useParams(); // Get the category from the URL
  const [sortOption, setSortOption] = useState('default');
  const [filters, setFilters] = useState({
    customerReview: 0,
    brand: '',
    discountsOnly: false,
    inStockOnly: false,
  });
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(Infinity);
  const [currency, setCurrency] = useState('CAD');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [products, setProducts] = useState([]);
  const [filteredAndSortedProducts, setFilteredAndSortedProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [resultsPerPage, setResultsPerPage] = useState(9); // State for results per page

  // Fetch products for the current page from the API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await productApi.getProductsByCategory(currentPage - 1, resultsPerPage, category);
        const { totalItems, totalPages, currentPage: page, products: productData } = response;

        const mappedProducts = productData.map(product =>
          new ProductModel(
            product.id,
            product.productName,
            product.productDescription,
            product.categoryName,
            product.subCategoryName,
            product.brandName,
            product.listPrice,
            product.imageUrls,
            product.stock,
            product.createdAt,
            product.updatedAt,
            product.averageRating,
            product.numberOfReviews
          )
        );

        setProducts(mappedProducts);
        setTotalItems(totalItems);
        setTotalPages(totalPages);
        setCurrentPage(page + 1);

        const uniqueBrands = [...new Set(mappedProducts.map(product => product.brandName))];
        setBrands(uniqueBrands);

      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchData();
  }, [currentPage, category, resultsPerPage]); // Add resultsPerPage as a dependency

  // Apply filters and sorting
  useEffect(() => {
    const applyFiltersAndSorting = (products) => {
      return products
        .filter(product =>
          product.listPrice >= minPrice &&
          product.listPrice <= maxPrice &&
          product.averageRating >= filters.customerReview &&
          (filters.brand ? product.brandName === filters.brand : true) &&
          (filters.discountsOnly ? product.discount > 0 : true) &&
          (filters.inStockOnly ? product.stock.some(item => item.quantity > 0) : true)
        )
        .sort((a, b) => {
          switch (sortOption) {
            case 'priceLowHigh':
              return a.listPrice - b.listPrice;
            case 'priceHighLow':
              return b.listPrice - a.listPrice;
            case 'newest':
              return new Date(b.createdAt) - new Date(a.createdAt);
            case 'bestsellers':
              return b.averageRating - a.averageRating;
            default:
              return 0;
          }
        });
    };

    const updatedFilteredAndSortedProducts = applyFiltersAndSorting(products);
    setFilteredAndSortedProducts(updatedFilteredAndSortedProducts);
  }, [products, filters, sortOption, minPrice, maxPrice]);

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const handleFilterChange = (filterName, value) => {
    setFilters({ ...filters, [filterName]: value });
  };

  const handleMinPriceChange = (e) => {
    const newMin = Number(e.target.value);
    setMinPrice(newMin);
    if (maxPrice < newMin) {
      setMaxPrice(newMin);
    }
  };

  const handleMaxPriceChange = (e) => {
    const newMax = e.target.value === "" ? Infinity : Number(e.target.value);
    setMaxPrice(newMax);
  };

  const resetFilters = () => {
    setFilters({
      customerReview: 0,
      brand: '',
      discountsOnly: false,
      inStockOnly: false,
    });
    setMinPrice(0);
    setMaxPrice(Infinity);
    setSortOption('default');
  };

  const startResult = (currentPage - 1) * resultsPerPage + 1;
  const endResult = Math.min(currentPage * resultsPerPage, totalItems);

  const handlePageChange = (event, page) => {
    setCurrentPage(page);
  };

  return (
    <>
      <Grid container direction={'row'} spacing={0.1} wrap="noWrap">
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
            borderBottom: "1px solid #ccc",
            backgroundColor: "#bbff0f",
          }}
        >
          <Grid container justifyContent="flex-start">{/* Results Text */}
            <Typography variant="h6" fontWeight={700} id="results-text">
              {startResult} - {endResult} out of {totalItems.toLocaleString()} results
            </Typography>
          </Grid>

          <Grid container justifyContent="flex-end">
            {/* Results Per Page Dropdown */}
            <Select
              value={resultsPerPage}
              onChange={(e) => {
                setResultsPerPage(e.target.value);
                setCurrentPage(1); // Reset to the first page when changing results per page
              }}
              size="small"
              sx={{ width: "150px", fontWeight: 700, marginRight: "10px" }}
              id="results-per-page-dropdown"
            >
              <MenuItem value={9} sx={{ fontWeight: 700 }}>9 per page</MenuItem>
              <MenuItem value={18} sx={{ fontWeight: 700 }}>18 per page</MenuItem>
              <MenuItem value={36} sx={{ fontWeight: 700 }}>36 per page</MenuItem>
              <MenuItem value={72} sx={{ fontWeight: 700 }}>72 per page</MenuItem>
            </Select>

            {/* Sorting Dropdown */}
            <Select
              value={sortOption}
              onChange={handleSortChange}
              size="small"
              sx={{ width: "200px", fontWeight: 700 }}
              id="sort-dropdown"
            >
              <MenuItem value="default" sx={{ fontWeight: 700 }}>Sort by: Default</MenuItem>
              <MenuItem value="priceLowHigh" sx={{ fontWeight: 700 }}>Price (low to high)</MenuItem>
              <MenuItem value="priceHighLow" sx={{ fontWeight: 700 }}>Price (high to low)</MenuItem>
              <MenuItem value="newest" sx={{ fontWeight: 700 }}>Newest arrivals</MenuItem>
              <MenuItem value="bestsellers" sx={{ fontWeight: 700 }}>Bestsellers</MenuItem>
            </Select>
          </Grid>
        </Box>
      </Grid>
      <div style={{ padding: 20 }}>
        <Grid container direction={'row'} spacing={0.1} wrap="noWrap">
          <Grid container spacing={3}>
            <Grid item xs={12} md={3}>
              <Box className="filters" sx={{ padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }} id="filters-section">
                <Typography variant="h5" align="center" sx={{ fontWeight: 700 }}>Filters</Typography>

                <Box display="flex" alignItems="center" style={{ marginTop: '10px' }}>
                  <Select
                    value={currency}
                    onChange={(e) => setCurrency(e.target.value)}
                    size="small"
                    style={{ marginRight: '10px' }}
                    id="currency-dropdown"
                  >
                    <MenuItem value="CAD">CAD</MenuItem>
                    <MenuItem value="USD">USD</MenuItem>
                    <MenuItem value="MXN">MXN</MenuItem>
                  </Select>
                  <TextField
                    label={`Min`}
                    type="number"
                    value={minPrice === 0 ? '' : minPrice.toString()}
                    onChange={handleMinPriceChange}
                    fullWidth
                    inputProps={{ min: 0 }}
                    id="min-price-input"
                  />
                  <TextField
                    label={`Max`}
                    type="number"
                    value={maxPrice === Infinity ? "" : maxPrice}
                    onChange={handleMaxPriceChange}
                    fullWidth
                    inputProps={{ min: minPrice }} // Ensure max is always >= min
                    id="max-price-input"
                  />
                </Box>
                <Typography variant="h6" style={{ marginTop: '10px' }} sx={{ fontWeight: 700 }}>Customer Reviews</Typography>
                <Rating
                  name="customer-review"
                  value={filters.customerReview}
                  onChange={(event, newValue) => {
                    handleFilterChange('customerReview', newValue);
                  }}
                  max={5}
                  id="customer-review-rating"
                /> <Typography variant="h7" sx={{ fontWeight: 700 }}>& Up</Typography>
                <Select
                  value={filters.brand}
                  onChange={(e) => handleFilterChange('brand', e.target.value)}
                  displayEmpty
                  fullWidth
                  style={{ marginTop: '10px' }}
                  id="brand-dropdown"
                >
                  <MenuItem value="">All</MenuItem>
                  {brands.map((brand, index) => (
                    <MenuItem key={index} value={brand}>{brand}</MenuItem>
                  ))}
                </Select>
                <FormControlLabel
                  control={<Checkbox checked={filters.discountsOnly} onChange={(e) => handleFilterChange('discountsOnly', e.target.checked)} />}
                  label={<Typography variant="h7" sx={{ fontWeight: 700 }}>Discounts Only</Typography>}
                  style={{ marginTop: '10px' }}
                  id="discounts-only-checkbox"
                />
                <FormControlLabel
                  control={<Checkbox checked={filters.inStockOnly} onChange={(e) => handleFilterChange('inStockOnly', e.target.checked)} />}
                  label={<Typography variant="h7" sx={{ fontWeight: 700 }}>In Stock Only </Typography>}
                  style={{ marginTop: '10px' }}
                  id="in-stock-only-checkbox"
                />
                <Button variant="contained" color="primary" onClick={resetFilters} style={{ marginTop: '10px' }} fullWidth id="reset-filters-button">
                  Reset Filters
                </Button>
              </Box>
            </Grid>
            <Grid item xs={12} md={9}>
              {/* Header with Category Name */}
              <Typography variant="h5" sx={{ mb: 3, fontWeight: 700 }} id="category-results-header">
                {category} Store
              </Typography>

              <Grid container spacing={3} id="product-list">
                {filteredAndSortedProducts.map((product, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index} id={`product-card-${index}`}>
                    <ProductCard product={product} />
                  </Grid>
                ))}
              </Grid>

              {/* Pagination Component */}
              <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }} id="pagination-section">
                <Pagination
                  count={totalPages}
                  page={currentPage}
                  onChange={handlePageChange}
                  color="primary"
                  id="pagination"
                />
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
}
