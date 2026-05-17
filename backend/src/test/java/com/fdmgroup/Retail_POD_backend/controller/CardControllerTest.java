package com.fdmgroup.Retail_POD_backend.controller;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.fdmgroup.Retail_POD_backend.model.Card;
import com.fdmgroup.Retail_POD_backend.service.CardService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

@WebMvcTest(CardController.class)
@ExtendWith(MockitoExtension.class)
@AutoConfigureMockMvc(addFilters = false) // Disable security filters
class CardControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private CardService cardService;

    private ObjectMapper objectMapper = new ObjectMapper();
    private Card mockCard;

    @BeforeEach
    void setUp() {
        mockCard = new Card(1L, "Visa", "1234567812345678", 12, 2026, null, null, null);

        // Mock SecurityContext
        Authentication authentication = mock(Authentication.class);
        when(authentication.getName()).thenReturn("jayyjay");
        SecurityContext securityContext = mock(SecurityContext.class);
        when(securityContext.getAuthentication()).thenReturn(authentication);
        SecurityContextHolder.setContext(securityContext);
    }

    @Test
    void testGetCardsByUsername_ReturnsCardList() throws Exception {
        List<Card> mockCards = Arrays.asList(mockCard);

        when(cardService.getCardsByUsername("jayyjay")).thenReturn(mockCards);

        mockMvc.perform(get("/api/v1/cards/getCardsByUsername")
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.length()").value(1))
                .andExpect(jsonPath("$[0].cardName").value("Visa"));
    }

    @Test
    void testAddCard_Success() throws Exception {
        when(cardService.addCard(anyString(), any(Card.class))).thenReturn(mockCard);

        mockMvc.perform(post("/api/v1/cards/addCardByUsername")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(mockCard)))
                .andExpect(status().isOk())
                .andExpect(content().string("Item Added to Cart"));
    }

//    @Test
//    void testDeleteCard_Success() throws Exception {
//        doNothing().when(cardService).deleteCard(1L);
//
//        mockMvc.perform(delete("/api/v1/cards/1"))
//                .andExpect(status().isOk())
//                .andExpect(content().string("Card deleted successfully"));
//
//        verify(cardService, times(1)).deleteCard(1L);
//    }
}
