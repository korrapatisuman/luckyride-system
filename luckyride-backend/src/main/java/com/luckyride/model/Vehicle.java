package com.luckyride.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "vehicles")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Vehicle {

    // ================= ID =================

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ================= BASIC INFO =================

    @Column(nullable = false)
    private String vehicleName;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private VehicleType vehicleType;

    private Integer seatingCapacity;

    // ================= PRICING =================

    // Per KM trips
    private Double pricePerKm = 0.0;

    // Rental trips
    private Double pricePerDay = 0.0;

    // Optional pricing
    private Double basePrice = 0.0;

    private Double driverCharge = 0.0;

    private Double extraKmPrice = 0.0;

    // ================= IMAGE =================

    @Column(length = 2000)
    private String imageUrl;

    // ================= STATUS =================
    /*
        ACTIVE
        INACTIVE
        MAINTENANCE
    */

    @Column(nullable = false)
    private String status = "ACTIVE";

    // ================= OPTIONAL =================

    private String fuelType;

    private String registrationNumber;

    private Boolean available = true;

    // ================= TIMESTAMPS =================

    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // ================= ENUM =================

    public enum VehicleType {
        AUTO,
        CAR,
        TRAVELLER,
        BUS,
        TRUCK
    }

    // ================= AUTO TIMESTAMPS =================

    @PrePersist
    public void prePersist() {

        LocalDateTime now = LocalDateTime.now();

        createdAt = now;
        updatedAt = now;

        // Safety defaults

        if (status == null || status.isBlank()) {
            status = "ACTIVE";
        }

        if (available == null) {
            available = true;
        }

        if (pricePerKm == null) {
            pricePerKm = 0.0;
        }

        if (pricePerDay == null) {
            pricePerDay = 0.0;
        }

        if (basePrice == null) {
            basePrice = 0.0;
        }

        if (driverCharge == null) {
            driverCharge = 0.0;
        }

        if (extraKmPrice == null) {
            extraKmPrice = 0.0;
        }
    }

    @PreUpdate
    public void preUpdate() {
        updatedAt = LocalDateTime.now();
    }
}