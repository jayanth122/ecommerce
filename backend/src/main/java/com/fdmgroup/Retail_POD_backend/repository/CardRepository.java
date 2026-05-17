package com.fdmgroup.Retail_POD_backend.repository;

import com.fdmgroup.Retail_POD_backend.model.Card;
import com.fdmgroup.Retail_POD_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CardRepository extends JpaRepository<Card, Long> {
    List<Card> findByUser(User user);
}
