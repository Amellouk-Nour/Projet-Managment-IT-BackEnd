package com.gestionprojet.projet_management.repository;

import com.gestionprojet.projet_management.entity.UserStory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserStoryRepository extends JpaRepository<UserStory, Integer> {
}
