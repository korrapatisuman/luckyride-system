package com.luckyride.controller;

import com.luckyride.model.LoginRequest;
import com.luckyride.model.OtpVerifyRequest;
import com.luckyride.model.User;
import com.luckyride.repository.UserRepository;
import com.luckyride.service.EmailService;
import com.luckyride.service.OtpService;

import com.luckyride.exception.CustomException;
import com.luckyride.util.TokenUtil;
import com.luckyride.dto.response.AuthResponse;
import com.luckyride.dto.response.ApiResponse;

import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin("*")
public class AuthController {

    private final OtpService otpService;
    private final UserRepository userRepository;
    private final EmailService emailService;

    public AuthController(OtpService otpService,
                          UserRepository userRepository,
                          EmailService emailService) {
        this.otpService = otpService;
        this.userRepository = userRepository;
        this.emailService = emailService;
    }

    // ✅ SEND OTP
    @PostMapping("/send-otp")
    public ApiResponse<String> sendOtp(@RequestBody LoginRequest request) {

        String phone = normalize(request.getPhone());
        String email = normalize(request.getEmail());

        if (isEmpty(phone) && isEmpty(email)) {
            throw new CustomException("Phone or Email required");
        }

        String key = !isEmpty(phone) ? phone : email;

        String otp = otpService.generateOtp(key);

        // 🔹 PHONE (dev only)
        if (!isEmpty(phone)) {
            System.out.println("OTP (DEV ONLY): " + otp);
        }

        // 🔹 EMAIL
        if (!isEmpty(email)) {
            emailService.sendOtp(email, otp);
        }

        return new ApiResponse<>(
                true,
                "OTP sent successfully",
                null
        );
    }

    // ✅ VERIFY OTP + LOGIN
    @PostMapping("/verify-otp")
    public ApiResponse<AuthResponse> verifyOtp(@RequestBody OtpVerifyRequest request) {

        String phone = normalize(request.getPhone());
        String email = normalize(request.getEmail());
        String otp = request.getOtp();

        if (isEmpty(phone) && isEmpty(email)) {
            throw new CustomException("Phone or Email required");
        }

        if (isEmpty(otp)) {
            throw new CustomException("OTP is required");
        }

        String key = !isEmpty(phone) ? phone : email;

        // ✅ VERIFY OTP
        boolean verified = otpService.verifyOtp(key, otp);

        if (!verified) {
            throw new CustomException("Invalid or expired OTP");
        }

        Optional<User> userOptional;

        if (!isEmpty(phone)) {
            userOptional = userRepository.findByPhone(phone);
        } else {
            userOptional = userRepository.findByEmail(email);
        }

        User user;

        if (userOptional.isPresent()) {
            user = userOptional.get();
        } else {
            user = new User();

            if (!isEmpty(phone)) user.setPhone(phone);
            if (!isEmpty(email)) user.setEmail(email);

            user.setFirstName("User");
            user.setStatus("ACTIVE");
            user.setCreatedAt(LocalDateTime.now());

            userRepository.save(user);
        }

        // 🔥 IMPORTANT FIX → use USER ID in token
        String token = TokenUtil.generateToken(String.valueOf(user.getId()));

        return new ApiResponse<>(
                true,
                "Login Successful",
                new AuthResponse(token, user.getPhone(), user.getEmail())
        );
    }

    // 🔹 Helpers
    private String normalize(String value) {
        return value == null ? null : value.trim().toLowerCase();
    }

    private boolean isEmpty(String value) {
        return value == null || value.isEmpty();
    }
}