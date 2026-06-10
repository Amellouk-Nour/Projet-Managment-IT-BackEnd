package com.gestionprojet.projet_management.controller;

import com.gestionprojet.projet_management.constant.ApiPaths;
import com.gestionprojet.projet_management.dto.UserStoryDTO;
import com.gestionprojet.projet_management.entity.UserStory;
import com.gestionprojet.projet_management.mapper.UserStoryMapper;
import com.gestionprojet.projet_management.repository.UserStoryRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping(ApiPaths.USER_STORIES)
public class UserStoryController {

    private final UserStoryRepository repo;
    private final UserStoryMapper mapper;

    public UserStoryController(UserStoryRepository repo, UserStoryMapper mapper) {
        this.repo = repo;
        this.mapper = mapper;
    }

    @GetMapping
    public ResponseEntity<List<UserStoryDTO>> getAllUserStories() {
        List<UserStoryDTO> userStories = repo.findAll().stream().map(mapper::toDto).toList();
        return ResponseEntity.ok(userStories);
    }

    @PostMapping
    public ResponseEntity<UserStoryDTO> createUserStory(@Valid @RequestBody UserStoryDTO dto){
        UserStory userStory = mapper.toEntity(dto);
        UserStory saved = repo.save(userStory);
        return ResponseEntity.status(HttpStatus.CREATED).body(mapper.toDto(saved));
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserStoryDTO> getUserStoryById(@PathVariable Integer id){
        Optional<UserStory> userStory = repo.findById(id);
        if(userStory.isPresent()){
            return ResponseEntity.ok(mapper.toDto(userStory.get()));
        }
        else{
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserStoryDTO> updateUserStory(@PathVariable Integer id, @Valid @RequestBody UserStoryDTO dto){
        Optional<UserStory> userStory = repo.findById(id);
        if(userStory.isPresent()){
            UserStory u = userStory.get();
            mapper.updateUserStory(dto, u);
            UserStory saved = repo.save(u);
            return ResponseEntity.ok(mapper.toDto(saved));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUserStory(@PathVariable Integer id){
        Optional<UserStory> userStory = repo.findById(id);
        if(userStory.isPresent()) {
            repo.delete(userStory.get());
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
    }
}
