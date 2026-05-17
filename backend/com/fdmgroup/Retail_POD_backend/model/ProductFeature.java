package com.fdmgroup.Retail_POD_backend.model;

import java.time.LocalDate;

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
@Table(name = "products_features")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProductFeature {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "product_feature_id")
	private long id;

	@Column(name = "product_id", nullable = false)
	private int product_id;

	@ManyToOne
	@JoinColumn(name = "feature_id", nullable = false)
	private Feature feature;

}
