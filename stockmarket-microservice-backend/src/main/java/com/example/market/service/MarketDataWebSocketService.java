package com.example.market.service;

import com.example.market.document.Trade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

@Service
public class MarketDataWebSocketService {
    @Autowired
    private SimpMessagingTemplate messagingTemplate;

    @EventListener
    public void listenTrade(Trade trade) {
        messagingTemplate.convertAndSend(
                "/topic/changes", trade);
    }
}
