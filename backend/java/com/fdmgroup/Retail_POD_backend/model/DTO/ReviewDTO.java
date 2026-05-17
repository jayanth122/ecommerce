package com.fdmgroup.Retail_POD_backend.model.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ReviewDTO {
    private long id;
    private int rating;
    private String title;
    private String description;
    private LocalDate createdAt;
    private long userId;       // To represent the User entity
    private long productId;    // To represent the Product entity
    private String userFullName; // To include user's full name
}
