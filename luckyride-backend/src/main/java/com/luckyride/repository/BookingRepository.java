package com.luckyride.repository;

import com.luckyride.model.Booking;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BookingRepository extends JpaRepository<Booking, Long> {

    List<Booking> findByUserPhone(String userPhone);

    List<Booking> findByUserPhoneAndStatusIn(
            String userPhone,
            List<String> status
    );

}