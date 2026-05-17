package com.fdmgroup.Retail_POD_backend.service;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.domain.Page;

import com.fdmgroup.Retail_POD_backend.exceptions.ProductServiceException;
import com.fdmgroup.Retail_POD_backend.model.Product;
import com.fdmgroup.Retail_POD_backend.model.DTO.ProductDTO;

public interface ProductService {

	public List<ProductDTO> getAllProducts(BigDecimal minPrice, BigDecimal maxPrice);

	public Page<Product> getProducts(int page, int size, String sortField, String sortDirection, BigDecimal minPrice,
			BigDecimal maxPrice, String keyword);

	public Page<Product> getProductsBySearch(int page, int size, String sortField, String sortDirection, BigDecimal minPrice,
			BigDecimal maxPrice, String keyword);

	public ProductDTO getProduct(long id);

	List<ProductDTO> getLatestProducts() throws ProductServiceException;

	List<ProductDTO> getTopSellingProducts() throws ProductServiceException;

	List<ProductDTO> getProductsByIds(List<Long> ids);
}
