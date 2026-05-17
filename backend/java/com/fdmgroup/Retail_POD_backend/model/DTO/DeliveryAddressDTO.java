package com.fdmgroup.Retail_POD_backend.model.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.Date;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class DeliveryAddressDTO {
    private long id;
    private String firstName;
    private String lastName;
    private String phoneNumber;
    private String unitNumber;
    private int streetNumber;
    private String streetName;
    private String postalCode;
    private String city;
    private String stateProvince;
    private String country;
    private Double latitude;
    private Double longitude;
    private boolean isDefault;
    private Date createdAt;
    private Date updatedAt;
}
