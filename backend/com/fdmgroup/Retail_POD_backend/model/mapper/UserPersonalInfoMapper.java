package com.fdmgroup.Retail_POD_backend.model.mapper;


import com.fdmgroup.Retail_POD_backend.model.User;
import com.fdmgroup.Retail_POD_backend.model.DTO.UserPersonalInfoDTO;
import org.springframework.stereotype.Component;

@Component
public class UserPersonalInfoMapper {

    public UserPersonalInfoDTO toDTO(User user) {
        UserPersonalInfoDTO dto = new UserPersonalInfoDTO();
        dto.setFirstname(user.getFirstname());
        dto.setLastname(user.getLastname());
        dto.setUsername(user.getUsername());
        dto.setEmail(user.getEmail());
        dto.setPhoneNumber(user.getPhoneNumber());
        dto.setStreet(user.getStreet());
        dto.setCity(user.getCity());
        dto.setState(user.getState());
        dto.setCountry(user.getCountry());
        dto.setZipcode(user.getZipcode());
        return dto;
    }

    public void updateUserFromDTO(UserPersonalInfoDTO dto, User user) {
        user.setFirstname(dto.getFirstname());
        user.setLastname(dto.getLastname());
        user.setEmail(dto.getEmail());
        user.setPhoneNumber(dto.getPhoneNumber());
        user.setStreet(dto.getStreet());
        user.setCity(dto.getCity());
        user.setState(dto.getState());
        user.setCountry(dto.getCountry());
        user.setZipcode(dto.getZipcode());
    }
}
