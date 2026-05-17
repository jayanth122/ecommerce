package com.fdmgroup.Retail_POD_backend.service;

import java.util.List;


import org.springframework.stereotype.Service;

import com.fdmgroup.Retail_POD_backend.exceptions.CategoryNotFoundException;
import com.fdmgroup.Retail_POD_backend.model.Category;
import com.fdmgroup.Retail_POD_backend.model.SubCategory;
import com.fdmgroup.Retail_POD_backend.repository.CategoryRepository;

@Service
public class CategoryService {

	private CategoryRepository categoryRepo;

	public CategoryService(CategoryRepository categoryRepo) {
		super();
		this.categoryRepo = categoryRepo;
	}

	public List<SubCategory> getSubcategories(Long id) throws CategoryNotFoundException {

		Category category = categoryRepo.findById(id)
				.orElseThrow(() -> new CategoryNotFoundException("Please check category id."));
		return category.getSubCategories();
	}
}
