package com.fdmgroup.Retail_POD_backend.repository;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import java.time.LocalDateTime;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.fdmgroup.Retail_POD_backend.model.Cart;
import com.fdmgroup.Retail_POD_backend.model.CartItem;
import com.fdmgroup.Retail_POD_backend.model.Product;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
public class CartItemRepositoryTest {
    @Autowired
    private CartItemRepository cartItemRepository;

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private CartRepository cartRepository;

    private Product product1;
    private Cart cart1;
    private CartItem cartItem;

    @BeforeEach
    public void setup() {
        // Arrange
        product1 = productRepository.findById(1L).get();
        cart1 = cartRepository.findById(1L).get();

        cartItem = new CartItem(0L, 10,
                LocalDateTime.now(),
                LocalDateTime.now(),
                product1,
                cart1,
                "M",
                true);
    }

    @Test
    public void testSaveCartItem_ReturnsSavedCartItem() {
        // Act
        CartItem savedCartItem = cartItemRepository.save(cartItem);

        // Assert
        assertEquals(cartItem, savedCartItem);
    }

    @Test
    public void testSaveCartItem_FindCartItem() {
        // Act
        cartItemRepository.save(cartItem);
        Optional<CartItem> savedCartItem = cartItemRepository.findById(cartItem.getCartItemId());

        // Assert
        assertTrue(savedCartItem.isPresent());
    }

    @Test
    public void testDeleteCartItem_CartItemNotPresent() {
        // Act
        cartItemRepository.deleteById(cartItem.getCartItemId());
        Optional<CartItem> deletedCartItem = cartItemRepository.findById(cartItem.getCartItemId());

        // Assert
        assertTrue(!deletedCartItem.isPresent());
    }
}
