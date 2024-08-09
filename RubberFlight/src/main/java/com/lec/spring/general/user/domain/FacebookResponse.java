package com.lec.spring.general.user.domain;

import java.util.Map;

public class FacebookResponse implements OAuth2Response {


    private final Map<String, Object> attribute;

    public FacebookResponse(Map<String, Object> attribute) {
        this.attribute = attribute;
    }


    @Override
    public String getProvider() {
        return "facebook";
    }

    @Override
    public String getProviderId() {
        return attribute.get("id").toString();
    }

    @Override
    public String getEmail() {
        return attribute.get("email").toString();
    }

    @Override
    public String getName() {
        return attribute.get("name").toString();
    }

    @Override
    public String getImage() {
        Object image = attribute.get("profile_image");
        return image != null ? image.toString() : null;  // null 체크 추가
    }
}
