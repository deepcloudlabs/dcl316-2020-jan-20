package com.example.market.controller;

import com.example.market.document.Order;
import com.example.market.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.annotation.RequestScope;

/**
 * @author Binnur Kurt <binnur.kurt@gmail.com>
 */
@RestController
@RequestScope
@RequestMapping("orders")
@CrossOrigin
public class MarketController {
    private OrderService orderService;

    public MarketController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping
    public Order sendOrder(@RequestBody Order order) {
        return orderService.sendOrder(order);
    }
}
