package com.fdmgroup.Retail_POD_backend.model;

import java.time.LocalDate;
import java.util.List;

import com.fdmgroup.Retail_POD_backend.enums.CartType;
import com.fdmgroup.Retail_POD_backend.enums.OrderStatus;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "orders")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Order {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "order_id")
	private int order_id;

	@Column(name = "customer_id", nullable = false)
	private int customer_id;

	@Enumerated(EnumType.STRING)
	@Column(name = "order_status", nullable = false)
	private OrderStatus orderStatus;

	@Column(name = "order_date", nullable = false)
	private LocalDate order_date;

	@Column(name = "shipped_date")
	private LocalDate shipped_date;

	@Column(name = "shipped_address", columnDefinition = "TEXT")
	private String shipped_address;

	@Column(name = "store_id", nullable = false)
	private int store_id;

	@OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<Order_Item> orderItems;

	@ManyToOne
	@JoinColumn(name = "user_id", nullable = false)
	private User user;

}
