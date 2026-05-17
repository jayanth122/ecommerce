package com.fdmgroup.Retail_POD_backend.model.mapper;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.fdmgroup.Retail_POD_backend.model.CartItem;
import com.fdmgroup.Retail_POD_backend.model.DTO.CartItemDTO;

@Mapper(injectionStrategy = InjectionStrategy.CONSTRUCTOR, componentModel = "spring", uses = ProductMapper.class)
public interface CartItemMapper {

	@Mapping(source = "product.id", target = "productId")
    CartItemDTO toCartItemDTO(CartItem cartItem);
    
	
}
