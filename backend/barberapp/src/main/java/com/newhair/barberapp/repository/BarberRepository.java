package com.newhair.barberapp.repository;

import com.newhair.barberapp.model.Barber;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BarberRepository extends JpaRepository<Barber, Long> {
    // Possiamo aggiungere metodi personalizzati, ad esempio:
    List<Barber> findByActiveTrue();
}
