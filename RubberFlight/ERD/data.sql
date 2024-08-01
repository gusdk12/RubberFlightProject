# INSERT INTO FT_USER (username, password, roles , name, email, tel, image) VALUES ('user1', '1234', 'ROLE_MEMBER', '유인아', 'berry@naver.com', '010-4567-5215', 'user.png');
# INSERT INTO FT_USER (username, password, roles , name, email, tel, image) VALUES ('admin1', '1234', 'ROLE_ADMIN', '사장님', 'king@naver.com', '010-8956-1245', 'user.png');


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

# 공항
# INSERT INTO ft_airport (longitude_airport)