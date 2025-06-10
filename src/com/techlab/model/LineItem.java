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
        if(quantity <= 0) throw new IllegalArgumentException("❌ La cantidad debe ser mayor a 0.");

        this.quantity = quantity;
    }

    public int getID() {
        return ID;
    }
}
