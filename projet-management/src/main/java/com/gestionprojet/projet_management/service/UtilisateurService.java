package com.gestionprojet.projet_management.service;

import com.gestionprojet.projet_management.dto.UtilisateurDTO;
import com.gestionprojet.projet_management.entity.Utilisateur;
import com.gestionprojet.projet_management.mapper.UtilisateurMapper;
import com.gestionprojet.projet_management.repository.UtilisateurRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class UtilisateurService {

    private final UtilisateurRepository repo;
    private final UtilisateurMapper mapper;

    public UtilisateurService(UtilisateurRepository repo, UtilisateurMapper mapper) {
        this.repo = repo;
        this.mapper = mapper;
    }

    public List<UtilisateurDTO> getAllUtilisateurs() {
        return repo.findAll().stream().map(mapper::toDto).toList();
    }

    public UtilisateurDTO createUtilisateur(UtilisateurDTO dto) {
        Utilisateur entity = mapper.toEntity(dto);
        Utilisateur saved = repo.save(entity);
        return mapper.toDto(saved);
    }

    public UtilisateurDTO getUtilisateurById(Integer id) {
        Utilisateur entity = repo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Utilisateur not found"));
        return mapper.toDto(entity);
    }

    public UtilisateurDTO updateUtilisateur(Integer id, UtilisateurDTO dto) {
        Utilisateur entity = repo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Utilisateur not found"));
        mapper.updateUtilisateur(dto, entity);
        Utilisateur saved = repo.save(entity);
        return mapper.toDto(saved);
    }

    public void deleteUtilisateur(Integer id) {
        if (!repo.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Utilisateur not found");
        }
        repo.deleteById(id);
    }
}
