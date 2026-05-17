package com.fdmgroup.Retail_POD_backend.controller;

import com.fdmgroup.Retail_POD_backend.model.DTO.DeliveryAddressDTO;
import com.fdmgroup.Retail_POD_backend.service.UserAddressService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

class UserAddressControllerTest {

    @InjectMocks
    private UserAddressController userAddressController;

    @Mock
    private UserAddressService userAddressService;

    @Mock
    private SecurityContext securityContext;

    @Mock
    private Authentication authentication;

    private final String mockUsername = "testUser";

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        
        // Mock security context to return username
        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.getName()).thenReturn(mockUsername);
        SecurityContextHolder.setContext(securityContext);
    }

    @Test
    void testGetUserAddresses_ReturnsAddressList() {
        DeliveryAddressDTO address1 = new DeliveryAddressDTO();
        DeliveryAddressDTO address2 = new DeliveryAddressDTO();
        List<DeliveryAddressDTO> addresses = List.of(address1, address2);

        when(userAddressService.getAddressesByUsername(mockUsername)).thenReturn(addresses);

        ResponseEntity<List<DeliveryAddressDTO>> response = userAddressController.getUserAddresses();

        assertEquals(200, response.getStatusCodeValue());
        assertEquals(2, response.getBody().size());
    }

    @Test
    void testGetDefaultUserAddress_ReturnsDefaultAddress() {
        DeliveryAddressDTO defaultAddress = new DeliveryAddressDTO();
        defaultAddress.setDefault(true);

        when(userAddressService.getDefaultUserAddress(mockUsername)).thenReturn(Optional.of(defaultAddress));

        ResponseEntity<DeliveryAddressDTO> response = userAddressController.getDefaultUserAddress();

        assertEquals(200, response.getStatusCodeValue());
        assertTrue(response.getBody().isDefault());
    }

    @Test
    void testGetDefaultUserAddress_NotFound() {
        when(userAddressService.getDefaultUserAddress(mockUsername)).thenReturn(Optional.empty());

        ResponseEntity<DeliveryAddressDTO> response = userAddressController.getDefaultUserAddress();

        assertEquals(404, response.getStatusCodeValue());
    }

    @Test
    void testAddUserAddress_Success() {
        DeliveryAddressDTO newAddress = new DeliveryAddressDTO();

        doNothing().when(userAddressService).addAddress(mockUsername, newAddress);

        ResponseEntity<String> response = userAddressController.addUserAddress(newAddress);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Delivery address added successfully", response.getBody());
    }
    @Test
    void testUpdateUserAddress_Success() {
        DeliveryAddressDTO updatedAddress = new DeliveryAddressDTO();
        updatedAddress.setId(1L);

        doNothing().when(userAddressService).updateAddress(mockUsername, updatedAddress);

        ResponseEntity<String> response = userAddressController.updateUserAddress(updatedAddress);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Address updated successfully", response.getBody());
    }
    @Test
    void testDeleteUserAddress_Success() {
        long addressId = 1L;

        doNothing().when(userAddressService).deleteAddress(mockUsername, addressId);

        ResponseEntity<String> response = userAddressController.deleteUserAddress(addressId);

        assertEquals(200, response.getStatusCodeValue());
        assertEquals("Address deleted successfully", response.getBody());
    }


}
