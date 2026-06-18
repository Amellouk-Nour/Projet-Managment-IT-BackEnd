package com.gestionprojet.projet_management.service;

import com.gestionprojet.projet_management.dto.TicketDTO;
import com.gestionprojet.projet_management.entity.Ticket;
import com.gestionprojet.projet_management.entity.TicketStatus;
import com.gestionprojet.projet_management.entity.Utilisateur;
import com.gestionprojet.projet_management.mapper.TicketMapper;
import com.gestionprojet.projet_management.repository.TicketRepository;
import com.gestionprojet.projet_management.specification.TicketSpecification;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.util.HashSet;
import java.util.List;
import java.util.Map;

@Service
public class TicketService {

    private final TicketRepository repo;
    private final TicketMapper mapper;

    public TicketService(TicketRepository repo, TicketMapper mapper) {
        this.repo = repo;
        this.mapper = mapper;
    }

    public List<TicketDTO> getAllTickets(
            String statut, Integer priorite, Integer assignedToId,
            Integer userStoryId, LocalDate dueAtBefore, LocalDate dueAtAfter,
            Utilisateur currentUser) {

        boolean isAdmin = "Administrateur".equalsIgnoreCase(currentUser.getRole());

        Specification<Ticket> spec = Specification
                .where(TicketSpecification.hasStatut(statut))
                .and(TicketSpecification.hasPriorite(priorite))
                .and(TicketSpecification.hasAssignedToId(assignedToId))
                .and(TicketSpecification.hasUserStoryId(userStoryId))
                .and(TicketSpecification.dueAtBefore(dueAtBefore))
                .and(TicketSpecification.dueAtAfter(dueAtAfter));

        if (!isAdmin) {
            spec = spec.and(TicketSpecification.createdByOrAssignedTo(currentUser.getId()));
        }

        return repo.findAll(spec).stream().map(mapper::toDto).toList();
    }

    public TicketDTO createTicket(TicketDTO dto, Utilisateur currentUser) {
        Ticket ticket = mapper.toEntity(dto);
        ticket.setCreatedBy(currentUser);
        if (ticket.getAssignees() == null || ticket.getAssignees().isEmpty()) {
            ticket.setAssignees(new HashSet<>());
            ticket.getAssignees().add(currentUser);
        }
        Ticket saved = repo.save(ticket);
        return mapper.toDto(saved);
    }

    public TicketDTO getTicketById(Integer id) {
        Ticket ticket = repo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Ticket not found"));
        return mapper.toDto(ticket);
    }

    public TicketDTO updateTicket(Integer id, TicketDTO dto) {
        Ticket ticket = repo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Ticket not found"));
        mapper.updateTicket(dto, ticket);
        Ticket saved = repo.save(ticket);
        return mapper.toDto(saved);
    }

    public TicketDTO updateStatus(Integer id, String newStatus, Utilisateur currentUser) {
        Ticket ticket = repo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Ticket not found"));

        boolean isAdmin = "Administrateur".equalsIgnoreCase(currentUser.getRole());
        boolean isCreator = ticket.getCreatedBy() != null
                && ticket.getCreatedBy().getId().equals(currentUser.getId());
        boolean isAssignee = ticket.getAssignees() != null
                && ticket.getAssignees().stream().anyMatch(u -> u.getId().equals(currentUser.getId()));

        if (!isAdmin && !isCreator && !isAssignee) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Not authorized to update this ticket");
        }

        ticket.setStatut(TicketStatus.valueOf(newStatus));
        Ticket saved = repo.save(ticket);
        return mapper.toDto(saved);
    }

    public void deleteTicket(Integer id) {
        if (!repo.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Ticket not found");
        }
        repo.deleteById(id);
    }
}
