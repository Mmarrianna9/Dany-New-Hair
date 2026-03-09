package com.newhair.barberapp.controller;
import com.newhair.barberapp.model.BarberService;
import com.newhair.barberapp.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/services") // URL: /api/services/...
public class ServiceController {

    @Autowired
    private ServiceRepository serviceRepository;

    // 1. LISTA SERVIZI (Pubblica)
    @GetMapping("/all")
    public List<BarberService> getAllServices() {
        return serviceRepository.findAll();
    }

    // 2. AGGIUNGI SERVIZIO (Solo ADMIN)
    @PostMapping("/add")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<?> addService(@RequestBody BarberService barberService) {
        serviceRepository.save(barberService);
        return ResponseEntity.ok("Servizio aggiunto con successo!");
    }

}
