package com.luckyride.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(name = "bookings")

@Data
@NoArgsConstructor
@AllArgsConstructor
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ================= USER =================

    @Column(name = "user_id")
    private Long userId;

    private String userPhone;

    private String userEmail;

    // ================= VEHICLE =================

    private Long vehicleId;

    private String vehicleType;

    // ================= TRIP =================

    private String tripType;

    // ✅ FIXED
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate pickupDate;

    private Integer days;

    // ================= LOCATION =================

    @Column(columnDefinition = "TEXT")
    private String pickupLocation;

    @Column(columnDefinition = "TEXT")
    private String dropLocation;

    // ================= DISTANCE =================

    private Double distance;

    // ================= PRICE =================

    private Double totalPrice;

    private Double advancePaid;

    // ================= STATUS =================

    private String status = "BOOKED";

    // ================= DRIVER =================

    private String driverName;

    private String driverPhone;

    // ================= PAYMENT =================

    private Boolean paymentDone = false;

    private String paymentMethod;

    // ================= PLATFORM =================

    private String platform;

    // ================= TIMESTAMPS =================

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime createdAt;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private LocalDateTime updatedAt;

    // ================= AUTO TIMESTAMP =================

    @PrePersist
    public void onCreate() {

        createdAt = LocalDateTime.now();

        updatedAt = LocalDateTime.now();

        if (status == null) {
            status = "BOOKED";
        }

        if (paymentDone == null) {
            paymentDone = false;
        }
    }

    @PreUpdate
    public void onUpdate() {

        updatedAt = LocalDateTime.now();
    }
}