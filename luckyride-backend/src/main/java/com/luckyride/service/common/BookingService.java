package com.luckyride.service.common;

import com.luckyride.model.Booking;
import com.luckyride.model.Driver;
import com.luckyride.model.Vehicle;
import com.luckyride.repository.BookingRepository;
import com.luckyride.repository.VehicleRepository;

import org.springframework.web.server.ResponseStatusException;
import org.springframework.http.HttpStatus;
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

    // ✅ GET USER BOOKINGS
    public List<Booking> getBookingsByUserId(Long userId) {
        return bookingRepository.findByUserId(userId);
    }

    // ✅ CREATE BOOKING
    public Booking createBooking(Booking booking) {

        if (booking.getUserId() == null) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "JWT required");
        }

        if (booking.getVehicleId() == null) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Vehicle ID required");
        }

        Double distance = booking.getDistance() != null ? booking.getDistance() : 0.0;
        Integer days = booking.getDays() != null ? booking.getDays() : 1;

        String tripType = booking.getTripType() != null
                ? booking.getTripType().toLowerCase()
                : "local";

        Vehicle vehicle = vehicleRepository.findById(booking.getVehicleId())
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Vehicle not found"));

        double rate = vehicle.getPricePerKm();

        double totalKm;

        if (tripType.contains("local")) {
            totalKm = 80 * days;
        } else {
            double roundTrip = distance * 2;
            double minKm = days * 300;
            totalKm = Math.max(roundTrip, minKm);
        }

        double totalPrice = totalKm * rate;

        booking.setTotalPrice(totalPrice);
        booking.setAdvancePaid(totalPrice * 0.1);
        booking.setStatus("BOOKED");

        return bookingRepository.save(booking);
    }

    // ✅ PAYMENT
    public String makePayment(Long bookingId, Long userId, String method) {

        Booking booking = bookingRepository.findById(bookingId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Booking not found"));

        if (!booking.getUserId().equals(userId)) {
            throw new ResponseStatusException(
                    HttpStatus.FORBIDDEN, "Unauthorized access");
        }

        booking.setPaymentDone(true);
        booking.setPaymentMethod(method);

        // ✅ IMPORTANT FIX
        booking.setStatus("CONFIRMED");

        bookingRepository.save(booking);

        return "Payment Successful";
    }

    // ✅ ASSIGN DRIVER
    public Booking assignDriver(Long id, Driver driver) {

        if (driver.getName() == null || driver.getPhone() == null) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Driver data missing");
        }

        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Booking not found"));

        booking.setDriverName(driver.getName());
        booking.setDriverPhone(driver.getPhone());
        booking.setStatus("CONFIRMED");

        return bookingRepository.save(booking);
    }

    // ✅ UPDATE STATUS
    public Booking updateStatus(Long id, String status) {

        Booking booking = bookingRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Booking not found"));

        booking.setStatus(status);
        return bookingRepository.save(booking);
    }

    // ✅ DELETE
    public void deleteBooking(Long id) {
        bookingRepository.deleteById(id);
    }

    // ✅ ADMIN
    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }
}