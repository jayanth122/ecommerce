package com.fdmgroup.Retail_POD_backend.model.mapper;

import com.fdmgroup.Retail_POD_backend.model.CartItem;
import com.fdmgroup.Retail_POD_backend.model.DTO.CartItemDTO;
import com.fdmgroup.Retail_POD_backend.model.Product;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-04-23T15:46:24-0400",
    comments = "version: 1.6.0.Beta2, compiler: javac, environment: Java 23.0.2 (Oracle Corporation)"
)
@Component
public class CartItemMapperImpl implements CartItemMapper {

    @Override
    public CartItemDTO toCartItemDTO(CartItem cartItem) {
        if ( cartItem == null ) {
            return null;
        }

        CartItemDTO cartItemDTO = new CartItemDTO();

        cartItemDTO.setProductId( cartItemProductId( cartItem ) );
        cartItemDTO.setCartItemId( cartItem.getCartItemId() );
        cartItemDTO.setQuantity( cartItem.getQuantity() );
        cartItemDTO.setSize( cartItem.getSize() );
        cartItemDTO.setActive( cartItem.isActive() );

        return cartItemDTO;
    }

    private long cartItemProductId(CartItem cartItem) {
        Product product = cartItem.getProduct();
        if ( product == null ) {
            return 0L;
        }
        return product.getId();
    }
}
