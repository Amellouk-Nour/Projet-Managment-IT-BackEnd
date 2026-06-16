package com.gestionprojet.projet_management.controller;

import com.gestionprojet.projet_management.constant.ApiPaths;
import com.gestionprojet.projet_management.dto.TicketDTO;
import com.gestionprojet.projet_management.entity.Ticket;
import com.gestionprojet.projet_management.entity.TicketStatus;
import com.gestionprojet.projet_management.entity.Utilisateur;
import com.gestionprojet.projet_management.mapper.TicketMapper;
import com.gestionprojet.projet_management.repository.TicketRepository;
import com.gestionprojet.projet_management.specification.TicketSpecification;
import jakarta.validation.Valid;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping(ApiPaths.TICKETS)
public class TicketController {

    private final TicketRepository repo;
    private final TicketMapper mapper;

    public TicketController(TicketRepository repo, TicketMapper mapper) {
        this.repo = repo;
        this.mapper = mapper;
    }

    @GetMapping
    public ResponseEntity<List<TicketDTO>> getAllTickets(
            @RequestParam(required = false) String statut,
            @RequestParam(required = false) Integer priorite,
            @RequestParam(required = false) Integer assignedToId,
            @RequestParam(required = false) Integer userStoryId,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dueAtBefore,
            @RequestParam(required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate dueAtAfter,
            Authentication authentication) {

        Utilisateur currentUser = (Utilisateur) authentication.getPrincipal();
        boolean isAdmin = "Administrateur".equalsIgnoreCase(currentUser.getRole())
                       || "admin".equalsIgnoreCase(currentUser.getRole());

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

        List<TicketDTO> tickets = repo.findAll(spec).stream().map(mapper::toDto).toList();
        return ResponseEntity.ok(tickets);
    }

    @PostMapping
    public ResponseEntity<TicketDTO> createTicket(@Valid @RequestBody TicketDTO dto, Authentication authentication){
        Utilisateur currentUser = (Utilisateur) authentication.getPrincipal();
        Ticket ticket = mapper.toEntity(dto);
        ticket.setCreatedBy(currentUser);
        if (ticket.getAssignedTo() == null) {
            ticket.setAssignedTo(currentUser);
        }
        Ticket saved = repo.save(ticket);
        return ResponseEntity.status(HttpStatus.CREATED).body(mapper.toDto(saved));
    }

    @GetMapping("/{id}")
    public ResponseEntity<TicketDTO> getTicketById(@PathVariable Integer id){
        Optional<Ticket> ticket = repo.findById(id);
        if(ticket.isPresent()){
            return ResponseEntity.ok(mapper.toDto(ticket.get()));
        }
        else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<TicketDTO> updateTicket(@PathVariable Integer id, @Valid @RequestBody TicketDTO dto){
        Optional<Ticket> ticket = repo.findById(id);
        if(ticket.isPresent()){
            Ticket t = ticket.get();
            mapper.updateTicket(dto, t);
            Ticket saved = repo.save(t);
            return ResponseEntity.ok(mapper.toDto(saved));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PatchMapping(ApiPaths.TICKET_STATUS)
    public ResponseEntity<TicketDTO> updateStatus(@PathVariable Integer id, @RequestBody Map<String, String> body, Authentication authentication) {
        Optional<Ticket> ticket = repo.findById(id);
        if (ticket.isPresent()) {
            Ticket t = ticket.get();
            Utilisateur currentUser = (Utilisateur) authentication.getPrincipal();
            boolean isAdmin = "Administrateur".equalsIgnoreCase(currentUser.getRole())
                           || "admin".equalsIgnoreCase(currentUser.getRole());
            if (!isAdmin
                && (t.getCreatedBy() == null || !t.getCreatedBy().getId().equals(currentUser.getId()))
                && (t.getAssignedTo() == null || !t.getAssignedTo().getId().equals(currentUser.getId()))) {
                return ResponseEntity.status(HttpStatus.FORBIDDEN).build();
            }
            t.setStatut(TicketStatus.valueOf(body.get("statut")));
            Ticket saved = repo.save(t);
            return ResponseEntity.ok(mapper.toDto(saved));
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTicket(@PathVariable Integer id){
        Optional<Ticket> ticket = repo.findById(id);
        if(ticket.isPresent()) {
            repo.delete(ticket.get());
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }   
}

