package com.techlab.model;


public class Product {
    static int id_increment = 0;


    private int ID;
    private String name;
    private double price;
    private int stock;

    public Product(String name, double price, int stock) {
        this.ID = id_increment++;

        this.name = name;
        this.price = price;
        this.stock = stock;
    }

    //Functions
    public String showProduct() {
        return "🆔 ID: " + this.getID() + " | 🏷️ Nombre: " + this.getName() + " | 💲 Precio: $" + this.getPrice() + " | 📦 Stock: " + this.getStock();
    }

    //Setters and Getters
    public int getID() {
        return ID;
    }

    public void setID(int ID) {
        this.ID = ID;
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
        this.price = price;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }
}
