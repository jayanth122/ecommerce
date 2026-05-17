package com.fdmgroup.Retail_POD_backend.model.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StockDTO {

    private String size;      // Product size
    private int quantity;     // Stock quantity
}
