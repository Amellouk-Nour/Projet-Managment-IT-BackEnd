package com.gestionprojet.projet_management.controller;

import com.gestionprojet.projet_management.entity.Ticket;
import com.gestionprojet.projet_management.repository.TicketRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    private final TicketRepository repo;

    public TicketController(TicketRepository repo) {
        this.repo = repo;
    }

    @GetMapping
    public ResponseEntity<List<Ticket>> getAllTickets() {
        return ResponseEntity.ok(repo.findAll());
    }

    @PostMapping
    public ResponseEntity<Ticket> createTicket(@RequestBody Ticket ticket){
        Ticket ticket_created = repo.save(ticket);
        return ResponseEntity.status(HttpStatus.CREATED).body(ticket_created);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Ticket> getTicketById(@PathVariable Integer id){
        Optional<Ticket> ticket=repo.findById(id);
        if(ticket.isPresent()){
            return ResponseEntity.ok(ticket.get());
        }
        else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<Ticket> updateTicket(@PathVariable Integer id, @RequestBody Ticket ticketDetails){
        Optional<Ticket> ticket = repo.findById(id);
        if(ticket.isPresent()){
            Ticket t = ticket.get();
            t.setTitre(ticketDetails.getTitre());
            t.setDescription(ticketDetails.getDescription());
            t.setStatut(ticketDetails.getStatut());
            t.setPriorite(ticketDetails.getPriorite());
            t.setEstimDev(ticketDetails.getEstimDev());
            t.setEstimReview(ticketDetails.getEstimReview());
            t.setEstimTest(ticketDetails.getEstimTest());
            t.setTempsDev(ticketDetails.getTempsDev());
            t.setTempsReview(ticketDetails.getTempsReview());
            t.setTempsTest(ticketDetails.getTempsTest());
            t.setDueAt(ticketDetails.getDueAt());
            t.setUserStory(ticketDetails.getUserStory());
            t.setAssignedTo(ticketDetails.getAssignedTo());
            return ResponseEntity.ok(repo.save(t));
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

