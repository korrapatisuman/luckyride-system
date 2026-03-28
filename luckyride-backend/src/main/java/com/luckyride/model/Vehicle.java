package com.luckyride.model;

import jakarta.persistence.*;
import java.util.ArrayList;
import lombok.*;
import java.util.List;


@Entity
@Table(name = "vehicles")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Vehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String vehicleName;
    private int seatingCapacity;

    private Double pricePerKm;   // ✅ changed

    // ✅ FIXED (important)
    private Double basePrice;
    private Double driverCharge;
    private Double extraKmPrice;

    private String imageUrl;

    @Enumerated(EnumType.STRING)
    private VehicleType vehicleType;

    public enum VehicleType {
        AUTO,
        CAR,
        TRAVELLER
    }
}