package com.luckyride.model;

import lombok.Data;

@Data
public class OtpVerifyRequest {

    private String phone;
    private String email;
    private String otp;
}
