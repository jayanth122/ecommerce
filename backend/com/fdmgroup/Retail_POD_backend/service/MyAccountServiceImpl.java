package com.fdmgroup.Retail_POD_backend.service;

import com.fdmgroup.Retail_POD_backend.model.User;
import com.fdmgroup.Retail_POD_backend.model.DTO.MyAccountUserInfoDTO;
import com.fdmgroup.Retail_POD_backend.repository.UserRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class MyAccountServiceImpl implements MyAccountService {

    private final UserRepository userRepository;

    @Override
    public MyAccountUserInfoDTO getUserAccountInfoByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return new MyAccountUserInfoDTO(
                user.getId(),
                user.getFirstname(),
                user.getLastname(),
                user.getUsername(),
                user.getEmail(),
                user.getPhoneNumber(),
                user.getStreet(),
                user.getCity(),
                user.getState(),
                user.getCountry(),
                user.getZipcode()
        );
    }
}
