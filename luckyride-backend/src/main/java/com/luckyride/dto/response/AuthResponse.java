package com.luckyride.dto.response;

public class AuthResponse {

    private String token;
    private String phone;
    private String email;

    public AuthResponse() {}

    public AuthResponse(String token, String phone, String email) {
        this.token = token;
        this.phone = phone;
        this.email = email;
    }

    public String getToken() {
        return token;
    }

    public String getPhone() {
        return phone;
    }

    public String getEmail() {
        return email;
    }
}