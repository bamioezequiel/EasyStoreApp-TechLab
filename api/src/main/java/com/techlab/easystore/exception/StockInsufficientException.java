package com.techlab.easystore.exception;

public class StockInsufficientException extends RuntimeException {

    public StockInsufficientException() {
        super("❌ Stock insuficiente.");
    }

    public StockInsufficientException(String message) {
        super(message);
    }

    public StockInsufficientException(String message, Throwable cause) {
        super(message, cause);
    }
}
