package com.luckyride.controller.common;

import com.luckyride.model.Vehicle;
import com.luckyride.service.common.VehicleService;
import com.luckyride.dto.response.ApiResponse;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class VehicleController {

    private final VehicleService vehicleService;

    public VehicleController(VehicleService vehicleService) {
        this.vehicleService = vehicleService;
    }

    // ✅ GET VEHICLES
    @GetMapping("/{platform}/vehicles")
    public ApiResponse<List<Vehicle>> getAllVehicles(
            @PathVariable String platform
    ) {

        System.out.println("🔥 VEHICLE API HIT: " + platform);

        List<Vehicle> vehicles = vehicleService.getAllVehicles();

        return new ApiResponse<>(
                true,
                "Vehicles fetched successfully",
                vehicles
        );
    }
}