package com.gestionprojet.projet_management.service;

import com.gestionprojet.projet_management.dto.UserStoryDTO;
import com.gestionprojet.projet_management.entity.UserStory;
import com.gestionprojet.projet_management.mapper.UserStoryMapper;
import com.gestionprojet.projet_management.repository.UserStoryRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
public class UserStoryService {

    private final UserStoryRepository repo;
    private final UserStoryMapper mapper;

    public UserStoryService(UserStoryRepository repo, UserStoryMapper mapper) {
        this.repo = repo;
        this.mapper = mapper;
    }

    public List<UserStoryDTO> getAllUserStories() {
        return repo.findAll().stream().map(mapper::toDto).toList();
    }

    public UserStoryDTO createUserStory(UserStoryDTO dto) {
        UserStory entity = mapper.toEntity(dto);
        UserStory saved = repo.save(entity);
        return mapper.toDto(saved);
    }

    public UserStoryDTO getUserStoryById(Integer id) {
        UserStory entity = repo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "UserStory not found"));
        return mapper.toDto(entity);
    }

    public UserStoryDTO updateUserStory(Integer id, UserStoryDTO dto) {
        UserStory entity = repo.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "UserStory not found"));
        mapper.updateUserStory(dto, entity);
        UserStory saved = repo.save(entity);
        return mapper.toDto(saved);
    }

    public void deleteUserStory(Integer id) {
        if (!repo.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "UserStory not found");
        }
        repo.deleteById(id);
    }
}
