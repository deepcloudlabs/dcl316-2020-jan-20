package com.example.market.controller;

import com.example.market.document.Order;
import com.example.market.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.context.annotation.RequestScope;

@RestController
@RequestScope
@RequestMapping("orders")
@CrossOrigin
public class MarketController {
    @Autowired
    private OrderService orderService;

    @PostMapping
    public Order sendOrder(
            @RequestBody Order order) {
        return orderService.sendOrder(order);
    }
}
