package com.fdmgroup.Retail_POD_backend.model;

import jakarta.persistence.*;
import jakarta.persistence.Table;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import java.time.LocalDateTime;

@Entity
@Table(name = "cards")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Card {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "card_id", nullable = false)
    private long id;

    @NotNull(message = "Card name cannot be null")
    @Column(name = "card_name", nullable = false)
    private String cardName;

    @NotNull(message = "Card number cannot be null")
    @Column(name = "card_number", nullable = false)
    private String cardNumber;

    @NotNull(message = "Expiration month is required")
    @Min(value = 1, message = "Expiration month must be between 1 and 12")
    @Max(value = 12, message = "Expiration month must be between 1 and 12")
    @Column(name = "expiration_month", nullable = false)
    private int expirationMonth;

    @NotNull(message = "Expiration year is required")
    @Min(value = 2025, message = "Expiration year cannot be less than the current year")
    @Column(name = "expiration_year", nullable = false)
    private int expirationYear;

    @ManyToOne()
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    @Column(name = "created_at", nullable = false, updatable = false)
    @CreationTimestamp
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    @UpdateTimestamp
    private LocalDateTime updatedAt;
}