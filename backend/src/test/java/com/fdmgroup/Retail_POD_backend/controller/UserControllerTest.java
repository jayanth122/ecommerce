package com.fdmgroup.Retail_POD_backend.controller;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

import org.junit.jupiter.api.AfterEach;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;

import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fdmgroup.Retail_POD_backend.config.SecurityConfig;
import com.fdmgroup.Retail_POD_backend.exceptions.UserNotFoundException;
import com.fdmgroup.Retail_POD_backend.model.User;
import com.fdmgroup.Retail_POD_backend.model.DTO.PasswordUpdateDTO;
import com.fdmgroup.Retail_POD_backend.model.DTO.UserCredentialsDTO;
import com.fdmgroup.Retail_POD_backend.model.DTO.UserPersonalInfoDTO;
import com.fdmgroup.Retail_POD_backend.model.mapper.UserPersonalInfoMapper;
import com.fdmgroup.Retail_POD_backend.service.MyUserDetailsService;
import com.fdmgroup.Retail_POD_backend.service.UserService;
import com.fdmgroup.Retail_POD_backend.utils.JwtRequestFilter;
import com.fdmgroup.Retail_POD_backend.utils.JwtUtil;

@WebMvcTest(UserController.class)
@ExtendWith(MockitoExtension.class)
@Import(SecurityConfig.class)
@AutoConfigureMockMvc(addFilters = false)
class UserControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private UserService userService;

    @MockBean
    private JwtUtil jwtUtil;

    @MockBean
    private Map<String, Long> blacklist;

    @MockBean
    private JwtRequestFilter jwtRequestFilter;

    @MockBean
    private MyUserDetailsService myUserDetailsService;

    @MockBean
    private UserPersonalInfoMapper personalInfoMapper;

    private ObjectMapper objectMapper = new ObjectMapper();

    private User mockUser;

    @BeforeEach
    void setUp() {
        mockUser = new User(1L, "Jayy", "Jay", "jayyjay", "password", "jayy@fdm.com", null, null, 1, "4564564563", null, null, null, null, null);
    }

    @AfterEach
    void clearSecurityContext() {
        SecurityContextHolder.clearContext();
    }

    private void mockSecurityContext(String username) {
        SecurityContext securityContext = mock(SecurityContext.class);
        Authentication authentication = mock(Authentication.class);
        when(authentication.getName()).thenReturn(username);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);
    }

    @Test
    void testGetUserById_UserExists() throws Exception {
        when(userService.getUserByID(1L)).thenReturn(mockUser);

        mockMvc.perform(get("/api/v1/users/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.username").value("jayyjay"));
    }

    @Test
    void testGetUserById_UserNotFound() throws Exception {
        when(userService.getUserByID(1L)).thenThrow(new UserNotFoundException("User not found"));

        mockMvc.perform(get("/api/v1/users/1")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isNotFound());
    }

    @Test
    void testGetUsers_ReturnsUserList() throws Exception {
        List<User> mockUsers = Arrays.asList(
                mockUser,
                new User(2L, "jiya", "jiya", "jiyajiya", "password", "jiya@fdm.com", null, null, 2, "4564564563", null, null, null, null, null)
        );

        when(userService.getUsers()).thenReturn(mockUsers);

        mockMvc.perform(get("/api/v1/users")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(2))
                .andExpect(jsonPath("$[0].username").value("jayyjay"))
                .andExpect(jsonPath("$[1].username").value("jiyajiya"));
    }

    @Test
    void testUpdateUser() throws Exception {
        User updatedUser = new User(1L, "Jayy", "Jay", "jayyjay", "newpassword", "jayy@fdm.com", null, null, 1, "4564564563", null, null, null, null, null);
        when(userService.updateUser(any(User.class))).thenReturn(updatedUser);

        mockMvc.perform(put("/api/v1/users/update/1")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(updatedUser)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.password").value("newpassword"));
    }

    @Test
    void testDeleteUser() throws Exception {
        doNothing().when(userService).deleteUser(1L);

        mockMvc.perform(delete("/api/v1/users/1"))
                .andExpect(status().isOk());

        verify(userService, times(1)).deleteUser(1L);
    }

    @Test
    void testLogout() throws Exception {
        String token = "Bearer dummyToken";

        when(jwtUtil.extractExpirytime(anyString())).thenReturn(System.currentTimeMillis() + 3600000);

        mockMvc.perform(post("/api/v1/users/logout")
                .header("Authorization", token))
                .andExpect(status().isOk())
                .andExpect(content().string("Logged out successfully"));

        verify(blacklist, times(1)).put(anyString(), anyLong());
    }

    @Test
    void testGetPersonalInfo() throws Exception {
        mockSecurityContext("jay");

        UserPersonalInfoDTO dto = new UserPersonalInfoDTO("Jayy", "Jay", "jay", "jay@email.com", "7878787878", "south street", "Toronto", "Ontario", "Canada", "M5G2C3");
        when(userService.getPersonalInfoByUsername("jay")).thenReturn(dto);

        mockMvc.perform(get("/api/v1/users/getPersonalInfo"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.firstname").value("Jayy"));
    }

    @Test
    void testUpdatePersonalInfo() throws Exception {
        mockSecurityContext("jay");

        UserPersonalInfoDTO dto = new UserPersonalInfoDTO("Jayy", "Jay", "jay", "jay@email.com", "7878787878", "south street", "Toronto", "Ontario", "Canada", "M5G2C3");

        mockMvc.perform(put("/api/v1/users/updatePersonalInfo")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isOk())
                .andExpect(content().string("Personal info updated successfully"));

        verify(userService).updatePersonalInfo("jay", dto);
    }

    @Test
    void testChangePassword_Success() throws Exception {
        mockSecurityContext("jay");

        PasswordUpdateDTO dto = new PasswordUpdateDTO("oldPass", "newPass");
        when(userService.updatePassword(eq("jay"), any())).thenReturn(ResponseEntity.ok("Password updated successfully"));

        mockMvc.perform(put("/api/v1/users/change-password")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isOk())
                .andExpect(content().string("Password updated successfully"));
    }

    @Test
    void testUpdateEmailAndUsername_Success() throws Exception {
        mockSecurityContext("jay");

        UserCredentialsDTO dto = new UserCredentialsDTO("newemail@fdm.com", "newusername");
        when(userService.updateEmailAndUsername(eq("jay"), any())).thenReturn(ResponseEntity.ok("Username and email updated successfully"));

        mockMvc.perform(put("/api/v1/users/update-credentials")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(dto)))
                .andExpect(status().isOk())
                .andExpect(content().string("Username and email updated successfully"));
    }
}
