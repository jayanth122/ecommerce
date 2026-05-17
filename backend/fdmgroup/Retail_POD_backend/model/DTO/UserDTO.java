package com.fdmgroup.Retail_POD_backend.model.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserDTO {
	
    String username;
    String password;
    

	public String getUsername() {
		return this.username;
	}

	public String getPassword() {
		return this.password;
	}
}
