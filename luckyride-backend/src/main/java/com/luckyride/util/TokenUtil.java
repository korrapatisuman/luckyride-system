package com.luckyride.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

public class TokenUtil {

    // 🔐 Move this to ENV later
    private static final String SECRET = "luckyride-secret-key-luckyride-secret-key";

    private static final Key key = Keys.hmacShaKeyFor(SECRET.getBytes());

    // ⏱ 1 Day Expiry
    private static final long EXPIRATION_TIME = 1000 * 60 * 60 * 24;

    // 🔐 GENERATE TOKEN
    public static String generateToken(String userId) {

        Map<String, Object> claims = new HashMap<>();
        claims.put("type", "USER"); // future use (admin/user)

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(userId) // ✅ now using USER ID (correct)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key)
                .compact();
    }

    // 🔍 VALIDATE TOKEN
    public static String validateToken(String token) {
        try {
            Claims claims = Jwts.parserBuilder()   // ✅ modern & safer
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();

            return claims.getSubject(); // returns userId

        } catch (Exception e) {
            throw new RuntimeException("Token expired or invalid");
        }
    }

    // 🔍 OPTIONAL: Extract full claims (future use)
    public static Claims getClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}