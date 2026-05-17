package com.fdmgroup.Retail_POD_backend.repository;

import static org.junit.Assert.assertNotNull;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase.Replace;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import com.fdmgroup.Retail_POD_backend.model.Product;

@DataJpaTest
@AutoConfigureTestDatabase(replace = Replace.NONE)
public class ProductRepositoryTest {
    @Autowired
    private ProductRepository productRepository;

    @Test
    public void testSaveCartItem_ReturnsSavedCartItem() {
        // Arrange
        Product product = new Product();

        // Act
        Product savedCartItem = productRepository.save(product);

        // Assert
        assertNotNull(savedCartItem);

    }

}
