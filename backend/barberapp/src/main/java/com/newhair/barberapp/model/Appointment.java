package com.newhair.barberapp.model;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;

@Entity
@Table(name = "appointments")
@Data
public class Appointment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user; // Chi prenota

    @ManyToOne
    @JoinColumn(name = "barber_id", nullable = false)
    private Barber barber; // Con chi prenota

    @ManyToOne
    @JoinColumn(name = "service_id", nullable = false)
    private BarberService service; // Che servizio sceglie

    @Column(nullable = false)
    private LocalDateTime appointmentTime; // Data e ora

    private String status = "PENDING"; // PENDING, CONFIRMED, CANCELLED
}


