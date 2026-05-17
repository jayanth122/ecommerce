package com.fdmgroup.Retail_POD_backend.exceptions;

import java.util.function.Supplier;

public class ProductNotFoundException extends RuntimeException {

	public ProductNotFoundException(long id) {
		super("Product with ID " + id + " not found");
	}

}
