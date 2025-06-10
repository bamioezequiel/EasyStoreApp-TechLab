package com.techlab.utils;

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
}
