package com.gestionprojet.projet_management.repository;

import com.gestionprojet.projet_management.entity.Projet;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjetRepository extends JpaRepository<Projet, Integer> {
}
