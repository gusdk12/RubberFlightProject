import { Button } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

const Reserve = () => {
    

    const location = useLocation();
    const { flight, departure, arrival, passengers  } = location.state || {};
  
    const onClickPayment = () => {
        if (!window.IMP) return;
        /* 1. 가맹점 식별하기 */
        const { IMP } = window;
        IMP.init("imp28617244"); // 가맹점 식별코드
    
        /* 2. 결제 데이터 정의하기 */
        const data: RequestPayParams = {
          pg: "html5_inicis",
          pay_method: "card", // 결제수단
          merchant_uid: `mid_${new Date().getTime()}`, // 주문번호
          amount: 1000, // 결제금액
          name: "아임포트 결제 데이터 분석", // 주문명
          buyer_name: "홍길동", // 구매자 이름
          buyer_tel: "01012341234", // 구매자 전화번호
          buyer_email: "example@example.com", // 구매자 이메일
          buyer_addr: "신사동 661-16", // 구매자 주소
          buyer_postcode: "06018", // 구매자 우편번호
        };
    
        /* 4. 결제 창 호출하기 */
        IMP.request_pay(data, callback);
      };
    
      /* 3. 콜백 함수 정의하기 */
      function callback(response: RequestPayResponse) {
        const { success, error_msg } = response;
    
        if (success) {
          alert("결제 성공");
        } else {
          alert(`결제 실패: ${error_msg}`);
        }
      }
    

    return (
        <div>
      <h1>항공권 세부 정보</h1>
      {flight.outbound ? (
        <>
        <div>
        <h2>사용자 정보</h2>
        <div>출발 공항: {departure}</div>
        <div>도착 공항: {arrival}</div>
        <div>인원 수: {passengers}</div>
      </div>

          <div>
            <h2>출발 항공편</h2>
            <div>항공사: {flight.outbound.airlineName}</div>
            <div>출발 공항: {flight.outbound.depAirport}</div>
            <div>도착 공항: {flight.outbound.arrAirport}</div>
            <div>출발 날짜: {flight.outbound.depTime}</div>
            <div>도착 날짜: {flight.outbound.arrTime}</div>
            <div>가격: {flight.outbound.price}</div>
          </div>
          {flight.inbound && (
            <div>
              <h2>귀국 항공편</h2>
              <div>항공사: {flight.inbound.airlineName}</div>
              <div>출발 공항: {flight.inbound.depAirport}</div>
              <div>도착 공항: {flight.inbound.arrAirport}</div>
              <div>출발 날짜: {flight.inbound.depTime}</div>
              <div>도착 날짜: {flight.inbound.arrTime}</div>
              <div>가격: {flight.inbound.price}</div>
            </div>
          )}
        </>
      ) : (
        <div>
          <h2>편도 항공편</h2>
          <div>항공사: {flight.airlineName}</div>
          <div>출발 공항: {flight.depAirport}</div>
          <div>도착 공항: {flight.arrAirport}</div>
          <div>출발 날짜: {flight.depTime}</div>
          <div>도착 날짜: {flight.arrTime}</div>
          <div>가격: {flight.price}</div>
        </div>
      )}
      <Button onClick={onClickPayment}>결제하기</Button>
    </div>
    );
};

export default Reserve;