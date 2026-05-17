package com.fdmgroup.Retail_POD_backend.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import java.util.List;
import java.util.Optional;
import java.util.Arrays;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;

import com.fdmgroup.Retail_POD_backend.exceptions.UserNotFoundException;
import com.fdmgroup.Retail_POD_backend.model.User;
import com.fdmgroup.Retail_POD_backend.model.DTO.PasswordUpdateDTO;
import com.fdmgroup.Retail_POD_backend.model.DTO.UserCredentialsDTO;
import com.fdmgroup.Retail_POD_backend.model.DTO.UserPersonalInfoDTO;
import com.fdmgroup.Retail_POD_backend.model.mapper.UserPersonalInfoMapper;
import com.fdmgroup.Retail_POD_backend.repository.UserRepository;

class UserServiceTest {

    @Mock
    private UserRepository userRepository;

    @Mock
    private PasswordEncoder passwordEncoder;

    @InjectMocks
    private UserService userService;

    @Mock
    private UserPersonalInfoMapper personalInfoMapper;

    private User mockUser;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
        mockUser = new User(1L, "Jayy", "Jay", "jayyjay", "jayyjay", "jayy@fdm.com", null, null, 1,"4564564563", null, null, null, null, null);
    }

    @Test
    void testGetUsers_ReturnsUserList() {
        when(userRepository.findAll()).thenReturn(Arrays.asList(mockUser));

        List<User> users = userService.getUsers();

        assertFalse(users.isEmpty());
        assertEquals(1, users.size());
        assertEquals("jayyjay", users.get(0).getUsername());
    }

    @Test
    void testGetUserByID_UserExists() {
        when(userRepository.findById(1L)).thenReturn(Optional.of(mockUser));

        User foundUser = userService.getUserByID(1L);

        assertNotNull(foundUser);
        assertEquals("jayyjay", foundUser.getUsername());
    }

    @Test
    void testGetUserByID_UserNotFound() {
        when(userRepository.findById(1L)).thenReturn(Optional.empty());

        assertThrows(UserNotFoundException.class, () -> userService.getUserByID(1L));
    }

    @Test
    void testCreateUser_UserCreatedSuccessfully() {
        when(userRepository.existsByEmail(mockUser.getEmail())).thenReturn(false);
        when(userRepository.existsByUsername(mockUser.getUsername())).thenReturn(false);
        when(passwordEncoder.encode(mockUser.getPassword())).thenReturn("encodedPassword");
        when(userRepository.save(any(User.class))).thenReturn(mockUser);

        User createdUser = userService.createUser(mockUser);

        assertNotNull(createdUser);
        assertEquals("jayyjay", createdUser.getUsername());
        verify(passwordEncoder).encode("jayyjay");
    }

    @Test
    void testDeleteUser() {
        doNothing().when(userRepository).deleteById(1L);

        assertDoesNotThrow(() -> userService.deleteUser(1L));

        verify(userRepository, times(1)).deleteById(1L);
    }
    @Test
    void testGetUserByName_UserExists() {
        when(userRepository.findByUsername("jayyjay")).thenReturn(Optional.of(mockUser));
        User user = userService.getUserByName("jayyjay");
        assertEquals("jayyjay", user.getUsername());
    }
    @Test
    void testGetPersonalInfoByUsername() {
    	 UserPersonalInfoDTO dto = new UserPersonalInfoDTO("Jayy", "Jay","jay", "jay@email.com", "7878787878","south street", "Toronto", "Ontario", "Canada", "M5G2C3");
          when(userRepository.findByUsername("jayyjay")).thenReturn(Optional.of(mockUser));
        when(personalInfoMapper.toDTO(mockUser)).thenReturn(dto);

        UserPersonalInfoDTO result = userService.getPersonalInfoByUsername("jayyjay");
        assertEquals("Jayy", result.getFirstname());
    }

    @Test
    void testUpdatePersonalInfo() {
    	 UserPersonalInfoDTO dto = new UserPersonalInfoDTO("Jayy", "Jay","jay", "jay@email.com", "7878787878","south street", "Toronto", "Ontario", "Canada", "M5G2C3");
          when(userRepository.findByUsername("jayyjay")).thenReturn(Optional.of(mockUser));

        userService.updatePersonalInfo("jayyjay", dto);

        verify(personalInfoMapper).updateUserFromDTO(dto, mockUser);
        verify(userRepository).save(mockUser);
    }
    @Test
    void testUpdatePassword_Success() {
        PasswordUpdateDTO dto = new PasswordUpdateDTO("oldPass", "newPass");
        when(userRepository.findByUsername("jayyjay")).thenReturn(Optional.of(mockUser));
        when(passwordEncoder.matches("oldPass", mockUser.getPassword())).thenReturn(true);
        when(passwordEncoder.encode("newPass")).thenReturn("encodedNewPass");

        ResponseEntity<String> response = userService.updatePassword("jayyjay", dto);
        assertEquals("Password updated successfully", response.getBody());
        verify(userRepository).save(mockUser);
    }
    @Test
    void testUpdateEmailAndUsername_Success() {
        UserCredentialsDTO dto = new UserCredentialsDTO("newemail@fdm.com", "newusername");
        when(userRepository.findByUsername("jayyjay")).thenReturn(Optional.of(mockUser));
        when(userRepository.existsByUsername("newusername")).thenReturn(false);
        when(userRepository.existsByEmail("newemail@fdm.com")).thenReturn(false);

        ResponseEntity<String> response = userService.updateEmailAndUsername("jayyjay", dto);

        assertEquals("Username and email updated successfully", response.getBody());
        verify(userRepository).save(mockUser);
    }

}
