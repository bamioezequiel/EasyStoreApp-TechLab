package com.techlab.easystore.utils;

import java.util.Scanner;
import java.util.Set;

public class Utils {
    private static Scanner sc = new Scanner(System.in);

    public static int askForValidOption(String message, Set<Integer> validOptions) {
        int input;
        while (true) {
            System.out.println(message);
            System.out.print("Elija una opcion: ");
            try {
                input = Integer.parseInt(sc.nextLine());
                if (validOptions.contains(input)) {
                    return input;
                } else {
                    System.out.println("❌ Entrada invalida. Por favor, ingrese una opcion valida.");
                }
            } catch (NumberFormatException e) {
                System.out.println("❌ Entrada invalida. Por favor, ingrese un numero.");
            }
        }
    }

    public static boolean confirmChange(Object oldValue, Object newValue, String fieldName) {
        int confirm = Utils.askForValidOption(
                "❓ ¿Confirmas cambiar el " + fieldName + " de '" + oldValue + "' a '" + newValue + "'?\n1 - Confirmar ✅\n0 - Cancelar ❌",
                Set.of(0, 1)
        );
        if (confirm == 1) {
            System.out.println("✅ " + fieldName + " actualizado.");
            return true;
        } else {
            System.out.println("❌ Cambio cancelado.");
            return false;
        }
    }

    public static String validatePositiveString(String message) {
        String value;
        while (true) {
            System.out.print(message);
            try {
                value = sc.nextLine().trim();

                if (!value.isEmpty()) return value;

                System.out.println("❌ Error. No ingreso nada, intente nuevamente.");
            } catch (NumberFormatException e) {
                System.out.println("❌ Entrada inválida. Ingrese un número positivo.");
            }
        }
    }

    public static double validatePositiveDouble(String message) {
        double value;
        while (true) {
            System.out.print(message);
            try {
                value = Double.parseDouble(sc.nextLine());
                if (value < 0) throw new NumberFormatException();
                return value;
            } catch (NumberFormatException e) {
                System.out.println("❌ Entrada invalida. Ingrese un numero positivo.");
            }
        }
    }

    public static int validatePositiveInt(String message) {
        int value;
        while (true) {
            System.out.print(message);
            try {
                value = Integer.parseInt(sc.nextLine());
                if (value < 0) throw new NumberFormatException();
                return value;
            } catch (NumberFormatException e) {
                System.out.println("❌ Entrada invalida. Ingrese un numero entero positivo.");
            }
        }
    }

}
