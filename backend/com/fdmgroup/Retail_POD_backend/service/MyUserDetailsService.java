package com.fdmgroup.Retail_POD_backend.service;

import com.fdmgroup.Retail_POD_backend.model.User;
import com.fdmgroup.Retail_POD_backend.exceptions.UserNotFoundException;
import com.fdmgroup.Retail_POD_backend.model.MyUserDetails;
import com.fdmgroup.Retail_POD_backend.repository.UserRepository;

import lombok.AllArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class MyUserDetailsService implements UserDetailsService {

	UserRepository userRepository;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		User user = userRepository.findByUsername(username)
				.orElseThrow(() -> new UserNotFoundException("User not found -- username=" + username));
		return new MyUserDetails(user);
	}
}
