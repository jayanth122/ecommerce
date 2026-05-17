package com.fdmgroup.Retail_POD_backend.model.mapper;

import com.fdmgroup.Retail_POD_backend.model.DTO.ReviewDTO;
import com.fdmgroup.Retail_POD_backend.model.Product;
import com.fdmgroup.Retail_POD_backend.model.Review;
import com.fdmgroup.Retail_POD_backend.model.User;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-04-23T15:46:24-0400",
    comments = "version: 1.6.0.Beta2, compiler: javac, environment: Java 23.0.2 (Oracle Corporation)"
)
@Component
public class ReviewMapperImpl implements ReviewMapper {

    @Override
    public ReviewDTO toReviewDTO(Review review) {
        if ( review == null ) {
            return null;
        }

        ReviewDTO reviewDTO = new ReviewDTO();

        reviewDTO.setUserId( reviewUserId( review ) );
        reviewDTO.setProductId( reviewProductId( review ) );
        reviewDTO.setId( review.getId() );
        reviewDTO.setRating( review.getRating() );
        reviewDTO.setTitle( review.getTitle() );
        reviewDTO.setDescription( review.getDescription() );
        reviewDTO.setCreatedAt( review.getCreatedAt() );

        reviewDTO.setUserFullName( review.getUser().getFirstname() + " " + review.getUser().getLastname() );

        return reviewDTO;
    }

    @Override
    public Review toReviewEntity(ReviewDTO reviewDTO) {
        if ( reviewDTO == null ) {
            return null;
        }

        Review review = new Review();

        review.setUser( reviewDTOToUser( reviewDTO ) );
        review.setProduct( reviewDTOToProduct( reviewDTO ) );
        review.setId( reviewDTO.getId() );
        review.setRating( reviewDTO.getRating() );
        review.setTitle( reviewDTO.getTitle() );
        review.setDescription( reviewDTO.getDescription() );
        review.setCreatedAt( reviewDTO.getCreatedAt() );

        return review;
    }

    private long reviewUserId(Review review) {
        User user = review.getUser();
        if ( user == null ) {
            return 0L;
        }
        return user.getId();
    }

    private long reviewProductId(Review review) {
        Product product = review.getProduct();
        if ( product == null ) {
            return 0L;
        }
        return product.getId();
    }

    protected User reviewDTOToUser(ReviewDTO reviewDTO) {
        if ( reviewDTO == null ) {
            return null;
        }

        User user = new User();

        user.setId( reviewDTO.getUserId() );

        return user;
    }

    protected Product reviewDTOToProduct(ReviewDTO reviewDTO) {
        if ( reviewDTO == null ) {
            return null;
        }

        Product product = new Product();

        product.setId( reviewDTO.getProductId() );

        return product;
    }
}
