package com.gestionprojet.projet_management.mapper;

import com.gestionprojet.projet_management.dto.UtilisateurDTO;
import com.gestionprojet.projet_management.entity.Utilisateur;
import org.springframework.stereotype.Component;

@Component
public class UtilisateurMapper {
    public UtilisateurDTO toDto(Utilisateur utilisateur){
        UtilisateurDTO dto = new UtilisateurDTO();
        dto.setId(utilisateur.getId());
        dto.setRole(utilisateur.getRole());
        dto.setUsername(utilisateur.getUsername());
        dto.setEmail(utilisateur.getEmail());
        dto.setPassword(utilisateur.getPassword());
        return dto;
    }

    public Utilisateur toEntity(UtilisateurDTO dto){
        Utilisateur utilisateur = new Utilisateur();
        updateUtilisateur(dto,utilisateur);
        return utilisateur;
    }

    public void updateUtilisateur(UtilisateurDTO dto,Utilisateur utilisateur){
        utilisateur.setRole(dto.getRole());
        utilisateur.setUsername(dto.getUsername());
        utilisateur.setPassword(dto.getPassword());
        utilisateur.setEmail(dto.getEmail());
    }
}
