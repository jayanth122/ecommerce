package com.fdmgroup.Retail_POD_backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;

@Entity
@Table(name = "order_item")
public class Order_Item {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID", nullable = false)
	private int order_Item_id;
	// private int order_id;
	private int product_id;
	private int quantity;
	private Double price;

	@ManyToOne
	@JoinColumn(name = "order_id", nullable = false)
	private Order order;

	public int getOrder_Item_id() {
		return order_Item_id;
	}

	public void setOrder_Item_id(int order_Item_id) {
		this.order_Item_id = order_Item_id;
	}

//	public int getOrder_id() {
//		return order_id;
//	}
//
//	public void setOrder_id(int order_id) {
//		this.order_id = order_id;
//	}

	public int getProduct_id() {
		return product_id;
	}

	public void setProduct_id(int product_id) {
		this.product_id = product_id;
	}

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public Double getPrice() {
		return price;
	}

	public void setPrice(Double price) {
		this.price = price;
	}

	public Order getOrder() {
		return order;
	}

	public void setOrder(Order order) {
		this.order = order;
	}

}
