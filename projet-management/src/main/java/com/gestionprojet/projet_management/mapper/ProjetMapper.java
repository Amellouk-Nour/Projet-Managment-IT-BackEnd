package com.gestionprojet.projet_management.mapper;

import com.gestionprojet.projet_management.dto.ProjetDTO;
import com.gestionprojet.projet_management.entity.Projet;
import org.springframework.stereotype.Component;

@Component
public class ProjetMapper {
    public ProjetDTO toDto(Projet projet){
        ProjetDTO dto = new ProjetDTO();
        dto.setNom(projet.getNom());
        dto.setDescription(projet.getDescription());
        return dto;
    }

    public Projet toEntity(ProjetDTO dto){
        Projet projet = new Projet();
        updateProjet(dto, projet);
        return projet;
    }

    public void updateProjet(ProjetDTO dto, Projet projet){
        projet.setNom(dto.getNom());
        projet.setDescription(dto.getDescription());
    }
}
