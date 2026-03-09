package com.newhair.barberapp.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.newhair.barberapp.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    // Questo metodo ti servirà per il Login:
    // Cerca un utente nel database tramite il suo username
    Optional<User> findByUsername(String username);

    // Utile per verificare se un username è già preso durante la registrazione
    Boolean existsByUsername(String username);

}
