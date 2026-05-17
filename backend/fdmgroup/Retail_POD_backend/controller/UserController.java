package com.fdmgroup.Retail_POD_backend.controller;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fdmgroup.Retail_POD_backend.exceptions.UserNotFoundException;
import com.fdmgroup.Retail_POD_backend.model.User;
import com.fdmgroup.Retail_POD_backend.model.DTO.PasswordUpdateDTO;
import com.fdmgroup.Retail_POD_backend.model.DTO.UserCredentialsDTO;
import com.fdmgroup.Retail_POD_backend.model.DTO.UserPersonalInfoDTO;
import com.fdmgroup.Retail_POD_backend.model.mapper.UserPersonalInfoMapper;
import com.fdmgroup.Retail_POD_backend.service.UserService;
import com.fdmgroup.Retail_POD_backend.utils.JwtUtil;
import org.springframework.security.core.context.SecurityContextHolder;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@RestController
@RequestMapping("api/v1/users")
public class UserController {

	@Autowired
	private UserService userService;
	
	 @Autowired
	 private UserPersonalInfoMapper personalInfoMapper;

	 
	private final Map<String, Long> blacklist;
	private final JwtUtil jwtUtil;

	public UserController(UserService userService, Map<String, Long> blacklist, JwtUtil jwtUtil) {
		super();
		this.userService = userService;
		this.blacklist = blacklist;
		this.jwtUtil = jwtUtil;
	}

	@Operation(summary = "Get a user", description = "Get a user information by user Id")
	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "User info successfully retrieved"),
			@ApiResponse(responseCode = "404", description = "User not found") })
	@GetMapping("/{id}")
	public ResponseEntity<User> getUserById(@PathVariable long id) throws UserNotFoundException {
		User user = userService.getUserByID(id);

		return ResponseEntity.ok(user);
	}

	@Operation(summary = "Get all registered Users")
	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "All registered Users") })
	@GetMapping
	public ResponseEntity<List<User>> getUsers() {
		// System.out.println("reaching controller");
		List<User> users = userService.getUsers();
		return ResponseEntity.ok(users);
	}

	@Operation(summary = "Update a user", description = "Update a user data in the database ")
	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "User Data successfully updated"),
			@ApiResponse(responseCode = "404", description = "User not found") })
	@PutMapping("/update/{id}")
	public ResponseEntity<User> updateUser(@PathVariable long id, @RequestBody User user) {
		User updateUser = userService.updateUser(user);
		return ResponseEntity.ok(updateUser);
	}

	@Operation(summary = "Delete User for given id")
	@ApiResponses(value = { @ApiResponse(responseCode = "200", description = "User deleted successfully"),
			@ApiResponse(responseCode = "404", description = "User specified is not available for deletion") })
	@DeleteMapping("/{id}")
	public void deleteUser(@PathVariable long id) {
		userService.deleteUser(id);
	}

	@Operation(summary = "Invalidate token while user logout")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "204", description = "User logout"),
			@ApiResponse(responseCode = "404", description = "User specified is not available for logout")
	})
	@PostMapping("/logout")
	public ResponseEntity<String> logout(@RequestHeader("Authorization") String token) {
		String actualToken = token.replace("Bearer ", ""); // Remove "Bearer " prefix
		long expiryTime = jwtUtil.extractExpirytime(actualToken);
		blacklist.put(actualToken, expiryTime); // Add token to the blacklist
		return ResponseEntity.ok("Logged out successfully");
	}
	
	 
	@GetMapping("/getPersonalInfo")
	public ResponseEntity<UserPersonalInfoDTO> getPersonalInfo() {
	    String username = SecurityContextHolder.getContext().getAuthentication().getName();
	    UserPersonalInfoDTO dto = userService.getPersonalInfoByUsername(username);
	    return ResponseEntity.ok(dto);
	}


    
    @PutMapping("/updatePersonalInfo")
    public ResponseEntity<String> updatePersonalInfo(@RequestBody UserPersonalInfoDTO dto) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        userService.updatePersonalInfo(username, dto);
        return ResponseEntity.ok("Personal info updated successfully");
    }
	
    @PutMapping("/change-password")
    public ResponseEntity<String> changePassword(@RequestBody PasswordUpdateDTO passwordDTO) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return userService.updatePassword(username, passwordDTO);
    }

    
    @PutMapping("/update-credentials")
    public ResponseEntity<String> updateEmailAndUsername(@RequestBody UserCredentialsDTO userCredentialsDTO) {
        String currentUsername = SecurityContextHolder.getContext().getAuthentication().getName();
        return userService.updateEmailAndUsername(currentUsername, userCredentialsDTO);
    }




}
