package com.fdmgroup.Retail_POD_backend.service;

import java.util.List;

import com.fdmgroup.Retail_POD_backend.model.Card;
import com.fdmgroup.Retail_POD_backend.model.DTO.MyAccountUserInfoDTO;

public interface MyAccountService {

	MyAccountUserInfoDTO getUserAccountInfoByUsername(String username);

}
