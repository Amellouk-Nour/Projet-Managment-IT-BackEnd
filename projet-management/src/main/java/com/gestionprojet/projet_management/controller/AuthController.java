package com.gestionprojet.projet_management.controller;

import com.gestionprojet.projet_management.constant.ApiPaths;
import com.gestionprojet.projet_management.dto.AuthRequest;
import com.gestionprojet.projet_management.dto.AuthResponse;
import com.gestionprojet.projet_management.dto.UtilisateurDTO;
import com.gestionprojet.projet_management.entity.Utilisateur;
import com.gestionprojet.projet_management.config.JwtService;
import com.gestionprojet.projet_management.mapper.UtilisateurMapper;
import com.gestionprojet.projet_management.repository.UtilisateurRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

@RestController
@RequestMapping(ApiPaths.AUTH)
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final UtilisateurRepository utilisateurRepository;
    private final UtilisateurMapper mapper;
    private final PasswordEncoder passwordEncoder;

    public AuthController(AuthenticationManager authenticationManager, JwtService jwtService,
                          UtilisateurRepository utilisateurRepository, UtilisateurMapper mapper,
                          PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.utilisateurRepository = utilisateurRepository;
        this.mapper = mapper;
        this.passwordEncoder = passwordEncoder;
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@Valid @RequestBody AuthRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.getUsername(), request.getPassword()));
        Utilisateur user = utilisateurRepository.findByUsername(request.getUsername()).orElseThrow();
        String token = jwtService.generateToken(user.getId(), user.getUsername(), user.getRole());
        return ResponseEntity.ok(new AuthResponse(token));
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@Valid @RequestBody UtilisateurDTO dto) {
        if (utilisateurRepository.findByUsername(dto.getUsername()).isPresent()) {
            return ResponseEntity.status(HttpStatus.CONFLICT).build();
        }
        Utilisateur utilisateur = mapper.toEntity(dto);
        utilisateur.setPassword(passwordEncoder.encode(dto.getPassword()));
        utilisateur.setCreatedAt(LocalDateTime.now());
        utilisateurRepository.save(utilisateur);
        String token = jwtService.generateToken(utilisateur.getId(), utilisateur.getUsername(), utilisateur.getRole());
        return ResponseEntity.status(HttpStatus.CREATED).body(new AuthResponse(token));
    }
}
