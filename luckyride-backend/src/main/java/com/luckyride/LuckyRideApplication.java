package com.luckyride;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.context.annotation.Bean;
import org.springframework.boot.CommandLineRunner;

import com.luckyride.repository.VehicleRepository;
import com.luckyride.model.Vehicle;

import java.util.List;


@SpringBootApplication
public class LuckyRideApplication {

    public static void main(String[] args) {
        SpringApplication.run(LuckyRideApplication.class, args);
    }
}