package com.fdmgroup.Retail_POD_backend.controller;

import java.util.ArrayList;

import java.util.List;

import org.mapstruct.factory.Mappers;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fdmgroup.Retail_POD_backend.dto.GetSubcategoriesDTO;
import com.fdmgroup.Retail_POD_backend.exceptions.CategoryNotFoundException;
import com.fdmgroup.Retail_POD_backend.model.SubCategory;
import com.fdmgroup.Retail_POD_backend.model.User;
import com.fdmgroup.Retail_POD_backend.model.mapper.SubcategoryMapper;
import com.fdmgroup.Retail_POD_backend.service.CategoryService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@RestController
@RequestMapping("/api/v1/public/categories")
public class CategoryController {

	private CategoryService categoryService;
	private SubcategoryMapper subcategoryMapper;

	public CategoryController(CategoryService categoryService, SubcategoryMapper subcategoryMapper) {
		super();
		this.categoryService = categoryService;
		this.subcategoryMapper = subcategoryMapper;
	}

	@Operation(
		    summary = "Retrieve all subcategories for the given category ID",
		    description = "Fetches all subcategories associated with the specified category ID. Throws a CategoryNotFoundException if the category does not exist."
		)
		@ApiResponses(value = {
		    @ApiResponse(responseCode = "200", description = "Successfully retrieved all subcategories for the given category ID"),
		    @ApiResponse(responseCode = "404", description = "Category not found for the given ID"),
		    @ApiResponse(responseCode = "500", description = "Internal server error")
		})
		@Parameter(
		    name = "id",
		    description = "ID of the category whose subcategories are to be retrieved",
		    required = true,
		    example = "1"
		)
		@GetMapping("/subcategories/{id}")
	public ResponseEntity<List<GetSubcategoriesDTO>> getAllSubCategories(@PathVariable Long id)
			throws CategoryNotFoundException {
		List<SubCategory> subcategories = categoryService.getSubcategories(id);
		List<GetSubcategoriesDTO> subcategoryDTOs = new ArrayList<>();

		for (SubCategory subcategory : subcategories) {
			subcategoryDTOs.add(subcategoryMapper.toSubcategoryDTO(subcategory));
		}
		return ResponseEntity.ok(subcategoryDTOs);
	}

}
