package com.luckyride.service;

import com.luckyride.model.Vehicle;
import com.luckyride.repository.VehicleRepository;

import com.luckyride.model.Booking;
import com.luckyride.model.Driver;
import com.luckyride.repository.BookingRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;
    private final VehicleRepository vehicleRepository;

    public BookingService(BookingRepository bookingRepository,
                          VehicleRepository vehicleRepository) {
        this.bookingRepository = bookingRepository;
        this.vehicleRepository = vehicleRepository;
    }

    // ✅ NEW (JWT BASED)
    public List<Booking> getBookingsByUserId(Long userId) {
        return bookingRepository.findByUserId(userId);
    }

    // ⚠️ KEEP (for backward compatibility if needed)
    public List<Booking> getBookingsByEmail(String email) {
        return bookingRepository.findByUserEmail(email);
    }

    public List<Booking> getBookingsByUser(String phone) {
        return bookingRepository.findByUserPhone(phone);
    }

    // ✅ CREATE BOOKING
    public Booking createBooking(Booking booking) {

        System.out.println("📦 Booking Request: " + booking);

        Double distance = booking.getDistance();
        if (distance == null) distance = 0.0;

        Integer days = booking.getDays();
        if (days == null) days = 1;

        Vehicle vehicle = vehicleRepository.findById(booking.getVehicleId())
                .orElseThrow(() -> new RuntimeException("Vehicle not found"));

        double rate = vehicle.getPricePerKm();

        double totalKm;

        if (booking.getTripType().toLowerCase().contains("local")) {
            totalKm = 80 * days;
        } else {
            double roundTrip = distance * 2;
            double minKm = days * 300;
            totalKm = Math.max(roundTrip, minKm);
        }

        double totalPrice = totalKm * rate;

        System.out.println("📊 Backend Price: " + totalPrice);
        System.out.println("📊 Frontend Price: " + booking.getTotalPrice());

        booking.setTotalPrice(totalPrice);
        booking.setAdvancePaid(totalPrice * 0.1);
        booking.setStatus("BOOKED");

        // 🔥 IMPORTANT: Remove dependency on phone/email
        if (booking.getUserId() == null) {
            throw new RuntimeException("User ID missing (JWT required)");
        }

        return bookingRepository.save(booking);
    }

    // ✅ ASSIGN DRIVER
    public Booking assignDriver(Long id, Driver driver) {

        if (driver.getName() == null || driver.getPhone() == null) {
            throw new RuntimeException("Driver data missing");
        }

        Booking b = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        System.out.println("Assigning Driver: " + driver.getName());

        b.setDriverName(driver.getName());
        b.setDriverPhone(driver.getPhone());
        b.setStatus("CONFIRMED");

        return bookingRepository.save(b);
    }

    // ✅ UPDATE STATUS
    public Booking updateStatus(Long id, String status) {
        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Booking not found"));

        booking.setStatus(status);
        return bookingRepository.save(booking);
    }

    // ✅ DELETE
    public void deleteBooking(Long id) {
        bookingRepository.deleteById(id);
    }

    // ✅ ADMIN USE
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }
}