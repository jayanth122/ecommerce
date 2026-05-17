package com.fdmgroup.Retail_POD_backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fdmgroup.Retail_POD_backend.model.DTO.MyAccountUserInfoDTO;
import com.fdmgroup.Retail_POD_backend.service.MyAccountService;

import lombok.AllArgsConstructor;

@RestController
@RequestMapping("/api/v1/myAccount")
@AllArgsConstructor
public class MyAccountController {
	
    private final MyAccountService myAccountService;

    @GetMapping("/getMyAccountUserInfo")
    public ResponseEntity<MyAccountUserInfoDTO> getUserAccountInfoByUsername() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        MyAccountUserInfoDTO userInfo = myAccountService.getUserAccountInfoByUsername(username);
        return ResponseEntity.ok(userInfo);
    }
}
