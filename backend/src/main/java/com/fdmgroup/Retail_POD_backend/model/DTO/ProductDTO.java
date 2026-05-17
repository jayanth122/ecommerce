package com.fdmgroup.Retail_POD_backend.model.DTO;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductDTO {

    private long id;
    private String productName;
    private String productDescription;
    private String categoryName;      
    private String subCategoryName;   
    private String brandName;       
    private BigDecimal listPrice;
    private List<String> imageUrls;   
    private List<StockDTO> stock;    
    private LocalDate createdAt;
    private LocalDate updatedAt;
    private double averageRating;
    private int numberOfReviews;
}
