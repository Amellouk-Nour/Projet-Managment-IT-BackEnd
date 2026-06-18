package com.gestionprojet.projet_management.controller;

import com.gestionprojet.projet_management.constant.ApiPaths;
import com.gestionprojet.projet_management.dto.TicketDTO;
import com.gestionprojet.projet_management.entity.Utilisateur;
import com.gestionprojet.projet_management.service.TicketService;
import jakarta.validation.Valid;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping(ApiPaths.TICKETS)
public class TicketController {

    private final TicketService service;

    public TicketController(TicketService service) {
        this.service = service;
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
        List<TicketDTO> tickets = service.getAllTickets(statut, priorite, assignedToId, userStoryId, dueAtBefore, dueAtAfter, currentUser);
        return ResponseEntity.ok(tickets);
    }

    @PostMapping
    public ResponseEntity<TicketDTO> createTicket(@Valid @RequestBody TicketDTO dto, Authentication authentication) {
        Utilisateur currentUser = (Utilisateur) authentication.getPrincipal();
        TicketDTO created = service.createTicket(dto, currentUser);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @GetMapping("/{id}")
    public ResponseEntity<TicketDTO> getTicketById(@PathVariable Integer id) {
        return ResponseEntity.ok(service.getTicketById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<TicketDTO> updateTicket(@PathVariable Integer id, @Valid @RequestBody TicketDTO dto) {
        return ResponseEntity.ok(service.updateTicket(id, dto));
    }

    @PatchMapping(ApiPaths.TICKET_STATUS)
    public ResponseEntity<TicketDTO> updateStatus(@PathVariable Integer id, @RequestBody Map<String, String> body, Authentication authentication) {
        Utilisateur currentUser = (Utilisateur) authentication.getPrincipal();
        return ResponseEntity.ok(service.updateStatus(id, body.get("statut"), currentUser));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTicket(@PathVariable Integer id) {
        service.deleteTicket(id);
        return ResponseEntity.noContent().build();
    }
}
