package com.luckyride.service.admin;

import com.luckyride.model.*;
import com.luckyride.repository.*;
import com.luckyride.dto.request.AdminLoginRequest;

import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class AdminService {

    private final AdminRepository adminRepository;
    private final BookingRepository bookingRepository;
    private final VehicleRepository vehicleRepository;
    private final DriverRepository driverRepository;

    public AdminService(
            AdminRepository adminRepository,
            BookingRepository bookingRepository,
            VehicleRepository vehicleRepository,
            DriverRepository driverRepository
    ) {
        this.adminRepository = adminRepository;
        this.bookingRepository = bookingRepository;
        this.vehicleRepository = vehicleRepository;
        this.driverRepository = driverRepository;
    }

    // 🔐 LOGIN
    public Map<String, Object> login(AdminLoginRequest request) {

        if (request.getEmail() == null || request.getPassword() == null) {
            throw new RuntimeException("Email and Password required");
        }

        Admin admin = adminRepository.findByEmail(request.getEmail())
                .orElseThrow(() -> new RuntimeException("Admin not found"));

        if (!admin.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        String token = "ADMIN_" + admin.getEmail();

        return Map.of(
                "message", "Login Successful",
                "token", token
        );
    }

    // 🔐 TOKEN VALIDATION
    private void validateToken(String authHeader) {

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Unauthorized");
        }

        String token = authHeader.substring(7);

        if (!token.startsWith("ADMIN_")) {
            throw new RuntimeException("Invalid Token");
        }
    }

    // 📊 DASHBOARD
    public Map<String, Object> getDashboard(String authHeader) {

        validateToken(authHeader);

        long totalBookings = bookingRepository.count();
        long totalVehicles = vehicleRepository.count();
        long totalDrivers = driverRepository.count();

        double totalRevenue = bookingRepository.findAll()
                .stream()
                .mapToDouble(b -> b.getTotalPrice() != null ? b.getTotalPrice() : 0)
                .sum();

        return Map.of(
                "totalBookings", totalBookings,
                "totalVehicles", totalVehicles,
                "totalDrivers", totalDrivers,
                "totalRevenue", totalRevenue
        );
    }

    // ================= DRIVERS =================

    public List<Driver> getAllDrivers(String authHeader) {
        validateToken(authHeader);
        return driverRepository.findAll();
    }

    public Driver createDriver(String authHeader, Driver driver) {
        validateToken(authHeader);
        return driverRepository.save(driver);
    }

    public Object deleteDriver(String authHeader, Long id) {

    validateToken(authHeader);

    if (!driverRepository.existsById(id)) {
        throw new RuntimeException("Driver not found");
    }

    driverRepository.deleteById(id);

    return Map.of(
            "success", true,
            "message", "Driver deleted successfully"
    );
   }

    // ================= BOOKINGS =================

    public List<Booking> getAllBookings(String authHeader) {

        validateToken(authHeader);

        List<Booking> bookings = bookingRepository.findAll();

          // ✅ FORCE LOAD
        bookings.forEach(b -> {

            b.getId();
            b.getVehicleType();
            b.getPickupLocation();
            b.getDropLocation();
            b.getStatus();
        });

        return bookings;
    }

    public Booking updateBookingStatus(String authHeader, Long id, String status) {

        validateToken(authHeader);

        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        booking.setStatus(status);
        return bookingRepository.save(booking);
    }

    public Booking assignDriver(String authHeader, Long id, Map<String, Object> payload) {

        validateToken(authHeader);

        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        Driver driver;

        if (payload.get("driverId") != null) {
            Long driverId = Long.valueOf(payload.get("driverId").toString());

            driver = driverRepository.findById(driverId)
                    .orElseThrow(() -> new RuntimeException("Driver not found"));
        } else {
            driver = new Driver();
            driver.setName(payload.get("name").toString());
            driver.setPhone(payload.get("phone").toString());

            driver = driverRepository.save(driver);
        }

        booking.setDriverName(driver.getName());
        booking.setDriverPhone(driver.getPhone());
        booking.setStatus("DRIVER_ASSIGNED");

        return bookingRepository.save(booking);
    }

    public Object deleteBooking(String authHeader, Long id) {

    validateToken(authHeader);

    if (!bookingRepository.existsById(id)) {
        throw new RuntimeException("Booking not found");
    }

    bookingRepository.deleteById(id);

    return Map.of(
            "success", true,
            "message", "Booking deleted successfully"
    );
}

    // ================= VEHICLES =================

    public List<Vehicle> getAllVehicles(String authHeader) {
        validateToken(authHeader);
        return vehicleRepository.findAll();
    }

    public Vehicle createVehicle(String authHeader, Vehicle vehicle) {
        validateToken(authHeader);
        return vehicleRepository.save(vehicle);
    }

    public Object deleteVehicle(String authHeader, Long id) {
        validateToken(authHeader);

        if (!vehicleRepository.existsById(id)) {
            throw new RuntimeException("Vehicle not found");
        }

        vehicleRepository.deleteById(id);
        return Map.of("message", "Vehicle deleted");
    }

    public Vehicle updateVehicle(String authHeader, Long id, Vehicle updated) {

        validateToken(authHeader);

        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));

        vehicle.setVehicleName(updated.getVehicleName());
        vehicle.setVehicleType(updated.getVehicleType());
        vehicle.setSeatingCapacity(updated.getSeatingCapacity());
        vehicle.setPricePerKm(updated.getPricePerKm());
        vehicle.setImageUrl(updated.getImageUrl());

        return vehicleRepository.save(vehicle);
    }
}