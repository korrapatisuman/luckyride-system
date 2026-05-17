package com.luckyride.controller.common;

import com.luckyride.model.Vehicle;
import com.luckyride.model.Vehicle.VehicleType;
import com.luckyride.repository.VehicleRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class VehicleDataLoader {

    @Bean
    CommandLineRunner loadVehicles(VehicleRepository repo) {
        return args -> {

            System.out.println("🚀 Loading vehicles...");

            if (repo.count() > 0) {
                System.out.println("⚠ Vehicles already exist");
                return;
            }

            repo.save(create("Auto", 3, 10.0, 800.0, VehicleType.AUTO));
            repo.save(create("Auto Deluxe", 3, 12.0, 900.0, VehicleType.AUTO));

            repo.save(create("Car 4+1", 5, 18.0, 1800.0, VehicleType.CAR));
            repo.save(create("Sedan", 5, 20.0, 2000.0, VehicleType.CAR));
            repo.save(create("SUV", 6, 25.0, 2500.0, VehicleType.CAR));

            repo.save(create("Innova", 7, 28.0, 3000.0, VehicleType.CAR));
            repo.save(create("Innova Crysta", 7, 30.0, 3500.0, VehicleType.CAR));

            repo.save(create("Traveller 9 Seater", 9, 32.0, 4000.0, VehicleType.TRAVELLER));
            repo.save(create("Traveller 12 Seater", 12, 35.0, 4500.0, VehicleType.TRAVELLER));
            repo.save(create("Traveller 17 Seater", 17, 40.0, 6000.0, VehicleType.TRAVELLER));

            repo.save(create("Mini Bus", 20, 45.0, 7000.0, VehicleType.TRAVELLER));
            repo.save(create("Bus 30 Seater", 30, 50.0, 9000.0, VehicleType.TRAVELLER));

            repo.save(create("Luxury Sedan", 5, 35.0, 5000.0, VehicleType.CAR));
            repo.save(create("Premium SUV", 7, 45.0, 6500.0, VehicleType.CAR));

            repo.save(create("Tempo Traveller Luxury", 12, 50.0, 8000.0, VehicleType.TRAVELLER));
            repo.save(create("Force Traveller", 14, 42.0, 5500.0, VehicleType.TRAVELLER));
        };
    }

    private Vehicle create(String name, int seats, Double km, Double day, VehicleType type) {
        Vehicle v = new Vehicle();
        v.setVehicleName(name);
        v.setSeatingCapacity(seats);
        v.setPricePerKm(km);
        v.setPricePerDay(day);
        v.setVehicleType(type);
        v.setStatus("ACTIVE");
        return v;
    }
}
