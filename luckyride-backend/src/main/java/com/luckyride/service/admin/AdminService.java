package com.luckyride.service;

import com.luckyride.model.Admin;
import com.luckyride.model.AdminLoginRequest;

import java.util.List;
import java.util.Map;
import java.util.HashMap;
import java.util.Optional;

import com.luckyride.util.TokenUtil;

import com.luckyride.model.Driver;
import com.luckyride.model.Vehicle;
import com.luckyride.model.Booking;

import com.luckyride.repository.AdminRepository;
import com.luckyride.repository.BookingRepository;
import com.luckyride.repository.VehicleRepository;
import com.luckyride.repository.DriverRepository;

import org.springframework.stereotype.Service;



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

        Optional<Admin> adminOptional =
                adminRepository.findByEmail(request.getEmail());

        if (adminOptional.isEmpty()) {
            throw new RuntimeException("Admin not found");
        }

        Admin admin = adminOptional.get();

        if (!admin.getPassword().equals(request.getPassword())) {
            throw new RuntimeException("Invalid password");
        }

        String token = "ADMIN_" + admin.getEmail();

        return Map.of(
                "message", "Login Successful",
                "token", token
        );
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

        Map<String, Object> data = new HashMap<>();
        data.put("totalBookings", totalBookings);
        data.put("totalVehicles", totalVehicles);
        data.put("totalDrivers", totalDrivers);
        data.put("totalRevenue", totalRevenue);

        return data;
    }

    // 🔐 COMMON TOKEN VALIDATION
    private void validateToken(String authHeader) {

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Unauthorized");
        }

        String token = authHeader.substring(7);

        if (!token.startsWith("ADMIN_")) {
            throw new RuntimeException("Invalid Token");
        }
    }

       // ================= DRIVERS =================
    public List<?> getAllDrivers(String authHeader) {
        validateToken(authHeader);
        return driverRepository.findAll();
    }
        // ================= ADD DRIVERS =================
    public Driver createDriver(String authHeader, Driver driver) {
         validateToken(authHeader);
         return driverRepository.save(driver);
    }

       // ================= BOOKINGS =================
    public List<?> getAllBookings(String authHeader) {
           validateToken(authHeader);
           return bookingRepository.findAll();
    }

        // ================= BOOKING STATUS =================
    public Object updateBookingStatus(String authHeader, Long bookingId, String status) {

        validateToken(authHeader);

        Optional<Booking> optionalBooking = bookingRepository.findById(bookingId);

        if (optionalBooking.isEmpty()) {
             throw new RuntimeException("Booking not found");
        }

        Booking booking = optionalBooking.get();

        booking.setStatus(status);

        return bookingRepository.save(booking);
    }

        // ================= ASSIGN DRIVER BOOKINGS =================
    public Object assignDriver(String authHeader, Long bookingId, Map<String, Object> payload) {

        validateToken(authHeader);

        Optional<Booking> optionalBooking = bookingRepository.findById(bookingId);

        if (optionalBooking.isEmpty()) {
           throw new RuntimeException("Booking not found");
        }

        Booking booking = optionalBooking.get();

        Driver driver;

            // ✅ CASE 1: Existing driver
        if (payload.get("driverId") != null) {

            Long driverId = Long.valueOf(payload.get("driverId").toString());

            driver = driverRepository.findById(driverId)
                   .orElseThrow(() -> new RuntimeException("Driver not found"));
        }

            // ✅ CASE 2: New driver
        else {
             String name = payload.get("name").toString();
             String phone = payload.get("phone").toString();

             driver = new Driver();
             driver.setName(name);
             driver.setPhone(phone);

             driver = driverRepository.save(driver); // 🔥 auto save to Drivers table
        }

            // Assign to booking
        booking.setDriverName(driver.getName());
        booking.setDriverPhone(driver.getPhone());
        booking.setStatus("DRIVER_ASSIGNED");

        return bookingRepository.save(booking);
    }  

        // ================= VEHICLES =================

    public List<?> getAllVehicles(String authHeader) {
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

    public Vehicle updateVehicle(String authHeader, Long id, Vehicle updatedVehicle) {

         validateToken(authHeader);

        Vehicle vehicle = vehicleRepository.findById(id)
                  .orElseThrow(() -> new RuntimeException("Vehicle not found"));

          // ✅ correct fields
         vehicle.setVehicleName(updatedVehicle.getVehicleName());
         vehicle.setVehicleType(updatedVehicle.getVehicleType());
         vehicle.setSeatingCapacity(updatedVehicle.getSeatingCapacity());
         vehicle.setPricePerKm(updatedVehicle.getPricePerKm());
         vehicle.setImageUrl(updatedVehicle.getImageUrl());
        
         return vehicleRepository.save(vehicle);
    }
}