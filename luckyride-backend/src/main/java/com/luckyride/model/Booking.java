package com.luckyride.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "bookings")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // User phone number
    private String userPhone;

    // Vehicle type
    private String vehicleType;

    // Trip type (LOCAL / OUTSTATION)
    private String tripType;

    // Pickup date
    private String pickupDate;

    // Number of days
    private Integer days; // ✅ safe

    // Total booking price
    private Double totalPrice;   // ✅ FIXED

    // Advance payment (10%)
    private Double advancePaid;  // ✅ FIXED

    // Booking status
    private String status;

    // Driver details
    private String driverName;
    private String driverPhone;

    // Pickup location
    private String pickupLocation;

    // Drop location
    private String dropLocation;

    // ride distance
    private Double distance; // ✅ FIXED
    
    
    
    

}