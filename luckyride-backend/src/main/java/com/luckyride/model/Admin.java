package com.luckyride.model;

import lombok.Data;
import jakarta.persistence.*;

@Entity
@Data
@Table(name="admins")
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;
    private String password;
}