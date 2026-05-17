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
@Table(name = "region")
@Data // Generates getters, setters, toString, equals, and hashCode
@NoArgsConstructor // Generates a no-args constructor
@AllArgsConstructor // Generates an all-args constructor

public class Region {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "region_id")
	private int id;

	@Column(name = "region_name", nullable = false, length = 255)
	private String regionName;

	@Column(name = "region_code", nullable = false, length = 255)
	private String regionCode;

	@ManyToOne
	@JoinColumn(name = "country_id", nullable = false)
	private Countries country;

//	@OneToMany(mappedBy = "region", cascade = CascadeType.ALL, orphanRemoval = true)
//	private List<City> cities;

}
