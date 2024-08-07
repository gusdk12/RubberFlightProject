package com.lec.spring.general.user.domain;

import java.util.Map;

public class KakaoResponse implements OAuth2Response {

    private Map<String, Object> attributes;

    public KakaoResponse(Map<String, Object> attributes) {
        this.attributes = attributes;
    }

    @Override
    public String getProviderId() {
        return (String) attributes.get("id").toString();
    }

    @Override
    public String getProvider() {
        return "kakao";
    }

    @Override
    public String getEmail() {
        Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");
        return kakaoAccount != null ? (String) kakaoAccount.get("email") : null;
    }

    @Override
    public String getName() {
        return (String) attributes.get("nickName");
    }

    @Override
    public String getImgae() {
        return (String) attributes.get("profileImageURL");
    }
}