package com.techlab.model;

import com.techlab.exception.InvalidProductDataException;

public class Drink extends Product {

    private double liters;
    private String containerType;

    public Drink(String name, double price, int stock, double liters, String containerType) {
        super(name, price, stock);
        this.setLiters(liters);
        this.setContainerType(containerType);
    }

    @Override
    public String toString() {
        return super.toString() + " | 🧪 Litros: " + liters + "L" + " | 🧴 Tipo envase: " + containerType;
    }

    public double getLiters() {
        return liters;
    }

    public void setLiters(double liters) {
        if (liters <= 0) {
            throw new InvalidProductDataException("❌ El volumen debe ser mayor a 0 litros.");
        }
        this.liters = liters;
    }

    public String getContainerType() {
        return containerType;
    }

    public void setContainerType(String containerType) {
        if (containerType == null || containerType.trim().isEmpty()) {
            throw new InvalidProductDataException("❌ El tipo de envase no puede estar vacio.");
        }
        this.containerType = containerType;
    }
}
