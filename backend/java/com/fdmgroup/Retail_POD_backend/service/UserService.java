package com.fdmgroup.Retail_POD_backend.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.fdmgroup.Retail_POD_backend.exceptions.UserNotFoundException;
import com.fdmgroup.Retail_POD_backend.model.User;
import com.fdmgroup.Retail_POD_backend.model.DTO.PasswordUpdateDTO;
import com.fdmgroup.Retail_POD_backend.model.DTO.UserCredentialsDTO;
import com.fdmgroup.Retail_POD_backend.model.DTO.UserPersonalInfoDTO;
import com.fdmgroup.Retail_POD_backend.model.mapper.UserPersonalInfoMapper;
import com.fdmgroup.Retail_POD_backend.repository.UserRepository;

@Service
public class UserService {

	@Autowired
	private UserRepository userRepository;
	@Autowired
	private AuthenticationManager authManager;
	@Autowired
	private PasswordEncoder passwordEncoder;
	
	@Autowired
	private UserPersonalInfoMapper personalInfoMapper;

	public List<User> getUsers() {
		return userRepository.findAll();
	}

	public User getUserByID(long userID) throws UserNotFoundException {
		Optional<User> userById = userRepository.findById(userID);
		if (!userById.isPresent()) {
			throw new UserNotFoundException("User with id " + userID + " was not found");
		}
		return userById.get();
	}

	public User createUser(User user) {
		if (userRepository.existsByEmail(user.getEmail())) {
			throw new IllegalArgumentException("User email exists");
		} else if (userRepository.existsByUsername(user.getUsername())) {
			throw new IllegalArgumentException("Username exists");
		}
		String encoded = passwordEncoder.encode(user.getPassword());
		user.setPassword(encoded);
		return userRepository.save(user);

	}

	public User updateUser(User user) {
		return userRepository.save(user);
	}

	public void deleteUser(long userID) {
		userRepository.deleteById(userID);

	}

	public User getUserByName(String username) {
		return userRepository.findByUsername(username)
				.orElseThrow(() -> new UserNotFoundException("User not found -- username=" + username));
	}

	public UserPersonalInfoDTO getPersonalInfoByUsername(String username) {
		User user = userRepository.findByUsername(username)
				.orElseThrow(() -> new UserNotFoundException("User not found -- username=" + username));
		return personalInfoMapper.toDTO(user);
	}

	// Update personal info for a user
	public void updatePersonalInfo(String username, UserPersonalInfoDTO dto) {
		User user = userRepository.findByUsername(username)
				.orElseThrow(() -> new UserNotFoundException("User not found -- username=" + username));
		
		personalInfoMapper.updateUserFromDTO(dto, user);
		userRepository.save(user);
	}
	
	public ResponseEntity<String> updatePassword(String username, PasswordUpdateDTO dto) {
	    User user = userRepository.findByUsername(username)
	            .orElseThrow(() -> new UserNotFoundException("User not found"));

	    if (!passwordEncoder.matches(dto.getOldPassword(), user.getPassword())) {
	        // Return a response with a message, without throwing an exception
	        return ResponseEntity.badRequest().body("Old password is incorrect");
	    }

	    String encodedNewPassword = passwordEncoder.encode(dto.getNewPassword());
	    user.setPassword(encodedNewPassword);
	    userRepository.save(user);

	    return ResponseEntity.ok("Password updated successfully");
	}

	public ResponseEntity<String> updateEmailAndUsername(String currentUsername, UserCredentialsDTO dto) {
	    User user = userRepository.findByUsername(currentUsername)
	            .orElseThrow(() -> new UserNotFoundException("User not found"));

	    // Check if username is taken by someone else
	    if (!dto.getUsername().equals(user.getUsername()) &&
	        userRepository.existsByUsername(dto.getUsername())) {
	        return ResponseEntity.badRequest().body("Username already taken");
	    }

	    // Check if email is taken by someone else
	    if (!dto.getEmail().equals(user.getEmail()) &&
	        userRepository.existsByEmail(dto.getEmail())) {
	        return ResponseEntity.badRequest().body("Email already taken");
	    }

	    user.setUsername(dto.getUsername());
	    user.setEmail(dto.getEmail());

	    userRepository.save(user);

	    return ResponseEntity.ok("Username and email updated successfully");
	}



}
