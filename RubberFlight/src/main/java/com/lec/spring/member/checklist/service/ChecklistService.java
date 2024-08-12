package com.lec.spring.member.checklist.service;

import com.lec.spring.general.user.domain.User;
import com.lec.spring.general.user.repository.UserRepository;
import com.lec.spring.member.checklist.domain.Checklist;
import com.lec.spring.member.checklist.domain.ChecklistDTO;
import com.lec.spring.member.checklist.domain.ChecklistItemDTO;
import com.lec.spring.member.checklist.domain.Checklist_item;
import com.lec.spring.member.checklist.repository.ChecklistRepository;
import com.lec.spring.member.checklist.repository.Checklist_itemRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ChecklistService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ChecklistRepository checklistRepository;

    @Autowired
    private Checklist_itemRepository checklist_itemRepository;

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public ChecklistDTO createChecklist(ChecklistDTO checklistDTO) {
        // 체크리스트 엔티티로 변환 및 저장
        Checklist checklist = convertToEntity(checklistDTO);
        checklist = checklistRepository.save(checklist);

        // 체크리스트 아이템을 체크리스트와 연결하고 저장
        for (ChecklistItemDTO itemDTO : checklistDTO.getItems()) {
            Checklist_item item = convertToEntity(itemDTO);
            item.setChecklist(checklist);  // 아이템에 체크리스트 설정
            checklist_itemRepository.save(item);
        }

        // 체크리스트를 다시 로드하고 DTO로 변환하여 반환
        return convertToDTO(checklistRepository.findById(checklist.getId()).orElseThrow());
    }

    public Checklist_item createChecklistItem(ChecklistItemDTO itemDTO) {
        // Find the associated Checklist
        Checklist checklist = checklistRepository.findById(itemDTO.getChecklistId())
                .orElseThrow(() -> new RuntimeException("Checklist not found"));

        // Convert DTO to Entity
        Checklist_item item = Checklist_item.builder()
                .itemName(itemDTO.getItemName())
                .checked(itemDTO.isChecked())
                .checklist(checklist) // Set the Checklist entity
                .build();

        // Save the entity
        return checklist_itemRepository.save(item);
    }

    public List<ChecklistDTO> getChecklistsByUserId(Long userId) {
        List<Checklist> checklists = checklistRepository.findByUserId(userId);
        return checklists.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<ChecklistItemDTO> getChecklistItemsByChecklistId(Long checklistId) {
        List<Checklist_item> items = checklist_itemRepository.findByChecklistId(checklistId);
        return items.stream().map(item -> {
            ChecklistItemDTO dto = new ChecklistItemDTO();
            dto.setId(item.getId());
            dto.setItemName(item.getItemName());
            dto.setChecked(item.isChecked());
            dto.setChecklistId(item.getChecklist().getId());
            return dto;
        }).collect(Collectors.toList());
    }

    public ChecklistDTO getChecklistById(Long id) {
        Optional<Checklist> checklist = checklistRepository.findById(id);
        if (checklist.isPresent()) {
            return convertToDTO(checklist.get());
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Checklist not found with id " + id);
        }
    }

    public void deleteChecklist(Long id) {
        if (checklistRepository.existsById(id)) {
            checklistRepository.deleteById(id);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Checklist not found with id " + id);
        }
    }

    public void deleteChecklistItem(Long id) {
        if (checklist_itemRepository.existsById(id)) {
            checklist_itemRepository.deleteById(id);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Checklist item not found with id " + id);
        }
    }

    public ChecklistDTO updateChecklist(Long id, ChecklistDTO updatedChecklistDTO) {
        if (!checklistRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Checklist not found with id " + id);
        }
        Checklist updatedChecklist = convertToEntity(updatedChecklistDTO);
        updatedChecklist.setId(id);
        Checklist savedChecklist = checklistRepository.save(updatedChecklist);
        return convertToDTO(savedChecklist);
    }

    public ChecklistItemDTO updateChecklistItem(Long id, ChecklistItemDTO updatedItemDTO) {
        if (!checklist_itemRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Checklist item not found with id " + id);
        }
        Checklist_item updatedItem = convertToEntity(updatedItemDTO);
        updatedItem.setId(id);
        Checklist_item savedItem = checklist_itemRepository.save(updatedItem);
        return convertToDTO(savedItem);
    }

    // 엔티티를 DTO로 변환
    private ChecklistDTO convertToDTO(Checklist checklist) {
        List<ChecklistItemDTO> items = checklist_itemRepository.findByChecklistId(checklist.getId())
                .stream().map(this::convertToDTO).collect(Collectors.toList());

        ChecklistDTO dto = new ChecklistDTO();
        dto.setId(checklist.getId());
        dto.setCategory(checklist.getCategory());
        dto.setUserId(checklist.getUser().getId());
        dto.setItems(items);  // 항목 추가
        return dto;
    }

    private ChecklistItemDTO convertToDTO(Checklist_item item) {
        ChecklistItemDTO dto = new ChecklistItemDTO();
        dto.setId(item.getId());
        dto.setItemName(item.getItemName());
        dto.setChecklistId(item.getChecklist().getId());
        return dto;
    }

    // DTO를 엔티티로 변환
    private Checklist convertToEntity(ChecklistDTO dto) {
        Checklist checklist = new Checklist();
        checklist.setId(dto.getId());
        checklist.setCategory(dto.getCategory());
        checklist.setUser(userRepository.findById(dto.getUserId()).orElse(null));
        return checklist;
    }

    private Checklist_item convertToEntity(ChecklistItemDTO dto) {
        Checklist_item item = new Checklist_item();
        item.setId(dto.getId());
        item.setItemName(dto.getItemName());
        item.setChecked(dto.isChecked());
        return item;
    }
}
