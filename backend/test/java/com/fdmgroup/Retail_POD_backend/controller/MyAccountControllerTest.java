package com.fdmgroup.Retail_POD_backend.controller;

import com.fdmgroup.Retail_POD_backend.model.DTO.MyAccountUserInfoDTO;
import com.fdmgroup.Retail_POD_backend.service.MyAccountService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

@ExtendWith(MockitoExtension.class)
class MyAccountControllerTest {

    @Mock
    private MyAccountService myAccountService;

    @InjectMocks
    private MyAccountController myAccountController;

    private MyAccountUserInfoDTO userInfoDTO;

    @BeforeEach
    void setUp() {
        userInfoDTO = new MyAccountUserInfoDTO(
                1L, "John", "Doe", "johndoe", "john@example.com", "1234567890",
                "123 Street", "New York", "NY", "USA", "10001"
        );

        // Mock Security Context to return a username
        Authentication authentication = mock(Authentication.class);
        SecurityContext securityContext = mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        when(authentication.getName()).thenReturn("johndoe");
        SecurityContextHolder.setContext(securityContext);
    }

    @Test
    void getUserAccountInfoByUsername_ReturnsUserInfo() {
        // Arrange
        when(myAccountService.getUserAccountInfoByUsername("johndoe")).thenReturn(userInfoDTO);

        // Act
        ResponseEntity<MyAccountUserInfoDTO> response = myAccountController.getUserAccountInfoByUsername();

        // Assert
        assertNotNull(response);
        assertEquals(200, response.getStatusCodeValue());
        assertEquals(userInfoDTO, response.getBody());

        verify(myAccountService, times(1)).getUserAccountInfoByUsername("johndoe");
    }

    @Test
    void getUserAccountInfoByUsername_ThrowsException() {
        // Arrange
        when(myAccountService.getUserAccountInfoByUsername("johndoe"))
                .thenThrow(new RuntimeException("User not found"));

        // Act & Assert
        Exception exception = assertThrows(RuntimeException.class, 
            () -> myAccountController.getUserAccountInfoByUsername());

        assertEquals("User not found", exception.getMessage());

        verify(myAccountService, times(1)).getUserAccountInfoByUsername("johndoe");
    }
}
