package com.luckyride.service.common;

import com.luckyride.model.Vehicle;
import com.luckyride.repository.VehicleRepository;


import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VehicleService {

    private final VehicleRepository vehicleRepository;

    public VehicleService(VehicleRepository vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }

    // ✅ GET ALL
    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll()
                .stream()
                .filter(v -> "ACTIVE".equals(v.getStatus()))
                .toList();
    }

    // ✅ ADD
    public Vehicle addVehicle(Vehicle vehicle) {
        return vehicleRepository.save(vehicle);
    }

    // ✅ DELETE
    public void deleteVehicle(Long id) {
        vehicleRepository.deleteById(id);
    }
}