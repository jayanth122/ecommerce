package com.fdmgroup.Retail_POD_backend.service;

import org.springframework.stereotype.Service;

import com.fdmgroup.Retail_POD_backend.exceptions.CartItemNotFoundException;
import com.fdmgroup.Retail_POD_backend.model.CartItem;
import com.fdmgroup.Retail_POD_backend.repository.CartItemRepository;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class CartItemServiceImpl implements CartItemService {

	private CartItemRepository cartItemRepo;

	public void updateQuantity(Long cartItemId, int newQuantity) {
	    CartItem cartItem = cartItemRepo.findById(cartItemId)
	        .orElseThrow(() -> new CartItemNotFoundException(cartItemId));

	    cartItem.setQuantity(newQuantity);
	    cartItemRepo.save(cartItem);
	}

	@Override
	public void removeItem(long cartItemId) {
		cartItemRepo.deleteById(cartItemId);
	}


}
