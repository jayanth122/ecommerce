package com.fdmgroup.Retail_POD_backend.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fdmgroup.Retail_POD_backend.model.User;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByEmail(String emil);
    boolean existsByEmail(String email);
    boolean existsByUsername(String username);
    Optional<User> findByUsername(String username);
}
