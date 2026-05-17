package com.fdmgroup.Retail_POD_backend.model.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserAddressDTO {
    private int userAddressId;
    private boolean isDefault;
    private Date createdAt;
    private int userId;
    private int countryAddressId;
    private String streetName;
    private int streetNumber;
    private String postalCode;
    private double latitude;
    private double longitude;
    private int cityId;
}
