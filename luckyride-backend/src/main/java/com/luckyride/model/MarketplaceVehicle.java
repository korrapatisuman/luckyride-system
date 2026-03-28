package com.luckyride.model;

import jakarta.persistence.*;
import lombok.*;
import lombok.Data;

import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.ArrayList;

import java.util.List;

@Entity
@Table(name = "marketplace_vehicles")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class MarketplaceVehicle {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;
    private Double price;
    private String location;
    private String phone;

    private String brand;
    private String model;
    private Integer year;
    private String fuelType;
    private String color;

    private String insuranceValidTill;
    private String pollutionValidTill;
    private String fcValidTill;
    private String permitValidTill;

    private Double marketValue;
    private Double finalPrice;

    private String description;

    private String createdAt;
    private String status;

    @ElementCollection(fetch = FetchType.EAGER)
    private List<String> images = new ArrayList<>();
}