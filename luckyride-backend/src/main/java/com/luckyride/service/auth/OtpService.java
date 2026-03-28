package com.luckyride.service;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Map;
import java.util.Random;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class OtpService {

    // Thread-safe maps
    private final Map<String, String> otpStorage = new ConcurrentHashMap<>();
    private final Map<String, LocalDateTime> otpExpiry = new ConcurrentHashMap<>();
    private final Map<String, Integer> retryCount = new ConcurrentHashMap<>();

    private static final int MAX_RETRY = 5;

    // 🔹 Generate OTP
    public String generateOtp(String login) {

        String otp = String.valueOf(new Random().nextInt(900000) + 100000);

        otpStorage.put(login, otp);
        otpExpiry.put(login, LocalDateTime.now().plusMinutes(5));
        retryCount.put(login, 0); // reset retries

        return otp;
    }

    // 🔹 Verify OTP
    public boolean verifyOtp(String login, String otp) {

        if (!otpStorage.containsKey(login)) return false;

        // Check expiry
        if (LocalDateTime.now().isAfter(otpExpiry.get(login))) {
            clearOtp(login);
            return false;
        }

        // Check retry limit
        int attempts = retryCount.getOrDefault(login, 0);
        if (attempts >= MAX_RETRY) {
            clearOtp(login);
            return false;
        }

        // Validate OTP
        boolean isValid = otp.equals(otpStorage.get(login));

        if (isValid) {
            clearOtp(login); // 🔥 IMPORTANT (one-time use)
            return true;
        } else {
            retryCount.put(login, attempts + 1);
            return false;
        }
    }

    // 🔹 Clear OTP
    private void clearOtp(String login) {
        otpStorage.remove(login);
        otpExpiry.remove(login);
        retryCount.remove(login);
    }

    // 🔹 Auto cleanup every 5 minutes (optional but good)
    @Scheduled(fixedRate = 300000)
    public void cleanupExpiredOtps() {
        LocalDateTime now = LocalDateTime.now();

        otpExpiry.forEach((key, expiry) -> {
            if (now.isAfter(expiry)) {
                clearOtp(key);
            }
        });
    }
}