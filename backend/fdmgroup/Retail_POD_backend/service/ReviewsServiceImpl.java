package com.fdmgroup.Retail_POD_backend.service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.fdmgroup.Retail_POD_backend.model.DTO.ReviewDTO;
import com.fdmgroup.Retail_POD_backend.model.mapper.ReviewMapper;
import com.fdmgroup.Retail_POD_backend.repository.ReviewsRepository;

import lombok.AllArgsConstructor;
@Service
@AllArgsConstructor
public class ReviewsServiceImpl implements ReviewsService {

    private ReviewsRepository reviewsRepository;
    
    private ReviewMapper reviewMapper;
    
    @Override
    public List<ReviewDTO> getReviewsByProductId(long productId) {
        return reviewsRepository.findByProductId(productId).stream()

                .map(reviewMapper::toReviewDTO) 


                .sorted(Comparator.comparing(ReviewDTO::getCreatedAt).reversed())
                .collect(Collectors.toList());
    }
}
