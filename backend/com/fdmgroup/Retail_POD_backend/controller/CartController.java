package com.fdmgroup.Retail_POD_backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;

import org.springframework.web.bind.annotation.RestController;

import com.fdmgroup.Retail_POD_backend.model.DTO.CartDTO;
import com.fdmgroup.Retail_POD_backend.service.CartService;

import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;


import com.fdmgroup.Retail_POD_backend.model.Cart;
import com.fdmgroup.Retail_POD_backend.model.DTO.CartItemDTO;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v1/cart")
@AllArgsConstructor
public class CartController {
	
	private CartService cartService;

    
    @GetMapping("/")
	public ResponseEntity<CartDTO> getCart() {
		
    	String username = SecurityContextHolder.getContext().getAuthentication().getName();
    	
		return ResponseEntity.ok(cartService.getShoppingCart(username));
	}
    
    @PostMapping("/add-item")
    public ResponseEntity<String> addItemToCart(@RequestBody @Valid CartItemDTO cartItemDTO) {
    	String username = SecurityContextHolder.getContext().getAuthentication().getName();
    	
        cartService.addItemToCart(username, cartItemDTO);
        return ResponseEntity.ok("Item Added to Cart");
    }
    
    @PostMapping("/add-items")
    public ResponseEntity<String> addItemsToCart(@RequestBody @Valid List<CartItemDTO> cartItemDTOs) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        
        cartService.addItemsToCart(username, cartItemDTOs);
        return ResponseEntity.ok("Items Added to Cart");
    }

}