package com.luckyride.model;

import jakarta.persistence.*;

@Entity
@Table(name = "bookings")
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    

    private String userPhone;

    private String vehicleType;

    private int days;

    private double price;

    private String pickupLocation;

    private String dropLocation;

    private String status;

    public Booking() {
    }

    public Booking(Long id, String vehicleType, int days, double price,
                   String pickupLocation, String dropLocation, String status) {
        this.id = id;
        this.vehicleType = vehicleType;
        this.days = days;
        this.price = price;
        this.pickupLocation = pickupLocation;
        this.dropLocation = dropLocation;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public String getVehicleType() {
        return vehicleType;
    }

    public int getDays() {
        return days;
    }

    public double getPrice() {
        return price;
    }

    public String getPickupLocation() {
        return pickupLocation;
    }

    public String getDropLocation() {
        return dropLocation;
    }

    public String getStatus() {
        return status;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setVehicleType(String vehicleType) {
        this.vehicleType = vehicleType;
    }

    public void setDays(int days) {
        this.days = days;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public void setPickupLocation(String pickupLocation) {
        this.pickupLocation = pickupLocation;
    }

    public void setDropLocation(String dropLocation) {
        this.dropLocation = dropLocation;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}