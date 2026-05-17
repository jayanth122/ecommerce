package com.fdmgroup.Retail_POD_backend.service;

import com.fdmgroup.Retail_POD_backend.model.Card;

import java.util.List;

public interface CardService {
    List<Card> getCardsByUsername(String username);

    Card addCard(String username, Card card);

    void deleteCard(long cardId);
}
