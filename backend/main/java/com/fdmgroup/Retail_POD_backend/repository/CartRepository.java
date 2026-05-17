package com.fdmgroup.Retail_POD_backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fdmgroup.Retail_POD_backend.enums.CartType;
import com.fdmgroup.Retail_POD_backend.model.Cart;
import com.fdmgroup.Retail_POD_backend.model.User;

public interface CartRepository extends JpaRepository<Cart, Long> {
	Optional<Cart> findByUserUsernameAndType(String username, CartType type);
    Optional<Cart> findByUserAndType(User user, CartType type);
}
