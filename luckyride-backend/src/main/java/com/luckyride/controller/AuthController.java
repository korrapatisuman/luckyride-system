package com.luckyride.controller;

import com.luckyride.model.LoginRequest;
import com.luckyride.model.OtpVerifyRequest;
import com.luckyride.service.OtpService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    private final OtpService otpService;

    public AuthController(OtpService otpService) {
        this.otpService = otpService;
    }

    @PostMapping("/send-otp")
    public String sendOtp(@RequestBody LoginRequest request) {

        otpService.generateOtp(request.getPhone());

        return "OTP Sent Successfully";
    }

    @PostMapping("/verify-otp")
    public String verifyOtp(@RequestBody OtpVerifyRequest request) {

        boolean verified = otpService.verifyOtp(request.getPhone(), request.getOtp());

        if (verified) {
            return "Login Successful";
        } else {
            return "Invalid OTP";
        }
    }
}
