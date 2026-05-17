package com.fdmgroup.Retail_POD_backend.model.mapper;

import com.fdmgroup.Retail_POD_backend.model.Cart;
import com.fdmgroup.Retail_POD_backend.model.CartItem;
import com.fdmgroup.Retail_POD_backend.model.DTO.CartDTO;
import com.fdmgroup.Retail_POD_backend.model.DTO.CartItemDTO;
import com.fdmgroup.Retail_POD_backend.model.User;
import java.util.ArrayList;
import java.util.List;
import javax.annotation.processing.Generated;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-04-23T15:46:24-0400",
    comments = "version: 1.6.0.Beta2, compiler: javac, environment: Java 23.0.2 (Oracle Corporation)"
)
@Component
public class CartMapperImpl implements CartMapper {

    private final CartItemMapper cartItemMapper;

    @Autowired
    public CartMapperImpl(CartItemMapper cartItemMapper) {

        this.cartItemMapper = cartItemMapper;
    }

    @Override
    public CartDTO toCartDTO(Cart cart) {
        if ( cart == null ) {
            return null;
        }

        CartDTO cartDTO = new CartDTO();

        cartDTO.setUserId( cartUserId( cart ) );
        cartDTO.setType( cart.getType() );
        cartDTO.setCartItems( cartItemListToCartItemDTOList( cart.getCartItems() ) );

        return cartDTO;
    }

    private long cartUserId(Cart cart) {
        User user = cart.getUser();
        if ( user == null ) {
            return 0L;
        }
        return user.getId();
    }

    protected List<CartItemDTO> cartItemListToCartItemDTOList(List<CartItem> list) {
        if ( list == null ) {
            return null;
        }

        List<CartItemDTO> list1 = new ArrayList<CartItemDTO>( list.size() );
        for ( CartItem cartItem : list ) {
            list1.add( cartItemMapper.toCartItemDTO( cartItem ) );
        }

        return list1;
    }
}
