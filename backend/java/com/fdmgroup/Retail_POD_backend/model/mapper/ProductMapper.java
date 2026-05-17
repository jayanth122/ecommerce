package com.fdmgroup.Retail_POD_backend.model.mapper;

import java.util.List;

import org.mapstruct.InjectionStrategy;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import com.fdmgroup.Retail_POD_backend.model.Image;
import com.fdmgroup.Retail_POD_backend.model.Product;

import com.fdmgroup.Retail_POD_backend.model.Review;

import com.fdmgroup.Retail_POD_backend.model.Stock;

import com.fdmgroup.Retail_POD_backend.model.DTO.ProductDTO;
import com.fdmgroup.Retail_POD_backend.model.DTO.StockDTO;

@Mapper(injectionStrategy = InjectionStrategy.CONSTRUCTOR, componentModel = "spring")
public interface ProductMapper {

    @Mapping(source = "category.categoryName", target = "categoryName")
    @Mapping(source = "subCategory.subCategoryName", target = "subCategoryName")
    @Mapping(source = "brand.brandName", target = "brandName")
    @Mapping(source = "images", target = "imageUrls", qualifiedByName = "mapImageUrls")
    @Mapping(source = "stock", target = "stock", qualifiedByName = "mapStockToStockDTO")
	@Mapping(source = "reviews", target = "averageRating", qualifiedByName = "avgrating")
	@Mapping(source = "reviews", target = "numberOfReviews", qualifiedByName = "numberOfReviews")
    ProductDTO toProductDTO(Product product);

    @Mapping(target = "category.categoryName", source = "categoryName")
    @Mapping(target = "subCategory.subCategoryName", source = "subCategoryName")
    @Mapping(target = "brand.brandName", source = "brandName")
    @Mapping(target = "images", ignore = true) 
    @Mapping(target = "stock", ignore = true) 
	@Mapping(target = "reviews", ignore = true)
    Product toProduct(ProductDTO productDTO);

    @Named("mapImageUrls")
    default List<String> mapImageUrls(List<Image> images) {
        return images.stream().map(Image::getImageUrl).toList();
    }

    @Named("mapStockToStockDTO")
    default List<StockDTO> mapStockToStockDTO(List<Stock> stockList) {
        return stockList.stream().map(stock -> new StockDTO(
            stock.getSize(),
            stock.getQuantity()
        )).toList();
    }
    
	@Named("avgrating")
	default double avgrating(List<Review> reviews) {
	    return Math.round(
	            reviews.stream()
	                   .mapToInt(Review::getRating)
	                   .average()
	                   .orElse(0.0) * 10.0) / 10.0; 
	}
	
	
	@Named("numberOfReviews")
	default double numberOfReviews(List<Review> reviews) {
	 return reviews.size();
	}
}

