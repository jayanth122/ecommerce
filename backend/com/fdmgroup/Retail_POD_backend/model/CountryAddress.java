package com.fdmgroup.Retail_POD_backend.model;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "country_address")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CountryAddress {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "country_address_id")
	private int CountryAddressId;

	@Column(name = "street_no", nullable = false)
	private int streetNumber;

	@Column(name = "street_name", nullable = false, length = 100)
	private String streetName;

	@Column(name = "postal_code", nullable = false, length = 100)
	private String postalCode;

	@Column(name = "latitude", nullable = false)
	private double latitude;

	@Column(name = "longitude", nullable = false)
	private double longitude;

	@Column(name = "city_id", nullable = false)
	private int cityId;

	@OneToMany(mappedBy = "countryAddress")
	private List<UserAddress> userAddresses;

}
