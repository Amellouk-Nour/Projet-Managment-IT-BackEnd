package com.gestionprojet.projet_management.entity;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import lombok.Data;

@Entity
@Data
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

    @ManyToMany
    @JoinTable(
        name = "ticket_assignees",
        joinColumns = @JoinColumn(name = "ticket_id"),
        inverseJoinColumns = @JoinColumn(name = "user_id")
    )
    private Set<Utilisateur> assignees = new HashSet<>();

    @ManyToOne
    @JoinColumn(name = "created_by")
    private Utilisateur createdBy;

}
