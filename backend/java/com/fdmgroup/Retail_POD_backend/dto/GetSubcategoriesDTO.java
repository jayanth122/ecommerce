package com.fdmgroup.Retail_POD_backend.dto;

import java.util.Objects;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class GetSubcategoriesDTO {

	String categoryName;
	String subCategoryName;
	Long id;
	String thumbnailURL;

}