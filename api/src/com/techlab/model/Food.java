package com.techlab.model;

import com.techlab.exception.InvalidProductDataException;

public class Food extends Product {
    private double weightGrams;
    private int calories;

    public Food(String name, double price, int stock, double weightGrams, int calories) {
        super(name, price, stock);
        this.setWeightGrams(weightGrams);
        this.setCalories(calories);
    }

    @Override
    public String toString() {
        return super.toString() + " | 🏋️ Peso: " + weightGrams + "g" + " | 🔥 Calorías: " + calories;
    }

    public double getWeightGrams() {
        return weightGrams;
    }

    public void setWeightGrams(double weightGrams) {
        if (weightGrams <= 0) {
            throw new InvalidProductDataException("❌ El peso debe ser mayor a 0 gramos.");
        }
        this.weightGrams = weightGrams;
    }

    public int getCalories() {
        return calories;
    }

    public void setCalories(int calories) {
        if (calories < 0) {
            throw new InvalidProductDataException("❌ Las calorias no pueden ser negativas.");
        }
        this.calories = calories;
    }
}
