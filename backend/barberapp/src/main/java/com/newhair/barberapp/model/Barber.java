package com.newhair.barberapp.model;

import java.util.List;
import java.util.ArrayList;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "barbers")
@Data
public class Barber {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String specialization; // Es: "Taglio Classico", "Barba & Trattamenti"

    private String photoUrl; // Per caricare l'immagine del barbiere in futuro

    private boolean active = true;

    @ManyToMany(fetch = FetchType.EAGER)
@JoinTable(
    name = "barber_services_mapping", // Nome della tabella di collegamento nel DB
    joinColumns = @JoinColumn(name = "barber_id"),
    inverseJoinColumns = @JoinColumn(name = "service_id")
)
private List<BarberService> services = new ArrayList<>();

}
