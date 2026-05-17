package com.luckyride.service.common;

import com.luckyride.dto.request.LoginRequest;
import com.luckyride.dto.request.OtpVerifyRequest;
import com.luckyride.dto.response.AuthResponse;
import com.luckyride.dto.response.ApiResponse;
import com.luckyride.exception.CustomException;
import com.luckyride.model.User;
import com.luckyride.repository.UserRepository;
import com.luckyride.util.TokenUtil;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class AuthService {

    private final OtpService otpService;
    private final EmailService emailService;
    private final UserRepository userRepository;

    public AuthService(OtpService otpService,
                       EmailService emailService,
                       UserRepository userRepository) {
        this.otpService = otpService;
        this.emailService = emailService;
        this.userRepository = userRepository;
    }

    // ✅ SEND OTP
    public ApiResponse<String> sendOtp(LoginRequest request) {
        try {

            String key;

            if (request.getPhone() != null && !request.getPhone().isEmpty()) {
                key = request.getPhone();
            } else if (request.getEmail() != null && !request.getEmail().isEmpty()) {
                key = request.getEmail();
            } else {
                throw new CustomException("Phone or Email required");
            }

            String otp = otpService.generateOtp(key);

            System.out.println("✅ OTP Sent to: " + key);
            System.out.println("🔢 OTP: " + otp);

            return new ApiResponse<>(
                    true,
                    "OTP sent successfully",
                    "SUCCESS"
            );

        } catch (Exception e) {
            e.printStackTrace();
            throw new CustomException("OTP FAILED: " + e.getMessage());
        }
    }

    // ✅ VERIFY OTP
    public ApiResponse<AuthResponse> verifyOtp(OtpVerifyRequest request) {

        String phone = normalize(request.getPhone());
        String email = normalize(request.getEmail());
        String otp = request.getOtp();

        if (isEmpty(phone) && isEmpty(email)) {
            throw new CustomException("Phone or Email required");
        }

        if (isEmpty(otp)) {
            throw new CustomException("OTP required");
        }

        String key = !isEmpty(phone) ? phone : email;

        boolean verified = otpService.verifyOtp(key, otp);

        if (!verified) {
            throw new CustomException("Invalid OTP");
        }

        Optional<User> userOptional = !isEmpty(phone)
                ? userRepository.findByPhone(phone)
                : userRepository.findByEmail(email);

        User user = userOptional.orElseGet(() -> {
            User newUser = new User();
            if (!isEmpty(phone)) {
            newUser.setPhone(phone);
            }

            if (!isEmpty(email)) {
            newUser.setEmail(email);
            }
            newUser.setFirstName("User");
            newUser.setStatus("ACTIVE");
            newUser.setCreatedAt(LocalDateTime.now());
            return userRepository.save(newUser);
        });

        // ✅ CORRECT TOKEN UTIL
        String token = TokenUtil.generateToken(String.valueOf(user.getId()));

        // ✅ LOGS (AFTER CREATION)
        System.out.println("👉 OTP Verified for: " + key);
        System.out.println("👉 User ID: " + user.getId());
        System.out.println("👉 Token Generated: " + token);

        return new ApiResponse<>(
                true,
                "Login Success",
                new AuthResponse(token, user.getPhone(), user.getEmail())
        );
    }

    private String normalize(String v) {

        if (v == null) {
            return null;
        }

        v = v.trim();

        if (v.isEmpty()) {
             return null;
        }

        return v;
    }

    private boolean isEmpty(String v) {
        return v == null || v.isEmpty();
    }
}