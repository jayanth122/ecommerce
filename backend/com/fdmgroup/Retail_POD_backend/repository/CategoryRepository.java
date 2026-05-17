package com.fdmgroup.Retail_POD_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.fdmgroup.Retail_POD_backend.model.Category;

public interface CategoryRepository extends JpaRepository<Category, Long> {

}
