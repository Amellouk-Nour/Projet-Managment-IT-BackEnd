package com.gestionprojet.projet_management.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;
import lombok.Data;

@Entity
@Data
public class UserStory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String titre;

    private String description;

    private String criteresAcceptation;

    private Integer priorite;

    private String statut;

    private LocalDateTime createdAt;

}
