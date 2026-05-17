package com.fdmgroup.Retail_POD_backend.service;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.fdmgroup.Retail_POD_backend.exceptions.ProductNotFoundException;
import com.fdmgroup.Retail_POD_backend.exceptions.ProductServiceException;
import com.fdmgroup.Retail_POD_backend.model.Product;
import com.fdmgroup.Retail_POD_backend.model.DTO.ProductDTO;
import com.fdmgroup.Retail_POD_backend.model.mapper.ProductMapper;
import com.fdmgroup.Retail_POD_backend.repository.ProductRepository;
import com.fdmgroup.Retail_POD_backend.service.specification.ProductSpecification;

import lombok.AllArgsConstructor;

@AllArgsConstructor
@Service
public class ProductServiceImpl implements ProductService {

	private final ProductRepository productRepo;
	private final ProductMapper productMapper;

	@Override
	public ProductDTO getProduct(long id) {
		return productRepo.findById(id).map(productMapper::toProductDTO)
				.orElseThrow(() -> new ProductNotFoundException(id));
	}

	@Override
	public List<ProductDTO> getAllProducts(BigDecimal minPrice, BigDecimal maxPrice) {
		return productRepo.findByListPriceBetween(minPrice, maxPrice).stream().map(productMapper::toProductDTO)
				.toList();
	}

	@Override
	public Page getProducts(int page, int size, String sortField, String sortDirection, BigDecimal minPrice,
			BigDecimal maxPrice, String keyword) {
		Sort sort = Sort.by(sortField).ascending();
		if (sortDirection.equalsIgnoreCase(Sort.Direction.DESC.name())) {
			sort = Sort.by(sortField).descending();
		}
		System.out.println(minPrice + " " + maxPrice);
		Pageable pageable = PageRequest.of(page, size, sort);
		ProductSpecification spec = new ProductSpecification(keyword, keyword, keyword, keyword, minPrice, maxPrice);
		return productRepo.findAll(spec, pageable).map(productMapper::toProductDTO);
	}

	@Override
	public Page getProductsBySearch(int page, int size, String sortField, String sortDirection, BigDecimal minPrice,
							BigDecimal maxPrice, String keyword) {
		Sort sort = Sort.by(sortField).ascending();
		if (sortDirection.equalsIgnoreCase(Sort.Direction.DESC.name())) {
			sort = Sort.by(sortField).descending();
		}
		System.out.println(minPrice + " " + maxPrice);
		Pageable pageable = PageRequest.of(page, size, sort);
		return productRepo.findProductByKeyword(keyword, minPrice, maxPrice, pageable).map(productMapper::toProductDTO);
	}

	@Override
	public List<ProductDTO> getLatestProducts() throws ProductServiceException {

		try {
			List<Product> latestProducts = productRepo.findLatestProducts();
			return latestProducts.stream().map(productMapper::toProductDTO).toList();
		} catch (Exception e) {

			throw new ProductServiceException("Failed to fetch the latest products", e);
		}

	}

	@Override
	public List<ProductDTO> getTopSellingProducts() throws ProductServiceException {
		try {
			List<Product> bestSellingProducts = productRepo.findTopSellingProducts();
			return bestSellingProducts.stream().map(productMapper::toProductDTO).toList();
		} catch (Exception e) {

			throw new ProductServiceException("Failed to fetch best selling products", e);
		}
	}

	@Override
	public List<ProductDTO> getProductsByIds(List<Long> ids) {
		return productRepo.findAllById(ids).stream().map(productMapper::toProductDTO).toList();
	}
}
