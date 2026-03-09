package com.luckyride.service;

import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
public class OtpService {

    private Map<String, String> otpStorage = new HashMap<>();

    public String generateOtp(String phone) {

        Random random = new Random();
        int otp = 1000 + random.nextInt(9000);

        String otpString = String.valueOf(otp);

        otpStorage.put(phone, otpString);

        System.out.println("OTP for " + phone + " : " + otpString);

        return otpString;
    }

    public boolean verifyOtp(String phone, String otp) {

        String storedOtp = otpStorage.get(phone);

        return storedOtp != null && storedOtp.equals(otp);
    }
}
