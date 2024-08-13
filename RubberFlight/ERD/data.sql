# 유저
# INSERT INTO FT_USER (username, password, role , name, email, tel, image) VALUES ('USER1', '$2a$10$4Ebd4IBQaURqIBekekR/yeMKSuES6KnoRJ5SRYaQ8j5ScaYpW2tZK', 'ROLE_MEMBER', '유인아', 'berry@naver.com', '010-4567-5215', 'http://localhost:8282/uploads/user.png');
# INSERT INTO FT_USER (username, password, role , name, email, tel, image) VALUES ('ADMIN1', '$2a$10$4Ebd4IBQaURqIBekekR/yeMKSuES6KnoRJ5SRYaQ8j5ScaYpW2tZK', 'ROLE_ADMIN', '사장님', 'king@naver.com', '010-8956-1245', 'http://localhost:8282/uploads/user.png');
#
# UPDATE ft_user Set image = "http://localhost:8282/uploads/user.png" where id =1;
# UPDATE ft_user Set image = "http://localhost:8282/uploads/user.png" where id =2;
# 나라
# API : codeIso2Country, nameCountry, countryId
INSERT INTO ft_country (country_iso, country_name, country_id) VALUES ('KR','South Korea', 124); #대한민국
INSERT INTO ft_country (country_iso, country_name, country_id) VALUES ('DK','Denmark', 61); #덴마크
INSERT INTO ft_country (country_iso, country_name, country_id) VALUES ('NL','Netherlands', 168); #네덜란드
INSERT INTO ft_country (country_iso, country_name, country_id) VALUES ('RU','Russia', 193); #러시아
INSERT INTO ft_country (country_iso, country_name, country_id) VALUES ('MY','Malaysia', 160); #말레이시아
INSERT INTO ft_country (country_iso, country_name, country_id) VALUES ('US','United States', 235); #미국
INSERT INTO ft_country (country_iso, country_name, country_id) VALUES ('VN','Vietnam', 243); #베트남
INSERT INTO ft_country (country_iso, country_name, country_id) VALUES ('CH','Switzerland', 44); #스위스
INSERT INTO ft_country (country_iso, country_name, country_id) VALUES ('SG','Singapore', 200); #싱가포르
INSERT INTO ft_country (country_iso, country_name, country_id) VALUES ('IS','Iceland', 111); #아이슬란드
INSERT INTO ft_country (country_iso, country_name, country_id) VALUES ('UA','Ukraine', 232); #우크라이나
INSERT INTO ft_country (country_iso, country_name, country_id) VALUES ('JP','Japan', 116); #일본

# 공항
# API : codeIataAirport, nameAirport, FK, airportId, latitudeAirport, longitudeAirport

# 대한민국
INSERT INTO ft_airport (airport_iso, airport_name, country_iso, country_id, airport_id , latitude_airport, longitude_airport, timezone)
VALUES ('GMP', 'Gimpo Airport', 'KR', 1, 2660, 37.559288, 126.80351,"Asia/Seoul");

INSERT INTO ft_airport (airport_iso, airport_name, country_iso, country_id, airport_id , latitude_airport, longitude_airport, timezone)
VALUES ('ICN', 'Seoul (Incheon)', 'KR', 1, 3183, 37.448524, 126.45123, "Asia/Seoul");

# 미국
INSERT INTO ft_airport (airport_iso, airport_name, country_iso, country_id, airport_id , latitude_airport, longitude_airport, timezone)
VALUES ('LAX', 'Los Angeles International', 'US', 6, 4189, 33.943398, -118.40828, "America/Los_Angeles");

# 싱가포르
INSERT INTO ft_airport (airport_iso, airport_name, country_iso, country_id, airport_id , latitude_airport, longitude_airport, timezone)
VALUES ('SIN', 'Singapore Changi','SG', 9, 7111, 1.361173, 103.990204, "Asia/Singapore");

# 일본(나리타)
INSERT INTO ft_airport (airport_iso, airport_name, country_iso, country_id, airport_id , latitude_airport, longitude_airport, timezone)
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
INSERT INTO ft_reservation (user_id, personnel, isended) VALUES (1, "성인1", false);
INSERT INTO ft_reservation (user_id, personnel, isended) VALUES (1, "성인1,소아2", false);
INSERT INTO ft_reservation (user_id, personnel, isended) VALUES (1, "성인1,소아2", false);

# 예약 비행정보
INSERT INTO ft_flightInfo (reservation_id, dep_airport, dep_iata, arr_airport, arr_iata, price, flight_iat, dep_sch, arr_sch, airline_name, dep_terminal, dep_gate, arr_terminal, arr_gate)
VALUES (1, "인천", "ICN", "나리타", "NRT", 198700, "ze593", "2024-07-20T20:30:00", "2024-07-20T23:25:00", "eastar jet", "1", "12", "2", "10");

INSERT INTO ft_flightInfo (reservation_id, dep_airport, dep_iata, arr_airport, arr_iata, price, flight_iat, dep_sch, arr_sch, airline_name, dep_terminal, dep_gate, arr_terminal, arr_gate)
VALUES (2, "인천", "ICN", "나리타", "NRT", 123700, "lj209", "2024-07-20T14:45:00", "2024-07-20T17:10:00", "jin air", "1", "12", "2", "10");

INSERT INTO ft_flightInfo (reservation_id, dep_airport, dep_iata, arr_airport, arr_iata, price, flight_iat, dep_sch, arr_sch, airline_name, dep_terminal, dep_gate, arr_terminal, arr_gate)
VALUES (3, "김포", "GMP", "제주", "CJU", 107600, "ke1049", "2024-07-20T09:00:00", "2024-07-20T10:10:00", "korean air", "1", "12", "2", "10");

INSERT INTO ft_flightInfo (reservation_id, dep_airport, dep_iata, arr_airport, arr_iata, price, flight_iat, dep_sch, arr_sch, airline_name, dep_terminal, dep_gate, arr_terminal, arr_gate)
VALUES (4, "김포", "GMP", "제주", "CJU", 95640, "7c109", "2024-07-20T09:00:00", "2024-07-20T10:10:00", "jeju air", "1", "12", "2", "10");

INSERT INTO ft_flightInfo (reservation_id, dep_airport, dep_iata, arr_airport, arr_iata, price, flight_iat, dep_sch, arr_sch, airline_name, dep_terminal, dep_gate, arr_terminal, arr_gate)
VALUES (5, "인천", "ICN", "나리타", "NRT", 182930, "bx166", "2024-07-21T15:50:00", "2024-07-21T18:10:00", "air busan", "1", "12", "2", "10");

INSERT INTO ft_flightInfo (reservation_id, dep_airport, dep_iata, arr_airport, arr_iata, price, flight_iat, dep_sch, arr_sch, airline_name, dep_terminal, dep_gate, arr_terminal, arr_gate)
VALUES (6, "인천", "ICN", "오사카", "KIX", 150000, "ke723", "2024-08-13T09:35:00", "2024-08-13T11:20:00", "korean air", "1", "12", "2", "10");

INSERT INTO ft_flightInfo (reservation_id, dep_airport, dep_iata, arr_airport, arr_iata, price, flight_iat, dep_sch, arr_sch, airline_name, dep_terminal, dep_gate, arr_terminal, arr_gate)
VALUES (7, "도쿄", "HND", "김포", "GMP", 160000, "ke2106", "2024-08-14T09:20:00", "2024-08-14T11:45:00", "korean air", "1", "12", "2", "10");

INSERT INTO ft_flightInfo (reservation_id, dep_airport, dep_iata, arr_airport, arr_iata, price, flight_iat, dep_sch, arr_sch, airline_name, dep_terminal, dep_gate, arr_terminal, arr_gate)
VALUES (8, "인천", "ICN", "나리타", "NRT", 182930, "bx166", "2024-07-21T15:50:00", "2024-07-21T18:10:00", "air busan", "1", "12", "2", "10");

INSERT INTO ft_flightInfo (reservation_id, dep_airport, dep_iata, arr_airport, arr_iata, price, flight_iat, dep_sch, arr_sch, airline_name, dep_terminal, dep_gate, arr_terminal, arr_gate)
VALUES (10, "인천", "ICN", "SYD", "SYD", 182930, "KE401", "2024-08-11T18:55:00", "2024-08-12T06:20:00", "Korean Air", "1", "12", "2", "10");

INSERT INTO ft_flightInfo (reservation_id, dep_airport, dep_iata, arr_airport, arr_iata, price, flight_iat, dep_sch, arr_sch, airline_name, dep_terminal, dep_gate, arr_terminal, arr_gate)
VALUES (20, "인천", "ICN", "CAN", "CAN", 182930, "CZ340", "2024-08-12T10:45:00.000", "2024-08-12T13:40:00.000", "China Southern Airlines", "1", "123", "2", "11");

INSERT INTO ft_flightInfo (reservation_id, dep_airport, dep_iata, arr_airport, arr_iata, price, flight_iat, dep_sch, arr_sch, airline_name, dep_terminal, dep_gate, arr_terminal, arr_gate)
VALUES (18, "인천", "ICN", "KUL", "KUL", 182230, "ID821", "2024-08-12T06:50:00.000", "2024-08-12T12:30:00.000", "Batik Air", "1", "46", "1", "11");

INSERT INTO ft_flightInfo (reservation_id, dep_airport, dep_iata, arr_airport, arr_iata, price, flight_iat, dep_sch, arr_sch, airline_name, dep_terminal, dep_gate, arr_terminal, arr_gate)
VALUES (19, "인천", "ICN", "KUL", "KUL", 182230, "ID821", "2024-08-12T06:50:00.000", "2024-08-12T12:30:00.000", "Batik Air", "1", "46", "1", "11");

INSERT INTO ft_flightInfo (reservation_id, dep_airport, dep_iata, arr_airport, arr_iata, price, flight_iat, dep_sch, arr_sch, airline_name, dep_terminal, dep_gate, arr_terminal, arr_gate)
VALUES (19, "KIX", "KIX", "인천", "ICN", 212930, "oz111", "2024-08-12T10:50:00.000","2024-08-12T12:40:00.000", "ANA", "1", "123", "2", "11");

INSERT INTO ft_flightInfo (reservation_id, dep_airport, dep_iata, arr_airport, arr_iata, price, flight_iat, dep_sch, arr_sch, airline_name, dep_terminal, dep_gate, arr_terminal, arr_gate)
VALUES (24, "ICN", "ICN", "KIX", "KIX", 212930, "H15881",  "2024-08-12T12:05:00.000","2024-08-12T14:00:00.000", "t'way air", "1", "26", "1", "14");

INSERT INTO ft_flightInfo (reservation_id, dep_airport, dep_iata, arr_airport, arr_iata, price, flight_iat, dep_sch, arr_sch, airline_name, dep_terminal, dep_gate, arr_terminal, arr_gate)
VALUES (24, "KIX", "KIX", "ICN","ICN", 212930, "BX171",  "2024-08-12T12:50:00.000","2024-08-12T14:50:00.000", "Air Busan", "1", "3", "1", "128");

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

INSERT INTO ft_coupon_users (FT_COUPON_id, users_id) VALUES (1, 1);
INSERT INTO ft_coupon_users (FT_COUPON_id, users_id) VALUES (2, 1);
INSERT INTO ft_coupon_users (FT_COUPON_id, users_id) VALUES (3, 1);
INSERT INTO ft_coupon_users (FT_COUPON_id, users_id) VALUES(4 , 1);


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

INSERT INTO ft_date(schedule_id, date, content)
VALUES (1, "2024-08-01", '흠 머할까여');
INSERT INTO ft_date(schedule_id, date, content)
VALUES (1, "2024-08-02", '이틀 째엔 역시 맛집가야지');
# UPDATE ft_flightinfo
# SET flight_iat = "oz6781"
# WHERE id = 1;

