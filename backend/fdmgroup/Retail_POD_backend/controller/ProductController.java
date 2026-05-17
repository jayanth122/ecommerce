package com.fdmgroup.Retail_POD_backend.controller;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fdmgroup.Retail_POD_backend.exceptions.ProductServiceException;
import com.fdmgroup.Retail_POD_backend.model.Product;
import com.fdmgroup.Retail_POD_backend.model.DTO.ProductDTO;
import com.fdmgroup.Retail_POD_backend.service.ProductService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@RestController
@RequestMapping("/api/v1/public/products")
public class ProductController {

    private ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDTO> getProduct(@PathVariable long id) {
        return ResponseEntity.ok(productService.getProduct(id));
    }

    @GetMapping
    public ResponseEntity<List<ProductDTO>> getProductsByIds(@RequestParam List<Long> ids){
    	return ResponseEntity.ok(productService.getProductsByIds(ids));
    }

    @GetMapping("/all")
    public ResponseEntity<List<ProductDTO>> getAllProducts(@RequestParam(defaultValue = "0") BigDecimal minPrice,
            @RequestParam(defaultValue = "1000000") BigDecimal maxPrice) {
        List<ProductDTO> products = productService.getAllProducts(minPrice, maxPrice);
        return new ResponseEntity<>(products, HttpStatus.OK);
    }

    @GetMapping("/search")
    public ResponseEntity<Map<String, Object>> searchProducts(@RequestParam("page") int page,
            @RequestParam("size") int size, @RequestParam("keyword") String keyword,
            @RequestParam(defaultValue = "product_id") String sortField,
            @RequestParam(defaultValue = "asc") String sortDirection,
            @RequestParam(defaultValue = "0") BigDecimal minPrice,
            @RequestParam(defaultValue = "1000000") BigDecimal maxPrice) {
        Page<Product> products = productService.getProductsBySearch(page, size, sortField, sortDirection, minPrice, maxPrice,
                keyword);
        Map<String, Object> map = new HashMap<>();
        map.put("products", products.getContent());
        map.put("currentPage", products.getNumber());
        map.put("totalItems", products.getTotalElements());
        map.put("totalPages", products.getTotalPages());
        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    @GetMapping("/search/category")
    public ResponseEntity<Map<String, Object>> searchProductsByCategory(@RequestParam("page") int page,
            @RequestParam("size") int size, @RequestParam("keyword") String keyword,
            @RequestParam(defaultValue = "id") String sortField,
            @RequestParam(defaultValue = "asc") String sortDirection,
            @RequestParam(defaultValue = "0") BigDecimal minPrice,
            @RequestParam(defaultValue = "1000000") BigDecimal maxPrice) {
        Page<Product> products = productService.getProducts(page, size, sortField, sortDirection, minPrice, maxPrice,
                keyword);
        Map<String, Object> map = new HashMap<>();
        map.put("products", products.getContent());
        map.put("currentPage", products.getNumber());
        map.put("totalItems", products.getTotalElements());
        map.put("totalPages", products.getTotalPages());
        return new ResponseEntity<>(map, HttpStatus.OK);
    }

    @Operation(summary = "Gets 4 recently added products")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Latest 4 products displayed successfully"),
            @ApiResponse(responseCode = "404", description = "Latest products are not available") })
    @GetMapping("/latest")
    public ResponseEntity<List<ProductDTO>> getLatestProducts() throws ProductServiceException {

        return ResponseEntity.ok(productService.getLatestProducts());
    }

    @Operation(summary = "Gets top 6 best selling products")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Top 6 best selling products displayed successfully"),
            @ApiResponse(responseCode = "404", description = "Best selling products are not available") })
    @GetMapping("/top-selling")
    public ResponseEntity<List<ProductDTO>> getTopSellingProducts() throws ProductServiceException {

        return ResponseEntity.ok(productService.getTopSellingProducts());
    }

}
