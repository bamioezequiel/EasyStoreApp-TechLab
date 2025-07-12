package com.techlab.easystore.controller;

import com.techlab.easystore.model.Order;
import com.techlab.easystore.model.Product;
import com.techlab.easystore.service.OrderService;
import com.techlab.easystore.service.ProductService;
import com.techlab.easystore.utils.OrderStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;
    private final ProductService productService;

    public OrderController(OrderService orderService, ProductService productService) {
        this.orderService = orderService;
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders() {
        List<Order> orders = orderService.findAllOrders();
        return ResponseEntity.ok(orders);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable Long id) {
        Order order = orderService.findOrderById(id);
        return ResponseEntity.ok(order);
    }

    @PostMapping
    public ResponseEntity<Order> createOrder() {
        Order order = orderService.createOrder();
        return ResponseEntity.created(URI.create("/api/orders/" + order.getId())).body(order);
    }

    @PostMapping("/{orderId}/add-product")
    public ResponseEntity<Order> addProductToOrder(@PathVariable Long orderId,
                                                   @RequestParam Long productId,
                                                   @RequestParam int quantity) {
        Product product = productService.findProductByID(productId);
        Order updatedOrder = orderService.addProductToOrder(orderId, product, quantity);
        return ResponseEntity.ok(updatedOrder);
    }

    @PutMapping("/{orderId}/confirm")
    public ResponseEntity<Order> confirmOrder(@PathVariable Long orderId) {
        Order confirmedOrder = this.orderService.confirmOrder(orderId);

        return ResponseEntity.ok(confirmedOrder);
    }

    @PutMapping("/{orderId}/cancel")
    public ResponseEntity<Order> cancelOrder(@PathVariable Long orderId) {
        Order cancelledOrder = this.orderService.cancelOrder(orderId);

        return ResponseEntity.ok(cancelledOrder);
    }

    @PutMapping("/{orderId}/status")
    public ResponseEntity<Object> changeOrderStatus(@PathVariable Long orderId,
                                                    @RequestParam String newStatus) {
        try {
            OrderStatus status = OrderStatus.valueOf(newStatus.toUpperCase());
            Order updatedOrder = orderService.changeStatus(orderId, status);
            return ResponseEntity.ok(updatedOrder);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("❌ Estado inválido: " + newStatus);
        }
    }

    @DeleteMapping("/{orderId}/remove-product")
    public ResponseEntity<Order> removeProductFromOrder(@PathVariable Long orderId,
                                                        @RequestParam Long productId) {
        Product product = productService.findProductByID(productId);
        Order updatedOrder = orderService.removeProductFromOrder(orderId, product);
        return ResponseEntity.ok(updatedOrder);
    }
}
