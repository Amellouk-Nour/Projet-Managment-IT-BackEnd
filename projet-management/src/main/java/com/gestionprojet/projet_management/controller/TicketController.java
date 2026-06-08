package com.gestionprojet.projet_management.controller;

import com.gestionprojet.projet_management.constant.ApiPaths;
import com.gestionprojet.projet_management.dto.TicketDTO;
import com.gestionprojet.projet_management.entity.Ticket;
import com.gestionprojet.projet_management.mapper.TicketMapper;
import com.gestionprojet.projet_management.repository.TicketRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
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
    public ResponseEntity<List<TicketDTO>> getAllTickets() {
        List<TicketDTO> tickets = repo.findAll().stream().map(mapper::toDto).toList();
        return ResponseEntity.ok(tickets);
    }

    @PostMapping
    public ResponseEntity<TicketDTO> createTicket(@RequestBody TicketDTO dto){
        Ticket ticket = mapper.toEntity(dto);
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
    public ResponseEntity<TicketDTO> updateTicket(@PathVariable Integer id, @RequestBody TicketDTO dto){
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

