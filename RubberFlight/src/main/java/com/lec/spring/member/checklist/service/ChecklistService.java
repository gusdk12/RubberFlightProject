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

import java.util.Arrays;
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

    public void createDefaultChecklists(Long userId) {
        // 의류 체크리스트 생성
        ChecklistDTO clothingChecklist = new ChecklistDTO();
        clothingChecklist.setCategory("의류");
        clothingChecklist.setUserId(userId);

        ChecklistItemDTO clothingItem1 = new ChecklistItemDTO();
        clothingItem1.setItemName("상의");

        ChecklistItemDTO clothingItem2 = new ChecklistItemDTO();
        clothingItem2.setItemName("하의");

        ChecklistItemDTO clothingItem3 = new ChecklistItemDTO();
        clothingItem3.setItemName("양말");

        ChecklistItemDTO clothingItem4 = new ChecklistItemDTO();
        clothingItem4.setItemName("속옷");

        ChecklistItemDTO clothingItem5 = new ChecklistItemDTO();
        clothingItem5.setItemName("잠옷");

        // 날씨에 따라 외투나 모자 추가
        ChecklistItemDTO clothingItem6 = new ChecklistItemDTO();
        clothingItem6.setItemName("외투");

        ChecklistItemDTO clothingItem7 = new ChecklistItemDTO();
        clothingItem7.setItemName("모자");

        clothingChecklist.setItems(Arrays.asList(clothingItem1, clothingItem2, clothingItem3, clothingItem4, clothingItem5, clothingItem6, clothingItem7));
        createChecklist(clothingChecklist); // checklistService의 실제 메서드 호출

        // 세면용품 체크리스트 생성
        ChecklistDTO washupChecklist = new ChecklistDTO();
        washupChecklist.setCategory("세면용품");
        washupChecklist.setUserId(userId);

        ChecklistItemDTO washupItem1 = new ChecklistItemDTO();
        washupItem1.setItemName("칫솔");

        ChecklistItemDTO washupItem2 = new ChecklistItemDTO();
        washupItem2.setItemName("치약");

        ChecklistItemDTO washupItem3 = new ChecklistItemDTO();
        washupItem3.setItemName("샴푸");

        ChecklistItemDTO washupItem4 = new ChecklistItemDTO();
        washupItem4.setItemName("수건");

        ChecklistItemDTO washupItem5 = new ChecklistItemDTO();
        washupItem5.setItemName("로션");

        washupChecklist.setItems(Arrays.asList(washupItem1, washupItem2, washupItem3, washupItem4, washupItem5));
        createChecklist(washupChecklist); // checklistService의 실제 메서드 호출

        // 전자기기 체크리스트 생성
        ChecklistDTO electronicsChecklist = new ChecklistDTO();
        electronicsChecklist.setCategory("전자기기");
        electronicsChecklist.setUserId(userId);

        ChecklistItemDTO electronicsItem1 = new ChecklistItemDTO();
        electronicsItem1.setItemName("휴대폰");

        ChecklistItemDTO electronicsItem2 = new ChecklistItemDTO();
        electronicsItem2.setItemName("충전기");

        ChecklistItemDTO electronicsItem3 = new ChecklistItemDTO();
        electronicsItem3.setItemName("보조배터리");

        electronicsChecklist.setItems(Arrays.asList(electronicsItem1, electronicsItem2, electronicsItem3));
        createChecklist(electronicsChecklist); // checklistService의 실제 메서드 호출

        // 필수품 체크리스트 생성
        ChecklistDTO necessaryChecklist = new ChecklistDTO();
        necessaryChecklist.setCategory("필수품");
        necessaryChecklist.setUserId(userId);

        ChecklistItemDTO necessaryItem1 = new ChecklistItemDTO();
        necessaryItem1.setItemName("지갑");

        ChecklistItemDTO necessaryItem2 = new ChecklistItemDTO();
        necessaryItem2.setItemName("휴대폰");

        ChecklistItemDTO necessaryItem3 = new ChecklistItemDTO();
        necessaryItem3.setItemName("신분증");

        ChecklistItemDTO necessaryItem4 = new ChecklistItemDTO();
        necessaryItem4.setItemName("여행 가이드북");

        ChecklistItemDTO necessaryItem5 = new ChecklistItemDTO();
        necessaryItem5.setItemName("삼각대");

        necessaryChecklist.setItems(Arrays.asList(necessaryItem1, necessaryItem2, necessaryItem3, necessaryItem4, necessaryItem5));
        createChecklist(necessaryChecklist); // checklistService의 실제 메서드 호출

        // 간식 및 음료 체크리스트 생성
        ChecklistDTO snacksChecklist = new ChecklistDTO();
        snacksChecklist.setCategory("간식 및 음료");
        snacksChecklist.setUserId(userId);

        ChecklistItemDTO snacksItem1 = new ChecklistItemDTO();
        snacksItem1.setItemName("물");

        ChecklistItemDTO snacksItem2 = new ChecklistItemDTO();
        snacksItem2.setItemName("간식");

        ChecklistItemDTO snacksItem3 = new ChecklistItemDTO();
        snacksItem3.setItemName("커피");

        snacksChecklist.setItems(Arrays.asList(snacksItem1, snacksItem2, snacksItem3));
        createChecklist(snacksChecklist); // checklistService의 실제 메서드 호출

        // 약품 체크리스트 생성
        ChecklistDTO medicineChecklist = new ChecklistDTO();
        medicineChecklist.setCategory("약품");
        medicineChecklist.setUserId(userId);

        ChecklistItemDTO medicineItem1 = new ChecklistItemDTO();
        medicineItem1.setItemName("두통약");

        ChecklistItemDTO medicineItem2 = new ChecklistItemDTO();
        medicineItem2.setItemName("소화제");

        ChecklistItemDTO medicineItem3 = new ChecklistItemDTO();
        medicineItem3.setItemName("후시딘");

        ChecklistItemDTO medicineItem4 = new ChecklistItemDTO();
        medicineItem4.setItemName("반창고");

        medicineChecklist.setItems(Arrays.asList(medicineItem1, medicineItem2, medicineItem3, medicineItem4));
        createChecklist(medicineChecklist); // checklistService의 실제 메서드 호출
    }
}
