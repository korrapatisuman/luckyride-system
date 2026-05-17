package com.luckyride.service.common;

import com.luckyride.model.User;
import com.luckyride.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    // ✅ SAVE USER
    public User saveUser(User user) {
        return userRepository.save(user);
    }

    // ✅ GET ALL USERS
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}