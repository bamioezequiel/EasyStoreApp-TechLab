package com.techlab.easystore.service;

import com.techlab.easystore.model.Category;
import com.techlab.easystore.model.Product;
import com.techlab.easystore.repository.CategoryRepository;
import com.techlab.easystore.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;

    public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    public List<Product> findAllProducts() {
        return this.productRepository.findAll();
    }

    public Product findProductByID(Long id) {
        return this.productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Producto no encontrado con ID: " + id));

    }

    public Product createProduct(Product p) {
        return this.productRepository.save(p);
    }

    public Product updateProduct(Product p, Long id) {
        Product product = findProductByID(id);

        product.setName(p.getName());
        product.setDescription(p.getDescription());
        product.setPrice(p.getPrice());
        product.setStock(p.getStock());
        product.setImageUrl(p.getImageUrl());

        if (p.getCategory() != null && p.getCategory().getId() != null) {
            Category category = categoryRepository.findById(p.getCategory().getId())
                    .orElseThrow(() -> new IllegalArgumentException("❌ Categoría no encontrada."));
            product.setCategory(category);
        } else {
            throw new IllegalArgumentException("❌ La categoría es obligatoria.");
        }

        return this.productRepository.save(product);
    }

    public boolean deleteProduct(Long id) {
        if(this.productRepository.existsById(id)) {
            this.productRepository.deleteById(id);
            return true;
        }

        return false;
    }
}