package com.example.market.service;

import com.example.market.document.Order;
import com.example.market.document.Trade;
import com.example.market.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.stereotype.Service;

/**
 * @author Binnur Kurt <binnur.kurt@gmail.com>
 */
@Service
public class OrderService {
    private ApplicationEventPublisher eventPublisher;
    private OrderRepository orderRepository;

    public OrderService(ApplicationEventPublisher eventPublisher, OrderRepository orderRepository) {
        this.eventPublisher = eventPublisher;
        this.orderRepository = orderRepository;
    }

    public Order sendOrder(Order order) {
        Order savedOrder = orderRepository.save(order);
        Trade trade = new Trade();
        trade.setSymbol(order.getSymbol());
        trade.setPrice(order.getPrice());
        trade.setQuantity(order.getQuantity());
        eventPublisher.publishEvent(trade);
        return savedOrder;
    }
}

