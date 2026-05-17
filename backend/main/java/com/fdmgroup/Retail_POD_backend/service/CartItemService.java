package com.fdmgroup.Retail_POD_backend.service;

public interface CartItemService {

	void updateQuantity(Long cartItemId, int newQuantity);

	void removeItem(long cartItemId);
}
