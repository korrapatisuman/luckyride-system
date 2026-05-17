package com.luckyride.controller.common;

import com.luckyride.model.Booking;
import com.luckyride.model.Driver;
import com.luckyride.service.common.BookingService;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    // ✅ COMMON METHOD
    private Long getLoggedInUserId() {
        Object principal = SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        return Long.parseLong(principal.toString());
    }

    // ✅ GET BOOKINGS
    @GetMapping("/{platform}/bookings/my")
    public List<Booking> getMyBookings(@PathVariable String platform) {

        Long userId = getLoggedInUserId();

        System.out.println("👉 USER ID: " + userId);

        return bookingService.getBookingsByUserId(userId);
    }

    // ✅ CREATE BOOKING
    @PostMapping("/{platform}/bookings")
    public Booking createBooking(@RequestBody Booking booking,
                                 @PathVariable String platform) {

        Long userId = getLoggedInUserId();
        booking.setUserId(userId);

        return bookingService.createBooking(booking);
    }

    // ✅ PAYMENT
    @PutMapping("/{platform}/bookings/{id}/pay")
    public String makePayment(@PathVariable Long id,
                             @RequestParam String method,
                             @PathVariable String platform) {

        Long userId = getLoggedInUserId();

        return bookingService.makePayment(id, userId, method);
    }

    // 🔐 ADMIN
    @PutMapping("/bookings/{id}/assign-driver")
    public Booking assignDriver(@PathVariable Long id,
                                @RequestBody Driver driver) {
        return bookingService.assignDriver(id, driver);
    }

    @PutMapping("/bookings/{id}/status")
    public Booking updateStatus(@PathVariable Long id,
                               @RequestParam String status) {
        return bookingService.updateStatus(id, status);
    }

    @DeleteMapping("/bookings/{id}")
    public void deleteBooking(@PathVariable Long id) {
        bookingService.deleteBooking(id);
    }
}