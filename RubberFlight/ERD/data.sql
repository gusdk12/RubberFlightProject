



INSERT INTO FT_USER (username, password, role , name, email, tel, image) VALUES ('USER1', '$2a$10$4Ebd4IBQaURqIBekekR/yeMKSuES6KnoRJ5SRYaQ8j5ScaYpW2tZK', 'ROLE_MEMBER', '유인아', 'berry@naver.com', '010-4567-5215', 'user.png');
INSERT INTO FT_USER (username, password, role , name, email, tel, image) VALUES ('ADMIN1', '$2a$10$4Ebd4IBQaURqIBekekR/yeMKSuES6KnoRJ5SRYaQ8j5ScaYpW2tZK', 'ROLE_ADMIN', '사장님', 'king@naver.com', '010-8956-1245', 'user.png');


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
INSERT INTO ft_airport (airport_iso, airport_name, country_id, airport_id , latitude_airport, longitude_airport)
VALUES ('CJU', 'Jeju Airport', 1, 1349, 33.5067, 126.49312);

INSERT INTO ft_airport (airport_iso, airport_name, country_id, airport_id , latitude_airport, longitude_airport)
VALUES ('GMP', 'Gimpo Airport', 1, 2660, 37.559288, 126.80351);

INSERT INTO ft_airport (airport_iso, airport_name, country_id, airport_id , latitude_airport, longitude_airport)
VALUES ('ICN', 'Seoul (Incheon)', 1, 3183, 37.448524, 126.45123);

# 덴마크
INSERT INTO ft_airport (airport_iso, airport_name, country_id, airport_id , latitude_airport, longitude_airport)
VALUES ('AAL', 'Aalborg', 2, 11, 57.08655, 9.872241);

# 네덜란드
INSERT INTO ft_airport (airport_iso, airport_name, country_id, airport_id , latitude_airport, longitude_airport)
VALUES ('AMS', 'Schiphol', 3, 268, 52.30907, 4.763385);

# 러시아
INSERT INTO ft_airport (airport_iso, airport_name, country_id, airport_id , latitude_airport, longitude_airport)
VALUES ('AAQ', 'Anapa', 4, 15, 44.9, 37.316666);

# 말레이시아
INSERT INTO ft_airport (airport_iso, airport_name, country_id, airport_id , latitude_airport, longitude_airport)
VALUES ('GTK', 'Sungei Tekai', 5, 2765, 2.6, 102.916664);

# 미국
INSERT INTO ft_airport (airport_iso, airport_name, country_id, airport_id , latitude_airport, longitude_airport)
VALUES ('AAF', 'Apalachicola Regional', 6, 5, 29.733334, -84.98333);

INSERT INTO ft_airport (airport_iso, airport_name, country_id, airport_id , latitude_airport, longitude_airport)
VALUES ('ACB', 'Antrim County', 6, 52, 44.983334, -85.21667);

# 베트남
INSERT INTO ft_airport (airport_iso, airport_name, country_id, airport_id , latitude_airport, longitude_airport)
VALUES ('BMV', 'Phung-Duc', 7, 833, 12.666667, 108.05);

# 스위스
INSERT INTO ft_airport (airport_iso, airport_name, country_id, airport_id , latitude_airport, longitude_airport)
VALUES ('ACH', 'Altenrhein', 8, 56, 47.483334, 9.566667);

# 싱가포르
INSERT INTO ft_airport (airport_iso, airport_name, country_id, airport_id , latitude_airport, longitude_airport)
VALUES ('QPG', 'Paya Lebar', 9, 6502, 1.35, 103.9);

# 아이슬란드
INSERT INTO ft_airport (airport_iso, airport_name, country_id, airport_id , latitude_airport, longitude_airport)
VALUES ('AEY', 'Akureyri', 10, 113, 65.654564, -18.075068);

# 우크라이나
INSERT INTO ft_airport (airport_iso, airport_name, country_id, airport_id , latitude_airport, longitude_airport)
VALUES ('CKC', 'Cherkassy', 11, 1352, 49.416668, 32);

# 일본(나리타)
INSERT INTO ft_airport (airport_iso, airport_name, country_id, airport_id , latitude_airport, longitude_airport)
VALUES ('NRT', 'Narita', 12, 5537, 35.773212, 140.38744);

INSERT INTO ft_airline (name) VALUE ('아시아나');
INSERT INTO ft_airline (name) VALUE ('대한항공');

INSERT INTO ft_review (title, user_id, airline_id, clean_rate, flightmeal_rate, lounge_rate, procedure_rate, seat_rate, service_rate, content, date)
VALUES ('편하게 이용했어요', 1, 1, 4, 3, 3, 4, 5, 4, '좌석 공간도 넓고 푹신했어요', now());

# 예약
INSERT INTO ft_reservation (user_id, personnel, isended) VALUES (1, "성인2", true);
INSERT INTO ft_reservation (user_id, personnel, isended) VALUES (1, "성인1", true);
INSERT INTO ft_reservation (user_id, personnel, isended) VALUES (1, "성인3,소아1", true);
INSERT INTO ft_reservation (user_id, personnel, isended) VALUES (1, "성인2,소아2", true);
INSERT INTO ft_reservation (user_id, personnel, isended) VALUES (1, "성인2", true);

# 예약 비행정보
INSERT INTO ft_flightInfo (reservation_id, dep_airport, dep_iata, arr_airport, arr_iata, price, flight_iat, dep_sch, arr_sch, airline_name)
VALUES (1, "인천", "ICN", "나리타", "NRT", 198700, "ze593", "2024-07-20T20:30:00", "2024-07-20T23:25:00", "eastar jet");

INSERT INTO ft_flightInfo (reservation_id, dep_airport, dep_iata, arr_airport, arr_iata, price, flight_iat, dep_sch, arr_sch, airline_name)
VALUES (2, "인천", "ICN", "나리타", "NRT", 123700, "lj209", "2024-07-20T14:45:00", "2024-07-20T17:10:00", "jin air");

INSERT INTO ft_flightInfo (reservation_id, dep_airport, dep_iata, arr_airport, arr_iata, price, flight_iat, dep_sch, arr_sch, airline_name)
VALUES (3, "김포", "GMP", "제주", "CJU", 107600, "ke1049", "2024-07-20T09:00:00", "2024-07-20T10:10:00", "korean air");

INSERT INTO ft_flightInfo (reservation_id, dep_airport, dep_iata, arr_airport, arr_iata, price, flight_iat, dep_sch, arr_sch, airline_name)
VALUES (4, "김포", "GMP", " 제주", "CJU", 95640, "7c109", "2024-07-20T09:00:00", "2024-07-20T10:10:00", "jeju air");

INSERT INTO ft_flightInfo (reservation_id, dep_airport, dep_iata, arr_airport, arr_iata, price, flight_iat, dep_sch, arr_sch, airline_name)
VALUES (5, "인천", "ICN", "나리타", "NRT", 182930, "bx166", "2024-07-21T15:50:00", "2024-07-21t18:10:00", "air busan");