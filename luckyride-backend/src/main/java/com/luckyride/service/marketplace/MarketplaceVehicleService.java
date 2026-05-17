package com.luckyride.service.marketplace;

import com.luckyride.service.marketplace.MarketplaceVehicleService;
import com.luckyride.model.MarketplaceVehicle;
import com.luckyride.repository.MarketplaceVehicleRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class MarketplaceVehicleService {

    private final MarketplaceVehicleRepository repo;

    public MarketplaceVehicleService(MarketplaceVehicleRepository repo) {
        this.repo = repo;
    }

    // ✅ GET APPROVED
    public List<MarketplaceVehicle> getApprovedVehicles() {
        return repo.findByStatus("APPROVED");
    }

    // ✅ ADD VEHICLE
    public MarketplaceVehicle addVehicle(MarketplaceVehicle vehicle) {

        vehicle.setCreatedAt(LocalDateTime.now().toString());
        vehicle.setStatus("PENDING");

        return repo.save(vehicle);
    }

    // ✅ UPDATE STATUS
    public MarketplaceVehicle updateStatus(Long id, String status) {

        MarketplaceVehicle v = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));

        v.setStatus(status);

        return repo.save(v);
    }

    // ✅ GET ALL
    public List<MarketplaceVehicle> getAllVehicles() {
        return repo.findAll();
    }

    // ✅ DELETE
    public void deleteVehicle(Long id) {
        repo.deleteById(id);
    }
}