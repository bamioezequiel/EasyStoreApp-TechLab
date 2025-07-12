package com.techlab.easystore.controller;

import com.techlab.easystore.model.Category;
import com.techlab.easystore.service.CategoryService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/categories")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @GetMapping
    public List<Category> getAllCategories() {
        return this.categoryService.findAllCategories();
    }

    @GetMapping("/{id}")
    public Category getCategory(@PathVariable Long id) {
        return this.categoryService.findCategoryById(id);
    }

    @PostMapping
    public ResponseEntity<Category> createCategory(@Valid @RequestBody Category category) {
        Category savedCategory = this.categoryService.createCategory(category);
        return ResponseEntity.created(URI.create("/api/categories/" + savedCategory.getId())).body(savedCategory);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable Long id, @Valid @RequestBody Category category) {
        Category updatedCategory = this.categoryService.updateCategory(category, id);
        return ResponseEntity.ok(updatedCategory);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Category> deleteCategory(@PathVariable Long id) {
        boolean deleted = this.categoryService.deleteCategory(id);
        if(deleted) return ResponseEntity.noContent().build();

        return ResponseEntity.notFound().build();
    }
}
