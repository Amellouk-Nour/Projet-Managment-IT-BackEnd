package com.gestionprojet.projet_management.mapper;

import com.gestionprojet.projet_management.dto.TicketDTO;
import com.gestionprojet.projet_management.entity.Ticket;
import com.gestionprojet.projet_management.entity.TicketStatus;
import com.gestionprojet.projet_management.entity.Utilisateur;
import com.gestionprojet.projet_management.repository.UserStoryRepository;
import com.gestionprojet.projet_management.repository.UtilisateurRepository;
import org.springframework.stereotype.Component;
import java.util.stream.Collectors;

@Component
public class TicketMapper {

    private final UtilisateurRepository utilisateurRepo;
    private final UserStoryRepository userStoryRepo;

    public TicketMapper(UtilisateurRepository utilisateurRepo, UserStoryRepository userStoryRepo) {
        this.utilisateurRepo = utilisateurRepo;
        this.userStoryRepo = userStoryRepo;
    }

    public TicketDTO toDto(Ticket ticket){
        TicketDTO dto = new TicketDTO();
        dto.setId(ticket.getId());
        dto.setTitre(ticket.getTitre());
        dto.setDescription(ticket.getDescription());
        dto.setStatut(ticket.getStatut() != null ? ticket.getStatut().name() : null);
        dto.setPriorite(ticket.getPriorite());
        dto.setEstimDev(ticket.getEstimDev());
        dto.setEstimReview(ticket.getEstimReview());
        dto.setEstimTest(ticket.getEstimTest());
        dto.setTempsDev(ticket.getTempsDev());
        dto.setTempsReview(ticket.getTempsReview());
        dto.setTempsTest(ticket.getTempsTest());
        dto.setDueAt(ticket.getDueAt());
        dto.setAssigneeIds(ticket.getAssignees().stream().map(Utilisateur::getId).collect(Collectors.toSet()));
        dto.setAssigneeUsernames(ticket.getAssignees().stream().map(Utilisateur::getUsername).collect(Collectors.toSet()));
        dto.setUserStoryId(ticket.getUserStory() != null ? ticket.getUserStory().getId() : null);
        dto.setUserStoryTitre(ticket.getUserStory() != null ? ticket.getUserStory().getTitre() : null);
        return dto;
    }

    public Ticket toEntity(TicketDTO dto){
        Ticket ticket = new Ticket();
        if (dto.getAssigneeIds() != null) {
            ticket.setAssignees(dto.getAssigneeIds().stream()
                .map(id -> utilisateurRepo.findById(id).orElse(null))
                .filter(java.util.Objects::nonNull)
                .collect(Collectors.toSet()));
        }
        if (dto.getUserStoryId() != null) {
            ticket.setUserStory(userStoryRepo.findById(dto.getUserStoryId()).orElse(null));
        }
        updateTicket(dto,ticket);
        return ticket;
    }

    public void updateTicket(TicketDTO dto,Ticket ticket){
        ticket.setTitre(dto.getTitre());
        ticket.setDescription(dto.getDescription());
        if (dto.getStatut() != null) {
            ticket.setStatut(TicketStatus.valueOf(dto.getStatut()));
        }
        ticket.setPriorite(dto.getPriorite());
        ticket.setEstimDev(dto.getEstimDev());
        ticket.setEstimReview(dto.getEstimReview());
        ticket.setEstimTest(dto.getEstimTest());
        ticket.setTempsDev(dto.getTempsDev());
        ticket.setTempsReview(dto.getTempsReview());
        ticket.setTempsTest(dto.getTempsTest());
        ticket.setDueAt(dto.getDueAt());
        if (dto.getAssigneeIds() != null) {
            ticket.setAssignees(dto.getAssigneeIds().stream()
                .map(id -> utilisateurRepo.findById(id).orElse(null))
                .filter(java.util.Objects::nonNull)
                .collect(Collectors.toSet()));
        }
        ticket.setUserStory(dto.getUserStoryId() != null
                ? userStoryRepo.findById(dto.getUserStoryId()).orElse(null)
                : null);
    }
}
