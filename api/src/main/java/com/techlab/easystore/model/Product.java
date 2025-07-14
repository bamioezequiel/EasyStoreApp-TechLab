package com.techlab.easystore.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

@Entity
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @NotBlank(message = "❌ El nombre del producto no puede estar vacío.")
    @Size(max = 100, message = "❌ El nombre no debe superar los 100 caracteres.")
    private String name;

    @NotBlank(message = "❌ La descripción no puede estar vacía.")
    @Size(max = 255, message = "❌ La descripción no debe superar los 255 caracteres.")
    private String description;

    @NotBlank(message = "❌ La URL de la imagen es obligatoria.")
    @Size(max = 255, message = "❌ La URL de la imagen no debe superar los 255 caracteres.")
    @Pattern(regexp = "^(http|https)://.*$", message = "❌ La imagen debe tener una URL válida.")
    private String imageUrl;

    @Min(value = 0, message = "❌ El precio no puede ser negativo.")
    private double price;

    @Min(value = 0, message = "❌ El stock no puede ser negativo.")
    private int stock;

    @ManyToOne
    @JoinColumn(name = "category_id")
    @JsonIgnoreProperties({"listProduct"})
    private Category category;


    public Product() {
    }

    public Product(String name, String description, String imageUrl, Category category, double price, int stock) {
        this.name = name;
        this.description = description;
        this.imageUrl = imageUrl;
        this.category = category;
        this.price = price;
        this.stock = stock;
    }

    @Override
    public String toString() {
        return "🆔 ID: " + id +
                " | 🏷️ Nombre: " + name +
                " | 💲 Precio: $" + price +
                " | 📦 Stock: " + stock +
                " | 📂 Categoría: " + (category != null ? category.getName() : "Sin categoría");
    }
    public long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        if(price < 0) throw new IllegalArgumentException("❌ Error. El precio no puede ser negativo.");

        this.price = price;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        if(stock < 0) throw new IllegalArgumentException("❌ Error. El stock no puede ser negativo.");
        this.stock = stock;
    }

    public Category getCategory() {
        return category;
    }

    public void setCategory(Category category) {
        if (category == null) {
            throw new IllegalArgumentException("❌ La categoría no puede ser nula.");
        }
        this.category = category;
    }
    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
