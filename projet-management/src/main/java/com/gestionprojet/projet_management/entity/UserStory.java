package com.gestionprojet.projet_management.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
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

    @ManyToOne
    @JoinColumn(name = "project_id")
    private Projet projet;

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public String getTitre() { return titre; }
    public void setTitre(String titre) { this.titre = titre; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public String getCriteresAcceptation() { return criteresAcceptation; }
    public void setCriteresAcceptation(String criteresAcceptation) { this.criteresAcceptation = criteresAcceptation; }
    public Integer getPriorite() { return priorite; }
    public void setPriorite(Integer priorite) { this.priorite = priorite; }
    public String getStatut() { return statut; }
    public void setStatut(String statut) { this.statut = statut; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public Projet getProjet() { return projet; }
    public void setProjet(Projet projet) { this.projet = projet; }
}
