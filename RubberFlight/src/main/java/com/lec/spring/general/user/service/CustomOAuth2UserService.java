package com.lec.spring.general.user.service;

import com.lec.spring.general.user.config.CustomOAuth2User;
import com.lec.spring.general.user.domain.*;
import com.lec.spring.general.user.repository.UserRepository;
import com.lec.spring.member.checklist.service.ChecklistService;
import org.springframework.security.core.parameters.P;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;
    private final ChecklistService checklistService;  // ChecklistService 주입

    public CustomOAuth2UserService(UserRepository userRepository, ChecklistService checklistService) {
        this.userRepository = userRepository;
        this.checklistService = checklistService;  // ChecklistService 초기화
    }

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        if (oAuth2User == null) {
            System.out.println("OAuth2User is null.");
            throw new OAuth2AuthenticationException("OAuth2User is null");
        }

        System.out.println("OAuth2User: " + oAuth2User);

        String registrationId = userRequest.getClientRegistration().getRegistrationId();
        OAuth2Response oAuth2Response = null;
        if (registrationId.equals("naver")) {
            oAuth2Response = new NaverResponse(oAuth2User.getAttributes());
        } else if (registrationId.equals("google")) {
            oAuth2Response = new GoogleResponse(oAuth2User.getAttributes());
        } else if (registrationId.equals("facebook")) {
            oAuth2Response = new FacebookResponse(oAuth2User.getAttributes());
        } else if(registrationId.equals("kakao")) {
            oAuth2Response = new KakaoResponse(oAuth2User.getAttributes());
        } else {
            return null;
        }

        // 리소스 서버에서 발급 받은 정보로 사용자를 특정할 아이디값을 만듦
        String username = oAuth2Response.getProvider() + " " + oAuth2Response.getProviderId();
        User existData = userRepository.findByUsername(username);

        String email = oAuth2Response.getEmail();
        System.out.println("Fetched email: " + email);

        if (email == null) {
            email = oAuth2Response.getProviderId() + "@kakao.com";
        }

        String name = oAuth2Response.getName();
        if (name == null) {
            name = "user";
        }

        String image = oAuth2Response.getImage();
        if(image == null) {
            image = "http://localhost:8282/uploads/user.png";
        }

        if (existData == null) {
            // 새로운 사용자 생성
            User user = new User();
            user.setUsername(username);
            user.setEmail(email);
            user.setName(name);
            user.setRole("ROLE_MEMBER");
            user.setPassword("defaultPassword");
            user.setTel("");
            user.setImage(image);

            User savedUser = userRepository.save(user);  // 사용자를 저장

            // 기본 체크리스트 생성
            checklistService.createDefaultChecklists(savedUser.getId());

            UserDTO userDTO = new UserDTO();
            userDTO.setId(savedUser.getId());
            userDTO.setUsername(username);
            userDTO.setName(name);
            userDTO.setRole("ROLE_MEMBER");
            userDTO.setImage(image);

            System.out.println("Saving new user with email: " + savedUser.getEmail());

            return new CustomOAuth2User(userDTO);
        } else {
            // 기존 사용자 정보 업데이트
            existData.setEmail(email);
            existData.setName(name);
            existData.setImage(image);

            userRepository.save(existData);

            UserDTO userDTO = new UserDTO();
            userDTO.setId(existData.getId());
            userDTO.setUsername(existData.getUsername());
            userDTO.setName(name);
            userDTO.setRole(existData.getRole());
            userDTO.setImage(existData.getImage());

            return new CustomOAuth2User(userDTO);
        }
    }
}