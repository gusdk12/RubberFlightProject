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

import java.util.*;
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
            return "채팅을 종료합니다.";
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

        List<String> searchQuery = extractKeyword(formattedAiResponse);

        // Google Custom Search API 를 사용하여 검색 결과 가져오기
        String searchResults = performGoogleSearch(searchQuery, prompt);

        // 두 결과를 조합하여 반환
        return formattedAiResponse + "<br><관련 링크><br>" + searchResults;
    }

    public String aiResponse(String prompt) {
        String formattedPrompt = "다음 질문에 대해 친근한 톤으로 정확하게 답변해 주세요." +
                                 " 예를 들어, '다낭은 멋진 여행지예요. 1.미키해변: 멋진 해변이죠 2. 성요셉 성당: 멋진 성당입니다'와 같은 형식으로 답변해 주세요." +
                                 " 만약, 사용자가 '미키해변은 어떤 곳이야? 설명해줘'라는 설명을 해달라는 질문이면 " +
                                 "1. 멋있어요 2. 사람들이 즐겁게 헤엄칠 수 있어요 이렇게 번호로 설명하지 말고 문장으로 답변해 주세요"  +
                                 " 질문: " + prompt;

        String url = "https://api.cohere.ai/v1/generate";
        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + cohereApiKey);
        headers.set("Content-Type", "application/json");


        // JSON 형식으로 요청 본문 생성
        Map<String, Object> requestBodyMap = new HashMap<>();
        requestBodyMap.put("prompt", formattedPrompt);
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

        for (String item : items) {
            String trimmedItem = item.trim();

            // 숫자와 점만 포함된 항목인지 확인
            if (!trimmedItem.matches("^\\d+\\.\\s*$")) {
                // 포맷팅: 항목 앞뒤 공백 제거 및 <br><br>로 구분
                formattedResponse.append(String.format("%s<br>", trimmedItem));
            }
        }

        return formattedResponse.toString();
    }

    private String ensureCompleteResponse(String response) {
        if (!response.endsWith(".") && !response.endsWith("!") && !response.endsWith("?")) {
            String[] responses = response.split("[.!?]");
            return response.substring(0, response.length() - responses[responses.length - 1].length());
        }
        return response;
    }

    // 검색 키워드 추출
    private List<String> extractKeyword(String response) {
        // 정규 표현식을 사용하여 숫자와 ':' 사이의 텍스트를 추출
        String regex = "(?:-\\s*|\\d+\\.\\s*)([^:\\n]+?)\\s*:\\s*";
        Pattern pattern = Pattern.compile(regex);
        Matcher matcher = pattern.matcher(response);

//        StringBuilder result = new StringBuilder(); // 여러 항목을 저장할 StringBuilder
        List<String> result = new ArrayList<>();

        boolean found = false; // 매칭 여부를 확인할 플래그

        // 정규 표현식에 매칭되는 부분을 찾기
        while (matcher.find()) {
            found = true;
            result.add(matcher.group(1).trim()); // 항목을 추가하고 줄바꿈
        }

        // 정규식에 매칭되지 않으면 기본적으로 첫 번째 문장을 반환
        if (!found) {
            // 문장 분리
            String[] sentences = response.split("[.?!]");
            if (sentences.length > 0) {
                result.add(response.trim());
            }
        }

        // 결과 반환
        return result;
    }

    private String performGoogleSearch(List<String> keywords, String prompt) {
        StringBuilder searchResults = new StringBuilder();
        boolean isKeywordSearch = true;

        // 질문 형식의 쿼리인지 확인하기 위한 정규식 패턴
        String questionPattern = ".*(\\b질문\\b|\\b해도 될까요\\b|\\b물어볼게요\\b|\\b할까요\\b).*";

        // 긴 문장인지 확인하는 기준 (예: 3단어 이상이면 긴 문장으로 간주)
        for (String query : keywords) {
            if (query.split("\\.").length > 2) {
                isKeywordSearch = false;
                break;
            }
        }

        // 긴 문장이 포함되어 있으면 사용자가 입력한 원본 문장으로 검색
        if (!isKeywordSearch) {
            keywords = Arrays.asList(prompt); // 원본 문장을 검색 쿼리로 설정
        }

        for (String query : keywords) {
            if (query.isEmpty()) continue;

            // 질문 형식의 쿼리가 들어오면 검색을 수행하지 않음
            if (query.matches(questionPattern)) {
                return "질문 형식의 쿼리는 검색할 수 없습니다. 구체적인 정보를 제공해 주세요.";
            }

            String url = String.format(
                    "https://www.googleapis.com/customsearch/v1?q=%s&key=%s&cx=%s&safe=active&num=2",
                    query, googleApikey, googleSearchEngineId
            );

            try {
                ResponseEntity<String> response = restTemplate.exchange(url, HttpMethod.GET, null, String.class);
                JsonNode root = objectMapper.readTree(response.getBody());

                // 결과 배열 확인
                if (root.path("items").isArray()) {
                    for (JsonNode item : root.path("items")) {
                        String title = item.path("title").asText();
                        String link = item.path("link").asText();
                        String snippet = item.path("snippet").asText();

                        // 번호와 결과를 형식화하여 추가
                        searchResults.append(String.format("<a href=\"%s\" target=\"_blank\" id='search'}>- %s</a><br><br>",
                                link, title));
                    }
                } else {
                    searchResults.append("관련 링크가 없습니다.").append("<br>");
                }
            } catch (Exception e) {
                e.printStackTrace();
                return "Error processing search results";
            }
        }
        return searchResults.toString();
    }
}


