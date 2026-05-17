package com.fdmgroup.Retail_POD_backend.service;

import com.fdmgroup.Retail_POD_backend.model.DTO.CartDTO;

import java.util.List;

import com.fdmgroup.Retail_POD_backend.model.Cart;
import com.fdmgroup.Retail_POD_backend.model.DTO.CartItemDTO;

import jakarta.validation.Valid;

public interface CartService {
    CartDTO getShoppingCart(String username);
	Cart addItemToCart(String username, @Valid CartItemDTO cartItemDTO);
	void addItemsToCart(String username, List<CartItemDTO> cartItemDTOs);

}
