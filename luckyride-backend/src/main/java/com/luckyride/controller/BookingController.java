package com.luckyride.controller;

import com.luckyride.model.Booking;
import com.luckyride.repository.BookingRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "*")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    // Create Booking
    @PostMapping
  public Booking createBooking(@RequestBody Booking booking) {

    // check if user already has active booking
    var existingBooking =
            bookingRepository.findByUserPhoneAndStatus(
                    booking.getUserPhone(),
                    "BOOKED"
            );

    if (existingBooking.isPresent()) {
        throw new RuntimeException("User already has an active booking");
    }

    return bookingRepository.save(booking);
}

    // Get All Bookings (admin purpose)
    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    // Get bookings for a specific user
    @GetMapping("/user/{phone}")
    public List<Booking> getUserBookings(@PathVariable String phone) {
        return bookingRepository.findByUserPhone(phone);
    }
}