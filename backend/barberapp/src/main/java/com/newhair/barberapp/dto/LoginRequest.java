package com.newhair.barberapp.dto;

import lombok.Data;

@Data // Genera Getter e Setter automaticamente
public class LoginRequest {
    private String username;
    private String password;
}

