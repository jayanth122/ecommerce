package com.fdmgroup.Retail_POD_backend.model.mapper;

import com.fdmgroup.Retail_POD_backend.dto.GetSubcategoriesDTO;
import com.fdmgroup.Retail_POD_backend.model.Category;
import com.fdmgroup.Retail_POD_backend.model.SubCategory;
import javax.annotation.processing.Generated;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2025-04-23T15:46:24-0400",
    comments = "version: 1.6.0.Beta2, compiler: javac, environment: Java 23.0.2 (Oracle Corporation)"
)
@Component
public class SubcategoryMapperImpl extends SubcategoryMapper {

    @Override
    public GetSubcategoriesDTO toSubcategoryDTO(SubCategory subCategory) {
        if ( subCategory == null ) {
            return null;
        }

        String categoryName = null;
        String subCategoryName = null;
        String thumbnailURL = null;
        Long id = null;

        categoryName = subCategoryCategoryCategoryName( subCategory );
        subCategoryName = subCategory.getSubCategoryName();
        thumbnailURL = subCategory.getSubCategoryThumbnailURL();
        id = (long) subCategory.getId();

        GetSubcategoriesDTO getSubcategoriesDTO = new GetSubcategoriesDTO( categoryName, subCategoryName, id, thumbnailURL );

        return getSubcategoriesDTO;
    }

    @Override
    public SubCategory toSubcategory(GetSubcategoriesDTO subCategoryDTO) {
        if ( subCategoryDTO == null ) {
            return null;
        }

        SubCategory subCategory = new SubCategory();

        if ( subCategoryDTO.getId() != null ) {
            subCategory.setId( subCategoryDTO.getId().intValue() );
        }
        subCategory.setSubCategoryName( subCategoryDTO.getSubCategoryName() );

        return subCategory;
    }

    private String subCategoryCategoryCategoryName(SubCategory subCategory) {
        Category category = subCategory.getCategory();
        if ( category == null ) {
            return null;
        }
        return category.getCategoryName();
    }
}
