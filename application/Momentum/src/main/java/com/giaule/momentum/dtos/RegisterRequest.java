package com.giaule.momentum.dtos;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class RegisterRequest {
    @NotBlank(message = "Username must not be empty")
    private String username;

    @NotBlank(message = "Password must not be empty")
    private String password;

    @NotBlank(message = "Please confirm your password")
    private String passwordConfirmation;
}
