package com.example.market.service;

import com.example.market.document.Order;
import com.example.market.document.OrderSide;
import com.example.market.document.OrderType;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.concurrent.ThreadLocalRandom;

/**
 * @author Binnur Kurt <binnur.kurt@gmail.com>
 */
@Service
public class MarketDataEmulator {
    private static double price = 200;

    @Scheduled(fixedRate = 1_000)
    public void sendRandomOrder() {
        Order order = createRandomOrder();
        RestTemplate restTemplate = new RestTemplate();
        Order response = restTemplate.postForEntity("http://localhost:8001/market/api/v1/orders", order, Order.class).getBody();
    }

    private Order createRandomOrder() {
        Order order = new Order();
        order.setId(null);
        order.setSymbol("GARAN");
        double delta = ThreadLocalRandom.current().nextDouble(5);
        price += (delta - 2.4);
        order.setPrice(Double.toString(price));
        order.setQuantity("100");
        order.setSide(OrderSide.BID);
        order.setType(OrderType.LIMIT_ORDER);
        return order;
    }

}
