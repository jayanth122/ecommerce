package com.fdmgroup.Retail_POD_backend.exceptions;

import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

	@ExceptionHandler({ CategoryNotFoundException.class, UserNotFoundException.class, ProductNotFoundException.class,
			CartItemNotFoundException.class })
	public ResponseEntity<String> handleNotFound(RuntimeException ex) {
		return new ResponseEntity<>(ex.getMessage(), HttpStatus.NOT_FOUND);
	}
}
