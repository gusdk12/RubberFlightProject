# 유저
INSERT INTO FT_USER (username, password, role , name, email, tel, image) VALUES ('USER1', '$2a$10$4Ebd4IBQaURqIBekekR/yeMKSuES6KnoRJ5SRYaQ8j5ScaYpW2tZK', 'ROLE_MEMBER', '유인아', 'berry@naver.com', '010-4567-5215', '/uploads/user.png');
INSERT INTO FT_USER (username, password, role , name, email, tel, image) VALUES ('ADMIN1', '$2a$10$4Ebd4IBQaURqIBekekR/yeMKSuES6KnoRJ5SRYaQ8j5ScaYpW2tZK', 'ROLE_ADMIN', '사장님', 'king@naver.com', '010-8956-1245', '/uploads/user.png');

# 나라
# API : codeIso2Country, nameCountry, countryId
INSERT INTO ft_country (countryIso, countryName, countryId) VALUES ('KR','South Korea', 124); #대한민국
INSERT INTO ft_country (countryIso, countryName, countryId) VALUES ('DK','Denmark', 61); #덴마크
INSERT INTO ft_country (countryIso, countryName, countryId) VALUES ('NL','Netherlands', 168); #네덜란드
INSERT INTO ft_country (countryIso, countryName, countryId) VALUES ('RU','Russia', 193); #러시아
INSERT INTO ft_country (countryIso, countryName, countryId) VALUES ('MY','Malaysia', 160); #말레이시아
INSERT INTO ft_country (countryIso, countryName, countryId) VALUES ('US','United States', 235); #미국
INSERT INTO ft_country (countryIso, countryName, countryId) VALUES ('VN','Vietnam', 243); #베트남
INSERT INTO ft_country (countryIso, countryName, countryId) VALUES ('CH','Switzerland', 44); #스위스
INSERT INTO ft_country (countryIso, countryName, countryId) VALUES ('SG','Singapore', 200); #싱가포르
INSERT INTO ft_country (countryIso, countryName, countryId) VALUES ('IS','Iceland', 111); #아이슬란드
INSERT INTO ft_country (countryIso, countryName, countryId) VALUES ('UA','Ukraine', 232); #우크라이나
INSERT INTO ft_country (countryIso, countryName, countryId) VALUES ('JP','Japan', 116); #일본

# 공항
# API : codeIataAirport, nameAirport, FK, airportId, latitudeAirport, longitudeAirport

# 대한민국
INSERT INTO ft_airport (airportIso, airportName, countryIso, countryId, airportId , latitudeAirport, longitudeAirport, timezone)
VALUES ('GMP', 'Gimpo Airport', 'KR', 1, 2660, 37.559288, 126.80351,"Asia/Seoul");

INSERT INTO ft_airport (airportIso, airportName, countryIso, countryId, airportId , latitudeAirport, longitudeAirport, timezone)
VALUES ('ICN', 'Seoul (Incheon)', 'KR', 1, 3183, 37.448524, 126.45123, "Asia/Seoul");

# 미국
INSERT INTO ft_airport (airportIso, airportName, countryIso, countryId, airportId , latitudeAirport, longitudeAirport, timezone)
VALUES ('LAX', 'Los Angeles International', 'US', 6, 4189, 33.943398, -118.40828, "America/Los_Angeles");

# 싱가포르
INSERT INTO ft_airport (airportIso, airportName, countryIso, countryId, airportId , latitudeAirport, longitudeAirport, timezone)
VALUES ('SIN', 'Singapore Changi','SG', 9, 7111, 1.361173, 103.990204, "Asia/Singapore");

# 일본(나리타)
INSERT INTO ft_airport (airportIso, airportName, countryIso, countryId, airportId , latitudeAirport, longitudeAirport, timezone)
VALUES ('NRT', 'Narita', 'JP', 12, 5537, 35.773212, 140.38744, "Asia/Tokyo");

# 예약
INSERT INTO ft_reservation (user_id, personnel, isended) VALUES (1, "성인2", true);
INSERT INTO ft_reservation (user_id, personnel, isended) VALUES (1, "성인1", true);
INSERT INTO ft_reservation (user_id, personnel, isended) VALUES (1, "성인3,소아1", true);
INSERT INTO ft_reservation (user_id, personnel, isended) VALUES (1, "성인2,소아2", true);
INSERT INTO ft_reservation (user_id, personnel, isended) VALUES (1, "성인2", true);
INSERT INTO ft_reservation (user_id, personnel, isended) VALUES (1, "성인1,소아1", false);
INSERT INTO ft_reservation (user_id, personnel, isended) VALUES (1, "성인2", false);
INSERT INTO ft_reservation (user_id, personnel, isended) VALUES (1, "성인1", true);

# 예약 비행정보
INSERT INTO ft_flightInfo (reservation_id, dep_airport, dep_iata, arr_airport, arr_iata, price, flight_iat, dep_sch, arr_sch, airline_name)
VALUES (1, "인천", "ICN", "나리타", "NRT", 198700, "ze593", "2024-07-20T20:30:00", "2024-07-20T23:25:00", "eastar jet");

INSERT INTO ft_flightInfo (reservation_id, dep_airport, dep_iata, arr_airport, arr_iata, price, flight_iat, dep_sch, arr_sch, airline_name)
VALUES (2, "인천", "ICN", "나리타", "NRT", 123700, "lj209", "2024-07-20T14:45:00", "2024-07-20T17:10:00", "jin air");

INSERT INTO ft_flightInfo (reservation_id, dep_airport, dep_iata, arr_airport, arr_iata, price, flight_iat, dep_sch, arr_sch, airline_name)
VALUES (3, "김포", "GMP", "제주", "CJU", 107600, "ke1049", "2024-07-20T09:00:00", "2024-07-20T10:10:00", "korean air");

INSERT INTO ft_flightInfo (reservation_id, dep_airport, dep_iata, arr_airport, arr_iata, price, flight_iat, dep_sch, arr_sch, airline_name)
VALUES (4, "김포", "GMP", "제주", "CJU", 95640, "7c109", "2024-07-20T09:00:00", "2024-07-20T10:10:00", "jeju air");

INSERT INTO ft_flightInfo (reservation_id, dep_airport, dep_iata, arr_airport, arr_iata, price, flight_iat, dep_sch, arr_sch, airline_name)
VALUES (5, "인천", "ICN", "나리타", "NRT", 182930, "bx166", "2024-07-21T15:50:00", "2024-07-21T18:10:00", "air busan");

INSERT INTO ft_flightInfo (reservation_id, dep_airport, dep_iata, arr_airport, arr_iata, price, flight_iat, dep_sch, arr_sch, airline_name)
VALUES (6, "인천", "ICN", "오사카", "KIX", 150000, "ke723", "2024-08-13T09:35:00", "2024-08-13T11:20:00", "korean air");

INSERT INTO ft_flightInfo (reservation_id, dep_airport, dep_iata, arr_airport, arr_iata, price, flight_iat, dep_sch, arr_sch, airline_name)
VALUES (7, "도쿄", "HND", "김포", "GMP", 160000, "ke2106", "2024-08-14T09:20:00", "2024-08-14T11:45:00", "korean air");

INSERT INTO ft_flightInfo (reservation_id, dep_airport, dep_iata, arr_airport, arr_iata, price, flight_iat, dep_sch, arr_sch, airline_name)
VALUES (8, "인천", "ICN", "나리타", "NRT", 182930, "bx166", "2024-07-21T15:50:00", "2024-07-21T18:10:00", "air busan");

# 항공사
INSERT INTO ft_airline (id, name) VALUES (1, 'eastar jet');
INSERT INTO ft_airline (id, name) VALUES (2, 'jin air');
INSERT INTO ft_airline (id, name) VALUES (3, 'korean air');
INSERT INTO ft_airline (id, name) VALUES (4, 'jeju air');
INSERT INTO ft_airline (id, name) VALUES (5, 'air busan');

# 리뷰
INSERT INTO ft_review (flightinfo_id, title, lounge_rate, procedure_rate, clean_rate, seat_rate, service_rate, flightmeal_rate, content, date, airline_id)
VALUES  (1, '이스타 항공 그저 그래요', 3, 3, 4, 3, 3, 3, '무난하게 이용하기 좋아요!', now(), '1');

INSERT INTO ft_review (flightinfo_id, title, lounge_rate, procedure_rate, clean_rate, seat_rate, service_rate, flightmeal_rate, content, date, airline_id)
VALUES  (2, '진에어 친절해요!', 4, 4, 5, 4, 4, 4, '승무원분도 항공사도 너무 좋았어요!', now(), '2');

INSERT INTO ft_review (flightinfo_id, title, lounge_rate, procedure_rate, clean_rate, seat_rate, service_rate, flightmeal_rate, content, date, airline_id)
VALUES  (3, '역시 항공사는 대한항공!', 5, 5, 5, 5, 5, 5, '유명한 항공사인만큼 이용하기 너무너무 좋아요!', now(), '3');

INSERT INTO ft_review (flightinfo_id, title, lounge_rate, procedure_rate, clean_rate, seat_rate, service_rate, flightmeal_rate, content, date, airline_id)
VALUES  (4, '제주에어 추천해요~', 3, 3, 4, 4, 4, 3, '짧은 비행할 때 이용하기 좋아요~', now(), '4');

INSERT INTO ft_review (flightinfo_id, title, lounge_rate, procedure_rate, clean_rate, seat_rate, service_rate, flightmeal_rate, content, date, airline_id)
VALUES  (5, '에어부산 쾌적하고 좋아요~!', 4, 5, 5, 5, 5, 4, '비행기도 깨끗하면서 넓고 모두 친절하셔서 여행 즐겁게 다녀왔어요!', now(), '5');

# 리뷰 아이디 추가
UPDATE ft_flightInfo SET review_id = 1 WHERE id = 1;
UPDATE ft_flightInfo SET review_id = 2 WHERE id = 2;
UPDATE ft_flightInfo SET review_id = 3 WHERE id = 3;
UPDATE ft_flightInfo SET review_id = 4 WHERE id = 4;
UPDATE ft_flightInfo SET review_id = 5 WHERE id = 5;

# 쿠폰
INSERT INTO FT_COUPON (code, percent, description, airline_name)
VALUES ('COUPON2024', 20, '2024년 특별 할인 쿠폰', 'All');

INSERT INTO FT_COUPON (code, percent, description, airline_name)
VALUES ('SUMMER2024', 15, '여름 한정 할인 쿠폰', 'All');

INSERT INTO FT_COUPON (code, percent, description, airline_name)
VALUES ('WINTER2024', 25, '겨울 할인 쿠폰', 'All');

INSERT INTO FT_COUPON (code, percent, description, airline_name)
VALUES ('SPRING2024', 10, '봄 맞이 할인 쿠폰', 'All');

# 일정
INSERT INTO ft_schedule (title, edit_date)
VALUES ('제주도 가자!', "2024-07-21T15:50:00");
INSERT INTO ft_schedule (title, edit_date)
VALUES ('프랑스 가자!', "2024-07-30T3:50:00");
INSERT INTO ft_schedule (title, edit_date)
VALUES ('흑흑', "2024-08-01T3:50:00");

INSERT INTO ft_participation (user_id, schedule_id)
VALUES (1, 1);
INSERT INTO ft_participation (user_id, schedule_id)
VALUES (1, 2);
INSERT INTO ft_participation (user_id, schedule_id)
VALUES (1, 3);


