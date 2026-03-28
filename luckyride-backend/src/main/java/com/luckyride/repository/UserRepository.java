package com.luckyride.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import com.luckyride.model.User;

import java.util.Optional;
import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    // ✅ Find user by phone
    Optional<User> findByPhone(String phone);

    // ✅ Find user by email
    Optional<User> findByEmail(String email);

    // ✅ 🔥 ADD THIS (REQUIRED FIX)
    Optional<User> findByPhoneOrEmail(String phone, String email);

    // ✅ Get users by status
    List<User> findByStatus(String status);
}