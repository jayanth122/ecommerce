package com.fdmgroup.Retail_POD_backend.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class CartItemNotFoundException extends RuntimeException{
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	public CartItemNotFoundException() {
		super("cart item does not exist");
	}
	public CartItemNotFoundException(long id) {
		super(String.format("cart item with id=%d does not exist", id));
	}
}
