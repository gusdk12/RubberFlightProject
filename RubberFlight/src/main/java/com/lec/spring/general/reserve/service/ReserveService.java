package com.lec.spring.general.reserve.service;

import com.lec.spring.admin.airport.domain.Airport;
import com.lec.spring.admin.airport.repository.AirportRepository;
import com.lec.spring.general.reserve.domain.Reserve;
import com.lec.spring.general.reserve.repository.ReserveRepository;
import com.lec.spring.general.user.domain.User;
import com.lec.spring.general.user.repository.UserRepository;
import com.lec.spring.member.flightInfo.domain.FlightInfo;
import com.lec.spring.member.flightInfo.repository.FlightInfoRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Random;

@Service
public class ReserveService {
    private final ReserveRepository reserveRepository;
    private final FlightInfoRepository flightInfoRepository;

    private final UserRepository userRepository;

    private final AirportRepository airportRepository;
    public ReserveService(ReserveRepository reserveRepository, FlightInfoRepository flightInfoRepository, UserRepository userRepository, AirportRepository airportRepository) {
        this.reserveRepository = reserveRepository;
        this.flightInfoRepository = flightInfoRepository;
        this.userRepository = userRepository;
        this.airportRepository = airportRepository;
    }

    // save
    public Reserve createReservation(String personnel, FlightInfo depFlightInfo, FlightInfo retFlightInfo) {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = authentication.getName();
        User user = userRepository.findByUsername(username);

        Reserve reservation = Reserve.builder()
                .user(user)
                .personnel(personnel)
                .build();

        if (depFlightInfo != null) {
            reservation.addFlightInfo(depFlightInfo);
        }

        if (retFlightInfo != null) {
            reservation.addFlightInfo(retFlightInfo);
        }

        return reserveRepository.save(reservation);
    }

    // detail
    public Reserve detail(Long id) {
        Reserve reserve = reserveRepository.findById(id).orElse(null);

        if(reserve != null) {
            List<FlightInfo> flightInfos = flightInfoRepository.findByReserveId(reserve.getId());
            reserve.setFlightInfoList(flightInfos);
        }
        return reserve;
    }

    // list? api 사용

    private static final double EARTH_RADIUS = 6371.0; // 지구 반지름 (킬로미터)
    private static final double PRICE_PER_KM_LOW = 180; // 1킬로미터당 저렴한 가격
    private static final double PRICE_PER_KM_HIGH = 250; // 1킬로미터당 비싼 가격


    // 가격 거리 측정
    public double calculateDistance(String departureIata, String arrivalIata) {
        Airport departureAirport = airportRepository.findByAirportIso(departureIata);
        Airport arrivalAirport = airportRepository.findByAirportIso(arrivalIata);

        if (departureAirport == null || arrivalAirport == null) {
            throw new IllegalArgumentException("잘못된 공항 선택입니다");
        }

        double lat1 = Math.toRadians(departureAirport.getLatitudeAirport());    // 출발 공항 위도
        double lon1 = Math.toRadians(departureAirport.getLongitudeAirport());   // 경도
        double lat2 = Math.toRadians(arrivalAirport.getLatitudeAirport());      // 도착 공항 위도
        double lon2 = Math.toRadians(arrivalAirport.getLongitudeAirport());     // 경도

        double deltaLat = lat2 - lat1;
        double deltaLon = lon2 - lon1;

        double a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
                Math.cos(lat1) * Math.cos(lat2) *
                        Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);

        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        return EARTH_RADIUS * c;
    }

    // 랜덤 값 출력
    public int calculateRandomPrice(double distance) {
        Random random = new Random();
        double pricePerKm = random.nextBoolean() ? PRICE_PER_KM_LOW : PRICE_PER_KM_HIGH;
        return (int) (distance * pricePerKm);
    }


}
