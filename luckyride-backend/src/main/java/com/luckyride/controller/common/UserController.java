package com.luckyride.controller.common;

import com.luckyride.model.User;
import com.luckyride.service.common.UserService;
import com.luckyride.dto.response.ApiResponse;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin("*")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // 🔐 GET ALL USERS (INTERNAL / ADMIN)
    @GetMapping("/users")
    public ApiResponse<List<User>> getAllUsers() {

        List<User> users = userService.getAllUsers();

        return new ApiResponse<>(
                true,
                "Users fetched successfully",
                users
        );
    }

    // 🔐 ADD USER (OPTIONAL)
    @PostMapping("/users")
    public ApiResponse<User> addUser(@RequestBody User user) {

        User saved = userService.saveUser(user);

        return new ApiResponse<>(
                true,
                "User created",
                saved
        );
    }
}