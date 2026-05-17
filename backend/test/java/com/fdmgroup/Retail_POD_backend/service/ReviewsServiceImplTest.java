package com.fdmgroup.Retail_POD_backend.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import com.fdmgroup.Retail_POD_backend.model.DTO.ReviewDTO;
import com.fdmgroup.Retail_POD_backend.model.Review;
import com.fdmgroup.Retail_POD_backend.model.mapper.ReviewMapper;
import com.fdmgroup.Retail_POD_backend.repository.ReviewsRepository;

@ExtendWith(MockitoExtension.class)
class ReviewsServiceImplTest {

    @Mock
    private ReviewsRepository reviewsRepository;

    @Mock
    private ReviewMapper reviewMapper;

    @InjectMocks
    private ReviewsServiceImpl reviewsService;

    private Review review1;
    private Review review2;
    private ReviewDTO reviewDTO1;
    private ReviewDTO reviewDTO2;

    @BeforeEach
    void setUp() {
        long productId = 1L;
        
        review1 = new Review(1L, 5, "Excellent", "Best product!", LocalDate.now(), null, null);
        review2 = new Review(2L, 4, "Good", "Worth it!", LocalDate.now().minusDays(1), null, null);

        reviewDTO1 = new ReviewDTO(1L, 5, "Excellent", "Best product!", LocalDate.now(), 2L, productId, "dani jackson");
        reviewDTO2 = new ReviewDTO(2L, 4, "Good", "Worth it!", LocalDate.now().minusDays(1), 3L, productId, "will smith");
    }

    @Test
    void testGetReviewsByProductId_ReturnsSortedReviewDTOs() {
        long productId = 1L;

        when(reviewsRepository.findByProductId(productId)).thenReturn(Arrays.asList(review1, review2));
        when(reviewMapper.toReviewDTO(review1)).thenReturn(reviewDTO1);
        when(reviewMapper.toReviewDTO(review2)).thenReturn(reviewDTO2);

        List<ReviewDTO> result = reviewsService.getReviewsByProductId(productId);

        assertEquals(2, result.size());
        assertEquals("Excellent", result.get(0).getTitle()); 
        assertEquals("Good", result.get(1).getTitle());
    }

    @Test
    void testGetReviewsByProductId_ReturnsEmptyListWhenNoReviews() {
        long productId = 1L;

        when(reviewsRepository.findByProductId(productId)).thenReturn(List.of());

        List<ReviewDTO> result = reviewsService.getReviewsByProductId(productId);

        assertTrue(result.isEmpty());
    }
}
