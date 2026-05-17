package com.luckyride.service.common;

import com.luckyride.model.Driver;
import com.luckyride.repository.DriverRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DriverService {

    private final DriverRepository driverRepository;

    public DriverService(DriverRepository driverRepository) {
        this.driverRepository = driverRepository;
    }

    // ✅ ADD DRIVER
    public Driver addDriver(Driver driver) {
        return driverRepository.save(driver);
    }

    // ✅ GET ALL
    public List<Driver> getAllDrivers() {
        return driverRepository.findAll();
    }

    // ✅ DELETE
    public void deleteDriver(Long id) {
        driverRepository.deleteById(id);
    }
}