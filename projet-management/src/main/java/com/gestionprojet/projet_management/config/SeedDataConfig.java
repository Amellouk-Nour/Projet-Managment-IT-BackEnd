package com.gestionprojet.projet_management.config;

import com.gestionprojet.projet_management.entity.Ticket;
import com.gestionprojet.projet_management.entity.TicketStatus;
import com.gestionprojet.projet_management.entity.UserStory;
import com.gestionprojet.projet_management.entity.Utilisateur;
import com.gestionprojet.projet_management.repository.TicketRepository;
import com.gestionprojet.projet_management.repository.UserStoryRepository;
import com.gestionprojet.projet_management.repository.UtilisateurRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.util.Set;

@Component
public class SeedDataConfig implements CommandLineRunner {

    private final UtilisateurRepository utilisateurRepo;
    private final UserStoryRepository userStoryRepo;
    private final TicketRepository ticketRepo;
    private final PasswordEncoder passwordEncoder;

    public SeedDataConfig(UtilisateurRepository utilisateurRepo,
                          UserStoryRepository userStoryRepo, TicketRepository ticketRepo,
                          PasswordEncoder passwordEncoder) {
        this.utilisateurRepo = utilisateurRepo;
        this.userStoryRepo = userStoryRepo;
        this.ticketRepo = ticketRepo;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        if (utilisateurRepo.count() > 0) return;

        Utilisateur admin = new Utilisateur();
        admin.setUsername("admin");
        admin.setEmail("admin@test.com");
        admin.setPassword(passwordEncoder.encode("admin123"));
        admin.setRole("Administrateur");
        admin = utilisateurRepo.save(admin);

        Utilisateur dev = new Utilisateur();
        dev.setUsername("abdelouahed");
        dev.setEmail("abdelouahed@test.com");
        dev.setPassword(passwordEncoder.encode("password"));
        dev.setRole("Developpeur");
        dev = utilisateurRepo.save(dev);

        Utilisateur tester = new Utilisateur();
        tester.setUsername("tester");
        tester.setEmail("tester@test.com");
        tester.setPassword(passwordEncoder.encode("test123"));
        tester.setRole("Testeur");
        tester = utilisateurRepo.save(tester);

        UserStory us1 = new UserStory();
        us1.setTitre("Authentification");
        us1.setDescription("Gerer l'authentification des utilisateurs");
        us1.setPriorite(1);
        us1.setStatut("a_faire");
        us1 = userStoryRepo.save(us1);

        UserStory us2 = new UserStory();
        us2.setTitre("Tableau de bord");
        us2.setDescription("Afficher le tableau Kanban");
        us2.setPriorite(2);
        us2.setStatut("a_faire");
        us2 = userStoryRepo.save(us2);

        Ticket t1 = new Ticket();
        t1.setTitre("Page de connexion");
        t1.setDescription("Creer la page de connexion avec JWT");
        t1.setStatut(TicketStatus.a_faire);
        t1.setPriorite(1);
        t1.setEstimDev(java.math.BigDecimal.valueOf(4));
        t1.setDueAt(LocalDate.now().plusDays(7));
        t1.setUserStory(us1);
        t1.setCreatedBy(admin);
        t1.setAssignees(Set.of(dev));
        ticketRepo.save(t1);

        Ticket t2 = new Ticket();
        t2.setTitre("Drag & drop Kanban");
        t2.setDescription("Implementer le drag and drop avec @dnd-kit");
        t2.setStatut(TicketStatus.en_cours_dev);
        t2.setPriorite(2);
        t2.setEstimDev(java.math.BigDecimal.valueOf(8));
        t2.setDueAt(LocalDate.now().plusDays(14));
        t2.setUserStory(us2);
        t2.setCreatedBy(admin);
        t2.setAssignees(Set.of(dev, tester));
        ticketRepo.save(t2);

        Ticket t3 = new Ticket();
        t3.setTitre("Tests unitaires");
        t3.setDescription("Ecrire les tests pour les services");
        t3.setStatut(TicketStatus.a_faire);
        t3.setPriorite(3);
        t3.setEstimDev(java.math.BigDecimal.valueOf(6));
        t3.setDueAt(LocalDate.now().plusDays(21));
        t3.setUserStory(us1);
        t3.setCreatedBy(admin);
        t3.setAssignees(Set.of(tester));
        ticketRepo.save(t3);
    }
}
