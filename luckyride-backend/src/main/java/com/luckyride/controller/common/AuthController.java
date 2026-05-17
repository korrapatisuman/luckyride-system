package com.luckyride.controller.common;

import com.luckyride.dto.request.LoginRequest;
import com.luckyride.dto.request.OtpVerifyRequest;
import com.luckyride.dto.response.ApiResponse;
import com.luckyride.dto.response.AuthResponse;
import com.luckyride.service.common.AuthService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    // ✅ SEND OTP (COMMON FOR MOBILE + WEB)
    @PostMapping("/send-otp")
    public ApiResponse<String> sendOtp(@RequestBody LoginRequest request) {

        System.out.println("📩 Send OTP 👉 phone=" 
                + request.getPhone() + ", email=" + request.getEmail());

        return authService.sendOtp(request);
    }

    // ✅ VERIFY OTP + RETURN TOKEN
    @PostMapping("/verify-otp")
    public ApiResponse<AuthResponse> verifyOtp(@RequestBody OtpVerifyRequest request) {

        System.out.println("🔐 Verify OTP 👉 phone=" 
                + request.getPhone() + ", email=" + request.getEmail());

        return authService.verifyOtp(request);
    }
}