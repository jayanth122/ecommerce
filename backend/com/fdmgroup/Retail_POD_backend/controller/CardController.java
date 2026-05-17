package com.fdmgroup.Retail_POD_backend.controller;

import com.fdmgroup.Retail_POD_backend.model.Card;
import com.fdmgroup.Retail_POD_backend.service.CardService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/cards")
@AllArgsConstructor
public class CardController {

    private CardService cardService;

    @GetMapping("/getCardsByUsername")
    public ResponseEntity<List<Card>> getCardsByUsername() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        List<Card> cards = cardService.getCardsByUsername(username);
        return ResponseEntity.ok(cards);
    }

    @PostMapping("/addCardByUsername")
    public ResponseEntity<String> addCard(@RequestBody Card card) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Card savedCard = cardService.addCard(username, card);
        return ResponseEntity.ok("Item Added to Cart");
    }

    @DeleteMapping("/{cardId}")
    public ResponseEntity<String> deleteCard(@PathVariable long cardId) {
        cardService.deleteCard(cardId);
        return ResponseEntity.ok("Card deleted successfully");
    }
}