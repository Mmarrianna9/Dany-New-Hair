package com.newhair.barberapp.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class JwtResponse {
    
    private String token;
    private String type = "Bearer";
    private String username;
    private String role;

    // Costruttore rapido (opzionale, se non vuoi passare sempre "Bearer")
    public JwtResponse(String accessToken, String username, String role) {
        this.token = accessToken;
        this.username = username;
        this.role = role;
    }

}
