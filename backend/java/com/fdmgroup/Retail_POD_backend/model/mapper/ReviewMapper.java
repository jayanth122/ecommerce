package com.fdmgroup.Retail_POD_backend.model.mapper;

import com.fdmgroup.Retail_POD_backend.model.DTO.ReviewDTO;
import com.fdmgroup.Retail_POD_backend.model.Review;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface ReviewMapper {

    @Mapping(source = "user.id", target = "userId")
    @Mapping(source = "product.id", target = "productId")
    @Mapping(expression = "java(review.getUser().getFirstname() + \" \" + review.getUser().getLastname())", target = "userFullName")
    ReviewDTO toReviewDTO(Review review);

    @Mapping(source = "userId", target = "user.id")
    @Mapping(source = "productId", target = "product.id")
    Review toReviewEntity(ReviewDTO reviewDTO);
}
