package com.techlab.easystore.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

@Entity
public class LineItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    @ManyToOne(optional = false)
    @JoinColumn(name = "product_id")
    @JsonBackReference
    private Product product;

    @ManyToOne(optional = false)
    @JoinColumn(name = "order_id")
    @JsonBackReference
    private Order order;
    private int quantity;

    public LineItem() {
    }

    public LineItem(Product product, int quantity) {
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

    public long getId() {
        return id;
    }

    public Order getOrder() {
        return order;
    }

    public void setOrder(Order order) {
        this.order = order;
    }
}
