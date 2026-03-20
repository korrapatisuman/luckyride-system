package com.luckyride;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.context.annotation.Bean;
import org.springframework.boot.CommandLineRunner;

import com.luckyride.repository.VehicleRepository;
import com.luckyride.model.Vehicle;

@SpringBootApplication
public class LuckyRideApplication {

    public static void main(String[] args) {
        SpringApplication.run(LuckyRideApplication.class, args);
    }

    // 🚀 AUTO LOAD VEHICLES
    @Bean
    CommandLineRunner loadData(VehicleRepository repo) {
        return args -> {

            if (repo.count() == 0) {

                repo.save(new Vehicle(null, "Auto", "Auto", 3, 15.0, null));
                repo.save(new Vehicle(null, "Car 4+1", "Car", 5, 25.0, null));
                repo.save(new Vehicle(null, "Car 9+1", "Car", 10, 35.0, null));
                repo.save(new Vehicle(null, "Traveller 12 Seater", "Traveller", 12, 40.0, null));
                repo.save(new Vehicle(null, "Traveller 24 Seater", "Traveller", 24, 60.0, null));

                System.out.println("✅ Vehicles Loaded Successfully");
            }

        };
    }

}