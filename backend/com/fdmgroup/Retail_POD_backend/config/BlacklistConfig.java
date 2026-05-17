package com.fdmgroup.Retail_POD_backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Configuration
public class BlacklistConfig {

    @Bean
    public Map<String, Long> tokenBlacklist() {
        return new ConcurrentHashMap<>();
    }
}
