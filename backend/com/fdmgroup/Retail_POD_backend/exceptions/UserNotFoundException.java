package com.fdmgroup.Retail_POD_backend.exceptions;

import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.http.HttpStatus;

@ResponseStatus(HttpStatus.NOT_FOUND)
public class UserNotFoundException extends RuntimeException {

	public UserNotFoundException(String message) {
		super(message);
	}
	
	public UserNotFoundException(long id) {
		super("User with id=" + id + " does not exist");
	}

}
