package com.gestionprojet.projet_management.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Set;

@Data
public class TicketDTO {
    @NotBlank
    private String titre;
    private String description;
    @NotBlank
    private String statut;
    @NotNull @Positive
    private Integer priorite;
    @Positive
    private BigDecimal estimDev;
    @Positive
    private BigDecimal estimReview;
    @Positive
    private BigDecimal estimTest;
    @Positive
    private BigDecimal tempsDev;
    @Positive
    private BigDecimal tempsReview;
    @Positive
    private BigDecimal tempsTest;
    private LocalDate dueAt;
    private Integer id;
    private Set<Integer> assigneeIds;
    private Set<String> assigneeUsernames;
    private Integer userStoryId;
    private String userStoryTitre;

}