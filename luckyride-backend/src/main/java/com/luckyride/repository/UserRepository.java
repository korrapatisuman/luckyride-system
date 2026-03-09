package com.luckyride.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.luckyride.model.User;

public interface UserRepository extends JpaRepository<User, Long> {

    User findByPhone(String phone);
}
