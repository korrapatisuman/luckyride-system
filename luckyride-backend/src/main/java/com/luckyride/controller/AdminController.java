package com.luckyride.controller;

import com.luckyride.model.Admin;
import com.luckyride.model.AdminLoginRequest;
import com.luckyride.repository.AdminRepository;
import com.luckyride.repository.BookingRepository;
import com.luckyride.repository.VehicleRepository;
import com.luckyride.repository.DriverRepository;

import org.springframework.web.bind.annotation.*;

import java.util.Optional;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin("*")
public class AdminController {

    private final AdminRepository adminRepository;
    private final BookingRepository bookingRepository;
    private final VehicleRepository vehicleRepository;
    private final DriverRepository driverRepository;

    public AdminController(
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

    // 🔐 LOGIN (your existing code)
    @PostMapping("/login")
    public String login(@RequestBody AdminLoginRequest request) {

        Optional<Admin> admin = adminRepository.findByEmail(request.getEmail());

        if (admin.isPresent() && admin.get().getPassword().equals(request.getPassword())) {
            return "Admin Login Successful";
        }

        return "Invalid Email or Password";
    }

    // 📊 DASHBOARD (NEW)
    @GetMapping("/dashboard")
    public Map<String, Object> getDashboard() {

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
}