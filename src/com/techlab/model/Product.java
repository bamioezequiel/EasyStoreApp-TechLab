package com.techlab.model;

public class Product {
    private static int id_increment = 0;


    private int ID;
    private String name;
    private double price;
    private int stock;

    public Product(String name, double price, int stock) {
        this.ID = id_increment++;

        this.setName(name);
        this.setPrice(price);
        this.setStock(stock);
    }

    @Override
    public String toString() {
        return "🆔 ID: " + this.getID() + " | 🏷️ Nombre: " + this.getName() + " | 💲 Precio: $" + this.getPrice() + " | 📦 Stock: " + this.getStock();
    }

    public int getID() {
        return ID;
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
}
