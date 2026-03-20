package com.luckyride.controller;

import com.luckyride.model.Driver;
import com.luckyride.model.Booking;
import com.luckyride.service.BookingService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping
    public Booking createBooking(@RequestBody Booking booking) {
        return bookingService.createBooking(booking);
    }

        // ✅ NEW (VERY IMPORTANT)
    @GetMapping
    public List<Booking> getAllBookings() {
        return bookingService.getAllBookings();
    }

    @GetMapping("/user/{phone}")
    public List<Booking> getUserBookings(@PathVariable String phone) {
        return bookingService.getBookingsByUser(phone); // ✅ FIXED
    }

    @PutMapping("/{id}/assign-driver")
    public Booking assignDriver(@PathVariable Long id, @RequestBody Driver driver) {
        return bookingService.assignDriver(id, driver); // ✅ FIXED
    }

    @DeleteMapping("/{id}")
    public void deleteBooking(@PathVariable Long id) {
        bookingService.deleteBooking(id);
    }
}