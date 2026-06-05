package com.gestionprojet.projet_management.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false)
    private String titre;

    private String description;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private TicketStatus statut;

    private Integer priorite;

    private BigDecimal estimDev;
    private BigDecimal estimReview;
    private BigDecimal estimTest;

    private BigDecimal tempsDev;
    private BigDecimal tempsReview;
    private BigDecimal tempsTest;

    private LocalDate dueAt;
    @Column(insertable = false, updatable = false)
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "user_story_id")
    private UserStory userStory;

    @ManyToOne
    @JoinColumn(name = "assigned_to")
    private Utilisateur assignedTo;

    @ManyToOne
    @JoinColumn(name = "created_by")
    private Utilisateur createdBy;

    public Integer getId() { return id; }
    public void setId(Integer id) { this.id = id; }
    public String getTitre() { return titre; }
    public void setTitre(String titre) { this.titre = titre; }
    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
    public TicketStatus getStatut() { return statut; }
    public void setStatut(TicketStatus statut) { this.statut = statut; }
    public Integer getPriorite() { return priorite; }
    public void setPriorite(Integer priorite) { this.priorite = priorite; }
    public BigDecimal getEstimDev() { return estimDev; }
    public void setEstimDev(BigDecimal estimDev) { this.estimDev = estimDev; }
    public BigDecimal getEstimReview() { return estimReview; }
    public void setEstimReview(BigDecimal estimReview) { this.estimReview = estimReview; }
    public BigDecimal getEstimTest() { return estimTest; }
    public void setEstimTest(BigDecimal estimTest) { this.estimTest = estimTest; }
    public BigDecimal getTempsDev() { return tempsDev; }
    public void setTempsDev(BigDecimal tempsDev) { this.tempsDev = tempsDev; }
    public BigDecimal getTempsReview() { return tempsReview; }
    public void setTempsReview(BigDecimal tempsReview) { this.tempsReview = tempsReview; }
    public BigDecimal getTempsTest() { return tempsTest; }
    public void setTempsTest(BigDecimal tempsTest) { this.tempsTest = tempsTest; }
    public LocalDate getDueAt() { return dueAt; }
    public void setDueAt(LocalDate dueAt) { this.dueAt = dueAt; }
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    public UserStory getUserStory() { return userStory; }
    public void setUserStory(UserStory userStory) { this.userStory = userStory; }
    public Utilisateur getAssignedTo() { return assignedTo; }
    public void setAssignedTo(Utilisateur assignedTo) { this.assignedTo = assignedTo; }
    public Utilisateur getCreatedBy() { return createdBy; }
    public void setCreatedBy(Utilisateur createdBy) { this.createdBy = createdBy; }
}
