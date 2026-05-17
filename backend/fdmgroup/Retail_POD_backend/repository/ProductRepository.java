package com.fdmgroup.Retail_POD_backend.repository;

import com.fdmgroup.Retail_POD_backend.model.Product;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {

	Page<Product> findByProductNameEqualsIgnoreCaseOrProductDescriptionEqualsIgnoreCaseOrCategory_CategoryNameEqualsIgnoreCaseOrSubCategory_SubCategoryNameAndListPriceBetween(
			String nameKeyword, String descriptionKeyword, String categoryKeyword, String subCategoryKeyword,
			BigDecimal minPrice, BigDecimal maxPrice, Pageable pageable);

	@Query(value = "SELECT * FROM product WHERE product_name LIKE CONCAT('%', :keyword, '%') OR product_description LIKE CONCAT('%', :keyword, '%')", nativeQuery = true)
	Page<Product> findProductByKeyword(@Param("keyword") String keyword, BigDecimal minPrice, BigDecimal maxPrice, Pageable pageable);

	List<Product> findByListPriceBetween(BigDecimal minPrice, BigDecimal maxPrice);

	@Query(value = "SELECT *FROM "
			+ "(SELECT p.*, ROW_NUMBER() OVER (PARTITION BY p.category_id ORDER BY p.created_at DESC) AS row_num  "
			+ "FROM product p) latest_products	" + "WHERE row_num <= 4", nativeQuery = true)
	List<Product> findLatestProducts();

	@Query(value = "SELECT * FROM (SELECT p.*, SUM(oi.quantity) AS total_quantity_sold,"
			+ " ROW_NUMBER() OVER (PARTITION BY p.category_id ORDER BY SUM(oi.quantity) DESC) AS row_num "
			+ " FROM product p" + " JOIN order_item oi ON p.product_id = oi.product_id"
			+ " GROUP BY p.product_id, p.category_id, p.product_name, p.created_at) best_selling_products "
			+ "WHERE row_num <= 6", nativeQuery = true)
	List<Product> findTopSellingProducts();
}
