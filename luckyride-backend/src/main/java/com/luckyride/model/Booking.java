package com.luckyride.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import com.fasterxml.jackson.annotation.JsonProperty;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 🔥 NEW (CRITICAL - JWT BASED USER)
    @Column(name = "user_id")
    private Long userId;

    // ⚠️ KEEP (optional - for admin/debug)
    @JsonProperty("userPhone")
    @Column(name = "user_phone")
    private String userPhone;

    private String userEmail;

    // Vehicle
    private Long vehicleId;
    private String vehicleType;

    // Trip
    private String tripType;
    private String pickupDate;
    private Integer days;

    // Locations
    private String pickupLocation;
    private String dropLocation;

    // Distance
    private Double distance;

    // Pricing
    private Double totalPrice;
    private Double advancePaid;

    // Status
    private String status;

    // Driver
    private String driverName;
    private String driverPhone;

    // Payment
    private Double advanceAmount;

    @Column(name = "payment_done")
    private Boolean paymentDone = false;

    private String paymentMethod;
}