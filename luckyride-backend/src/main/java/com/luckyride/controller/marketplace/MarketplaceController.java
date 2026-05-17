package com.luckyride.controller.marketplace;

import com.luckyride.model.MarketplaceVehicle;
import com.luckyride.service.marketplace.MarketplaceVehicleService;
import com.luckyride.dto.response.ApiResponse;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/market")
@CrossOrigin("*")
public class MarketplaceController {

    private final MarketplaceVehicleService marketplaceService;

    public MarketplaceController(MarketplaceVehicleService marketplaceService) {
        this.marketplaceService = marketplaceService;
    }

    // 🌐 WEBSITE (APPROVED VEHICLES)
    @GetMapping("/vehicles")
    public ApiResponse<List<MarketplaceVehicle>> getApprovedVehicles() {

        return new ApiResponse<>(
                true,
                "Approved vehicles",
                marketplaceService.getApprovedVehicles()
        );
    }

    // 📱 SELLER ADD VEHICLE
    @PostMapping("/vehicles")
    public ApiResponse<MarketplaceVehicle> addVehicle(@RequestBody MarketplaceVehicle vehicle) {

        return new ApiResponse<>(
                true,
                "Vehicle submitted for approval",
                marketplaceService.addVehicle(vehicle)
        );
    }

    // 🔐 ADMIN - ALL VEHICLES
    @GetMapping("/admin/vehicles")
    public ApiResponse<List<MarketplaceVehicle>> getAllVehicles() {

        return new ApiResponse<>(
                true,
                "All vehicles",
                marketplaceService.getAllVehicles()
        );
    }

    // 🔐 ADMIN - APPROVE
    @PutMapping("/admin/{id}/approve")
    public ApiResponse<MarketplaceVehicle> approve(@PathVariable Long id) {

        return new ApiResponse<>(
                true,
                "Vehicle approved",
                marketplaceService.updateStatus(id, "APPROVED")
        );
    }

    // 🔐 ADMIN - REJECT
    @PutMapping("/admin/{id}/reject")
    public ApiResponse<MarketplaceVehicle> reject(@PathVariable Long id) {

        return new ApiResponse<>(
                true,
                "Vehicle rejected",
                marketplaceService.updateStatus(id, "REJECTED")
        );
    }

    // 🔐 ADMIN - DELETE
    @DeleteMapping("/admin/{id}")
    public ApiResponse<String> delete(@PathVariable Long id) {

        marketplaceService.deleteVehicle(id);

        return new ApiResponse<>(
                true,
                "Vehicle deleted",
                null
        );
    }
}