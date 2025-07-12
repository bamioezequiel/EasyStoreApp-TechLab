package com.techlab.easystore.exception;

public class NoProductsAvailableException extends RuntimeException {

    public NoProductsAvailableException() {
        super("❌ No hay productos disponibles en este momento.");
    }

    public NoProductsAvailableException(String message) {
        super(message);
    }

    public NoProductsAvailableException(String message, Throwable cause) {
        super(message, cause);
    }
}
