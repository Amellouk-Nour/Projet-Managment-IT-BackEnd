package com.gestionprojet.projet_management.dto;

import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDate;

@Data
public class TicketDTO {
    private String titre;
    private String description;
    private String statut;
    private Integer priorite;
    private BigDecimal estimDev;
    private BigDecimal estimReview;
    private BigDecimal estimTest;
    private BigDecimal tempsDev;
    private BigDecimal tempsReview;
    private BigDecimal tempsTest;
    private LocalDate dueAt;
}