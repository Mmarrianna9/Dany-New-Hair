package com.newhair.barberapp.model;

import jakarta.persistence.*;
import lombok.Data;
/* import java.math.BigDecimal; */

@Entity
@Table(name = "services")
@Data
public class BarberService {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name; // Es: "Taglio Capelli", "Modellatura Barba"

    private String description; // Es: "Taglio a forbice o macchinetta con shampoo incluso"

    @Column(nullable = false)
    private Double price; // Usiamo Double o BigDecimal per i prezzi

    private Integer durationMinutes; // Es: 30, 45, 60 minuti
}

