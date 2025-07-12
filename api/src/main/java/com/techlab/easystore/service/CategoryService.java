package com.techlab.easystore.service;

import com.techlab.easystore.model.Category;
import com.techlab.easystore.repository.CategoryRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<Category> findAllCategories() {
        return this.categoryRepository.findAll();
    }

    public Category findCategoryById(Long id) {
        return this.categoryRepository.findById(id)
                .orElseThrow(()->new IllegalArgumentException("❌ Categoría no encontrada con ID: " + id));
    }

    public Category createCategory(Category category) {
        return this.categoryRepository.save(category);
    }

    public Category updateCategory(Category category, Long id) {
        Category updatedCategory = this.findCategoryById(id);
        updatedCategory.setName(category.getName());

        return this.categoryRepository.save(updatedCategory);
    }

    public boolean deleteCategory(Long id) {
        if(this.categoryRepository.existsById(id)) {
            this.categoryRepository.deleteById(id);
            return true;
        }

        return false;
    }
}
