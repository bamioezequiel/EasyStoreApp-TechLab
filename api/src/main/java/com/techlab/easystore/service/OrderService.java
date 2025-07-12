package com.techlab.easystore.service;

import com.techlab.easystore.model.LineItem;
import com.techlab.easystore.model.Order;
import com.techlab.easystore.model.Product;
import com.techlab.easystore.repository.OrderRepository;
import com.techlab.easystore.utils.OrderStatus;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;

    public OrderService(OrderRepository orderRepository) {
        this.orderRepository = orderRepository;
    }

    public List<Order> findAllOrders() {
        return this.orderRepository.findAll();
    }

    public Order findOrderById(Long id) {
        return this.orderRepository.findById(id)
                .orElseThrow(()-> new IllegalArgumentException("Pedido no encontrado con ID: " + id));
    }

    public Order createOrder() {
        return this.orderRepository.save(new Order());
    }

    public Order confirmOrder(Long orderId) {
        Order order = this.findOrderById(orderId);

        if(order.getStatus() != OrderStatus.CREATED)
            throw new IllegalStateException("⚠️ La orden ya fue confirmada o cancelada.");

        if (order.getItems().isEmpty())
            throw new IllegalStateException("⚠️ No se puede confirmar una orden sin productos.");

        this.changeStatus(orderId, OrderStatus.CONFIRMED);

        return this.orderRepository.save(order);
    }

    public Order cancelOrder(Long orderId) {
        Order order = this.findOrderById(orderId);

        if(order.getStatus() != OrderStatus.CREATED)
            throw new IllegalStateException("⚠️ La orden ya fue confirmada o cancelada.");

        if (order.getItems().isEmpty())
            throw new IllegalStateException("⚠️ No se puede confirmar una orden sin productos.");

        this.removeAllProductFromOrder(orderId);
        this.changeStatus(orderId, OrderStatus.CANCELLED);

        return this.orderRepository.save(order);
    }

    public Order addProductToOrder(Long orderId, Product product, int quantity) {
        if (product.getStock() < quantity)
            throw new IllegalArgumentException("❌ Stock insuficiente. Solo hay " + product.getStock() + " unidades disponibles.");

        Order order = this.findOrderById(orderId);

        if (order.getStatus() != OrderStatus.CREATED) {
            throw new IllegalStateException("⚠️ No se puede modificar una orden que no está en estado CREATED.");
        }

        LineItem existingItem = searchProductInLineItem(order, product.getId());
        if (existingItem != null) {
            existingItem.setQuantity(existingItem.getQuantity() + quantity);
        } else {
            LineItem newItem = new LineItem(product, quantity);
            newItem.setOrder(order);
            order.getItems().add(newItem);
        }

        order.setCostTotal(order.getCostTotal() + product.getPrice() * quantity);
        product.setStock(product.getStock() - quantity);

        return this.orderRepository.save(order);
    }

    private LineItem searchProductInLineItem(Order order, long productId) {
        for (LineItem l : order.getItems()) {
            if (l.getProduct().getId() == productId) return l;
        }
        return null;
    }

    public Order removeProductFromOrder(Long orderId, Product product) {
        Order order = this.findOrderById(orderId);
        if (order.getStatus() != OrderStatus.CREATED) {
            throw new IllegalStateException("⚠️ No se puede modificar una orden que no está en estado CREATED.");
        }

        LineItem item = searchProductInLineItem(order, product.getId());

        if(item == null) throw new IllegalArgumentException("❌ El producto no está en la orden.");

        order.setCostTotal(order.getCostTotal() - product.getPrice() * item.getQuantity());
        order.getItems().remove(item);
        product.setStock(product.getStock() + item.getQuantity());

        return this.orderRepository.save(order);
    }

    public Order removeAllProductFromOrder(Long orderId) {
        Order order = this.findOrderById(orderId);

        List<LineItem> copyItems = new ArrayList<>(order.getItems());

        for (LineItem l : copyItems) {
            order.setCostTotal(order.getCostTotal() - l.getProduct().getPrice() * l.getQuantity());
            order.getItems().remove(l);
            l.getProduct().setStock(l.getProduct().getStock() + l.getQuantity());
        }

        return this.orderRepository.save(order);
    }

    public Order changeStatus(Long orderId, OrderStatus newStatus) {
        Order order = this.findOrderById(orderId);
        order.setStatus(newStatus);
        return this.orderRepository.save(order);
    }
}









