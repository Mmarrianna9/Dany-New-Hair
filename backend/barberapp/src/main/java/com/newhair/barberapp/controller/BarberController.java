package com.newhair.barberapp.controller;

import com.newhair.barberapp.model.Barber;
import com.newhair.barberapp.model.BarberService;
import com.newhair.barberapp.repository.ServiceRepository;
import com.newhair.barberapp.repository.BarberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/barbers") // URL finale: /api/barbers/...
public class BarberController {

    @Autowired
    private BarberRepository barberRepository;


       @Autowired
       private ServiceRepository serviceRepository;
       
    // 1. LISTA BARBIERI (Accessibile a tutti)
    @GetMapping("/all")
    public List<Barber> getAllBarbers() {
        return barberRepository.findByActiveTrue();
    }

    // 2. AGGIUNGI BARBIERE (Solo ADMIN)
    @PostMapping("/add")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> addBarber(@RequestBody Barber barber) {
        barberRepository.save(barber);
        return ResponseEntity.ok("Barbiere aggiunto con successo!");
    }
@PostMapping("/{barberId}/assign-service/{serviceId}")
@PreAuthorize("hasRole('ADMIN')")
public ResponseEntity<?> assignServiceToBarber(@PathVariable Long barberId, @PathVariable Long serviceId) {
    Barber barber = barberRepository.findById(barberId)
            .orElseThrow(() -> new RuntimeException("Barbiere non trovato"));
    
    BarberService service = serviceRepository.findById(serviceId)
            .orElseThrow(() -> new RuntimeException("Servizio non trovato"));

    barber.getServices().add(service);
    barberRepository.save(barber);

    return ResponseEntity.ok("Servizio " + service.getName() + " assegnato a " + barber.getName());
}

}