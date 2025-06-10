package com.techlab.main;

import com.techlab.exception.NoProductsAvailableException;
import com.techlab.model.Order;
import com.techlab.model.Product;
import com.techlab.service.OrderService;
import com.techlab.service.ProductService;
import com.techlab.utils.Utils;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.util.Set;

public class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        ProductService productService = new ProductService();
        OrderService orderService = new OrderService(productService);

        int option = 0;

        do {
            try {
                showMenu();
                option = Integer.parseInt(sc.nextLine());


                switch (option) {
                    case 1:
                        String message = productService.createProduct();
                        System.out.println("🆕 " + message);
                        break;
                    case 2:
                        try {
                            productService.showProducts();
                            System.out.println("\nPresiona Enter para continuar...");
                            sc.nextLine();
                        }catch (NoProductsAvailableException e) {
                            System.out.println("⚠️ " + e.getMessage());
                        }
                        break;
                    case 3:
                        Product p = productService.searchProductById();
                        if(p == null) continue;
                        System.out.println("\n🔍 Detalles del producto:");
                        System.out.println(p.showProduct());

                        int optionUpdate = Utils.askForValidOption(
                                "Desea modificar el producto?\n1 - Sí ✅\n0 - No ❌",
                                Set.of(0, 1)
                        );

                        if(optionUpdate == 1) {
                            System.out.println(productService.updateProduct(p));
                            System.out.println("\nPresiona Enter para continuar...");
                            sc.nextLine();
                        }
                        break;
                    case 4:
                        System.out.println("🗑️ " + productService.deleteProduct());
                        break;
                    case 5:
                        System.out.println("🛒 Creando nuevo pedido...");
                        System.out.println(orderService.createOrder());

                        break;
                    case 6:
                        System.out.println("📋 Listado de pedidos:");
                        orderService.showOrders();
                        break;
                    case 7:
                        System.out.println("👋 Gracias por usar TechLab.");
                        return;
                    default:
                        System.out.println("❌ Opcion invalida, por favor elige un numero entre 1 y 7.");
                        break;
                }
            } catch (NumberFormatException e) {
            System.out.println("❌ Entrada inválida. Por favor, ingresa un número.");
            } catch (Exception e) {
                System.out.println("⚠️ Error inesperado: " + e.getMessage());
            }
        } while(option != 7);
}

    static void showMenu() {
        System.out.println("\n====== SISTEMA DE GESTIÓN - TECHLAB ======");
        System.out.println("1) ➕ Agregar producto");
        System.out.println("2) 📋 Listar productos");
        System.out.println("3) 🔎 Buscar / Actualizar producto");
        System.out.println("4) 🗑️ Eliminar producto");
        System.out.println("5) 🛒 Crear un pedido");
        System.out.println("6) 📦 Listar pedidos");
        System.out.println("7) 🚪 Salir");
        System.out.print("Elija una opción: ");
    }
}


