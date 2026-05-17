package com.fdmgroup.Retail_POD_backend.service;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class BlacklistService {

    private final Map<String, Long> tokenBlacklist;

    public BlacklistService(Map<String, Long> tokenBlacklist) {
        this.tokenBlacklist = tokenBlacklist;
    }

    @Scheduled(fixedRate = 60000) // Runs every minute
    public void cleanupBlacklist() {
        long currentTime = System.currentTimeMillis();
        tokenBlacklist.entrySet().removeIf(entry -> entry.getValue() < currentTime);
    }
}
