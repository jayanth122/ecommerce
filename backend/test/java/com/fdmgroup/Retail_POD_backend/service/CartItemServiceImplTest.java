package com.fdmgroup.Retail_POD_backend.service;

import static org.mockito.Mockito.*;
import static org.junit.jupiter.api.Assertions.*;

import com.fdmgroup.Retail_POD_backend.exceptions.CartItemNotFoundException;
import com.fdmgroup.Retail_POD_backend.model.CartItem;
import com.fdmgroup.Retail_POD_backend.repository.CartItemRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

@ExtendWith(MockitoExtension.class)
class CartItemServiceImplTest {

    @Mock
    private CartItemRepository cartItemRepo;

    @InjectMocks
    private CartItemServiceImpl cartItemService;

    private CartItem cartItem;

    @BeforeEach
    void setUp() {
        cartItem = new CartItem();
        cartItem.setCartItemId(1L);
        cartItem.setQuantity(2);
    }

    @Test
    void updateQuantity_ShouldUpdateQuantity_WhenCartItemExists() {
        when(cartItemRepo.findById(1L)).thenReturn(Optional.of(cartItem));

        cartItemService.updateQuantity(1L, 5);

        assertEquals(5, cartItem.getQuantity());
        verify(cartItemRepo, times(1)).save(cartItem);
    }

    @Test
    void updateQuantity_ShouldThrowException_WhenCartItemNotFound() {
        when(cartItemRepo.findById(1L)).thenReturn(Optional.empty());

        assertThrows(CartItemNotFoundException.class, () -> cartItemService.updateQuantity(1L, 5));
    }

    @Test
    void removeItem_ShouldDeleteCartItem_WhenExists() {
        cartItemService.removeItem(1L);
        verify(cartItemRepo, times(1)).deleteById(1L);
    }
}
