package com.gestionprojet.projet_management.repository;

import com.gestionprojet.projet_management.entity.Utilisateur;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UtilisateurRepository extends JpaRepository<Utilisateur, Integer> {
}
