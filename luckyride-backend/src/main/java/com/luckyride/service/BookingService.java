package com.luckyride.service;

import com.luckyride.model.Booking;
import com.luckyride.model.Driver; // ✅ ADD THIS
import com.luckyride.repository.BookingRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService {

    private final BookingRepository bookingRepository;

    public BookingService(BookingRepository bookingRepository) {
        this.bookingRepository = bookingRepository;
    }

    public List<Booking> getBookingsByUser(String phone) {
        return bookingRepository.findByUserPhone(phone); // ✅ FIXED
    }

    public Booking assignDriver(Long id, Driver driver) {

        Booking b = bookingRepository.findById(id).orElseThrow(); // ✅ FIXED

        b.setDriverName(driver.getName());
        b.setDriverPhone(driver.getPhone());

        return bookingRepository.save(b); // ✅ FIXED
    }

    public Booking updateStatus(Long id, String status) {
        Booking booking = bookingRepository.findById(id)
            .orElseThrow(() -> new RuntimeException("Booking not found"));

        booking.setStatus(status);
        return bookingRepository.save(booking);
    }

    public void deleteBooking(Long id) {
        bookingRepository.deleteById(id);
    }

    public Booking createBooking(Booking booking) {

        double distance = booking.getDistance();
        int days = booking.getDays();

        double rate = getRateByVehicle(booking.getVehicleType());

        double totalKm;

        if ("LOCAL".equalsIgnoreCase(booking.getTripType())) {
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

    public List<Booking> getAllBookings() {
        return bookingRepository.findAll();
    }

    private double getRateByVehicle(String vehicleType) {

        switch (vehicleType.toLowerCase()) {
            case "auto":
                return 10;
            case "car 4+1":
                return 20;
            case "car 9+1":
                return 25;
            case "traveller 12 seater":
                return 30;
            case "traveller 24 seater":
                return 40;
            default:
                return 20;
        }
    }
}