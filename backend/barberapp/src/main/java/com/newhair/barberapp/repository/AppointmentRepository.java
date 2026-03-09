package com.newhair.barberapp.repository;
import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.newhair.barberapp.model.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    // Trova prenotazioni di un barbiere in un orario specifico
    boolean existsByBarberIdAndAppointmentTime(Long barberId, LocalDateTime time);
    
    // Lista prenotazioni per un utente specifico
    List<Appointment> findByUserId(Long userId);
}
