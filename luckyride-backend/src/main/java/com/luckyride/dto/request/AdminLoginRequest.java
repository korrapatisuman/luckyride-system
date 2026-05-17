package com.luckyride.dto.request;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class AdminLoginRequest {

    private String email;
    private String password;

}
