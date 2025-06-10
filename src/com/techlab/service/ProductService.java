package com.techlab.service;

import com.techlab.exception.NoProductsAvailableException;
import com.techlab.model.Drink;
import com.techlab.model.Food;
import com.techlab.model.Product;
import com.techlab.utils.Utils;
import jdk.jshell.execution.Util;

import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;
import java.util.Set;

public class ProductService {

    private List<Product> products = new ArrayList<Product>();
    Scanner sc = new Scanner(System.in);

    public ProductService() {
    }

    public String createProduct(String type) {
        String name = Utils.validatePositiveString("📝 Ingrese el nombre del producto: ");
        double price = Utils.validatePositiveDouble("💲 Ingrese el precio: ");
        int stock = Utils.validatePositiveInt("📦 Ingrese el stock: ");

        Product product;
        switch (type) {
            case "food":
                product = createFood(name, price, stock);
                break;
            case "drink":
                product = createDrink(name, price, stock);
                break;
            default:
                System.out.println("❌ Tipo de producto invalido. Solo se acepta 'Food' o 'Drink'.");
                return "❌ No se pudo agregar el producto.";
        }

        products.add(product);

        return "✅ Producto agregado exitosamente: " + product.toString();
    }

    public Product createDrink(String name, double price, int stock) {
        double liters = Utils.validatePositiveDouble("🧴 Ingrese los litros: ");
        String containerType = Utils.validatePositiveString("📝 Ingrese el tipo de envase: ");

        return new Drink(name, price, stock, liters, containerType);
    }

    public Product createFood(String name, double price, int stock) {
        double weightGrams = Utils.validatePositiveDouble("🏋️️ Ingrese el peso: ");
        int calories = Utils.validatePositiveInt("📦 Ingrese las calorias: ");

        return new Food(name, price, stock, weightGrams, calories);
    }

    public void showProducts() {
        if (products.isEmpty()) throw new NoProductsAvailableException();

        System.out.println("===== LISTA DE PRODUCTOS =====");

        if(this.products.isEmpty()) throw new NoProductsAvailableException();

        for(Product p : this.products) {
            System.out.println(p.toString());
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
        boolean isTypeFood = p instanceof Food;
        while (!finished) {
            int optionUpdate = -1;
            if (p instanceof Drink) {
                optionUpdate = Utils.askForValidOption(
                        "\n🔧 Que deseas modificar?\n0 - Nombre 🏷️\n1 - Precio 💲\n2 - Stock 📦\n3 - Litros  🧪\n4 - Tipo de envase 🧴",
                        Set.of(0, 1, 2, 3, 4)
                );
            } else if (p instanceof Food) {
                optionUpdate = Utils.askForValidOption(
                        "\n🔧 Que deseas modificar?\n0 - Nombre 🏷️\n1 - Precio 💲\n2 - Stock 📦\n3 - Peso 🏋️ \n4 - Calorias 🔥",
                        Set.of(0, 1, 2, 3, 4)
                );
            }

            switch (optionUpdate) {
                case 0:
                    System.out.println("📌 Nombre actual: " + p.getName());
                    String newName = Utils.validatePositiveString("✍️ Ingrese el nuevo nombre: ");
                    if (Utils.confirmChange(p.getName(), newName, "nombre")) p.setName(newName);
                    break;

                case 1:
                    try {
                        System.out.println("📌 Precio actual: $" + p.getPrice());
                        double newPrice = Utils.validatePositiveDouble("💰 Ingrese el nuevo precio: ");
                        if (Utils.confirmChange(p.getPrice(), newPrice, "precio")) p.setPrice(newPrice);
                    } catch (NumberFormatException e) {
                        System.out.println("❌ Entrada inválida. Ingresa un número.");
                    }
                    break;

                case 2:
                    try {
                        System.out.println("📌 Stock actual: " + p.getStock());
                        int newStock = Utils.validatePositiveInt("📥 Ingrese el nuevo stock: ");
                        if (Utils.confirmChange(p.getStock(), newStock, "stock")) p.setStock(newStock);
                    } catch (NumberFormatException e) {
                        System.out.println("❌ Entrada inválida. Ingresa un número.");
                    }
                    break;
                case 3:
                    if (p instanceof Drink drink) {
                        System.out.println("🧪 Litros actuales: " + drink.getLiters() + "L");
                        double newLiters = Utils.validatePositiveDouble("🧪 Ingrese los nuevos litros: ");
                        if (Utils.confirmChange(drink.getLiters(), newLiters, "litros")) drink.setLiters(newLiters);
                    } else if (p instanceof Food food) {
                        System.out.println("⚖️ Peso actual: " + food.getWeightGrams() + "g");
                        int newWeight = Utils.validatePositiveInt("⚖️ Ingrese el nuevo peso en gramos: ");
                        if (Utils.confirmChange(food.getWeightGrams(), newWeight, "peso")) food.setWeightGrams(newWeight);
                    }
                    break;

                case 4:
                    if (p instanceof Drink drink) {
                        System.out.println("🧴 Tipo de envase actual: " + drink.getContainerType());
                        String newContainerType = Utils.validatePositiveString("🧴 Ingrese el nuevo tipo de envase: ");
                        if (Utils.confirmChange(drink.getContainerType(), newContainerType, "tipo de envase")) drink.setContainerType(newContainerType);
                    } else if (p instanceof Food food) {
                        System.out.println("🔥 Calorías actuales: " + food.getCalories());
                        int newCalories = Utils.validatePositiveInt("🔥 Ingrese las nuevas calorías: ");
                        if (Utils.confirmChange(food.getCalories(), newCalories, "calorías")) food.setCalories(newCalories);
                    }
                    break;
                }

            finished = Utils.askForValidOption(
                    "\n🔁 Deseas seguir modificando este producto?\n1 - Si 🔄\n0 - No 🚪",
                    Set.of(0, 1)
            ) == 0;
        }

        return p.toString();
    }

    public String deleteProduct() {
        Product p = this.searchProductById();

        if (p == null) return "";

        int confirmDelete = Utils.askForValidOption(
                "🗑️ Estas seguro que deseas eliminar el producto '" + p.getName() + "'?\n1 - Confirmar ✅\n0 - Cancelar ❌",
                Set.of(0, 1)
        );

        if (confirmDelete == 1) {
            products.remove(p);
            return "✅ El producto '" + p.getName() + "' fue eliminado exitosamente.";
        }

        return "❌ Eliminacion cancelada. El producto no fue borrado.";
    }


}
