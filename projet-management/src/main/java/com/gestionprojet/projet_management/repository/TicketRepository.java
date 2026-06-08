package com.gestionprojet.projet_management.repository;

import com.gestionprojet.projet_management.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TicketRepository extends JpaRepository<Ticket, Integer> {
}
