package com.techlab.service;

import com.techlab.exception.NoProductsAvailableException;
import com.techlab.model.Product;
import com.techlab.utils.Utils;
import jdk.jshell.execution.Util;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.util.Set;

public class ProductService {

    public List<Product> products = new ArrayList<Product>();
    Scanner sc = new Scanner(System.in);

    public ProductService() {
        this.products.add(new Product("Pepsi", 6, 15));
        this.products.add(new Product("Cafe", 2, 20));
        this.products.add(new Product("Medialuna", 5, 5));
        this.products.add(new Product("Te", 1, 30));
    }

    public String createProduct() {
        String name = "";
        double price = 0;
        int stock = 0;

        while (true) {
            System.out.print("📝 Ingrese el nombre del producto: ");
            name = sc.nextLine().trim();

            if (!name.isEmpty()) break;

            System.out.println("❌ El nombre no puede estar vacío. Intente nuevamente.");
        }

        while (true) {
            System.out.print("💲 Ingrese el precio: ");
            try {
                price = Double.parseDouble(sc.nextLine());
                if (price < 0) throw new NumberFormatException();
                break;
            } catch (NumberFormatException e) {
                System.out.println("❌ Entrada inválida. Ingrese un número positivo.");
            }
        }

        while (true) {
            System.out.print("📦 Ingrese el stock: ");
            try {
                stock = Integer.parseInt(sc.nextLine());
                if (stock < 0) throw new NumberFormatException();
                break;
            } catch (NumberFormatException e) {
                System.out.println("❌ Entrada inválida. Ingrese un número entero positivo.");
            }
        }

        Product product = new Product(name, price, stock);
        products.add(product);

        return "✅ Producto agregado exitosamente: " + product.showProduct();
    }

    public void showProducts() {
        System.out.println("===== LISTA DE PRODUCTOS =====");

        if(this.products.isEmpty()) throw new NoProductsAvailableException();

        for(Product p : this.products) {
            System.out.println(p.showProduct());
        }
    }

    public Product searchProductById() {
        int id = -1;
        boolean isValid = false;

        while (!isValid) {
            System.out.print("🔍 Ingrese el ID del producto: ");
            try {
                id = Integer.parseInt(sc.nextLine());
                if (id >= 0 && id < products.size()) {
                    Product p = products.get(id);
                    System.out.println("✅ Producto encontrado: " + p.getName());
                    isValid = true;
                    return p;
                } else {
                    System.out.println("❌ No existe un producto con la ID ingresada.");
                    isValid = Utils.askForValidOption(
                            "Desea volver a intentarlo? \n1 - Si ✅\n0 - Salir ❌",
                            Set.of(0, 1)
                    ) == 0;
                }
            } catch (NumberFormatException e) {
                System.out.println("❌ Error. Ingrese un número válido para la ID.");
            }
        }
        return null;
    }

    public String updateProduct(Product p) {
        boolean finished = false;

        while (!finished) {
            int optionUpdate = Utils.askForValidOption(
                    "\n🔧 Que deseas modificar?\n0 - Nombre 🏷️\n1 - Precio 💲\n2 - Stock 📦",
                    Set.of(0, 1, 2)
            );

            switch (optionUpdate) {
                case 0:
                    System.out.println("📌 Nombre actual: " + p.getName());
                    System.out.print("✍️ Ingrese el nuevo nombre: ");
                    String newName = sc.nextLine();

                    int confirmName = Utils.askForValidOption(
                            "❓ Confirmas cambiar el nombre de '" + p.getName() + "' a '" + newName + "'?\n1 - Confirmar ✅\n0 - Cancelar ❌",
                            Set.of(0, 1)
                    );

                    if (confirmName == 1) {
                        p.setName(newName);
                        System.out.println("✅ Nombre actualizado.");
                    } else {
                        System.out.println("❌ Cambio cancelado.");
                    }
                break;
                case 1:
                    System.out.println("📌 Precio actual: $" + p.getPrice());
                    System.out.print("💰 Ingrese el nuevo precio: ");
                    try {
                        double newPrice = Double.parseDouble(sc.nextLine());
                        if (newPrice < 0) {
                            System.out.println("⚠️ El precio debe ser positivo.");
                            break;
                        }

                        int confirmPrice = Utils.askForValidOption(
                                "❓ Confirmas cambiar el precio de $" + p.getPrice() + " a $" + newPrice + "?\n1 - Confirmar ✅\n0 - Cancelar ❌",
                                Set.of(0, 1)
                        );

                        if (confirmPrice == 1) {
                            p.setPrice(newPrice);
                            System.out.println("✅ Precio actualizado.");
                        } else {
                            System.out.println("❌ Cambio cancelado.");
                        }

                    } catch (NumberFormatException e) {
                        System.out.println("❌ Entrada invalida. Ingresa un numero.");
                    }
                break;

                case 2:
                    System.out.println("📌 Stock actual: " + p.getStock());
                    System.out.print("📥 Ingrese el nuevo stock: ");

                    try {
                        int newStock = Integer.parseInt(sc.nextLine());
                        if (newStock < 0) {
                            System.out.println("⚠️ El stock no puede ser negativo.");
                            break;
                        }

                        int confirmStock = Utils.askForValidOption(
                                "❓ Confirmas cambiar el stock de " + p.getStock() + " a " + newStock + "?\n1 - Confirmar ✅\n0 - Cancelar ❌",
                                Set.of(0, 1)
                        );

                        if (confirmStock == 1) {
                            p.setStock(newStock);
                            System.out.println("✅ Stock actualizado.");
                        } else {
                            System.out.println("❌ Cambio cancelado.");
                        }

                    } catch (NumberFormatException e) {
                        System.out.println("❌ Entrada invalida. Ingresa un numero.");
                    }
                    break;
                }

            finished = Utils.askForValidOption(
                    "\n🔁 Deseas seguir modificando este producto?\n1 - Si 🔄\n0 - No 🚪",
                    Set.of(0, 1)
            ) == 0;
        }

        return p.showProduct();
    }

    public String deleteProduct() {
        Product p = this.searchProductById();

        if (p == null) return "";

        int confirmDelete = Utils.askForValidOption(
                "🗑️ Estas seguro que deseas eliminar el producto '" + p.getName() + "'?\n1 - Confirmar ✅\n0 - Cancelar ❌",
                Set.of(0, 1)
        );

        if (confirmDelete == 1) {
            products.remove(p.getID());
            return "✅ El producto '" + p.getName() + "' fue eliminado exitosamente.";
        }

        return "❌ Eliminacion cancelada. El producto no fue borrado.";
    }


}
