package com.fdmgroup.Retail_POD_backend.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.fdmgroup.Retail_POD_backend.enums.CartType;
import com.fdmgroup.Retail_POD_backend.exceptions.ProductNotFoundException;
import com.fdmgroup.Retail_POD_backend.exceptions.UserNotFoundException;
import com.fdmgroup.Retail_POD_backend.model.*;
import com.fdmgroup.Retail_POD_backend.model.DTO.CartDTO;
import com.fdmgroup.Retail_POD_backend.model.DTO.CartItemDTO;
import com.fdmgroup.Retail_POD_backend.model.mapper.CartMapper;
import com.fdmgroup.Retail_POD_backend.repository.*;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.*;

@ExtendWith(MockitoExtension.class)
class CartServiceImplTest {

    @Mock
    private CartRepository cartRepo;

    @Mock
    private UserRepository userRepo;

    @Mock
    private ProductRepository productRepo;

    @Mock
    private CartMapper cartMapper;

    @InjectMocks
    private CartServiceImpl cartService;

    private User mockUser;
    private Cart mockCart;
    private Product mockProduct;
    private CartItemDTO mockCartItemDTO;

    @BeforeEach
    void setUp() {
        mockUser = new User();
        mockUser.setUsername("testUser");

        mockCart = new Cart();
        mockCart.setUser(mockUser);
        mockCart.setType(CartType.SHOPPING);
        mockCart.setCartItems(new ArrayList<>());

        mockProduct = new Product();
        mockProduct.setId(1L);

        mockCartItemDTO = new CartItemDTO();
        mockCartItemDTO.setProductId(1L);
        mockCartItemDTO.setQuantity(2);
        mockCartItemDTO.setSize("M");
    }

    @Test
    void testGetShoppingCart_CreatesNewCartIfNotExists() {
        when(cartRepo.findByUserUsernameAndType("testUser", CartType.SHOPPING)).thenReturn(Optional.empty());
        when(userRepo.findByUsername("testUser")).thenReturn(Optional.of(mockUser));
        when(cartRepo.save(any(Cart.class))).thenReturn(mockCart);
        when(cartMapper.toCartDTO(any(Cart.class))).thenReturn(new CartDTO());

        CartDTO result = cartService.getShoppingCart("testUser");

        assertNotNull(result);
        verify(cartRepo).save(any(Cart.class));
    }

    @Test
    void testGetShoppingCart_ReturnsExistingCart() {
        when(cartRepo.findByUserUsernameAndType("testUser", CartType.SHOPPING)).thenReturn(Optional.of(mockCart));
        when(cartMapper.toCartDTO(mockCart)).thenReturn(new CartDTO());

        CartDTO result = cartService.getShoppingCart("testUser");

        assertNotNull(result);
        verify(cartRepo, never()).save(any(Cart.class));
    }

    @Test
    void testAddItemToCart_UserNotFound_ThrowsException() {
        when(userRepo.findByUsername("testUser")).thenReturn(Optional.empty());

        assertThrows(UserNotFoundException.class, () -> cartService.addItemToCart("testUser", mockCartItemDTO));
    }

    @Test
    void testAddItemToCart_ProductNotFound_ThrowsException() {
        when(userRepo.findByUsername("testUser")).thenReturn(Optional.of(mockUser));
        when(productRepo.findById(1L)).thenReturn(Optional.empty());

        assertThrows(ProductNotFoundException.class, () -> cartService.addItemToCart("testUser", mockCartItemDTO));
    }

    @Test
    void testAddItemToCart_AddsNewItem() {
        when(userRepo.findByUsername("testUser")).thenReturn(Optional.of(mockUser));
        when(productRepo.findById(1L)).thenReturn(Optional.of(mockProduct));
        when(cartRepo.findByUserAndType(mockUser, CartType.SHOPPING)).thenReturn(Optional.of(mockCart));
        when(cartRepo.save(any(Cart.class))).thenReturn(mockCart);

        Cart result = cartService.addItemToCart("testUser", mockCartItemDTO);

        assertNotNull(result);
        assertFalse(result.getCartItems().isEmpty());
        verify(cartRepo).save(any(Cart.class));
    }

    @Test
    void testAddItemsToCart_AddsMultipleItems() {
        List<CartItemDTO> cartItems = List.of(mockCartItemDTO, mockCartItemDTO);
        when(userRepo.findByUsername("testUser")).thenReturn(Optional.of(mockUser));
        when(cartRepo.findByUserAndType(mockUser, CartType.SHOPPING)).thenReturn(Optional.of(mockCart));
        when(productRepo.findById(1L)).thenReturn(Optional.of(mockProduct));

        cartService.addItemsToCart("testUser", cartItems);

        verify(cartRepo).save(any(Cart.class));
        assertFalse(mockCart.getCartItems().isEmpty());
    }
}
