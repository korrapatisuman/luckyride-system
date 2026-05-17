package com.luckyride.config;

import com.luckyride.util.TokenUtil;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        String header = request.getHeader("Authorization");

        // 🔍 DEBUG
        System.out.println("🔐 JWT HEADER: " + header);

        if (header != null && header.startsWith("Bearer ")) {

            String token = header.substring(7);

            try {

                // ✅ ADMIN TOKEN
                if (token.startsWith("ADMIN_")) {

                    System.out.println("👑 ADMIN TOKEN DETECTED");

                    UsernamePasswordAuthenticationToken auth =
                            new UsernamePasswordAuthenticationToken(
                                    "ADMIN",
                                    null,
                                    List.of(new SimpleGrantedAuthority("ROLE_ADMIN"))
                            );

                    SecurityContextHolder.getContext().setAuthentication(auth);
                }

                // ✅ USER TOKEN
                else {

                    String userId = TokenUtil.validateToken(token);

                    // 🔴 IMPORTANT FIX
                    if (userId == null) {
                        System.out.println("❌ INVALID TOKEN");
                        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                       return;
                    } else {

                        System.out.println("✅ USER AUTHENTICATED: " + userId);

                        UsernamePasswordAuthenticationToken auth =
                                new UsernamePasswordAuthenticationToken(
                                        userId,
                                        null,
                                        List.of(new SimpleGrantedAuthority("ROLE_USER"))
                                );

                        SecurityContextHolder.getContext().setAuthentication(auth);
                    }
                }

            } catch (Exception e) {
                System.out.println("❌ JWT ERROR: " + e.getMessage());
                response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                 return;
            }
        } else {
            System.out.println("⚠️ NO TOKEN FOUND");
        }

        filterChain.doFilter(request, response);
    }
}