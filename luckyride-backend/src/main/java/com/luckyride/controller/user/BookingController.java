package com.luckyride.controller;

import com.luckyride.repository.BookingRepository;
import com.luckyride.model.Driver;
import com.luckyride.model.Booking;
import com.luckyride.service.BookingService;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin("*")
public class BookingController {

    private final BookingRepository bookingRepository;
    private final BookingService bookingService;

    public BookingController(BookingService bookingService,
                             BookingRepository bookingRepository) {
        this.bookingService = bookingService;
        this.bookingRepository = bookingRepository;
    }

    // ✅ GET BOOKINGS OF LOGGED-IN USER (SECURE)
    @GetMapping("/my")
    public List<Booking> getMyBookings() {

        String userId = (String) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        System.out.println("🔍 Fetching bookings for USER ID: " + userId);

        return bookingService.getBookingsByUserId(Long.parseLong(userId));
    }

    // ✅ PAYMENT (SECURE)
    @PutMapping("/{id}/pay")
    public String makePayment(@PathVariable Long id,
                             @RequestParam String method) {

        String userId = (String) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        // 🔒 Check ownership
        if (!booking.getUserId().equals(Long.parseLong(userId))) {
            throw new RuntimeException("Unauthorized access");
        }

        booking.setPaymentDone(true);
        booking.setPaymentMethod(method);
        booking.setStatus("PAID");

        bookingRepository.save(booking);

        return "Payment Successful";
    }

    // ✅ CREATE BOOKING (AUTO LINK USER)
    @PostMapping
    public Booking createBooking(@RequestBody Booking booking) {

        String userId = (String) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        booking.setUserId(Long.parseLong(userId));

        System.out.println("📦 New Booking by USER ID: " + userId);

        return bookingService.createBooking(booking);
    }

    // 🔐 ADMIN / INTERNAL USE
    @PutMapping("/{id}/assign-driver")
    public Booking assignDriver(@PathVariable Long id,
                                @RequestBody Driver driver) {
        return bookingService.assignDriver(id, driver);
    }

    @PutMapping("/{id}/status")
    public Booking updateStatus(@PathVariable Long id,
                               @RequestParam String status) {
        return bookingService.updateStatus(id, status);
    }

    @DeleteMapping("/{id}")
    public void deleteBooking(@PathVariable Long id) {
        bookingService.deleteBooking(id);
    }
}