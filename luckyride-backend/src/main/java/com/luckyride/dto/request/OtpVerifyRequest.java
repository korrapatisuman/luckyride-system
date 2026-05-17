package com.luckyride.dto.request;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class OtpVerifyRequest {

    private String phone;
    private String email;
    private String otp;
}
