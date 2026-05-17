package com.fdmgroup.Retail_POD_backend.controller;

import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fdmgroup.Retail_POD_backend.model.LoginResponse;
import com.fdmgroup.Retail_POD_backend.model.User;
import com.fdmgroup.Retail_POD_backend.model.DTO.UserDTO;
import com.fdmgroup.Retail_POD_backend.model.mapper.UserMapper;
import com.fdmgroup.Retail_POD_backend.service.UserService;
import com.fdmgroup.Retail_POD_backend.utils.JwtUtil;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.validation.Valid;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/v1/public")
@Slf4j
public class PublicController {
    @Autowired
    private UserService userService;
    @Autowired
    private AuthenticationManager authManager;
    @Autowired
    private JwtUtil jwtutil;

    @Operation(summary = "Register a new user", description = "Register a new user into the database")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "New User successfully registered")
    })
    @PostMapping("/register")
    public ResponseEntity<?> createUser(@Valid @RequestBody User user) {
        try {
            User createdUser = userService.createUser(user);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
        return ResponseEntity.accepted().build();
    }

    @Operation(summary = "Login", description = "Login with email and password")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "Login successfully"),
            @ApiResponse(responseCode = "403", description = "Login failed")
    })
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody UserDTO userdto) {
        try {
            Authentication authentication = authManager.authenticate(
                    new UsernamePasswordAuthenticationToken(userdto.getUsername(), userdto.getPassword()));
            String token = jwtutil.generateToken(userdto.getUsername());
            User user = userService.getUserByName(userdto.getUsername());
            LoginResponse res = new LoginResponse(token, user);
            log.info("login token created:" + token);
            return ResponseEntity.ok(res);
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid username or password");
        }
    }

    @GetMapping("/user")
    public String userDtoMethod() {
        UserDTO userDTO = new UserDTO("Manu", "Manu");
        UserMapper mapper = Mappers.getMapper(UserMapper.class);
        User user = mapper.toUser(userDTO);
        System.out.println(user);

        UserDTO newUserDTO = mapper.toUserDTO(user);
        return newUserDTO.toString();
    }

}
