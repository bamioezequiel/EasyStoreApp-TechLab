package com.techlab.easystore.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.techlab.easystore.utils.OrderStatus;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<LineItem> items = new ArrayList<>();

    private double costTotal;

    @Enumerated(EnumType.STRING)
    private OrderStatus status;

    public Order() {
        this.status = OrderStatus.CREATED;
        this.costTotal = 0;
    }

    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("====== PEDIDO #").append(this.id).append(" ======\n");
        sb.append("Productos:\n");

        for (LineItem item : this.items) {
            Product p = item.getProduct();
            sb.append(String.format(" - 📦 %s | 🔢 Cantidad: %d | 💲 Precio Unitario: $%.2f\n",
                    p.getName(), item.getQuantity(), p.getPrice()));
        }

        sb.append(String.format("Total del pedido: 💰 $%.2f\n", this.costTotal));
        sb.append("---------------------------------------------------------\n");

        return sb.toString();
    }

    // Getters y setters

    public OrderStatus getStatus() {
        return status;
    }

    public void setStatus(OrderStatus status) {
        this.status = status;
    }

    public long getId() {
        return id;
    }

    public List<LineItem> getItems() {
        return items;
    }

    public void setItems(List<LineItem> items) {
        this.items = items;
    }

    public double getCostTotal() {
        return costTotal;
    }

    public void setCostTotal(double costTotal) {
        this.costTotal = costTotal;
    }
}
