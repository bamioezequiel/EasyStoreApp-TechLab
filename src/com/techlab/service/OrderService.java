package com.techlab.service;

import com.techlab.model.Order;
import com.techlab.model.Product;
import com.techlab.utils.Utils;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.util.Set;

public class OrderService {
    public List<Order> orders = new ArrayList<Order>();
    public ProductService productService;
    Scanner sc = new Scanner(System.in);

    public OrderService(ProductService productService) {
        this.productService = productService;
    }

    public String createOrder() {
        productService.showProducts();
        boolean continueAdding = false;
        Order order = new Order();

        while (!continueAdding) {
            Product p = productService.searchProductById();
            if (p == null) return "";

            int quantity = 0;
            boolean validQuantity = false;

            while (!validQuantity) {
                System.out.print("🛒 Cuantos productos desea agregar al pedido? ");
                try {
                    quantity = Integer.parseInt(sc.nextLine());
                    if (quantity <= 0) {
                        System.out.println("⚠️ La cantidad debe ser mayor a 0.");
                    } else if (quantity > p.getStock()) {
                        System.out.println("❌ No hay stock suficiente. Stock disponible: " + p.getStock());
                    } else {
                        validQuantity = true;
                    }
                } catch (NumberFormatException e) {
                    System.out.println("❌ Entrada invalida. Ingrese un numero.");
                }
            }

            int confirmOrder = Utils.askForValidOption(
                    "🧾 Seguro que desea agregar este producto al pedido?\n1 - Confirmar ✅\n0 - Cancelar ❌",
                    Set.of(0, 1)
            );

            if (confirmOrder == 1) {
                order.addItem(p, quantity);
                System.out.println("✅ Producto agregado al pedido!");
            } else {
                System.out.println("❌ Producto no agregado.");
            }

            continueAdding = Utils.askForValidOption(
                    "Desea seguir agregando productos al pedido?\n1 - Si ➕\n0 - No 🛑",
                    Set.of(0, 1)
            ) == 0;
        }

        orders.add(order);
        return "🎉 Pedido confirmado!\n" + order.showLineItem();
    }


    public void showOrders() {
        for (Order o : this.orders) {
            System.out.println(o.showLineItem());
        }
    }
}
