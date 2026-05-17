package com.fdmgroup.Retail_POD_backend.service;

import com.fdmgroup.Retail_POD_backend.model.User;
import com.fdmgroup.Retail_POD_backend.model.DTO.MyAccountUserInfoDTO;
import com.fdmgroup.Retail_POD_backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class MyAccountServiceImplTest {

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private MyAccountServiceImpl myAccountService;

    private User testUser;

    @BeforeEach
    void setUp() {
        testUser = new User(
                1L, "John", "Doe", "johndoe", "password123", "john@example.com",
                null, null, 1, "1234567890", "123 Street", "New York",
                "NY", "USA", "10001"
        );
    }

    @Test
    void getUserAccountInfoByUsername_ReturnsUserInfo_WhenUserExists() {
        when(userRepository.findByUsername("johndoe")).thenReturn(Optional.of(testUser));

        MyAccountUserInfoDTO result = myAccountService.getUserAccountInfoByUsername("johndoe");
        assertNotNull(result);
        assertEquals(testUser.getId(), result.getId());
        assertEquals(testUser.getFirstname(), result.getFirstname());
        assertEquals(testUser.getLastname(), result.getLastname());
        assertEquals(testUser.getUsername(), result.getUsername());
        assertEquals(testUser.getEmail(), result.getEmail());
        assertEquals(testUser.getPhoneNumber(), result.getPhoneNumber());
        assertEquals(testUser.getStreet(), result.getStreet());
        assertEquals(testUser.getCity(), result.getCity());
        assertEquals(testUser.getState(), result.getState());
        assertEquals(testUser.getCountry(), result.getCountry());
        assertEquals(testUser.getZipcode(), result.getZipcode());

        verify(userRepository, times(1)).findByUsername("johndoe");
    }

    @Test
    void getUserAccountInfoByUsername_ThrowsException_WhenUserNotFound() {
 
        when(userRepository.findByUsername("unknownUser")).thenReturn(Optional.empty());

        Exception exception = assertThrows(RuntimeException.class, 
            () -> myAccountService.getUserAccountInfoByUsername("unknownUser"));
        
        assertEquals("User not found", exception.getMessage());

        verify(userRepository, times(1)).findByUsername("unknownUser");
    }
}
