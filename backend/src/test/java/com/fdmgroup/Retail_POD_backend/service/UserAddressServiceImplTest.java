package com.fdmgroup.Retail_POD_backend.service;

import com.fdmgroup.Retail_POD_backend.exceptions.UserNotFoundException;
import com.fdmgroup.Retail_POD_backend.model.DeliveryAddress;
import com.fdmgroup.Retail_POD_backend.model.DTO.DeliveryAddressDTO;
import com.fdmgroup.Retail_POD_backend.model.User;
import com.fdmgroup.Retail_POD_backend.model.mapper.DeliveryAddressMapper;
import com.fdmgroup.Retail_POD_backend.repository.DeliveryAddressRepository;
import com.fdmgroup.Retail_POD_backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
public class UserAddressServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private DeliveryAddressRepository deliveryAddressRepository;

    @Mock
    private DeliveryAddressMapper deliveryAddressMapper;

    @InjectMocks
    private UserAddressServiceImpl userAddressService;

    private User user;
    private DeliveryAddress address;
    private DeliveryAddressDTO addressDTO;

    @BeforeEach
    void setUp() {
        user = new User();
        user.setId(1L);
        user.setUsername("testUser");

        address = new DeliveryAddress();
        address.setId(1L);
        address.setUserId(user.getId());
        address.setFirstName("John");
        address.setLastName("Doe");
        address.setStreetNumber(123);
        address.setStreetName("Main St");
        address.setCity("City");
        address.setStateProvince("State");
        address.setCountry("Country");
        address.setPostalCode("12345");
        address.setPhoneNumber("1234567890");
        address.setCreatedAt(new Date());
        address.setUpdatedAt(new Date());
        address.setDefault(true);

        addressDTO = new DeliveryAddressDTO();
        addressDTO.setId(1L);
        addressDTO.setFirstName("John");
        addressDTO.setLastName("Doe");
        addressDTO.setStreetNumber(123);
        addressDTO.setStreetName("Main St");
        addressDTO.setCity("City");
        addressDTO.setStateProvince("State");
        addressDTO.setCountry("Country");
        addressDTO.setPostalCode("12345");
        addressDTO.setPhoneNumber("1234567890");
        addressDTO.setDefault(true);
    }

    @Test
    void testGetAddressesByUsername_Success() {
        when(userRepository.findByUsername("testUser")).thenReturn(Optional.of(user));
        when(deliveryAddressRepository.findByUserId(user.getId())).thenReturn(List.of(address));
        when(deliveryAddressMapper.toDTO(address)).thenReturn(addressDTO);

        List<DeliveryAddressDTO> result = userAddressService.getAddressesByUsername("testUser");

        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals(addressDTO, result.get(0));
        verify(userRepository, times(1)).findByUsername("testUser");
        verify(deliveryAddressRepository, times(1)).findByUserId(user.getId());
    }

    @Test
    void testGetAddressesByUsername_UserNotFound() {
        when(userRepository.findByUsername("testUser")).thenReturn(Optional.empty());

        assertThrows(UserNotFoundException.class, () -> userAddressService.getAddressesByUsername("testUser"));

        verify(userRepository, times(1)).findByUsername("testUser");
        verify(deliveryAddressRepository, never()).findByUserId(anyLong());
    }

    @Test
    void testAddAddress_Success() {
        when(userRepository.findByUsername("testUser")).thenReturn(Optional.of(user));
        when(deliveryAddressMapper.toEntity(addressDTO, user.getId())).thenReturn(address);

        userAddressService.addAddress("testUser", addressDTO);

        verify(deliveryAddressRepository, times(1)).updateDefaultAddresses(user.getId(), false);
        verify(deliveryAddressRepository, times(1)).save(any(DeliveryAddress.class));
    }

    @Test
    void testAddAddress_UserNotFound() {
        when(userRepository.findByUsername("testUser")).thenReturn(Optional.empty());

        assertThrows(UserNotFoundException.class, () -> userAddressService.addAddress("testUser", addressDTO));

        verify(deliveryAddressRepository, never()).save(any());
    }

    @Test
    void testGetDefaultUserAddress_Success() {
        when(userRepository.findByUsername("testUser")).thenReturn(Optional.of(user));
        when(deliveryAddressRepository.findByUserIdAndIsDefaultTrue(user.getId())).thenReturn(Optional.of(address));
        when(deliveryAddressMapper.toDTO(address)).thenReturn(addressDTO);

        Optional<DeliveryAddressDTO> result = userAddressService.getDefaultUserAddress("testUser");

        assertTrue(result.isPresent());
        assertEquals(addressDTO, result.get());
        verify(userRepository, times(1)).findByUsername("testUser");
        verify(deliveryAddressRepository, times(1)).findByUserIdAndIsDefaultTrue(user.getId());
    }

    @Test
    void testGetDefaultUserAddress_UserNotFound() {
        when(userRepository.findByUsername("testUser")).thenReturn(Optional.empty());

        assertThrows(UserNotFoundException.class, () -> userAddressService.getDefaultUserAddress("testUser"));

        verify(deliveryAddressRepository, never()).findByUserIdAndIsDefaultTrue(anyLong());
    }

    @Test
    void testGetDefaultUserAddress_NoDefaultAddress() {
        when(userRepository.findByUsername("testUser")).thenReturn(Optional.of(user));
        when(deliveryAddressRepository.findByUserIdAndIsDefaultTrue(user.getId())).thenReturn(Optional.empty());

        Optional<DeliveryAddressDTO> result = userAddressService.getDefaultUserAddress("testUser");

        assertFalse(result.isPresent());
        verify(userRepository, times(1)).findByUsername("testUser");
        verify(deliveryAddressRepository, times(1)).findByUserIdAndIsDefaultTrue(user.getId());
    }
    
    @Test
    void testUpdateAddress_Success() {
        when(userRepository.findByUsername("testUser")).thenReturn(Optional.of(user));
        when(deliveryAddressRepository.findById(addressDTO.getId())).thenReturn(Optional.of(address));
        when(deliveryAddressMapper.toEntity(addressDTO, user.getId())).thenReturn(address);

        userAddressService.updateAddress("testUser", addressDTO);

        verify(deliveryAddressRepository, times(1)).save(any(DeliveryAddress.class));
    }
    @Test
    void testUpdateAddress_UserNotFound() {
        when(userRepository.findByUsername("testUser")).thenReturn(Optional.empty());

        assertThrows(UserNotFoundException.class, () -> userAddressService.updateAddress("testUser", addressDTO));

        verify(deliveryAddressRepository, never()).save(any());
    }
    @Test
    void testUpdateAddress_AddressNotFound() {
        when(userRepository.findByUsername("testUser")).thenReturn(Optional.of(user));
        when(deliveryAddressRepository.findById(addressDTO.getId())).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () ->
                userAddressService.updateAddress("testUser", addressDTO));
        assertEquals("Address not found with ID: " + addressDTO.getId(), exception.getMessage());
    }
    @Test
    void testUpdateAddress_UnauthorizedUser() {
        address.setUserId(999L); // simulate address owned by another user

        when(userRepository.findByUsername("testUser")).thenReturn(Optional.of(user));
        when(deliveryAddressRepository.findById(addressDTO.getId())).thenReturn(Optional.of(address));

        RuntimeException exception = assertThrows(RuntimeException.class, () ->
                userAddressService.updateAddress("testUser", addressDTO));
        assertEquals("Unauthorized operation. Address does not belong to user.", exception.getMessage());
    }
    @Test
    void testDeleteAddress_Success() {
        when(userRepository.findByUsername("testUser")).thenReturn(Optional.of(user));
        when(deliveryAddressRepository.findById(address.getId())).thenReturn(Optional.of(address));

        userAddressService.deleteAddress("testUser", address.getId());

        verify(deliveryAddressRepository, times(1)).delete(address);
    }
    @Test
    void testDeleteAddress_AddressNotFound() {
        when(userRepository.findByUsername("testUser")).thenReturn(Optional.of(user));
        when(deliveryAddressRepository.findById(address.getId())).thenReturn(Optional.empty());

        RuntimeException exception = assertThrows(RuntimeException.class, () ->
                userAddressService.deleteAddress("testUser", address.getId()));
        assertEquals("Address not found with ID: " + address.getId(), exception.getMessage());
    }
    @Test
    void testDeleteAddress_UnauthorizedUser() {
        address.setUserId(999L); // simulate address owned by someone else

        when(userRepository.findByUsername("testUser")).thenReturn(Optional.of(user));
        when(deliveryAddressRepository.findById(address.getId())).thenReturn(Optional.of(address));

        RuntimeException exception = assertThrows(RuntimeException.class, () ->
                userAddressService.deleteAddress("testUser", address.getId()));
        assertEquals("Unauthorized operation. Address does not belong to user.", exception.getMessage());
    }

}
