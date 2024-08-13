SELECT * FROM ft_country;
SELECT * FROM ft_airport;

SELECT * FROM ft_user;

SELECT username, password, image FROM ft_user;

SELECT * FROM ft_review;

SELECT * FROM ft_airline;
SELECT * FROM ft_reservation;
SELECT * FROM ft_flightinfo;
SELECT * FROM ft_checklist_list;
SELECT * FROM ft_checklist_item;

SELECT * FROM ft_schedule;
SELECT * FROM ft_participation;
SELECT * FROM ft_date;

DESCRIBE ft_review;
DESCRIBE ft_airline;

# delete from ft_flightinfo
# where id=26;
#
# update ft_flightinfo
# set arr_sch = "2024-08-12T14:05:00.000"
# where id=28;