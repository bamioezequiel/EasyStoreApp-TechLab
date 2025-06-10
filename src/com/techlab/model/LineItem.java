package com.techlab.model;

public class LineItem {
    static int id_increment = 0;

    private int ID;
    private Product product;
    private int quantity;

    public LineItem(Product product, int quantity) {
        this.ID = id_increment++;
        this.product = product;
        this.quantity = quantity;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public int getID() {
        return ID;
    }

    public void setID(int ID) {
        this.ID = ID;
    }
}
