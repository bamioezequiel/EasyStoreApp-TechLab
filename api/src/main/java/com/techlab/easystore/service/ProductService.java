package com.techlab.easystore.service;

import com.techlab.easystore.model.Product;
import com.techlab.easystore.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
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
        product.setCategory(p.getCategory());
        product.setImageUrl(p.getImageUrl());

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