package com.luckyride.model;

import jakarta.persistence.*;

import java.time.LocalDateTime;
import lombok.Data;
import lombok.*;

@Getter
@Setter
@Entity
@Table(name = "users")
@Data
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // ✅ BASIC
    private String firstName;
    private String lastName;

    @Column(unique = true)
    private String phone;

    private String email;

    // 🔐 OPTIONAL (if using password login later)
    private String password;

    // ✅ ROLE
    @ManyToOne
    @JoinColumn(name = "role_id")
    private Role role;

    // ✅ STATUS
    private String status = "ACTIVE";

    // ✅ TIME
    private LocalDateTime createdAt;
}