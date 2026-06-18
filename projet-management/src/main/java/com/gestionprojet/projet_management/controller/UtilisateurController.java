package com.gestionprojet.projet_management.controller;

import com.gestionprojet.projet_management.constant.ApiPaths;
import com.gestionprojet.projet_management.dto.UtilisateurDTO;
import com.gestionprojet.projet_management.service.UtilisateurService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(ApiPaths.UTILISATEURS)
public class UtilisateurController {

    private final UtilisateurService service;

    public UtilisateurController(UtilisateurService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<UtilisateurDTO>> getAllUtilisateurs() {
        return ResponseEntity.ok(service.getAllUtilisateurs());
    }

    @PostMapping
    public ResponseEntity<UtilisateurDTO> createUtilisateur(@Valid @RequestBody UtilisateurDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.createUtilisateur(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UtilisateurDTO> getUtilisateurById(@PathVariable Integer id) {
        return ResponseEntity.ok(service.getUtilisateurById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UtilisateurDTO> updateUtilisateur(@PathVariable Integer id, @Valid @RequestBody UtilisateurDTO dto) {
        return ResponseEntity.ok(service.updateUtilisateur(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUtilisateur(@PathVariable Integer id) {
        service.deleteUtilisateur(id);
        return ResponseEntity.noContent().build();
    }
}
