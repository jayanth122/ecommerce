package com.fdmgroup.Retail_POD_backend.controller;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.time.LocalDate;
import java.util.Arrays;
import java.util.List;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.beans.factory.annotation.Autowired;

import com.fdmgroup.Retail_POD_backend.model.DTO.ReviewDTO;
import com.fdmgroup.Retail_POD_backend.service.MyUserDetailsService;
import com.fdmgroup.Retail_POD_backend.service.ReviewsService;
import com.fdmgroup.Retail_POD_backend.utils.JwtRequestFilter;

@WebMvcTest(ReviewsController.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc(addFilters = false) 
class ReviewsControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private ReviewsService reviewsService;

    @MockBean
    private JwtRequestFilter jwtRequestFilter; 

    @MockBean
    private MyUserDetailsService myUserDetailsService;

    @Test
    void testGetReviewsByProductId_ReturnsReviews() throws Exception {
        long productId = 1L;

        List<ReviewDTO> mockReviews = Arrays.asList(
                new ReviewDTO(1L, 5, "Great product", "Loved it!", LocalDate.now(), 2L, productId, "John Doe"),
                new ReviewDTO(2L, 4, "Good", "Value for money", LocalDate.now().minusDays(1), 3L, productId, "Jane Smith")
        );

        when(reviewsService.getReviewsByProductId(productId)).thenReturn(mockReviews);

        mockMvc.perform(get("/api/v1/public/product/{productId}/reviews", productId)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].title").value("Great product"))
                .andExpect(jsonPath("$[1].title").value("Good"));
    }

    @Test
    void testGetReviewsByProductId_ReturnsNoReviewsMessage() throws Exception {
        long productId = 1L;

        when(reviewsService.getReviewsByProductId(productId)).thenReturn(List.of());

        mockMvc.perform(get("/api/v1/public/product/{productId}/reviews", productId)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().string("No Reviews Available"));
    }
}
