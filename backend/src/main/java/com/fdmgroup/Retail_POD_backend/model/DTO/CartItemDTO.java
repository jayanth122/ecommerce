package com.fdmgroup.Retail_POD_backend.model.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartItemDTO {
	private long cartItemId;
    private int quantity;
    private String size;
    private boolean isActive;
    private long productId;
//    private ProductDTO Product;
}
