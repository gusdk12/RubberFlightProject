package com.lec.spring.general.user.service;

import com.lec.spring.general.user.config.CustomOAuth2User;
import com.lec.spring.general.user.domain.*;
import com.lec.spring.general.user.repository.UserRepository;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    private final UserRepository userRepository;

    public CustomOAuth2UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
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
        }else {
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



        if (existData == null) {
            User user = new User();
            user.setId(user.getId());
            user.setUsername(username);
            user.setEmail(email);
            user.setName(name);
            user.setRole("ROLE_MEMBER");
            user.setPassword("defaultPassword");
            user.setTel("");
            user.setImage("/uploads/user.png");

            userRepository.save(user);

            UserDTO userDTO = new UserDTO();
            userDTO.setId(userDTO.getId());
            userDTO.setUsername(username);
            userDTO.setName(oAuth2Response.getName());
            userDTO.setRole("ROLE_MEMBER");

            System.out.println("Saving new user with email: " + user.getEmail());

            return new CustomOAuth2User(userDTO);
        } else {
            existData.setEmail(email); // email 값을 null이 아닌 값으로 설정
            existData.setName(name);

            userRepository.save(existData);

            UserDTO userDTO = new UserDTO();
            userDTO.setId(existData.getId());
            userDTO.setUsername(existData.getUsername());
            userDTO.setName(name);
            userDTO.setRole(existData.getRole());

            return new CustomOAuth2User(userDTO);
        }
    }
}