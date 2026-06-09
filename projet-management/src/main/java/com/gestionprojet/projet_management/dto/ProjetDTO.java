package com.gestionprojet.projet_management.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ProjetDTO {
    @NotBlank
    private String nom;
    private String description;
}
