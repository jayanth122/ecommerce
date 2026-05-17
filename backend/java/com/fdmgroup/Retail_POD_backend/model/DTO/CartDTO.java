package com.fdmgroup.Retail_POD_backend.model.DTO;

import java.util.List;

import com.fdmgroup.Retail_POD_backend.enums.CartType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CartDTO {
	private CartType type;
	private long  userId;
	private List<CartItemDTO> cartItems;
}
