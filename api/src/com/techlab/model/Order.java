package com.techlab.model;

import javax.sound.sampled.Line;
import java.util.ArrayList;
import java.util.List;

public class Order {
    static int id_increment = 0;

    private int ID;
    private List<LineItem> items;
    private double costTotal;

    public Order() {
        this.ID = id_increment++;
        this.items = new ArrayList<LineItem>();
        this.costTotal = 0;
    }

    public String showLineItem() {
        System.out.println("====== PEDIDO #" + this.ID + " ====== ");
        System.out.println("Productos:");
        for (LineItem item : this.items) {
            Product p = item.getProduct();
            System.out.printf(" - 📦 %s | 🔢 Cantidad: %d | 💲 Precio Unitario: $%.2f \n",
                    p.getName(), item.getQuantity(), p.getPrice());
        }
        System.out.printf("Total del pedido: 💰 $%.2f%n", this.costTotal);
        System.out.println("---------------------------------------------------------");
        return "";
    }

    public String addItem(Product p, int quantity) {
        if(p.getStock() < quantity)
            return "❌ Stock insuficiente. Solo hay " + p.getStock() + " unidades disponibles.";

        LineItem lItem = searchProductInLineItem(p.getID());
        if(lItem != null) {
            lItem.setQuantity(lItem.getQuantity() + quantity);
        } else {
            lItem = new LineItem(p, quantity);
            items.add(lItem);
        }

        costTotal += p.getPrice() * quantity;
        p.setStock(p.getStock() - quantity);

        return "✅ Producto agregado al pedido: " + p.getName() + " x" + quantity;
    }

    private LineItem searchProductInLineItem(int id_product) {

        for (LineItem l : this.items) {
            if(l.getProduct().getID() == id_product) return l;
        }

        return null;
    }

    public double getCostTotal() {
        return costTotal;
    }

    public void setCostTotal(double costTotal) {
        this.costTotal = costTotal;
    }

    public List<LineItem> getItems() {
        return this.items;
    }

    public int getID() {
        return ID;
    }

    public void setID(int ID) {
        this.ID = ID;
    }
}
