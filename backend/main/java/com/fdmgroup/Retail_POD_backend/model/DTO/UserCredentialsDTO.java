package com.fdmgroup.Retail_POD_backend.model.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UserCredentialsDTO {
    private String username;
    private String email;
}
