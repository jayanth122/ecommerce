package com.fdmgroup.Retail_POD_backend.model.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MyAccountUserInfoDTO {
    private long id;
    private String firstname;
    private String lastname;
    private String username;
    private String email;
    private String phoneNumber;
    private String street;
    private String city;
    private String state;
    private String country;
    private String zipcode;
}
