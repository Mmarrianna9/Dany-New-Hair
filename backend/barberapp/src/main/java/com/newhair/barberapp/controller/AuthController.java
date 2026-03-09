package com.newhair.barberapp.controller;

import com.newhair.barberapp.dto.JwtResponse;
import com.newhair.barberapp.dto.LoginRequest;
import com.newhair.barberapp.dto.SignupRequest;
import com.newhair.barberapp.model.Role;
import com.newhair.barberapp.model.User;
import com.newhair.barberapp.repository.UserRepository;
import com.newhair.barberapp.security.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth") // Nota: il prefisso /api è già gestito dal context-path nel properties
public class AuthController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder encoder;

    @Autowired
    private JwtUtils jwtUtils;

    // 1. REGISTRAZIONE
    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody SignupRequest signUpRequest) {
        System.out.println("--- Richiesta di registrazione ricevuta per: " + signUpRequest.getUsername());

        // Controlla se l'username esiste già
        if (userRepository.existsByUsername(signUpRequest.getUsername())) {
            return ResponseEntity.badRequest().body(Map.of("error", "Errore: Username già in uso!"));
        }

        // Crea un nuovo utente
        User user = new User();
        user.setUsername(signUpRequest.getUsername());
        user.setPassword(encoder.encode(signUpRequest.getPassword()));

        // Gestione Ruolo (Default: CUSTOMER)
        if (signUpRequest.getRole() != null && signUpRequest.getRole().equalsIgnoreCase("admin")) {
            user.setRole(Role.ROLE_ADMIN);
        } else {
            user.setRole(Role.ROLE_CUSTOMER);
        }

        userRepository.save(user);
        System.out.println("--- Utente salvato nel database con successo!");

        // Restituiamo un JSON invece di una stringa semplice per evitare errori in Insomnia
        return ResponseEntity.ok(Map.of("message", "Utente registrato con successo!"));
    }

    // 2. LOGIN
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        System.out.println("--- Tentativo di login per: " + loginRequest.getUsername());

        // Autenticazione Spring Security
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);
        
        // Generazione Token JWT
        String jwt = jwtUtils.generateJwtToken(loginRequest.getUsername());
        
        // Recupero dettagli utente
        User user = userRepository.findByUsername(loginRequest.getUsername())
                .orElseThrow(() -> new RuntimeException("Errore: Utente non trovato."));

        System.out.println("--- Login effettuato! Token generato.");

        return ResponseEntity.ok(new JwtResponse(jwt, user.getUsername(), user.getRole().name()));
    }
}