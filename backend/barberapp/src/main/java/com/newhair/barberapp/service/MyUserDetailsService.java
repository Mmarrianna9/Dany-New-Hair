package com.newhair.barberapp.service;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.newhair.barberapp.model.User;
import com.newhair.barberapp.repository.UserRepository;

@Service
public class MyUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // 1. Cerchiamo l'utente nel DB usando la repository che abbiamo creato prima
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Utente non trovato con username: " + username));

        // 2. Convertiamo il nostro "User" nel formato "UserDetails" che Spring Security capisce
        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                // Trasformiamo la nostra Enum Role in una "Authority" di Spring
                Collections.singletonList(new SimpleGrantedAuthority(user.getRole().name()))
        );
    }

}
