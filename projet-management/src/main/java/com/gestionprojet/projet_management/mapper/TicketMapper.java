package com.gestionprojet.projet_management.mapper;

import com.gestionprojet.projet_management.dto.TicketDTO;
import com.gestionprojet.projet_management.entity.Ticket;
import com.gestionprojet.projet_management.entity.TicketStatus;
import org.springframework.stereotype.Component;

@Component
public class TicketMapper {
    public TicketDTO toDto(Ticket ticket){
        TicketDTO dto = new TicketDTO();
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
        return dto;
    }

    public Ticket toEntity(TicketDTO dto){
        Ticket ticket = new Ticket();
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
    }
}
