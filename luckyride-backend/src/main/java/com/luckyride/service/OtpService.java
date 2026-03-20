package com.luckyride.service;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class OtpService {

    private final Map<String, String> otpStorage = new HashMap<>();

    // 🔥 GENERATE OTP
    public void generateOtp(String phone) {

        String otp = String.valueOf((int)(Math.random() * 9000) + 1000);

        otpStorage.put(phone, otp);

        // ✅ VERY IMPORTANT (THIS WAS MISSING)
        System.out.println("🔥 OTP for " + phone + " is: " + otp);
    }

    // 🔥 VERIFY OTP
    public boolean verifyOtp(String phone, String otp) {

        String storedOtp = otpStorage.get(phone);

        if (storedOtp != null && storedOtp.equals(otp)) {
            otpStorage.remove(phone); // optional cleanup
            return true;
        }

        return false;
    }
}