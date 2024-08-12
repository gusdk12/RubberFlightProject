import { Button, styled } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import style from '../css/reserve.module.css';
import { PiAirplaneTakeoffBold } from "react-icons/pi";
import { RiArrowRightDoubleFill } from "react-icons/ri";
import { PiDotOutline } from "react-icons/pi";
import { TfiLayoutLineSolid } from "react-icons/tfi";
import Cookies from 'js-cookie';

const Reserve = () => {
  // 유저 정보 받기
  const [buyerName, setBuyerName] = useState('');
  const [buyerTel, setBuyerTel] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');

    const location = useLocation();
    const { flight, passengers } = location.state || {};
    const navigate = useNavigate();

    useEffect(() => {
      const script = document.createElement('script');
      script.src = 'https://cdn.iamport.kr/v1/iamport.js';
      script.async = true;
      document.body.appendChild(script);
  
      return () => {
        document.body.removeChild(script);
      };
    }, []);

    
    const isRoundTrip = () => {
      return flight.outbound && flight.inbound;
    }

    const isRoundTripValue = isRoundTrip();

    const onClickPayment = () => {
        if (!window.IMP) return;
        /* 1. 가맹점 식별하기 */
        const { IMP } = window;
        IMP.init("imp28617244"); // 가맹점 식별코드
    
        /* 2. 결제 데이터 정의하기 */
        const data = {
          pg: "html5_inicis",
          pay_method: "card",
          merchant_uid: `mid_${new Date().getTime()}`,
          amount:  isRoundTripValue ? flight.outbound.price + flight.inbound.price : flight.price,
          name: "RubberFlight",
          buyer_name: buyerName,
          buyer_tel: buyerTel,
          buyer_email: buyerEmail,
          buyer_addr: "서울특별시 강남구 역삼동 822-2",
          buyer_postcode: "06236",
        };
    
        /* 4. 결제 창 호출하기 */
        IMP.request_pay(data, callback);
      };
    
      /* 3. 콜백 함수 정의하기 */
      function callback(response) {
        const { success, error_msg } = response;
    
        if (success) {
          window.alert("결제 성공");
          const reservationData = {
            personnel: passengers,
            isRoundTrip: isRoundTripValue,
            outboundFlight: isRoundTripValue ? flight.outbound : flight,
            inboundFlight: isRoundTripValue ? flight.inbound : null
          };
          
          console.log(passengers);
          console.log(isRoundTripValue);
          console.log(flight.outbound);
          console.log(flight);
          console.log(flight.inbound);

     

          const token = Cookies.get('accessToken');

          fetch('http://localhost:8282/reservation', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(reservationData),
          })
          .then(response => response.json())
          .then(data => {
            console.log("예약성공: ", data);
            console.log('Sending reservation data:', JSON.stringify(reservationData, null, 2));
            navigate('/mypage/flight-info');
          })
          .catch(error => {
            console.error('예약실패: ', error);
            window.alert('예약 처리 중 오류 발생');
          })
        } else {
          window.alert(`결제 실패: ${error_msg}`);
        }
      } 
    


    return (
        <>
        <div className={style.box}>
        <div className={style.boxTitle}>
          <div className={style.boxFont}>선택한 항공권</div>
        </div>

        {flight.outbound && flight.inbound ? (
        <>
          <div className={style.airportInfo}>
            <div className={style.depAirportInfo}>
              <div className={style.airportIcon}><PiAirplaneTakeoffBold /></div>
              <h2>가는 항공편</h2>
              <div className={style.airports}>
                <div>{flight.outbound.depAirport}</div>
                <div className={style.airportArrow}><RiArrowRightDoubleFill /></div>
                <div>{flight.outbound.arrAirport}</div>
              </div>
            </div>
            <div className={style.ticket}>
              <div>{flight.outbound.airlineName}</div>
              <div>{flight.outbound.depDayFormat}<br/>
                {flight.outbound.depTime}</div>
              <div className={style.duringTime}><PiDotOutline /></div>
              <div className={style.line}>{flight.outbound.takeTimeFormat}<div className={style.type}>직항</div></div>
              <div className={style.duringTime2}><PiDotOutline /></div>
              <div>{flight.outbound.arrDayFormat}<br/>
                {flight.outbound.arrTime}</div>
              <div>{flight.outbound.price}</div>
            </div>
          </div>
        </>
      ) : (
        <>
          <h2>편도 항공편</h2>
          <div>항공사: {flight.airlineName}</div>
          <div>출발 공항: {flight.depAirport}</div>
          <div>도착 공항: {flight.arrAirport}</div>
          <div>출발 날짜: {flight.depTime}</div>
          <div>도착 날짜: {flight.arrTime}</div>
          <div>가격: {flight.price}</div>
        </>
      )}
      
      <div className={style.userInfo}>
        <h2>상품 결제 정보</h2> 
        <div>인원 수: {passengers}</div>
        <div>총 가격:  { flight.outbound && flight.inbound 
    ? (flight.outbound.price + flight.inbound.price).toLocaleString('ko-KR') 
    : flight.price.toLocaleString('ko-KR')}</div>
        <Button onClick={onClickPayment}>결제하기</Button>
      </div>

      <div className={style.payUserInfo}>
      <h2>결제자 정보 입력</h2>
      <label>
        구매자 이름:
        <input
          type="text"
          value={buyerName}
          onChange={(e) => setBuyerName(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        전화번호:
        <input
          type="tel"
          value={buyerTel}
          onChange={(e) => setBuyerTel(e.target.value)}
          required
        />
      </label>
      <br />
      <label>
        이메일:
        <input
          type="email"
          value={buyerEmail}
          onChange={(e) => setBuyerEmail(e.target.value)}
          required
        />
      </label>
      </div>

    
    </div>
    </>
    );
};

export default Reserve;