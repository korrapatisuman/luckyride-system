package com.luckyride.controller;

import com.luckyride.model.Vehicle;
import com.luckyride.service.VehicleService;
import com.luckyride.dto.response.ApiResponse;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vehicles")
@CrossOrigin("*")
public class VehicleController {

    private final VehicleService vehicleService;

    public VehicleController(VehicleService vehicleService) {
        this.vehicleService = vehicleService;
    }

    // ✅ GET all vehicles
    @GetMapping
    public ApiResponse<List<Vehicle>> getAllVehicles() {

        List<Vehicle> vehicles = vehicleService.getAllVehicles();

        return new ApiResponse<>(
                true,
                "Vehicles fetched successfully",
                vehicles
        );
    }

    // ✅ CREATE vehicle
    @PostMapping
    public ApiResponse<Vehicle> createVehicle(@RequestBody Vehicle vehicle) {

        Vehicle saved = vehicleService.addVehicle(vehicle);

        return new ApiResponse<>(
                true,
                "Vehicle created",
                saved
        );
    }

    // ✅ DELETE
    @DeleteMapping("/{id}")
    public ApiResponse<String> deleteVehicle(@PathVariable Long id) {

        vehicleService.deleteVehicle(id);

        return new ApiResponse<>(
                true,
                "Vehicle deleted",
                null
        );
    }
}