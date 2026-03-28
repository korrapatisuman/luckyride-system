package com.luckyride.repository;

import com.luckyride.model.MarketplaceVehicle;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MarketplaceVehicleRepository
        extends JpaRepository<MarketplaceVehicle, Long> {

                List<MarketplaceVehicle> findByStatus(String status);
}