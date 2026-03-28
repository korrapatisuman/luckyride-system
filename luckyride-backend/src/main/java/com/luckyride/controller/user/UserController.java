package com.luckyride.controller;

import com.luckyride.model.User;
import com.luckyride.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // ✅ GET ALL USERS
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }

    // ✅ ADD USER (optional)
    @PostMapping
    public User addUser(@RequestBody User user) {
        return userService.saveUser(user);
    }
}