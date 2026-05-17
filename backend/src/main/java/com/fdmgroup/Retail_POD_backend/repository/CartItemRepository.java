package com.fdmgroup.Retail_POD_backend.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.fdmgroup.Retail_POD_backend.model.CartItem;

public interface CartItemRepository extends JpaRepository<CartItem, Long> {
}