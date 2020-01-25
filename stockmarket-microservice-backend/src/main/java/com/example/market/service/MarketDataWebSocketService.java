package com.example.market.service;

import com.example.market.document.Trade;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

/**
 * @author Binnur Kurt <binnur.kurt@gmail.com>
 */
@Service
public class MarketDataWebSocketService {
    private SimpMessagingTemplate messagingTemplate;

    public MarketDataWebSocketService(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @EventListener
    public void listenTrade(Trade trade) {
        messagingTemplate.convertAndSend("/topic/changes", trade);
    }
}
