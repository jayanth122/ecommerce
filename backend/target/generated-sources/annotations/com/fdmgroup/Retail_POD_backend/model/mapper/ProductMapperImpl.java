package com.fdmgroup.Retail_POD_backend.model.mapper;

import com.fdmgroup.Retail_POD_backend.model.Brand;
import com.fdmgroup.Retail_POD_backend.model.Category;
import com.fdmgroup.Retail_POD_backend.model.DTO.ProductDTO;
import com.fdmgroup.Retail_POD_backend.model.Product;
import com.fdmgroup.Retail_POD_backend.model.SubCategory;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-04-23T15:46:24-0400",
    comments = "version: 1.6.0.Beta2, compiler: javac, environment: Java 23.0.2 (Oracle Corporation)"
)
@Component
public class ProductMapperImpl implements ProductMapper {

    @Override
    public ProductDTO toProductDTO(Product product) {
        if ( product == null ) {
            return null;
        }

        ProductDTO productDTO = new ProductDTO();

        productDTO.setCategoryName( productCategoryCategoryName( product ) );
        productDTO.setSubCategoryName( productSubCategorySubCategoryName( product ) );
        productDTO.setBrandName( productBrandBrandName( product ) );
        productDTO.setImageUrls( mapImageUrls( product.getImages() ) );
        productDTO.setStock( mapStockToStockDTO( product.getStock() ) );
        productDTO.setAverageRating( avgrating( product.getReviews() ) );
        if ( product.getReviews() != null ) {
            productDTO.setNumberOfReviews( (int) numberOfReviews( product.getReviews() ) );
        }
        productDTO.setId( product.getId() );
        productDTO.setProductName( product.getProductName() );
        productDTO.setProductDescription( product.getProductDescription() );
        productDTO.setListPrice( product.getListPrice() );
        productDTO.setCreatedAt( product.getCreatedAt() );
        productDTO.setUpdatedAt( product.getUpdatedAt() );

        return productDTO;
    }

    @Override
    public Product toProduct(ProductDTO productDTO) {
        if ( productDTO == null ) {
            return null;
        }

        Product product = new Product();

        product.setCategory( productDTOToCategory( productDTO ) );
        product.setSubCategory( productDTOToSubCategory( productDTO ) );
        product.setBrand( productDTOToBrand( productDTO ) );
        product.setId( productDTO.getId() );
        product.setProductName( productDTO.getProductName() );
        product.setProductDescription( productDTO.getProductDescription() );
        product.setListPrice( productDTO.getListPrice() );
        product.setCreatedAt( productDTO.getCreatedAt() );
        product.setUpdatedAt( productDTO.getUpdatedAt() );

        return product;
    }

    private String productCategoryCategoryName(Product product) {
        Category category = product.getCategory();
        if ( category == null ) {
            return null;
        }
        return category.getCategoryName();
    }

    private String productSubCategorySubCategoryName(Product product) {
        SubCategory subCategory = product.getSubCategory();
        if ( subCategory == null ) {
            return null;
        }
        return subCategory.getSubCategoryName();
    }

    private String productBrandBrandName(Product product) {
        Brand brand = product.getBrand();
        if ( brand == null ) {
            return null;
        }
        return brand.getBrandName();
    }

    protected Category productDTOToCategory(ProductDTO productDTO) {
        if ( productDTO == null ) {
            return null;
        }

        Category category = new Category();

        category.setCategoryName( productDTO.getCategoryName() );

        return category;
    }

    protected SubCategory productDTOToSubCategory(ProductDTO productDTO) {
        if ( productDTO == null ) {
            return null;
        }

        SubCategory subCategory = new SubCategory();

        subCategory.setSubCategoryName( productDTO.getSubCategoryName() );

        return subCategory;
    }

    protected Brand productDTOToBrand(ProductDTO productDTO) {
        if ( productDTO == null ) {
            return null;
        }

        Brand brand = new Brand();

        brand.setBrandName( productDTO.getBrandName() );

        return brand;
    }
}
