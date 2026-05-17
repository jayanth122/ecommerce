package com.fdmgroup.Retail_POD_backend.service;

import com.fdmgroup.Retail_POD_backend.model.DTO.DeliveryAddressDTO;
import com.fdmgroup.Retail_POD_backend.model.DTO.UserAddressDTO;

import java.util.List;
import java.util.Optional;

public interface UserAddressService {
    List<DeliveryAddressDTO> getAddressesByUsername(String username);
    void addAddress(String username, DeliveryAddressDTO deliveryAddressDTO);
    Optional<DeliveryAddressDTO> getDefaultUserAddress(String username);
    void updateAddress(String username, DeliveryAddressDTO deliveryAddressDTO);
    void deleteAddress(String username, long addressId);
}
