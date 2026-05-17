package com.fdmgroup.Retail_POD_backend.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "stores")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Store {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "store_id")
	private int storeId;

	@Column(name = "store_name", nullable = false, length = 100)
	private String storeName;

	@Column(name = "phone_number", nullable = false, length = 100)
	private String phoneNumber;

	@Column(name = "street", nullable = false, length = 100)
	private String street;

	@Column(name = "city", nullable = false, length = 100)
	private String city;

	@Column(name = "state", nullable = false, length = 100)
	private String state;

	@Column(name = "country", nullable = false, length = 100)
	private String country;

	@Column(name = "zipcode", nullable = false, length = 100)
	private String zipcode;

	@Column(name = "is_active", nullable = false)
	private boolean isActive;

	@Column(name = "created_at", nullable = false)
	private LocalDate createdAt;

	@Column(name = "updated_at", nullable = false)
	private LocalDate updatedAt;

}
