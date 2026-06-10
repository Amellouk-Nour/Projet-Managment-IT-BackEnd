package com.gestionprojet.projet_management.controller;

import com.gestionprojet.projet_management.constant.ApiPaths;
import com.gestionprojet.projet_management.dto.ProjetDTO;
import com.gestionprojet.projet_management.entity.Projet;
import com.gestionprojet.projet_management.mapper.ProjetMapper;
import com.gestionprojet.projet_management.repository.ProjetRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(ApiPaths.PROJETS)
public class ProjetController {

    private final ProjetRepository repo;
    private final ProjetMapper mapper;

    public ProjetController(ProjetRepository repo, ProjetMapper mapper) {
        this.repo = repo;
        this.mapper = mapper;
    }

    @GetMapping
    public ResponseEntity<List<ProjetDTO>> getAllProjets() {
        List<ProjetDTO> projets = repo.findAll().stream().map(mapper::toDto).toList();
        return ResponseEntity.ok(projets);
    }

    @PostMapping
    public ResponseEntity<ProjetDTO> createProjet(@Valid @RequestBody ProjetDTO dto){
        Projet projet = mapper.toEntity(dto);
        Projet saved = repo.save(projet);
        return ResponseEntity.status(HttpStatus.CREATED).body(mapper.toDto(saved));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProjetDTO> getProjetById(@PathVariable Integer id){
        Optional<Projet> projet = repo.findById(id);
        if(projet.isPresent()){
            return ResponseEntity.ok(mapper.toDto(projet.get()));
        }
        else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProjetDTO> updateProjet(@PathVariable Integer id, @Valid @RequestBody ProjetDTO dto){
        Optional<Projet> projet = repo.findById(id);
        if(projet.isPresent()){
            Projet p = projet.get();
            mapper.updateProjet(dto, p);
            Projet saved = repo.save(p);
            return ResponseEntity.ok(mapper.toDto(saved));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProjet(@PathVariable Integer id){
        Optional<Projet> projet = repo.findById(id);
        if(projet.isPresent()) {
            repo.delete(projet.get());
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}
