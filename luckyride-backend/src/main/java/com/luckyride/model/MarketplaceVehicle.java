package com.luckyride.model;

import jakarta.persistence.*;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Entity
@Table(name = "marketplace_vehicles")
@Data
public class MarketplaceVehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ✅ BASIC INFO
    private String title;
    private Double price;
    private String location;
    private String phone;

    // ✅ VEHICLE DETAILS
    private String brand;
    private String model;
    private Integer year;
    private String fuelType;
    private String color;

    // ✅ DOCUMENTS
    private String insuranceValidTill;
    private String pollutionValidTill;
    private String fcValidTill;
    private String permitValidTill;

    // ✅ PRICING
    private Double marketValue;
    private Double finalPrice;

    // ✅ DESCRIPTION
    private String description;

    // ✅ STATUS FLOW
    private String status = "PENDING"; // PENDING → APPROVED → REJECTED

    // ✅ TIME
    private String createdAt;

    // ✅ IMAGES
    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> images = new ArrayList<>();
}