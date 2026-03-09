package com.luckyride.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.luckyride.model.Role;

public interface RoleRepository extends JpaRepository<Role, Long> {
}
