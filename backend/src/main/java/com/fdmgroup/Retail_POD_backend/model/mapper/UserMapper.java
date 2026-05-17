package com.fdmgroup.Retail_POD_backend.model.mapper;

import org.mapstruct.Mapper;

import com.fdmgroup.Retail_POD_backend.model.User;
import com.fdmgroup.Retail_POD_backend.model.DTO.UserDTO;

@Mapper
public abstract class UserMapper {

    public abstract UserDTO toUserDTO(User user);

    public abstract User toUser(UserDTO userDTO);
}
