package com.fdmgroup.Retail_POD_backend.model.mapper;

import com.fdmgroup.Retail_POD_backend.model.DTO.UserDTO;
import com.fdmgroup.Retail_POD_backend.model.User;
import javax.annotation.processing.Generated;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-04-23T15:46:24-0400",
    comments = "version: 1.6.0.Beta2, compiler: javac, environment: Java 23.0.2 (Oracle Corporation)"
)
public class UserMapperImpl extends UserMapper {

    @Override
    public UserDTO toUserDTO(User user) {
        if ( user == null ) {
            return null;
        }

        String username = null;
        String password = null;

        username = user.getUsername();
        password = user.getPassword();

        UserDTO userDTO = new UserDTO( username, password );

        return userDTO;
    }

    @Override
    public User toUser(UserDTO userDTO) {
        if ( userDTO == null ) {
            return null;
        }

        User user = new User();

        user.setUsername( userDTO.getUsername() );
        user.setPassword( userDTO.getPassword() );

        return user;
    }
}
