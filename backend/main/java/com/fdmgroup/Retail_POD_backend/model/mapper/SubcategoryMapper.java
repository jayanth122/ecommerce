package com.fdmgroup.Retail_POD_backend.model.mapper;

import org.mapstruct.Mapper;

import org.mapstruct.Mapping;

import com.fdmgroup.Retail_POD_backend.dto.GetSubcategoriesDTO;
import com.fdmgroup.Retail_POD_backend.model.SubCategory;


@Mapper(componentModel = "spring")
public abstract class SubcategoryMapper {

	@Mapping(source = "category.categoryName", target = "categoryName")
    @Mapping(source = "subCategoryName", target = "subCategoryName")
    @Mapping(source = "subCategoryThumbnailURL", target = "thumbnailURL")
	public abstract GetSubcategoriesDTO toSubcategoryDTO(SubCategory subCategory);

	public abstract SubCategory toSubcategory(GetSubcategoriesDTO subCategoryDTO);

}
