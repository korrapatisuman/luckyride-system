package com.luckyride.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
            .csrf(csrf -> csrf.disable()) // Disable CSRF for APIs
            .authorizeHttpRequests(auth -> auth
                    .requestMatchers("/api/**").permitAll() // Allow API access
                    .anyRequest().authenticated()
            )
            .httpBasic(Customizer.withDefaults()) // enable basic auth if needed
            .formLogin(form -> form.disable()); // disable default login page

        return http.build();
    }
}
