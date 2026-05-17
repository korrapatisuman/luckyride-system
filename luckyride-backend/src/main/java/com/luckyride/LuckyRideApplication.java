package com.luckyride;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.ApplicationContext;

@SpringBootApplication(scanBasePackages = "com.luckyride")
public class LuckyRideApplication {

    public static void main(String[] args) {
        SpringApplication.run(LuckyRideApplication.class, args);
    }

    // ✅ DEBUG: PRINT ALL CONTROLLERS
    @Bean
    CommandLineRunner checkBeans(ApplicationContext ctx) {
        return args -> {
            System.out.println("🔥 LIST OF CONTROLLERS:");
            String[] beans = ctx.getBeanDefinitionNames();

            for (String b : beans) {
                if (b.toLowerCase().contains("controller")) {
                    System.out.println("👉 " + b);
                }
            }
        };
    }
}