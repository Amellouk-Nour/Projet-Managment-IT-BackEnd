package com.gestionprojet.projet_management.controller;

import com.gestionprojet.projet_management.constant.ApiPaths;
import com.gestionprojet.projet_management.dto.UserStoryDTO;
import com.gestionprojet.projet_management.service.UserStoryService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(ApiPaths.USER_STORIES)
public class UserStoryController {

    private final UserStoryService service;

    public UserStoryController(UserStoryService service) {
        this.service = service;
    }

    @GetMapping
    public ResponseEntity<List<UserStoryDTO>> getAllUserStories() {
        return ResponseEntity.ok(service.getAllUserStories());
    }

    @PostMapping
    public ResponseEntity<UserStoryDTO> createUserStory(@Valid @RequestBody UserStoryDTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(service.createUserStory(dto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserStoryDTO> getUserStoryById(@PathVariable Integer id) {
        return ResponseEntity.ok(service.getUserStoryById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserStoryDTO> updateUserStory(@PathVariable Integer id, @Valid @RequestBody UserStoryDTO dto) {
        return ResponseEntity.ok(service.updateUserStory(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUserStory(@PathVariable Integer id) {
        service.deleteUserStory(id);
        return ResponseEntity.noContent().build();
    }
}
