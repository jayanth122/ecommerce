package com.fdmgroup.Retail_POD_backend.service;

import org.springframework.stereotype.Service;
import com.fdmgroup.Retail_POD_backend.enums.CartType;
import com.fdmgroup.Retail_POD_backend.exceptions.ProductNotFoundException;
import com.fdmgroup.Retail_POD_backend.exceptions.UserNotFoundException;
import com.fdmgroup.Retail_POD_backend.model.Cart;
import com.fdmgroup.Retail_POD_backend.model.User;
import com.fdmgroup.Retail_POD_backend.model.DTO.CartDTO;
import com.fdmgroup.Retail_POD_backend.model.mapper.CartMapper;
import com.fdmgroup.Retail_POD_backend.repository.CartRepository;
import com.fdmgroup.Retail_POD_backend.repository.UserRepository;
import com.fdmgroup.Retail_POD_backend.utils.JwtUtil;

import lombok.AllArgsConstructor;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Optional;

import com.fdmgroup.Retail_POD_backend.model.CartItem;
import com.fdmgroup.Retail_POD_backend.model.DTO.CartItemDTO;
import com.fdmgroup.Retail_POD_backend.model.Product;
import com.fdmgroup.Retail_POD_backend.repository.CartItemRepository;
import com.fdmgroup.Retail_POD_backend.repository.ProductRepository;

@Service
@AllArgsConstructor
public class CartServiceImpl implements CartService {

    private CartItemRepository cartItemRepo;
    private ProductRepository productRepo;
	private CartMapper cartMapper;
	private CartRepository cartRepo;
	private UserRepository userRepo;

    
	   

	
	@Override
	public CartDTO getShoppingCart(String username) {
		Cart cart = cartRepo.findByUserUsernameAndType(username, CartType.SHOPPING).orElseGet(()->createCart(username, CartType.SHOPPING));
		return cartMapper.toCartDTO(cart);
	}
	
	
	 
	private Cart createCart(String username, CartType cartType) {
	User user = userRepo.findByUsername(username)
            .orElseThrow(() -> new UserNotFoundException("User not found -- username="+username));

    Cart cart = new Cart();
    cart.setUser(user);
    cart.setType(cartType);

    return cartRepo.save(cart);
	}
	
	
	
	
	@Override
	public Cart addItemToCart(String username, CartItemDTO cartItemDTO) {
	    // Fetch the user from the database
		User user = userRepo.findByUsername(username)
                .orElseThrow(() -> new UserNotFoundException("User not found with username: " + username));


	    // Fetch the product
		 Product product = productRepo.findById(cartItemDTO.getProductId())
	                .orElseThrow(() -> new ProductNotFoundException(cartItemDTO.getProductId()));

	    // Fetch or create a shopping cart for the user
	    Cart cart = cartRepo.findByUserAndType(user, CartType.SHOPPING)
	            .orElseGet(() -> {
	                Cart newCart = Cart.builder()
	                        .user(user)
	                        .type(CartType.SHOPPING)
	                        .build();
	                return cartRepo.save(newCart);
	            });

	    if (cart.getCartItems() == null) {
	        cart.setCartItems(new ArrayList<>());
	    }

	    // Check if the product is already in the cart
	    Optional<CartItem> existingCartItem = cart.getCartItems().stream()
	            .filter(cartItem -> cartItem.getProduct().getId() == product.getId() &&
	                    Objects.equals(cartItem.getSize(), cartItemDTO.getSize()))
	            .findFirst();

	    if (existingCartItem.isPresent()) {
	        // Update the existing cart item
	        CartItem cartItem = existingCartItem.get();
	        cartItem.setQuantity(cartItem.getQuantity() + cartItemDTO.getQuantity());
	        cartItem.setUpdatedAt(LocalDateTime.now());
	    } else {
	        // Add a new cart item
	        CartItem newCartItem = new CartItem();
	        newCartItem.setCart(cart);
	        newCartItem.setProduct(product);
	        newCartItem.setQuantity(cartItemDTO.getQuantity());
	        newCartItem.setSize(cartItemDTO.getSize());
	        newCartItem.setCreatedAt(LocalDateTime.now());
	        newCartItem.setUpdatedAt(LocalDateTime.now());
	        cart.getCartItems().add(newCartItem);
	    }

	
	    return cartRepo.save(cart);
	}
	
	
	
	
	@Override
	public void addItemsToCart(String username, List<CartItemDTO> cartItemDTOs) {
		 User user = userRepo.findByUsername(username)
	                .orElseThrow(() -> new UserNotFoundException("User not found with username: " + username));

	    // Fetch or create a shopping cart for the user
	    Cart cart = cartRepo.findByUserAndType(user, CartType.SHOPPING)
	            .orElseGet(() -> {
	                Cart newCart = Cart.builder()
	                        .user(user)
	                        .type(CartType.SHOPPING)
	                        .cartItems(new ArrayList<>())
	                        .build();
	                return cartRepo.save(newCart);
	            });

	    if (cart.getCartItems() == null) {
	        cart.setCartItems(new ArrayList<>());
	    }

	    for (CartItemDTO cartItemDTO : cartItemDTOs) {
	    	Product product = productRepo.findById(cartItemDTO.getProductId())
                    .orElseThrow(() -> new ProductNotFoundException(cartItemDTO.getProductId()));

	        Optional<CartItem> existingCartItem = cart.getCartItems().stream()
	                .filter(cartItem -> cartItem.getProduct().getId() == product.getId() &&
	                        Objects.equals(cartItem.getSize(), cartItemDTO.getSize()))
	                .findFirst();

	        if (existingCartItem.isPresent()) {
	            // Update the existing cart item
	            CartItem cartItem = existingCartItem.get();
	            cartItem.setQuantity(cartItem.getQuantity() + cartItemDTO.getQuantity());
	            cartItem.setUpdatedAt(LocalDateTime.now());
	        } else {
	            // Add a new cart item
	            CartItem newCartItem = new CartItem();
	            newCartItem.setCart(cart);
	            newCartItem.setProduct(product);
	            newCartItem.setQuantity(cartItemDTO.getQuantity());
	            newCartItem.setSize(cartItemDTO.getSize());
	            newCartItem.setCreatedAt(LocalDateTime.now());
	            newCartItem.setUpdatedAt(LocalDateTime.now());
	            cart.getCartItems().add(newCartItem);
	        }
	    }

	    cartRepo.save(cart);
	}



	
}
