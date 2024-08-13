# 유저
INSERT INTO FT_USER (FT_USER.username, FT_USER.password, FT_USER.role , FT_USER.name, FT_USER.email, FT_USER.tel, FT_USER.image) VALUES ('USER1', '$2a$10$4Ebd4IBQaURqIBekekR/yeMKSuES6KnoRJ5SRYaQ8j5ScaYpW2tZK', 'ROLE_MEMBER', '유인아', 'berry@naver.com', '010-4567-5215', 'http://localhost:8282/uploads/user.png');
INSERT INTO FT_USER (FT_USER.username, FT_USER.password, FT_USER.role , FT_USER.name, FT_USER.email, FT_USER.tel, FT_USER.image) VALUES ('ADMIN1', '$2a$10$4Ebd4IBQaURqIBekekR/yeMKSuES6KnoRJ5SRYaQ8j5ScaYpW2tZK', 'ROLE_ADMIN', '사장님', 'king@naver.com', '010-8956-1245', 'http://localhost:8282/uploads/user.png');

# 나라
# API : codeIso2Country, nameCountry, countryId
INSERT INTO ft_country (ft_country.country_iso, ft_country.country_name, ft_country.country_id) VALUES ('KR','South Korea', 124); #대한민국
INSERT INTO ft_country (ft_country.country_iso, ft_country.country_name, ft_country.country_id) VALUES ('DK','Denmark', 61); #덴마크
INSERT INTO ft_country (ft_country.country_iso, ft_country.country_name, ft_country.country_id) VALUES ('NL','Netherlands', 168); #네덜란드
INSERT INTO ft_country (ft_country.country_iso, ft_country.country_name, ft_country.country_id) VALUES ('RU','Russia', 193); #러시아
INSERT INTO ft_country (ft_country.country_iso, ft_country.country_name, ft_country.country_id) VALUES ('MY','Malaysia', 160); #말레이시아
INSERT INTO ft_country (ft_country.country_iso, ft_country.country_name, ft_country.country_id) VALUES ('US','United States', 235); #미국
INSERT INTO ft_country (ft_country.country_iso, ft_country.country_name, ft_country.country_id) VALUES ('VN','Vietnam', 243); #베트남
INSERT INTO ft_country (ft_country.country_iso, ft_country.country_name, ft_country.country_id) VALUES ('CH','Switzerland', 44); #스위스
INSERT INTO ft_country (ft_country.country_iso, ft_country.country_name, ft_country.country_id) VALUES ('SG','Singapore', 200); #싱가포르
INSERT INTO ft_country (ft_country.country_iso, ft_country.country_name, ft_country.country_id) VALUES ('IS','Iceland', 111); #아이슬란드
INSERT INTO ft_country (ft_country.country_iso, ft_country.country_name, ft_country.country_id) VALUES ('UA','Ukraine', 232); #우크라이나
INSERT INTO ft_country (ft_country.country_iso, ft_country.country_name, ft_country.country_id) VALUES ('JP','Japan', 116); #일본

# 공항
# API : codeIataAirport, nameAirport, FK, airportId, latitudeAirport, longitudeAirport

# 대한민국
INSERT INTO ft_airport (ft_airport.airport_iso, ft_airport.airport_name, ft_airport.country_iso, ft_airport.country_id, ft_airport.airport_id , ft_airport.latitude_airport, ft_airport.longitude_airport, ft_airport.timezone)
VALUES ('GMP', 'Gimpo Airport', 'KR', 1, 2660, 37.559288, 126.80351,ft_airport."Asia/Seoul");

INSERT INTO ft_airport (ft_airport.airport_iso, ft_airport.airport_name, ft_airport.country_iso, ft_airport.country_id, ft_airport.airport_id , ft_airport.latitude_airport, ft_airport.longitude_airport, ft_airport.timezone)
VALUES ('ICN', 'Seoul (Incheon)', 'KR', 1, 3183, 37.448524, 126.45123, ft_airport."Asia/Seoul");

# 미국
INSERT INTO ft_airport (ft_airport.airport_iso, ft_airport.airport_name, ft_airport.country_iso, ft_airport.country_id, ft_airport.airport_id , ft_airport.latitude_airport, ft_airport.longitude_airport, ft_airport.timezone)
VALUES ('LAX', 'Los Angeles International', 'US', 6, 4189, 33.943398, -118.40828, ft_airport."America/Los_Angeles");

# 싱가포르
INSERT INTO ft_airport (ft_airport.airport_iso, ft_airport.airport_name, ft_airport.country_iso, ft_airport.country_id, ft_airport.airport_id , ft_airport.latitude_airport, ft_airport.longitude_airport, ft_airport.timezone)
VALUES ('SIN', 'Singapore Changi','SG', 9, 7111, 1.361173, 103.990204, ft_airport."Asia/Singapore");

# 일본(나리타)
INSERT INTO ft_airport (ft_airport.airport_iso, ft_airport.airport_name, ft_airport.country_iso, ft_airport.country_id, ft_airport.airport_id , ft_airport.latitude_airport, ft_airport.longitude_airport, ft_airport.timezone)
VALUES ('NRT', 'Narita', 'JP', 12, 5537, 35.773212, 140.38744, ft_airport."Asia/Tokyo");

# 예약
INSERT INTO ft_reservation (ft_reservation.user_id, ft_reservation.personnel, ft_reservation.isended) VALUES (1, ft_reservation."성인2", true);
INSERT INTO ft_reservation (ft_reservation.user_id, ft_reservation.personnel, ft_reservation.isended) VALUES (1, ft_reservation."성인1", true);
INSERT INTO ft_reservation (ft_reservation.user_id, ft_reservation.personnel, ft_reservation.isended) VALUES (1, ft_reservation."성인3,소아1", true);
INSERT INTO ft_reservation (ft_reservation.user_id, ft_reservation.personnel, ft_reservation.isended) VALUES (1, ft_reservation."성인2,소아2", true);
INSERT INTO ft_reservation (ft_reservation.user_id, ft_reservation.personnel, ft_reservation.isended) VALUES (1, ft_reservation."성인2", true);
INSERT INTO ft_reservation (ft_reservation.user_id, ft_reservation.personnel, ft_reservation.isended) VALUES (1, ft_reservation."성인1,소아1", false);
INSERT INTO ft_reservation (ft_reservation.user_id, ft_reservation.personnel, ft_reservation.isended) VALUES (1, ft_reservation."성인2", false);
INSERT INTO ft_reservation (ft_reservation.user_id, ft_reservation.personnel, ft_reservation.isended) VALUES (1, ft_reservation."성인1", true);
INSERT INTO ft_reservation (ft_reservation.user_id, ft_reservation.personnel, ft_reservation.isended) VALUES (1, ft_reservation."성인1", false);
INSERT INTO ft_reservation (ft_reservation.user_id, ft_reservation.personnel, ft_reservation.isended) VALUES (1, ft_reservation."성인1,소아2", false);
INSERT INTO ft_reservation (ft_reservation.user_id, ft_reservation.personnel, ft_reservation.isended) VALUES (1, ft_reservation."성인1,소아2", false);

# 예약 비행정보
INSERT INTO ft_flightInfo (ft_flightInfo.reservation_id, ft_flightInfo.dep_airport, ft_flightInfo.dep_iata, ft_flightInfo.arr_airport, ft_flightInfo.arr_iata, ft_flightInfo.price, ft_flightInfo.flight_iat, ft_flightInfo.dep_sch, ft_flightInfo.arr_sch, ft_flightInfo.airline_name, ft_flightInfo.dep_terminal, ft_flightInfo.dep_gate, ft_flightInfo.arr_terminal, ft_flightInfo.arr_gate)
VALUES (1, ft_flightInfo."인천", ft_flightInfo."ICN", ft_flightInfo."나리타", ft_flightInfo."NRT", 198700, ft_flightInfo."ze593", ft_flightInfo."2024-07-20T20:30:00", ft_flightInfo."2024-07-20T23:25:00", ft_flightInfo."eastar jet", ft_flightInfo."1", ft_flightInfo."12", ft_flightInfo."2", ft_flightInfo."10");

INSERT INTO ft_flightInfo (ft_flightInfo.reservation_id, ft_flightInfo.dep_airport, ft_flightInfo.dep_iata, ft_flightInfo.arr_airport, ft_flightInfo.arr_iata, ft_flightInfo.price, ft_flightInfo.flight_iat, ft_flightInfo.dep_sch, ft_flightInfo.arr_sch, ft_flightInfo.airline_name, ft_flightInfo.dep_terminal, ft_flightInfo.dep_gate, ft_flightInfo.arr_terminal, ft_flightInfo.arr_gate)
VALUES (2, ft_flightInfo."인천", ft_flightInfo."ICN", ft_flightInfo."나리타", ft_flightInfo."NRT", 123700, ft_flightInfo."lj209", ft_flightInfo."2024-07-20T14:45:00", ft_flightInfo."2024-07-20T17:10:00", ft_flightInfo."jin air", ft_flightInfo."1", ft_flightInfo."12", ft_flightInfo."2", ft_flightInfo."10");

INSERT INTO ft_flightInfo (ft_flightInfo.reservation_id, ft_flightInfo.dep_airport, ft_flightInfo.dep_iata, ft_flightInfo.arr_airport, ft_flightInfo.arr_iata, ft_flightInfo.price, ft_flightInfo.flight_iat, ft_flightInfo.dep_sch, ft_flightInfo.arr_sch, ft_flightInfo.airline_name, ft_flightInfo.dep_terminal, ft_flightInfo.dep_gate, ft_flightInfo.arr_terminal, ft_flightInfo.arr_gate)
VALUES (3, ft_flightInfo."김포", ft_flightInfo."GMP", ft_flightInfo."제주", ft_flightInfo."CJU", 107600, ft_flightInfo."ke1049", ft_flightInfo."2024-07-20T09:00:00", ft_flightInfo."2024-07-20T10:10:00", ft_flightInfo."korean air", ft_flightInfo."1", ft_flightInfo."12", ft_flightInfo."2", ft_flightInfo."10");

INSERT INTO ft_flightInfo (ft_flightInfo.reservation_id, ft_flightInfo.dep_airport, ft_flightInfo.dep_iata, ft_flightInfo.arr_airport, ft_flightInfo.arr_iata, ft_flightInfo.price, ft_flightInfo.flight_iat, ft_flightInfo.dep_sch, ft_flightInfo.arr_sch, ft_flightInfo.airline_name, ft_flightInfo.dep_terminal, ft_flightInfo.dep_gate, ft_flightInfo.arr_terminal, ft_flightInfo.arr_gate)
VALUES (4, ft_flightInfo."김포", ft_flightInfo."GMP", ft_flightInfo."제주", ft_flightInfo."CJU", 95640, ft_flightInfo."7c109", ft_flightInfo."2024-07-20T09:00:00", ft_flightInfo."2024-07-20T10:10:00", ft_flightInfo."jeju air", ft_flightInfo."1", ft_flightInfo."12", ft_flightInfo."2", ft_flightInfo."10");

INSERT INTO ft_flightInfo (ft_flightInfo.reservation_id, ft_flightInfo.dep_airport, ft_flightInfo.dep_iata, ft_flightInfo.arr_airport, ft_flightInfo.arr_iata, ft_flightInfo.price, ft_flightInfo.flight_iat, ft_flightInfo.dep_sch, ft_flightInfo.arr_sch, ft_flightInfo.airline_name, ft_flightInfo.dep_terminal, ft_flightInfo.dep_gate, ft_flightInfo.arr_terminal, ft_flightInfo.arr_gate)
VALUES (5, ft_flightInfo."인천", ft_flightInfo."ICN", ft_flightInfo."나리타", ft_flightInfo."NRT", 182930, ft_flightInfo."bx166", ft_flightInfo."2024-07-21T15:50:00", ft_flightInfo."2024-07-21T18:10:00", ft_flightInfo."air busan", ft_flightInfo."1", ft_flightInfo."12", ft_flightInfo."2", ft_flightInfo."10");

INSERT INTO ft_flightInfo (ft_flightInfo.reservation_id, ft_flightInfo.dep_airport, ft_flightInfo.dep_iata, ft_flightInfo.arr_airport, ft_flightInfo.arr_iata, ft_flightInfo.price, ft_flightInfo.flight_iat, ft_flightInfo.dep_sch, ft_flightInfo.arr_sch, ft_flightInfo.airline_name, ft_flightInfo.dep_terminal, ft_flightInfo.dep_gate, ft_flightInfo.arr_terminal, ft_flightInfo.arr_gate)
VALUES (6, ft_flightInfo."인천", ft_flightInfo."ICN", ft_flightInfo."오사카", ft_flightInfo."KIX", 150000, ft_flightInfo."ke723", ft_flightInfo."2024-08-13T09:35:00", ft_flightInfo."2024-08-13T11:20:00", ft_flightInfo."korean air", ft_flightInfo."1", ft_flightInfo."12", ft_flightInfo."2", ft_flightInfo."10");

INSERT INTO ft_flightInfo (ft_flightInfo.reservation_id, ft_flightInfo.dep_airport, ft_flightInfo.dep_iata, ft_flightInfo.arr_airport, ft_flightInfo.arr_iata, ft_flightInfo.price, ft_flightInfo.flight_iat, ft_flightInfo.dep_sch, ft_flightInfo.arr_sch, ft_flightInfo.airline_name, ft_flightInfo.dep_terminal, ft_flightInfo.dep_gate, ft_flightInfo.arr_terminal, ft_flightInfo.arr_gate)
VALUES (7, ft_flightInfo."도쿄", ft_flightInfo."HND", ft_flightInfo."김포", ft_flightInfo."GMP", 160000, ft_flightInfo."ke2106", ft_flightInfo."2024-08-14T09:20:00", ft_flightInfo."2024-08-14T11:45:00", ft_flightInfo."korean air", ft_flightInfo."1", ft_flightInfo."12", ft_flightInfo."2", ft_flightInfo."10");

INSERT INTO ft_flightInfo (ft_flightInfo.reservation_id, ft_flightInfo.dep_airport, ft_flightInfo.dep_iata, ft_flightInfo.arr_airport, ft_flightInfo.arr_iata, ft_flightInfo.price, ft_flightInfo.flight_iat, ft_flightInfo.dep_sch, ft_flightInfo.arr_sch, ft_flightInfo.airline_name, ft_flightInfo.dep_terminal, ft_flightInfo.dep_gate, ft_flightInfo.arr_terminal, ft_flightInfo.arr_gate)
VALUES (8, ft_flightInfo."인천", ft_flightInfo."ICN", ft_flightInfo."나리타", ft_flightInfo."NRT", 182930, ft_flightInfo."bx166", ft_flightInfo."2024-07-21T15:50:00", ft_flightInfo."2024-07-21T18:10:00", ft_flightInfo."air busan", ft_flightInfo."1", ft_flightInfo."12", ft_flightInfo."2", ft_flightInfo."10");

INSERT INTO ft_flightInfo (ft_flightInfo.reservation_id, ft_flightInfo.dep_airport, ft_flightInfo.dep_iata, ft_flightInfo.arr_airport, ft_flightInfo.arr_iata, ft_flightInfo.price, ft_flightInfo.flight_iat, ft_flightInfo.dep_sch, ft_flightInfo.arr_sch, ft_flightInfo.airline_name, ft_flightInfo.dep_terminal, ft_flightInfo.dep_gate, ft_flightInfo.arr_terminal, ft_flightInfo.arr_gate)
VALUES (10, ft_flightInfo."인천", ft_flightInfo."ICN", ft_flightInfo."SYD", ft_flightInfo."SYD", 182930, ft_flightInfo."KE401", ft_flightInfo."2024-08-11T18:55:00", ft_flightInfo."2024-08-12T06:20:00", ft_flightInfo."Korean Air", ft_flightInfo."1", ft_flightInfo."12", ft_flightInfo."2", ft_flightInfo."10");

INSERT INTO ft_flightInfo (ft_flightInfo.reservation_id, ft_flightInfo.dep_airport, ft_flightInfo.dep_iata, ft_flightInfo.arr_airport, ft_flightInfo.arr_iata, ft_flightInfo.price, ft_flightInfo.flight_iat, ft_flightInfo.dep_sch, ft_flightInfo.arr_sch, ft_flightInfo.airline_name, ft_flightInfo.dep_terminal, ft_flightInfo.dep_gate, ft_flightInfo.arr_terminal, ft_flightInfo.arr_gate)
VALUES (20, ft_flightInfo."인천", ft_flightInfo."ICN", ft_flightInfo."CAN", ft_flightInfo."CAN", 182930, ft_flightInfo."CZ340", ft_flightInfo."2024-08-12T10:45:00.000", ft_flightInfo."2024-08-12T13:40:00.000", ft_flightInfo."China Southern Airlines", ft_flightInfo."1", ft_flightInfo."123", ft_flightInfo."2", ft_flightInfo."11");

INSERT INTO ft_flightInfo (ft_flightInfo.reservation_id, ft_flightInfo.dep_airport, ft_flightInfo.dep_iata, ft_flightInfo.arr_airport, ft_flightInfo.arr_iata, ft_flightInfo.price, ft_flightInfo.flight_iat, ft_flightInfo.dep_sch, ft_flightInfo.arr_sch, ft_flightInfo.airline_name, ft_flightInfo.dep_terminal, ft_flightInfo.dep_gate, ft_flightInfo.arr_terminal, ft_flightInfo.arr_gate)
VALUES (18, ft_flightInfo."인천", ft_flightInfo."ICN", ft_flightInfo."KUL", ft_flightInfo."KUL", 182230, ft_flightInfo."ID821", ft_flightInfo."2024-08-12T06:50:00.000", ft_flightInfo."2024-08-12T12:30:00.000", ft_flightInfo."Batik Air", ft_flightInfo."1", ft_flightInfo."46", ft_flightInfo."1", ft_flightInfo."11");

INSERT INTO ft_flightInfo (ft_flightInfo.reservation_id, ft_flightInfo.dep_airport, ft_flightInfo.dep_iata, ft_flightInfo.arr_airport, ft_flightInfo.arr_iata, ft_flightInfo.price, ft_flightInfo.flight_iat, ft_flightInfo.dep_sch, ft_flightInfo.arr_sch, ft_flightInfo.airline_name, ft_flightInfo.dep_terminal, ft_flightInfo.dep_gate, ft_flightInfo.arr_terminal, ft_flightInfo.arr_gate)
VALUES (19, ft_flightInfo."인천", ft_flightInfo."ICN", ft_flightInfo."KUL", ft_flightInfo."KUL", 182230, ft_flightInfo."ID821", ft_flightInfo."2024-08-12T06:50:00.000", ft_flightInfo."2024-08-12T12:30:00.000", ft_flightInfo."Batik Air", ft_flightInfo."1", ft_flightInfo."46", ft_flightInfo."1", ft_flightInfo."11");

INSERT INTO ft_flightInfo (ft_flightInfo.reservation_id, ft_flightInfo.dep_airport, ft_flightInfo.dep_iata, ft_flightInfo.arr_airport, ft_flightInfo.arr_iata, ft_flightInfo.price, ft_flightInfo.flight_iat, ft_flightInfo.dep_sch, ft_flightInfo.arr_sch, ft_flightInfo.airline_name, ft_flightInfo.dep_terminal, ft_flightInfo.dep_gate, ft_flightInfo.arr_terminal, ft_flightInfo.arr_gate)
VALUES (19, ft_flightInfo."KIX", ft_flightInfo."KIX", ft_flightInfo."인천", ft_flightInfo."ICN", 212930, ft_flightInfo."oz111", ft_flightInfo."2024-08-12T10:50:00.000",ft_flightInfo."2024-08-12T12:40:00.000", ft_flightInfo."ANA", ft_flightInfo."1", ft_flightInfo."123", ft_flightInfo."2", ft_flightInfo."11");

INSERT INTO ft_flightInfo (ft_flightInfo.reservation_id, ft_flightInfo.dep_airport, ft_flightInfo.dep_iata, ft_flightInfo.arr_airport, ft_flightInfo.arr_iata, ft_flightInfo.price, ft_flightInfo.flight_iat, ft_flightInfo.dep_sch, ft_flightInfo.arr_sch, ft_flightInfo.airline_name, ft_flightInfo.dep_terminal, ft_flightInfo.dep_gate, ft_flightInfo.arr_terminal, ft_flightInfo.arr_gate)
VALUES (24, ft_flightInfo."ICN", ft_flightInfo."ICN", ft_flightInfo."KIX", ft_flightInfo."KIX", 212930, ft_flightInfo."H15881",  ft_flightInfo."2024-08-12T12:05:00.000",ft_flightInfo."2024-08-12T14:00:00.000", ft_flightInfo."t'way air", ft_flightInfo."1", ft_flightInfo."26", ft_flightInfo."1", ft_flightInfo."14");

INSERT INTO ft_flightInfo (ft_flightInfo.reservation_id, ft_flightInfo.dep_airport, ft_flightInfo.dep_iata, ft_flightInfo.arr_airport, ft_flightInfo.arr_iata, ft_flightInfo.price, ft_flightInfo.flight_iat, ft_flightInfo.dep_sch, ft_flightInfo.arr_sch, ft_flightInfo.airline_name, ft_flightInfo.dep_terminal, ft_flightInfo.dep_gate, ft_flightInfo.arr_terminal, ft_flightInfo.arr_gate)
VALUES (24, ft_flightInfo."KIX", ft_flightInfo."KIX", ft_flightInfo."ICN",ft_flightInfo."ICN", 212930, ft_flightInfo."BX171",  ft_flightInfo."2024-08-12T12:50:00.000",ft_flightInfo."2024-08-12T14:50:00.000", ft_flightInfo."Air Busan", ft_flightInfo."1", ft_flightInfo."3", ft_flightInfo."1", ft_flightInfo."128");

# 항공사
INSERT INTO ft_airline (ft_airline.id, ft_airline.name) VALUES (1, 'eastar jet');
INSERT INTO ft_airline (ft_airline.id, ft_airline.name) VALUES (2, 'jin air');
INSERT INTO ft_airline (ft_airline.id, ft_airline.name) VALUES (3, 'korean air');
INSERT INTO ft_airline (ft_airline.id, ft_airline.name) VALUES (4, 'jeju air');
INSERT INTO ft_airline (ft_airline.id, ft_airline.name) VALUES (5, 'air busan');

# 리뷰
INSERT INTO ft_review (ft_review.flightinfo_id, ft_review.title, ft_review.lounge_rate, ft_review.procedure_rate, ft_review.clean_rate, ft_review.seat_rate, ft_review.service_rate, ft_review.flightmeal_rate, ft_review.content, ft_review.date, ft_review.airline_id)
VALUES  (1, '이스타 항공 그저 그래요', 3, 3, 4, 3, 3, 3, '무난하게 이용하기 좋아요!', now(), '1');

INSERT INTO ft_review (ft_review.flightinfo_id, ft_review.title, ft_review.lounge_rate, ft_review.procedure_rate, ft_review.clean_rate, ft_review.seat_rate, ft_review.service_rate, ft_review.flightmeal_rate, ft_review.content, ft_review.date, ft_review.airline_id)
VALUES  (2, '진에어 친절해요!', 4, 4, 5, 4, 4, 4, '승무원분도 항공사도 너무 좋았어요!', now(), '2');

INSERT INTO ft_review (ft_review.flightinfo_id, ft_review.title, ft_review.lounge_rate, ft_review.procedure_rate, ft_review.clean_rate, ft_review.seat_rate, ft_review.service_rate, ft_review.flightmeal_rate, ft_review.content, ft_review.date, ft_review.airline_id)
VALUES  (3, '역시 항공사는 대한항공!', 5, 5, 5, 5, 5, 5, '유명한 항공사인만큼 이용하기 너무너무 좋아요!', now(), '3');

INSERT INTO ft_review (ft_review.flightinfo_id, ft_review.title, ft_review.lounge_rate, ft_review.procedure_rate, ft_review.clean_rate, ft_review.seat_rate, ft_review.service_rate, ft_review.flightmeal_rate, ft_review.content, ft_review.date, ft_review.airline_id)
VALUES  (4, '제주에어 추천해요~', 3, 3, 4, 4, 4, 3, '짧은 비행할 때 이용하기 좋아요~', now(), '4');

INSERT INTO ft_review (ft_review.flightinfo_id, ft_review.title, ft_review.lounge_rate, ft_review.procedure_rate, ft_review.clean_rate, ft_review.seat_rate, ft_review.service_rate, ft_review.flightmeal_rate, ft_review.content, ft_review.date, ft_review.airline_id)
VALUES  (5, '에어부산 쾌적하고 좋아요~!', 4, 5, 5, 5, 5, 4, '비행기도 깨끗하면서 넓고 모두 친절하셔서 여행 즐겁게 다녀왔어요!', now(), '5');

# 리뷰 아이디 추가
UPDATE ft_flightInfo SET ft_flightInfo.review_id = 1 WHERE ft_flightInfo.id = 1;
UPDATE ft_flightInfo SET ft_flightInfo.review_id = 2 WHERE ft_flightInfo.id = 2;
UPDATE ft_flightInfo SET ft_flightInfo.review_id = 3 WHERE ft_flightInfo.id = 3;
UPDATE ft_flightInfo SET ft_flightInfo.review_id = 4 WHERE ft_flightInfo.id = 4;
UPDATE ft_flightInfo SET ft_flightInfo.review_id = 5 WHERE ft_flightInfo.id = 5;

# 쿠폰
INSERT INTO FT_COUPON (FT_COUPON.code, FT_COUPON.percent, FT_COUPON.description, FT_COUPON.airline_name)
VALUES ('COUPON2024', 20, '2024년 특별 할인 쿠폰', 'All');

INSERT INTO FT_COUPON (FT_COUPON.code, FT_COUPON.percent, FT_COUPON.description, FT_COUPON.airline_name)
VALUES ('SUMMER2024', 15, '여름 한정 할인 쿠폰', 'All');

INSERT INTO FT_COUPON (FT_COUPON.code, FT_COUPON.percent, FT_COUPON.description, FT_COUPON.airline_name)
VALUES ('WINTER2024', 25, '겨울 할인 쿠폰', 'All');

INSERT INTO FT_COUPON (FT_COUPON.code, FT_COUPON.percent, FT_COUPON.description, FT_COUPON.airline_name)
VALUES ('SPRING2024', 10, '봄 맞이 할인 쿠폰', 'All');

# 일정
INSERT INTO ft_schedule (ft_schedule.title, ft_schedule.edit_date)
VALUES ('제주도 가자!', ft_schedule."2024-07-21T15:50:00");
INSERT INTO ft_schedule (ft_schedule.title, ft_schedule.edit_date)
VALUES ('프랑스 가자!', ft_schedule."2024-07-30T3:50:00");
INSERT INTO ft_schedule (ft_schedule.title, ft_schedule.edit_date)
VALUES ('흑흑', ft_schedule."2024-08-01T3:50:00");

INSERT INTO ft_participation (ft_participation.user_id, ft_participation.schedule_id)
VALUES (1, 1);
INSERT INTO ft_participation (ft_participation.user_id, ft_participation.schedule_id)
VALUES (1, 2);
INSERT INTO ft_participation (ft_participation.user_id, ft_participation.schedule_id)
VALUES (1, 3);

# UPDATE ft_flightinfo
# SET flight_iat = "oz6781"
# WHERE id = 1;

