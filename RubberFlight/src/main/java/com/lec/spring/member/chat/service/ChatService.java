package com.lec.spring.member.chat.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

@Service
public class ChatService {
    @Value("${cohere.api.key}")
    private String cohereApiKey;

    @Value("${google.api.key}")
    private String googleApikey;

    @Value("${google.search.engine.id}")
    private String googleSearchEngineId;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    private final Map<String, List<String>> userConversations = new HashMap<>();

    // 대화 기록 유지하기
    public String getResponse(String userId, String prompt) {

        // 대화 종료 또는 초기화 명령어 처리
        if (prompt.equalsIgnoreCase("종료") || prompt.equalsIgnoreCase("새 대화 시작")) {
            userConversations.remove(userId);
            return "대화가 초기화되었습니다.";
        }
        // 대화 기록이 없으면 새로 생성
        userConversations.putIfAbsent(userId, new ArrayList<>());

        // 대화 기록에 새로운 프롬프트 추가
        userConversations.get(userId).add("User: " + prompt);

        // 대화의 모든 내용을 하나의 프롬프트로 결합
        String combinedPrompt = String.join("\n", userConversations.get(userId));

        // Cohere API 를 사용하여 AI 응답 생성
        String aiResponse = aiResponse(combinedPrompt);

        // AI 응답을 대화 기록에 추가
        userConversations.get(userId).add("AI: " + aiResponse);

        // AI 응답을 포맷하여 번호를 매기고 줄바꿈 추가
        String formattedAiResponse = formatAiResponse(aiResponse);

        String searchQuery = extractKeyword(formattedAiResponse);

        // Google Custom Search API 를 사용하여 검색 결과 가져오기
        String searchResults = performGoogleSearch(searchQuery);

        // 두 결과를 조합하여 반환
        return "<br>" + formattedAiResponse + "<br><br>관련 링크↓<br>" + searchResults;
    }

    public String aiResponse(String prompt) {
        String url = "https://api.cohere.ai/v1/generate";
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + cohereApiKey);
        headers.set("Content-Type", "application/json");


        // JSON 형식으로 요청 본문 생성
        Map<String, Object> requestBodyMap = new HashMap<>();
        requestBodyMap.put("prompt", prompt);
        requestBodyMap.put("model", "command-r-plus");
        requestBodyMap.put("max_tokens", 190);
        requestBodyMap.put("temperature", 1.0);
        requestBodyMap.put("frequency_penalty", 0.0);
        requestBodyMap.put("presence_penalty", 0.2);
        requestBodyMap.put("context_size", 6000);
        requestBodyMap.put("top_k", 100);
        requestBodyMap.put("top_p", 0.95);

        String requestBody;
        try {
            requestBody = objectMapper.writeValueAsString(requestBodyMap);
        } catch (Exception e) {
            e.printStackTrace();
            return "Error creating request body";
        }

        HttpEntity<String> entity = new HttpEntity<>(requestBody, headers);
        ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.POST, entity, String.class);

        try {
            JsonNode root = objectMapper.readTree(response.getBody());
            // JSON 경로를 확인하고 올바르게 응답을 추출
            JsonNode generations = root.path("generations");
            if (generations.isArray() && generations.size() > 0) {
                String text = generations.get(0).path("text").asText();
                return ensureCompleteResponse(text);
            } else {
                return "No generation results found.";
            }
        } catch (Exception e) {
            e.printStackTrace();
            return "Error processing response";
        }
    }

    public String formatAiResponse(String response) {
        // 항목을 번호 매기기와 줄바꿈으로 포맷
        String[] items = response.split("\n"); // 항목이 줄바꿈으로 구분된다고 가정
        StringBuilder formattedResponse = new StringBuilder();

        int index = 1; // 번호 매기기 시작
        for (String item : items) {
            if (!item.trim().isEmpty()) { // 빈 항목이 아닐 경우에만 추가
                formattedResponse.append(String.format("%s<br>", item.trim()));

            }
        }

        return formattedResponse.toString();
    }

    // 검색 키워드 추출
    private String extractKeyword(String response) {
        // 정규 표현식을 사용하여 숫자와 ':' 사이의 텍스트를 추출
        String regex = "(?:-\\s*|\\d+\\.\\s*)([^:\\n]+?)\\s*:\\s*";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(response);

        StringBuilder result = new StringBuilder(); // 여러 항목을 저장할 StringBuilder
        boolean found = false; // 매칭 여부를 확인할 플래그

        // 정규 표현식에 매칭되는 부분을 찾기
        while (matcher.find()) {
            found = true;
            result.append(matcher.group(1).trim()).append("\n"); // 항목을 추가하고 줄바꿈
        }

        // 정규식에 매칭되지 않으면 기본적으로 첫 번째 문장을 반환
        if (!found) {
            // 문장 분리
            String[] sentences = response.split("\\.");
            return sentences.length > 0 ? sentences[0].trim() + "." : response.trim();
        }

        // 결과 반환
        return result.toString().trim();
    }

    private String performGoogleSearch(String query) {

        String url = String.format(
                "https://www.googleapis.com/customsearch/v1?q=%s&key=%s&cx=%s&safe=active&num=5",
                query, googleApikey, googleSearchEngineId
        );

        try {
            ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, null, String.class);
            JsonNode root = objectMapper.readTree(response.getBody());
            StringBuilder searchResults = new StringBuilder();

            // 결과 배열 확인
            if (root.path("items").isArray()) {
                for (JsonNode item : root.path("items")) {
                    String title = item.path("title").asText();
                    String link = item.path("link").asText();
                    String snippet = item.path("snippet").asText();

                    // 번호와 결과를 형식화하여 추가
                    searchResults.append(String.format("- <a href=\"%s\" target=\"_blank\">%s</a><br>%s<br><br>",
                            link, title, snippet));

                    // 로그: 검색 결과 출력
                    System.out.println("Title: " + title);
                    System.out.println("Snippet: " + snippet);
                }
            } else {
                searchResults.append("No search results found.").append("<br>");
            }
            return searchResults.toString();
        } catch (Exception e) {
            e.printStackTrace();
            return "Error processing search results";
        }
    }

    private String ensureCompleteResponse(String response) {
        if (!response.endsWith(".") && !response.endsWith("!") && !response.endsWith("?")) {
            String[] responses = response.split("[.!?]");
            return response.substring(0, response.length() - responses[responses.length - 1].length());
        }
        return response;
    }

}

