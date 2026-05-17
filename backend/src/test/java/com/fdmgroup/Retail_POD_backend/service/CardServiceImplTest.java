package com.fdmgroup.Retail_POD_backend.service;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.Mockito.*;

import com.fdmgroup.Retail_POD_backend.exceptions.UserNotFoundException;
import com.fdmgroup.Retail_POD_backend.model.Card;
import com.fdmgroup.Retail_POD_backend.model.User;
import com.fdmgroup.Retail_POD_backend.repository.CardRepository;
import com.fdmgroup.Retail_POD_backend.repository.UserRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

@ExtendWith(MockitoExtension.class)
class CardServiceImplTest {

    @Mock
    private CardRepository cardRepository;

    @Mock
    private UserRepository userRepository;

    @InjectMocks
    private CardServiceImpl cardService;

    private User mockUser;
    private Card mockCard;

    @BeforeEach
    void setUp() {
        mockUser = new User(1L, "Jayy", "Jay", "jayyjay", "password", "jayy@fdm.com", null, null, 1,"4545458544", null, null, null, null, null);
        mockCard = new Card(1L, "Visa", "1234567812345678", 12, 2026, mockUser, null, null);
    }

    @Test
    void testGetCardsByUsername_UserExists() {
        when(userRepository.findByUsername("jayyjay")).thenReturn(Optional.of(mockUser));
        when(cardRepository.findByUser(mockUser)).thenReturn(Arrays.asList(mockCard));

        List<Card> cards = cardService.getCardsByUsername("jayyjay");

        assertEquals(1, cards.size());
        assertEquals("Visa", cards.get(0).getCardName());
    }

    @Test
    void testGetCardsByUsername_UserNotFound() {
        when(userRepository.findByUsername("jayyjay")).thenReturn(Optional.empty());

        Exception exception = assertThrows(UserNotFoundException.class, () -> {
            cardService.getCardsByUsername("jayyjay");
        });

        assertEquals("User not found with username: jayyjay", exception.getMessage());
    }

    @Test
    void testAddCard_Success() {
        when(userRepository.findByUsername("jayyjay")).thenReturn(Optional.of(mockUser));
        when(cardRepository.save(any(Card.class))).thenReturn(mockCard);

        Card savedCard = cardService.addCard("jayyjay", mockCard);

        assertNotNull(savedCard);
        assertEquals("Visa", savedCard.getCardName());
    }

    @Test
    void testAddCard_UserNotFound() {
        when(userRepository.findByUsername("jayyjay")).thenReturn(Optional.empty());

        Exception exception = assertThrows(UserNotFoundException.class, () -> {
            cardService.addCard("jayyjay", mockCard);
        });

        assertEquals("User not found with username: jayyjay", exception.getMessage());
    }

    @Test
    void testDeleteCard_Success() {
        doNothing().when(cardRepository).deleteById(1L);

        cardService.deleteCard(1L);

        verify(cardRepository, times(1)).deleteById(1L);
    }
}
