package com.gestionprojet.projet_management.specification;

import com.gestionprojet.projet_management.entity.Ticket;
import com.gestionprojet.projet_management.entity.TicketStatus;
import jakarta.persistence.criteria.Join;
import jakarta.persistence.criteria.JoinType;
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
            query.distinct(true);
            jakarta.persistence.criteria.Join<Object, Object> assignees = root.join("assignees");
            return cb.equal(assignees.get("id"), assignedToId);
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

    public static Specification<Ticket> createdByOrAssignedTo(Integer userId) {
        return (root, query, cb) -> {
            if (userId == null) return null;
            query.distinct(true);
            jakarta.persistence.criteria.Join<Object, Object> createdBy = root.join("createdBy", jakarta.persistence.criteria.JoinType.LEFT);
            jakarta.persistence.criteria.Join<Object, Object> assignees = root.join("assignees", jakarta.persistence.criteria.JoinType.LEFT);
            return cb.or(
                cb.equal(createdBy.get("id"), userId),
                cb.equal(assignees.get("id"), userId)
            );
        };
    }

}
