package com.fdmgroup.Retail_POD_backend.controller;

import com.fdmgroup.Retail_POD_backend.model.DTO.DeliveryAddressDTO;
import com.fdmgroup.Retail_POD_backend.service.UserAddressService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/delivery-addresses")
@AllArgsConstructor
public class UserAddressController {

    private final UserAddressService userAddressService;


    @GetMapping("/getUserAddresses")
    public ResponseEntity<List<DeliveryAddressDTO>> getUserAddresses() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        List<DeliveryAddressDTO> addresses = userAddressService.getAddressesByUsername(username);
        return ResponseEntity.ok(addresses);
    }
    
    @GetMapping("/getDefaultUserAddress")
    public ResponseEntity<DeliveryAddressDTO> getDefaultUserAddress() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userAddressService.getDefaultUserAddress(username)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }


    @PostMapping("/addNewAddress")
    public ResponseEntity<String> addUserAddress(@RequestBody DeliveryAddressDTO deliveryAddressDTO) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        userAddressService.addAddress(username, deliveryAddressDTO);
        return ResponseEntity.ok("Delivery address added successfully");
    }
    
    @PutMapping("/updateAddress")
    public ResponseEntity<String> updateUserAddress(@RequestBody DeliveryAddressDTO deliveryAddressDTO) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        userAddressService.updateAddress(username, deliveryAddressDTO);
        return ResponseEntity.ok("Address updated successfully");
    }

    @DeleteMapping("/deleteAddress/{addressId}")
    public ResponseEntity<String> deleteUserAddress(@PathVariable long addressId) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        userAddressService.deleteAddress(username, addressId);
        return ResponseEntity.ok("Address deleted successfully");
    }

}
