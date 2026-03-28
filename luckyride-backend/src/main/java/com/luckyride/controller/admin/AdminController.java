package com.luckyride.controller;

import com.luckyride.model.AdminLoginRequest;
import com.luckyride.service.AdminService;
import com.luckyride.model.Booking;
import com.luckyride.model.Driver;

import com.luckyride.model.Vehicle;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin("*")
public class AdminController {

    private final AdminService adminService;

    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    private String extractToken(String authHeader) {
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            throw new RuntimeException("Unauthorized");
        }
            return authHeader.substring(7);
    }

    // 🔐 LOGIN
    @PostMapping("/login")
    public Map<String, Object> login(@RequestBody AdminLoginRequest request) {
           return adminService.login(request);
        }

    // 📊 DASHBOARD
    @GetMapping("/dashboard")
    public Map<String, Object> dashboard(
            @RequestHeader("Authorization") String authHeader
    ) {
        String token = extractToken(authHeader);
        return adminService.getDashboard(token);
    }

      // ================= DRIVERS =================
    @GetMapping("/drivers")
    public Object getDrivers(
            @RequestHeader("Authorization") String authHeader
    ) {
         String token = extractToken(authHeader);
         return adminService.getAllDrivers(token);
    }

    // ================= ADD DRIVER =================
    @PostMapping("/drivers")
    public Object addDriver(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody Driver driver
    ) {
         String token = extractToken(authHeader);
         return adminService.createDriver(token, driver);
    }

      // ================= BOOKINGS =================
    @GetMapping("/bookings")
    public Object getBookings(
            @RequestHeader("Authorization") String authHeader
    ) { 
        String token = extractToken(authHeader);
        return adminService.getAllBookings(token);
    }

       // ================= BOOKING STATUS =================
    @PutMapping("/bookings/{id}/status")
    public Object updateStatus(
            @RequestHeader("Authorization") String authHeader,
            @PathVariable Long id,
            @RequestParam String status
    ) { 
        String token = extractToken(authHeader);
        return adminService.updateBookingStatus(token, id, status);
    }

      // ================= ASSIGN DRIVER BOOKING =================
    @PutMapping("/bookings/{id}/assign-driver")
    public Object assignDriver(
            @RequestHeader("Authorization") String authHeader,
            @PathVariable Long id,
            @RequestBody Map<String, Object> payload
    ) { 
         String token = extractToken(authHeader);
         return adminService.assignDriver(token, id, payload);
    }

       // ================= VEHICLES =================

     // ✅ GET ALL VEHICLES
    @GetMapping("/vehicles")
    public Object getVehicles(@RequestHeader("Authorization") String authHeader) {
          String token = extractToken(authHeader);
          return adminService.getAllVehicles(token);
    }

     // ✅ ADD VEHICLE
    @PostMapping("/vehicles")
    public Object addVehicle(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody Vehicle vehicle
    ) { 
         String token = extractToken(authHeader);
         return adminService.createVehicle(token, vehicle);
    }

     // ✅ DELETE VEHICLE
    @DeleteMapping("/vehicles/{id}")
    public Object deleteVehicle(
            @RequestHeader("Authorization") String authHeader,
            @PathVariable Long id
    ) {  
         String token = extractToken(authHeader);
         return adminService.deleteVehicle(token, id);
    }

     // ✅ UPDATE VEHICLE (EDIT)
    @PutMapping("/vehicles/{id}")
    public Object updateVehicle(
            @RequestHeader("Authorization") String authHeader,
            @PathVariable Long id,
            @RequestBody Vehicle vehicle
    ) {   
          String token = extractToken(authHeader);
          return adminService.updateVehicle(token, id, vehicle);
    }
    
}