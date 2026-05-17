package com.fdmgroup.Retail_POD_backend.service;

import java.util.List;

import com.fdmgroup.Retail_POD_backend.model.DTO.ReviewDTO;

public interface ReviewsService {
    List<ReviewDTO> getReviewsByProductId(long productId);


}

