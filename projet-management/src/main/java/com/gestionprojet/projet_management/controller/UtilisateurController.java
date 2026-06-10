package com.gestionprojet.projet_management.controller;

import com.gestionprojet.projet_management.constant.ApiPaths;
import com.gestionprojet.projet_management.dto.UtilisateurDTO;
import com.gestionprojet.projet_management.entity.Utilisateur;
import com.gestionprojet.projet_management.mapper.UtilisateurMapper;
import com.gestionprojet.projet_management.repository.UtilisateurRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(ApiPaths.UTILISATEURS)
public class UtilisateurController {

    private final UtilisateurRepository repo;
    private final UtilisateurMapper mapper;

    public UtilisateurController(UtilisateurRepository repo, UtilisateurMapper mapper) {
        this.repo = repo;
        this.mapper = mapper;
    }

    @GetMapping
    public ResponseEntity<List<UtilisateurDTO>> getAllUtilisateurs() {
        List<UtilisateurDTO> utilisateurs = repo.findAll().stream().map(mapper::toDto).toList();
        return ResponseEntity.ok(utilisateurs);
    }

    @PostMapping
    public ResponseEntity<UtilisateurDTO> createUtilisateur(@Valid @RequestBody UtilisateurDTO dto){
        Utilisateur utilisateur = mapper.toEntity(dto);
        Utilisateur saved = repo.save(utilisateur);
        return ResponseEntity.status(HttpStatus.CREATED).body(mapper.toDto(saved));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UtilisateurDTO> getUtilisateurById(@PathVariable Integer id){
        Optional<Utilisateur> utilisateur = repo.findById(id);
        if(utilisateur.isPresent()){
            return ResponseEntity.ok(mapper.toDto(utilisateur.get()));
        }
        else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<UtilisateurDTO> updateUtilisateur(@PathVariable Integer id, @Valid @RequestBody UtilisateurDTO dto){
        Optional<Utilisateur> utilisateur = repo.findById(id);
        if(utilisateur.isPresent()){
            Utilisateur u = utilisateur.get();
            mapper.updateUtilisateur(dto,u);
            Utilisateur saved = repo.save(u);
            return ResponseEntity.ok(mapper.toDto(saved));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUtilisateur(@PathVariable Integer id){
        Optional<Utilisateur> utilisateur = repo.findById(id);
        if(utilisateur.isPresent()) {
            repo.delete(utilisateur.get());
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}



