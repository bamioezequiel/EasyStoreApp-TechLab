package com.techlab.model;

import java.util.ArrayList;
import java.util.List;

public class Order {
    static int id_increment = 0;

    private int ID;
    private List<LineItem> items;
    private double costTotal = 0;

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

    public void showOrderItems() {
        this.items.forEach(p -> System.out.println("----- Producto -----\n" + p.getProduct().showProduct() + " Quantity: " + p.getQuantity()));
    }

    public String addItem(Product p, int quantity) {
        if(p.getStock() < quantity)
            return "❌ Stock insuficiente. Solo hay " + p.getStock() + " unidades disponibles.";

        LineItem lItem = new LineItem(p, quantity);

        items.add(lItem);
        costTotal += p.getPrice() * quantity;

        return "✅ Producto agregado al pedido: " + p.getName() + " x" + quantity;
    }

    public String removeItem(int id_line_item) {
        for (int i = 0; i < this.items.size(); i++) {
            if(this.items.get(i).getID() == id_line_item) {
                this.items.remove(i);
            }
        }

        return "🗑️ Ítem eliminado correctamente del pedido.";
    }

    public double getCostTotal() {
        return costTotal;
    }

    public void setCostTotal(double costTotal) {
        this.costTotal += costTotal;
    }

    public int getID() {
        return ID;
    }

    public void setID(int ID) {
        this.ID = ID;
    }
}
