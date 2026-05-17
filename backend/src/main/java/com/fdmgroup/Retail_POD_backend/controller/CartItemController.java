package com.fdmgroup.Retail_POD_backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.fdmgroup.Retail_POD_backend.service.CartItemService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/v1/cart-items")
@Slf4j
@AllArgsConstructor
public class CartItemController {

	CartItemService cartItemService;

	@Operation(summary = "Update a specific cart item quantity", description = "Updates the quantity for a given cart Item ID")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Updates quantity, returns no response body"),
			@ApiResponse(responseCode = "404", description = "Cart Item not found")
	})
	@PatchMapping("/{cartItemId}")
	public ResponseEntity<?> updateCartItemQuantity(@PathVariable long cartItemId, @RequestParam int quantity) {

		log.info("Updating cartItemId={} with new quantity={}", cartItemId, quantity);

		cartItemService.updateQuantity(cartItemId, quantity);
		return ResponseEntity.ok().build();
	}

	@Operation(summary = "Deletes a cart item", description = "Deletes a cart item with the given cart Item ID")
	@ApiResponses(value = {
			@ApiResponse(responseCode = "200", description = "Deletes cart item, returns no response body")
	})
	@DeleteMapping("/{cartItemId}")
	public ResponseEntity<Void> deleteCartItem(@PathVariable long cartItemId) {
		log.info("Deleting cartItemId={} from cart", cartItemId);
		cartItemService.removeItem(cartItemId);
		return ResponseEntity.ok().build();
	}
}
