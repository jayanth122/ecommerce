package com.fdmgroup.Retail_POD_backend.service.specification;

import com.fdmgroup.Retail_POD_backend.model.Product;
import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class ProductSpecification implements Specification<Product> {

    private final String nameKeyword;
    private final String descriptionKeyword;
    private final String categoryKeyword;
    private final String subCategoryKeyword;
    private final BigDecimal minPrice;
    private final BigDecimal maxPrice;

    public ProductSpecification(
            String nameKeyword,
            String descriptionKeyword,
            String categoryKeyword,
            String subCategoryKeyword,
            BigDecimal minPrice,
            BigDecimal maxPrice) {
        this.nameKeyword = nameKeyword;
        this.descriptionKeyword = descriptionKeyword;
        this.categoryKeyword = categoryKeyword;
        this.subCategoryKeyword = subCategoryKeyword;
        this.minPrice = minPrice;
        this.maxPrice = maxPrice;
    }

    @Override
    public Predicate toPredicate(Root<Product> root, CriteriaQuery<?> query, CriteriaBuilder criteriaBuilder) {
        List<Predicate> pricePredicates = new ArrayList<>();
        List<Predicate> keywordPredicates = new ArrayList<>();
        List<Predicate> predicates = new ArrayList<>();

        if (nameKeyword != null && !nameKeyword.isEmpty()) {
            keywordPredicates.add(criteriaBuilder.equal(
                    criteriaBuilder.lower(root.get("productName")),
                    nameKeyword.toLowerCase()
            ));
        }
        if (descriptionKeyword != null && !descriptionKeyword.isEmpty()) {
            keywordPredicates.add(criteriaBuilder.equal(
                    criteriaBuilder.lower(root.get("productDescription")),
                    descriptionKeyword.toLowerCase()
            ));
        }
        if (categoryKeyword != null && !categoryKeyword.isEmpty()) {
            keywordPredicates.add(criteriaBuilder.equal(
                    criteriaBuilder.lower(root.get("category").get("categoryName")),
                    categoryKeyword.toLowerCase()
            ));
        }
        if (subCategoryKeyword != null && !subCategoryKeyword.isEmpty()) {
            keywordPredicates.add(criteriaBuilder.equal(
                    criteriaBuilder.lower(root.get("subCategory").get("subCategoryName")),
                    subCategoryKeyword.toLowerCase()
            ));
        }
        Predicate keywordPredicate = criteriaBuilder.or(keywordPredicates.toArray(new Predicate[0]));
        Predicate pricePredicate = criteriaBuilder.between(root.get("listPrice"), minPrice, maxPrice);

        return criteriaBuilder.and(keywordPredicate, pricePredicate);
    }
}
