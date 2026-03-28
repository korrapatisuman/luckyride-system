package com.luckyride.repository;

import com.luckyride.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    // ✅ NEW (MAIN METHOD - JWT BASED)
    List<Booking> findByUserId(Long userId);

    // ⚠️ KEEP (for backward/admin usage)
    List<Booking> findByUserPhone(String phone);
    List<Booking> findByUserEmail(String email);
}