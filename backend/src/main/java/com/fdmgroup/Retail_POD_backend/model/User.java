package com.fdmgroup.Retail_POD_backend.model;

import java.time.LocalDate;

import java.util.ArrayList;
import java.util.List;


import java.time.LocalDateTime;

import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.fasterxml.jackson.annotation.JsonManagedReference;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID", nullable = false)
	private long id;

	@NotNull(message = "Firstname must not be blank")
	@Column(name = "First_Name")
	private String firstname;

	@NotNull(message = "Lastname must not be blank")
	@Column(name = "Last_Name")
	private String lastname;

	@NotNull(message = "Username must not be blank")
	@Column(name = "Username", unique = true)
	private String username;

	@NotNull(message = "Password must not be blank")
	@Column(name = "Password")
	private String password;

	@NotNull(message = "Email address must not be blank")
	@Column(name = "Email", unique = true)
	private String email;

	@Column(name = "created_at", nullable = false)
	@CreationTimestamp
	private LocalDateTime createdAt;

	@Column(name = "updated_at")
	@UpdateTimestamp
	private LocalDateTime updatedAt;

	@Column(name = "role_id", nullable = false)
	private int roleId;
	
	
//	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
//	private List<Cart> carts = new ArrayList<>();

//	@OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
//	private List<Order> orders;

	// Future implementation
	
	 
	  
	  @Column(name = "Phone_Number", unique = true) 
	  private String phoneNumber;
	  
	  @Column(name = "Street", nullable = true) 
	  private String street;
	  
	  @Column(name = "City", nullable = true) 
	  private String city;
	  
	  @Column(name = "State", nullable = true) 
	  private String state;
	  
	  @Column(name = "Country", nullable = true) private 
	  String country;
	  
	  @Column(name = "ZipCode", nullable = true) private 
	  String zipcode;
	 

}
