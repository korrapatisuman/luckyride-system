package com.luckyride.controller.admin;

import com.luckyride.dto.request.AdminLoginRequest;


import com.luckyride.model.Driver;
import com.luckyride.model.Vehicle;
import com.luckyride.service.admin.AdminService;

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
        return adminService.getDashboard(authHeader);
    }

    // ================= DRIVERS =================

    @GetMapping("/drivers")
    public Object getDrivers(@RequestHeader("Authorization") String authHeader) {
        return adminService.getAllDrivers(authHeader);
    }

    @PostMapping("/drivers")
    public Object addDriver(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody Driver driver
    ) {
        return adminService.createDriver(authHeader, driver);
    }

    @DeleteMapping("/drivers/{id}")
    public Object deleteDriver(
           @RequestHeader("Authorization") String authHeader,
           @PathVariable Long id
    ) {
        return adminService.deleteDriver(authHeader, id);
    }

    // ================= BOOKINGS =================

    @GetMapping("/bookings")
    public Object getBookings(
           @RequestHeader("Authorization") String authHeader
    ) {

            System.out.println("🔥 ADMIN BOOKINGS API HIT");

            Object result = adminService.getAllBookings(authHeader);

            System.out.println("🔥 BOOKINGS RESULT: " + result);

        return result;
    }

    @PutMapping("/bookings/{id}/status")
    public Object updateStatus(
            @RequestHeader("Authorization") String authHeader,
            @PathVariable Long id,
            @RequestParam String status
    ) {
        return adminService.updateBookingStatus(authHeader, id, status);
    }

    @PutMapping("/bookings/{id}/assign-driver")
    public Object assignDriver(
            @RequestHeader("Authorization") String authHeader,
            @PathVariable Long id,
            @RequestBody Map<String, Object> payload
    ) {
        return adminService.assignDriver(authHeader, id, payload);
    }

    @DeleteMapping("/bookings/{id}")
    public Object deleteBooking(
            @RequestHeader("Authorization") String authHeader,
            @PathVariable Long id
     ) {
         return adminService.deleteBooking(authHeader, id);
    }

    // ================= VEHICLES =================

    @GetMapping("/vehicles")
    public Object getVehicles(@RequestHeader("Authorization") String authHeader) {
        return adminService.getAllVehicles(authHeader);
    }

    @PostMapping("/vehicles")
    public Object addVehicle(
            @RequestHeader("Authorization") String authHeader,
            @RequestBody Vehicle vehicle
    ) {
        return adminService.createVehicle(authHeader, vehicle);
    }

    @DeleteMapping("/vehicles/{id}")
    public Object deleteVehicle(
            @RequestHeader("Authorization") String authHeader,
            @PathVariable Long id
    ) {
        return adminService.deleteVehicle(authHeader, id);
    }

    @PutMapping("/vehicles/{id}")
    public Object updateVehicle(
            @RequestHeader("Authorization") String authHeader,
            @PathVariable Long id,
            @RequestBody Vehicle vehicle
    ) {
        return adminService.updateVehicle(authHeader, id, vehicle);
    }
}