package com.gestionprojet.projet_management.specification;

import com.gestionprojet.projet_management.entity.Ticket;
import com.gestionprojet.projet_management.entity.TicketStatus;
import jakarta.persistence.criteria.Join;
import org.springframework.data.jpa.domain.Specification;

import java.time.LocalDate;

public class TicketSpecification {

    public static Specification<Ticket> hasStatut(String statut) {
        return (root, query, cb) -> {
            if (statut == null || statut.isBlank()) return null;
            return cb.equal(root.get("statut"), TicketStatus.valueOf(statut));
        };
    }

    public static Specification<Ticket> hasPriorite(Integer priorite) {
        return (root, query, cb) -> {
            if (priorite == null) return null;
            return cb.equal(root.get("priorite"), priorite);
        };
    }

    public static Specification<Ticket> hasAssignedToId(Integer assignedToId) {
        return (root, query, cb) -> {
            if (assignedToId == null) return null;
            Join<Object, Object> assignedTo = root.join("assignedTo");
            return cb.equal(assignedTo.get("id"), assignedToId);
        };
    }

    public static Specification<Ticket> hasUserStoryId(Integer userStoryId) {
        return (root, query, cb) -> {
            if (userStoryId == null) return null;
            Join<Object, Object> userStory = root.join("userStory");
            return cb.equal(userStory.get("id"), userStoryId);
        };
    }

    public static Specification<Ticket> dueAtBefore(LocalDate date) {
        return (root, query, cb) -> {
            if (date == null) return null;
            return cb.lessThanOrEqualTo(root.get("dueAt"), date);
        };
    }

    public static Specification<Ticket> dueAtAfter(LocalDate date) {
        return (root, query, cb) -> {
            if (date == null) return null;
            return cb.greaterThanOrEqualTo(root.get("dueAt"), date);
        };
    }
}
