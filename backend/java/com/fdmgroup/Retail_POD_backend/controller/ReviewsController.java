package com.fdmgroup.Retail_POD_backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fdmgroup.Retail_POD_backend.model.DTO.ReviewDTO;
import com.fdmgroup.Retail_POD_backend.service.ReviewsService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.AllArgsConstructor;

@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/public/product")
public class ReviewsController {

    private ReviewsService reviewsService;

    @Operation(summary = "Get all reviews for a product", description = "Fetch all reviews for a given product ID")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Successfully retrieved reviews"),
            @ApiResponse(responseCode = "404", description = "Product not found")
    })
    @GetMapping("/{productId}/reviews")
    public ResponseEntity<?> getReviewsByProductId(@PathVariable long productId) {
        List<ReviewDTO> reviews = reviewsService.getReviewsByProductId(productId);

        if (reviews.isEmpty()) {
            return ResponseEntity.ok("No Reviews Available");
        }

        return ResponseEntity.ok(reviews);
    }
}
