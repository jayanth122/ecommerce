package com.fdmgroup.Retail_POD_backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fdmgroup.Retail_POD_backend.model.Review;

public interface ReviewsRepository extends JpaRepository<Review,Long> {

	List<Review> findByProductId(long productId);
}