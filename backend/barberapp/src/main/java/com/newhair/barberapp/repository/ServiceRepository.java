package com.newhair.barberapp.repository;
import com.newhair.barberapp.model.BarberService;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ServiceRepository  extends 
JpaRepository<BarberService, Long>{

}
