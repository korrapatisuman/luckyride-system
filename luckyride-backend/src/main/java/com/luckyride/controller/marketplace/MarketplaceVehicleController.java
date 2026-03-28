package com.luckyride.controller;

import com.luckyride.model.MarketplaceVehicle;
import com.luckyride.repository.MarketplaceVehicleRepository;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/marketplace")
@CrossOrigin("*")
public class MarketplaceVehicleController {

    private final MarketplaceVehicleRepository marketplaceVehicleRepository;

    public MarketplaceVehicleController(MarketplaceVehicleRepository marketplaceVehicleRepository) {
        this.marketplaceVehicleRepository = marketplaceVehicleRepository;
    }

    // ✅ GET ALL APPROVED VEHICLES (FOR WEBSITE)
    @GetMapping("/approved")
    public List<MarketplaceVehicle> getApprovedVehicles() {
        return marketplaceVehicleRepository.findByStatus("APPROVED");
    }

    // ✅ GET ALL (FOR ADMIN)
    @GetMapping
    public List<MarketplaceVehicle> getAll() {
        return marketplaceVehicleRepository.findAll();
    }

    // ✅ APPROVE
    @PutMapping("/{id}/approve")
    public String approve(@PathVariable Long id) {
        MarketplaceVehicle v = marketplaceVehicleRepository.findById(id).orElseThrow();
        v.setStatus("APPROVED");
        marketplaceVehicleRepository.save(v);
        return "Approved";
    }

    // ❌ REJECT
    @PutMapping("/{id}/reject")
    public String reject(@PathVariable Long id) {
        MarketplaceVehicle v = marketplaceVehicleRepository.findById(id).orElseThrow();
        v.setStatus("REJECTED");
        marketplaceVehicleRepository.save(v);
        return "Rejected";
    }

    // 🗑 DELETE
    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        marketplaceVehicleRepository.deleteById(id);
        return "Deleted";
    }
}