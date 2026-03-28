package com.luckyride.service;

import java.time.LocalDateTime;
import com.luckyride.model.MarketplaceVehicle;
import com.luckyride.repository.MarketplaceVehicleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MarketplaceVehicleService {

    private final MarketplaceVehicleRepository repo;
    private final NotificationService notificationService;

    public MarketplaceVehicleService(
            MarketplaceVehicleRepository repo,
            NotificationService notificationService) {
        this.repo = repo;
        this.notificationService = notificationService;
    }

    public List<MarketplaceVehicle> getApprovedVehicles() {
    return repo.findByStatus("APPROVED");
}

    public MarketplaceVehicle addVehicle(MarketplaceVehicle vehicle) {

        vehicle.setCreatedAt(LocalDateTime.now().toString());
        vehicle.setStatus("PENDING");

        MarketplaceVehicle saved = repo.save(vehicle);

        // EMAIL
        notificationService.sendEmail(
            "seller@email.com",
            "Vehicle Listed 🛒",
            "Your vehicle is live on LuckyRide"
        );

        return saved;
    }

    public MarketplaceVehicle updateStatus(Long id, String status) {

            MarketplaceVehicle v = repo.findById(id)
             .orElseThrow(() -> new RuntimeException("Vehicle not found"));

            v.setStatus(status);

           return repo.save(v);
    }

    public List<MarketplaceVehicle> getAllVehicles() {
        return repo.findAll();
    }

    public void deleteVehicle(Long id) {
        repo.deleteById(id);
    }
}