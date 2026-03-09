package com.newhair.barberapp.controller;

import com.newhair.barberapp.dto.AppointmentRequest;
import com.newhair.barberapp.model.*;
import com.newhair.barberapp.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/appointments")
public class AppointmentController {

    @Autowired
    private AppointmentRepository appointmentRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BarberRepository barberRepository;
    @Autowired
    private ServiceRepository serviceRepository;

    // 1. PRENOTAZIONE (Migliorata con riepilogo dettagliato)
    @PostMapping("/book")
    public ResponseEntity<?> bookAppointment(@RequestBody AppointmentRequest request, Principal principal) {
        
        // Verifica disponibilità
        if (appointmentRepository.existsByBarberIdAndAppointmentTime(request.getBarberId(), request.getAppointmentTime())) {
            return ResponseEntity.badRequest().body("Errore: Il barbiere è già occupato a quell'ora!");
        }

        // Recupero dati con gestione errore "non trovato"
        User user = userRepository.findByUsername(principal.getName())
                .orElseThrow(() -> new RuntimeException("Utente non trovato"));
        
        Barber barber = barberRepository.findById(request.getBarberId())
                .orElseThrow(() -> new RuntimeException("Barbiere non trovato"));
        
        BarberService service = serviceRepository.findById(request.getServiceId())
                .orElseThrow(() -> new RuntimeException("Servizio non trovato"));

        // Creazione appuntamento
        Appointment appointment = new Appointment();
        appointment.setUser(user);
        appointment.setBarber(barber);
        appointment.setService(service);
        appointment.setAppointmentTime(request.getAppointmentTime());
        appointment.setStatus("CONFIRMED"); // Impostiamo uno stato predefinito
        
        appointmentRepository.save(appointment);

        // Risposta professionale con riepilogo
        String responseMessage = String.format(
            "Prenotazione confermata! Barber: %s, Servizio: %s, Prezzo: %.2f€, Data: %s",
            barber.getName(), service.getName(), service.getPrice(), request.getAppointmentTime()
        );

        return ResponseEntity.ok(responseMessage);
    }

    // 2. VEDI I MIEI APPUNTAMENTI (Per il cliente loggato)
    @GetMapping("/my")
    public List<Appointment> getMyAppointments(Principal principal) {
        User user = userRepository.findByUsername(principal.getName())
                .orElseThrow(() -> new RuntimeException("Utente non trovato"));
        return appointmentRepository.findByUserId(user.getId());
    }

    // 3. CANCELLA UN APPUNTAMENTO (Solo se è il proprio)
    @DeleteMapping("/cancel/{id}")
    public ResponseEntity<?> cancelAppointment(@PathVariable Long id, Principal principal) {
        Appointment appointment = appointmentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Appuntamento non trovato"));

        // Controllo di sicurezza: l'utente può cancellare solo i propri appuntamenti
        if (!appointment.getUser().getUsername().equals(principal.getName())) {
            return ResponseEntity.status(403).body("Non sei autorizzato a cancellare questa prenotazione");
        }

        appointmentRepository.delete(appointment);
        return ResponseEntity.ok("Appuntamento rimosso con successo dal sistema.");
    }
}