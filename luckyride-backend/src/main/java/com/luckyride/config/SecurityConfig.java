package com.luckyride.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
public class SecurityConfig {

    private final JwtFilter jwtFilter;

    public SecurityConfig(JwtFilter jwtFilter) {
        this.jwtFilter = jwtFilter;
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
            .csrf(csrf -> csrf.disable())
            .cors(cors -> {})

            .authorizeHttpRequests(auth -> auth

                // ✅ AUTH
                .requestMatchers("/api/auth/**").permitAll()

                // ✅ VEHICLES
                .requestMatchers(
                        "/api/mobile/vehicles",
                        "/api/web/vehicles",
                        "/api/vehicles",
                        "/api/mobile/drivers",
                        "/api/web/drivers"
                ).permitAll()

                // ✅ BOOKINGS
                .requestMatchers(
                        "/api/mobile/bookings/**",
                        "/api/web/bookings/**"
                ).authenticated()

                // ✅ ADMIN LOGIN PUBLIC
                 .requestMatchers("/api/admin/login").permitAll()

                // ✅ ADMIN PROTECTED
                 .requestMatchers("/api/admin/**").hasRole("ADMIN")

                // ✅ OTHER
                .anyRequest().permitAll()
            )

            .addFilterBefore(jwtFilter,
                    UsernamePasswordAuthenticationFilter.class)

            .httpBasic(httpBasic -> httpBasic.disable())
            .formLogin(form -> form.disable());

        return http.build();
    }
}