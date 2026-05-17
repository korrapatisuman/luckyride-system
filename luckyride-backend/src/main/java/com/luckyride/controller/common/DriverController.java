package com.luckyride.controller.common;

import com.luckyride.model.Driver;
import com.luckyride.service.common.DriverService;
import com.luckyride.dto.response.ApiResponse;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class DriverController {

    private final DriverService driverService;

    public DriverController(DriverService driverService) {
        this.driverService = driverService;
    }

    // ✅ GET ALL DRIVERS (MOBILE + WEB)
    @GetMapping({"/mobile/drivers", "/web/drivers"})
    public ApiResponse<List<Driver>> getAllDrivers() {

        List<Driver> drivers = driverService.getAllDrivers();

        return new ApiResponse<>(
                true,
                "Drivers fetched successfully",
                drivers
        );
    }

    // 🔐 ADD DRIVER (INTERNAL / ADMIN)
    @PostMapping("/drivers")
    public ApiResponse<Driver> addDriver(@RequestBody Driver driver) {

        Driver saved = driverService.addDriver(driver);

        return new ApiResponse<>(
                true,
                "Driver added",
                saved
        );
    }

    // 🔐 DELETE DRIVER
    @DeleteMapping("/drivers/{id}")
    public ApiResponse<String> deleteDriver(@PathVariable Long id) {

        driverService.deleteDriver(id);

        return new ApiResponse<>(
                true,
                "Driver deleted",
                null
        );
    }
}