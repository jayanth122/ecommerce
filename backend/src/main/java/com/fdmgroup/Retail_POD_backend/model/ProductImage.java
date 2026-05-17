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
@Table(name = "product_images")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class ProductImage {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "product_image_id")
	private int productImageId;

	@Column(name = "image_name", nullable = false, length = 100)
	private String imageName;

	@Column(name = "image_description", columnDefinition = "TEXT")
	private String imageDescription;

	@Column(name = "image_url", nullable = false, length = 512)
	private String imageURL;

	@Column(name = "product_id", nullable = false)
	private int productId;

	@Column(name = "is_thumbnail", nullable = false)
	private boolean isThumbnail;

}
