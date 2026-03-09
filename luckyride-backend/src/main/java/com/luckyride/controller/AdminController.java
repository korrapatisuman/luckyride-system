package com.luckyride.controller;

import com.luckyride.model.Admin;
import com.luckyride.model.AdminLoginRequest;
import com.luckyride.repository.AdminRepository;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/admin")
@CrossOrigin("*")
public class AdminController {

    private final AdminRepository adminRepository;

    public AdminController(AdminRepository adminRepository) {
        this.adminRepository = adminRepository;
    }

    @PostMapping("/login")
    public String login(@RequestBody AdminLoginRequest request) {

        Optional<Admin> admin = adminRepository.findByEmail(request.getEmail());

        if (admin.isPresent() && admin.get().getPassword().equals(request.getPassword())) {
            return "Admin Login Successful";
        }

        return "Invalid Email or Password";
    }
}
