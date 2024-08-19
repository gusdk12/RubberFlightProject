package com.lec.spring.general.user.config;

import com.lec.spring.general.user.jwt.JWTUtil;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.util.Collection;
import java.util.Iterator;

@Component
public class CustomSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

    @Value("${awsFrontServer.address}")
    private String frontServerUrl;
    private final JWTUtil jwtUtil;

    public CustomSuccessHandler(JWTUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) throws IOException, ServletException {


        //OAuth2User
        CustomOAuth2User customUserDetails = (CustomOAuth2User) authentication.getPrincipal();

        String username = customUserDetails.getUsername();

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Iterator<? extends GrantedAuthority> iterator = authorities.iterator();
        GrantedAuthority auth = iterator.next();
        String role = auth.getAuthority();

        String name = customUserDetails.getName();
        Long id = customUserDetails.getId();

        String token = jwtUtil.createJwt(id, username, role, name,60*60*600L);

        System.out.println("생성된 JWT 토큰: " + token);

        System.out.println("사용자 ID: " + id);
        System.out.println("사용자 이름: " + name);
        System.out.println("사용자 이메일/아이디: " + username);
        System.out.println("사용자 역할: " + role);

        Cookie jwtCookie = new Cookie("accessToken", token);
        jwtCookie.setHttpOnly(false); // Allow JavaScript access
        jwtCookie.setSecure(false); // Use only over HTTPS
        jwtCookie.setPath("/"); // Available for all paths
        jwtCookie.setMaxAge(60 * 60 * 600); // Set expiration time

        System.out.println("JWT 쿠키 생성됨. 쿠키 이름: " + jwtCookie.getName());
        System.out.println("쿠키 값: " + jwtCookie.getValue());
        System.out.println("쿠키 만료 시간(초): " + jwtCookie.getMaxAge());
        System.out.println("쿠키 경로: " + jwtCookie.getPath());
        System.out.println("쿠키 보안 설정: " + jwtCookie.getSecure());

        response.addCookie(jwtCookie);

        response.addCookie(createCookie("Authorization", token));

        // 콘솔확인용 추가
        Cookie authCookie = createCookie("Authorization", token);
        System.out.println("Authorization 쿠키 생성됨. 쿠키 이름: " + authCookie.getName());
        System.out.println("쿠키 값: " + authCookie.getValue());


        System.out.println("리다이렉트 경로: " + frontServerUrl + "/");

        response.sendRedirect(frontServerUrl + "/");
    }


    private Cookie createCookie(String key, String value){
        Cookie cookie = new Cookie(key, value);
        cookie.setMaxAge(60*60*60);
        //cookie.setSecure(true)
        cookie.setPath("/");
        cookie.setHttpOnly(true);

        return cookie;
    }
}
