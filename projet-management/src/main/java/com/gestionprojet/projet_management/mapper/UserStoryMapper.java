package com.gestionprojet.projet_management.mapper;

import com.gestionprojet.projet_management.dto.UserStoryDTO;
import com.gestionprojet.projet_management.entity.UserStory;
import org.springframework.stereotype.Component;

@Component
public class UserStoryMapper {
    public UserStoryDTO toDto(UserStory userStory){
        UserStoryDTO dto = new UserStoryDTO();
        dto.setTitre(userStory.getTitre());
        dto.setDescription(userStory.getDescription());
        dto.setCriteresAcceptation(userStory.getCriteresAcceptation());
        dto.setPriorite(userStory.getPriorite());
        dto.setStatut(userStory.getStatut());
        return dto;
    }

    public UserStory toEntity(UserStoryDTO dto){
        UserStory userStory = new UserStory();
        updateUserStory(dto, userStory);
        return userStory;
    }

    public void updateUserStory(UserStoryDTO dto, UserStory userStory){
        userStory.setTitre(dto.getTitre());
        userStory.setDescription(dto.getDescription());
        userStory.setCriteresAcceptation(dto.getCriteresAcceptation());
        userStory.setPriorite(dto.getPriorite());
        userStory.setStatut(dto.getStatut());
    }
}
