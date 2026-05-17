package com.fdmgroup.Retail_POD_backend.service;

import com.fdmgroup.Retail_POD_backend.exceptions.UserNotFoundException;
import com.fdmgroup.Retail_POD_backend.model.Card;
import com.fdmgroup.Retail_POD_backend.model.User;
import com.fdmgroup.Retail_POD_backend.repository.CardRepository;
import com.fdmgroup.Retail_POD_backend.repository.UserRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.Year;
import java.util.List;

@Service
@AllArgsConstructor
public class CardServiceImpl implements CardService{

    private CardRepository cardRepository;
    private UserRepository userRepository;

    @Override
    public List<Card> getCardsByUsername(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User not found with username: " + username));
        return cardRepository.findByUser(user);
    }

    @Override
    public Card addCard(String username, Card card) {
        validateCard(card);

        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User not found with username: " + username));

        card.setUser(user); // Store the card with user_id
        return cardRepository.save(card);
    }

    @Override
    public void deleteCard(long cardId) {
        cardRepository.deleteById(cardId);
    }

    private void validateCard(Card card) {
        int currentYear = Year.now().getValue();

        // Validate expiration year
        if (card.getExpirationYear() < currentYear) {
            throw new IllegalArgumentException("Expiration year cannot be less than the current year");
        }
    }
}
