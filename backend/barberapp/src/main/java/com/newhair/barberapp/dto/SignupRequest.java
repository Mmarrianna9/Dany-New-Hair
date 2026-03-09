package com.newhair.barberapp.dto;

import lombok.Data;


@Data
public class SignupRequest {
    private String username;
    private String password;
    // Possiamo aggiungere altri campi qui, come email o telefono
    private String role;
}
