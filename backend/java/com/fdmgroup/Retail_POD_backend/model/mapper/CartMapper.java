package com.fdmgroup.Retail_POD_backend.model.mapper;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.fdmgroup.Retail_POD_backend.model.Cart;
import com.fdmgroup.Retail_POD_backend.model.DTO.CartDTO;

@Mapper(injectionStrategy = InjectionStrategy.CONSTRUCTOR, componentModel = "spring", uses = CartItemMapper.class)
public interface CartMapper {
	
	@Mapping(source = "user.id", target = "userId")
    CartDTO toCartDTO(Cart cart);
}
