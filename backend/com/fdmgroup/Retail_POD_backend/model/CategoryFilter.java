package com.fdmgroup.Retail_POD_backend.model;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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
@Table(name = "category_filter")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class CategoryFilter {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "category_filter_id")
	private long id;

	@Column(name = "name", nullable = false, length = 100)
	private String name;

	@ManyToOne
	@JoinColumn(name = "category_id", nullable = false)
	private Category category;

	@OneToMany(mappedBy = "categoryFilter", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<CategoryFilterItem> filterItems;

}
