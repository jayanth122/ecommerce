package com.fdmgroup.Retail_POD_backend.model;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "cart_items")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartItem {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "cart_item_id")
	private long cartItemId;

	@Column(name = "quantity", nullable = false)
	private int quantity;

	@Column(name = "created_at", nullable = false)
    @CreationTimestamp
	private LocalDateTime createdAt;

	@Column(name = "updated_at")
    @UpdateTimestamp
	private LocalDateTime updatedAt;

	@JoinColumn(name = "product_id", nullable = false)
	@ManyToOne
	private Product product;


//	@ManyToOne
//	@JoinColumn(name = "session_id", nullable = false)
//	private Session session;


	@ManyToOne
	@JoinColumn(name = "cart_id", nullable = false)
	private Cart cart;
	
	@Column(name = "size")
	private String size;

	@Column(name = "is_active", nullable = false)
	private boolean isActive = true;

	//	@Column(name = "session_id", nullable = false)
//	private int sessionId;
	

//	@Column(name = "price", nullable = false)
//	private double price;

}
