package com.fdmgroup.Retail_POD_backend.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import lombok.extern.slf4j.Slf4j;

import org.springframework.stereotype.Component;

import javax.crypto.KeyGenerator;
import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.security.NoSuchAlgorithmException;
import java.util.Base64;
import java.util.Date;

@Component
@Slf4j
public class JwtUtil {
    private static final Long EXPIRATION_TIME = 36000000L; // 10 hours
    //private static final Long EXPIRATION_TIME = 90000L; // 1.5 mins
    private SecretKey key;

    public JwtUtil() throws NoSuchAlgorithmException {
        KeyGenerator keyGenerator = KeyGenerator.getInstance("HmacSHA256");
        keyGenerator.init(256); // 256-bit key size
        SecretKey secretKey = keyGenerator.generateKey();

        String base64EncodedKey = Base64.getEncoder().encodeToString(secretKey.getEncoded());
        byte[] keyBytes = Base64.getDecoder().decode(base64EncodedKey);
        this.key = new SecretKeySpec(keyBytes, "HmacSHA256");
    }

    public String generateToken(String username) {
        return Jwts.builder()
                .subject(username) // identifier of user
                .issuedAt(new Date()) // token creation time
                .expiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME ))
                .signWith(key)
                .compact();
    }

    public long extractExpirytime(String token) {
        return extractClaims(token).getExpiration().getTime();
    }

    public String extractUsername(String token) {
        return extractClaims(token).getSubject();
    }

    public boolean isTokenValid(String token, String username) {
        return username.equals(extractUsername(token)) && !isTokenExpired(token);
    }

    private boolean isTokenExpired(String token) {
        return extractClaims(token).getExpiration().before(new Date());
    }

    private Claims extractClaims(String token) {
        return Jwts.parser()
                .verifyWith(key)
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }
}

