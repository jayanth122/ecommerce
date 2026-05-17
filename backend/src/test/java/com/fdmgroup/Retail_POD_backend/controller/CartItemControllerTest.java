package com.fdmgroup.Retail_POD_backend.controller;

import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.doThrow;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.patch;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.fdmgroup.Retail_POD_backend.exceptions.CartItemNotFoundException;
import com.fdmgroup.Retail_POD_backend.service.CartItemService;

@WebMvcTest(CartItemController.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc(addFilters = false)
public class CartItemControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private CartItemService cartItemService;

    @Test
    public void testUpdateCartItemQuantity_Success() throws Exception {
        // Arrange
        long cartItemId = 1L;
        int quantity = 5;

        // Act & Assert
        mockMvc.perform(patch("/api/v1/cart-items/{cartItemId}", cartItemId)
                .param("quantity", String.valueOf(quantity)))
                .andExpect(status().isOk());
    }

    @Test
    public void testUpdateCartItemQuantity_ThrowsCartItemNotFoundException() throws Exception {
        // Arrange
        long cartItemId = 999L;
        int quantity = 5;

        // Act & Assert
        doThrow(new CartItemNotFoundException(cartItemId))
                .when(cartItemService).updateQuantity(cartItemId, quantity);

        mockMvc.perform(patch("/api/v1/cart-items/{cartItemId}", cartItemId)
                .param("quantity", String.valueOf(quantity)))
                .andExpect(status().isNotFound());
    }

    @Test
    public void testDeleteCartItem_Success() throws Exception {
        long cartItemId = 1L;

        doNothing().when(cartItemService).removeItem(cartItemId);

        mockMvc.perform(delete("/api/v1/cart-items/{cartItemId}", cartItemId))
                .andExpect(status().isOk());
    }
}