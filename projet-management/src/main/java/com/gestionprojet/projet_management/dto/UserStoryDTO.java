package com.gestionprojet.projet_management.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

@Data
public class UserStoryDTO {
    private Integer id;
    @NotBlank
    private String titre;
    private String description;
    private String criteresAcceptation;
    @NotNull @Positive
    private Integer priorite;
    @NotBlank
    private String statut;
}
