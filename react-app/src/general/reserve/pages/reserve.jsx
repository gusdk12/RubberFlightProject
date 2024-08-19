import { Box, Button, Flex, Heading, styled, Text } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import style from '../css/reserve.module.css';
import { PiAirplaneTakeoffBold } from "react-icons/pi";
import { HiArrowLongRight } from "react-icons/hi2";
import { FaCircle } from "react-icons/fa";
import { SiEthiopianairlines } from "react-icons/si";
import Cookies from 'js-cookie';
import { Dropdown, Menu } from 'antd';

const Reserve = () => {
  // 유저 정보 받기
  const [buyerName, setBuyerName] = useState('');
  const [buyerTel, setBuyerTel] = useState('');
  const [buyerEmail, setBuyerEmail] = useState('');
  const [buyerBirth, setBuyerBirth] = useState('');
  const token = Cookies.get('accessToken');
  const backUrl = process.env.REACT_APP_BACK_URL;

  // 쿠폰
  const [coupons, setCoupons] = useState([]); // 쿠폰 목록 상태 추가
  const [selectedCoupon, setSelectedCoupon] = useState(null); // 선택한 쿠폰 상태

  const location = useLocation();
  const { flight, passengers } = location.state || {};
  const navigate = useNavigate();

  useEffect(() => {
    console.log('Passengers:', passengers);
  }, [passengers]);

  const extractNumbersFromString = (str) => {
    const numbers = str.match(/\d+/g);
    console.log("Extracted numbers:", numbers); // 추출된 숫자 배열 출력

    return numbers ? numbers.map(Number) : [0, 0, 0]; // 배열로 변환
  };
  
  const [adults, children, infants] = extractNumbersFromString(passengers);

  console.log("Adults:", adults); // 성인 수
  console.log("Children:", children); // 소아 수
  console.log("Infants:", infants); // 유아 수

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.iamport.kr/v1/iamport.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    fetch(`${backUrl}/coupon/user/coupons`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log('Fetched coupons:', data);
        console.log('Type of coupons:', Array.isArray(data)); // 배열인지 확인
        setCoupons(data);
      })
      .catch(error => {
        console.error('Error fetching coupons:', error);
      });
  }, []);

  useEffect(() => {
    document.body.style.backgroundColor = "white";
    document.body.style.overflowY = 'scroll';
  }, []);

  const CouponDropdown = ({ coupons, onSelectCoupon }) => {
    const menuItems = coupons.length > 0
      ? coupons.map(coupon => ({
        key: coupon.id,
        label: (
          <a onClick={() => onSelectCoupon(coupon)}>
            {coupon.description} - {coupon.percent}% 할인
          </a>
        )
      }))
      : [{ key: 'no-coupons', label: '사용할 수 있는 쿠폰이 없습니다.' }];

    return (
      <Dropdown overlay={<Menu items={menuItems} />} trigger={['click']}>
        <Button fontSize="16px" fontFamily="Noto Sans KR">
          쿠폰 적용하기
        </Button>
      </Dropdown>
    );
  };

  const isRoundTrip = () => {
    return flight.outbound && flight.inbound;
  }

  const isRoundTripValue = isRoundTrip();

  // 가격
  const getPriceForFlight = (price) => {
    return isRoundTripValue ? flight.outbound.price + flight.inbound.price : flight.price
  };

  const adultPrice = getPriceForFlight(flight.price); // 성인 1명의 가격
  const childPrice = adultPrice * 0.75; // 소아는 성인 가격의 75%
  const infantPrice = adultPrice * 0.10; // 유아는 성인 가격의 10%

  const outboundTotalPrice = (adults * adultPrice) + (children * childPrice) + (infants * infantPrice);
  // const inboundTotalPrice = isRoundTripValue ? (adults * adultPrice) + (children * childPrice) + (infants * infantPrice) : 0;

  const totalPrice = outboundTotalPrice;

    const discountedPrice = selectedCoupon
    ? Math.floor(totalPrice * (1 - selectedCoupon.percent / 100) / 10) * 10
    : totalPrice;

  const FlightPrice = ({ price }) => {
    return (
      <div>{price.toLocaleString('ko-KR')} 원</div>
    );
  };

  // 유효성
  const isFormValid = () => {
    return buyerName.trim() !== '' && 
           buyerEmail.trim() !== '' && 
           buyerTel.trim() !== '' &&
           buyerBirth.trim() !== ''
  };

  const onClickPayment = () => {
    if (!isFormValid()) {
      window.alert("예약자 정보를 입력해주세요");
      return;
    }
    if (!window.IMP) return;
    /* 1. 가맹점 식별하기 */
    const { IMP } = window;
    IMP.init("imp28617244"); // 가맹점 식별코드

    /* 2. 결제 데이터 정의하기 */
    const data = {
      pg: "html5_inicis",
      pay_method: "card",
      merchant_uid: `mid_${new Date().getTime()}`,
      amount: discountedPrice,
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
        inboundFlight: isRoundTripValue ? flight.inbound : null,
        couponId: selectedCoupon ? selectedCoupon.id : null,
      };

      console.log(passengers);
      console.log(isRoundTripValue);
      console.log(flight.outbound);
      console.log(flight);
      console.log(flight.inbound);
      console.log(selectedCoupon.id);

      // const token = Cookies.get('accessToken');

      fetch(`${backUrl}/reservation`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(reservationData),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('예약 요청 실패');
          }
          return response.json();
        })
        .then(() => {
          if (selectedCoupon) {
            fetch(`${backUrl}/coupon/user/use/${selectedCoupon.id}`, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${token}`
              }
            })
              .then(() => {
                console.log(selectedCoupon.id);
                window.alert('결제가 완료되었고, 쿠폰이 삭제되었습니다.');
                navigate('/mypage/flight-info');
              })
              .catch(error => {
                console.error('쿠폰 삭제 중 오류가 발생했습니다:', error);
                window.alert('쿠폰 삭제 중 오류가 발생했습니다.');
              });
          } else {
            navigate('/mypage/flight-info');
          }
        })
        .catch(error => {
          console.error('예약 실패:', error);
          window.alert('예약 처리 중 오류 발생');
        });
    } else {
      window.alert(`결제 실패: ${error_msg}`);
    }
  };


  return (
    <>
      <div className={style.box}>
        <div className={style.boxTitle}>
          <div className={style.boxFont}>선택한 항공권</div>
        </div>

        {flight.outbound && flight.inbound ? (
          <>
            <Flex direction="row" justifyContent="space-between">
              <div className={style.airportInfo}>
                <div className={style.depAirportInfo}>
                  <div className={style.airportIcon}><PiAirplaneTakeoffBold /></div>
                  <h2 className={style.reserveHeading}>가는 항공편</h2>
                  <div className={style.airports}>
                    <div>{flight.outbound.depAirport}</div>
                    <div className={style.airportArrow}><HiArrowLongRight /></div>
                    <div>{flight.outbound.arrAirport}</div>
                  </div>
                </div>

                <div className={style.ticket}>
                  <div>
                    <SiEthiopianairlines className={style.airlineIcon} />
                    <div className={style.airlineNameLabel}>
                      {flight.outbound.airlineName}
                    </div>
                  </div>
                  <div className={style.depDayTime}>
                    {flight.outbound.depDayFormat}
                    <br />
                    <div className={style.depTime}>
                      {flight.outbound.depTime}
                    </div>
                  </div>

                  <div className={style.takeTime}>
                    <div className={style.duringTime}><FaCircle /></div>
                    <div className={style.line}>
                      <div className={style.takeTimeFormat}>{flight.outbound.takeTimeFormat}</div>
                      <div className={style.type}>직항</div>
                    </div>
                    <div className={style.duringTime2}><FaCircle /></div>
                  </div>
                  <div className={style.arrDayTime}>
                    {flight.outbound.arrDayFormat}
                    <br />
                    <div className={style.arrTime}>
                      {flight.outbound.arrTime}
                    </div>
                  </div>
                  <div className={style.priceContainer}>
                    <FlightPrice price={flight.outbound.price} />
                  </div>
                </div>

                <div className={style.arrAirportInfo}>
                  <div className={style.airportIcon}><PiAirplaneTakeoffBold /></div>
                  <h2 className={style.reserveHeading}>오는 항공편</h2>
                  <div className={style.airports}>
                    <div>{flight.inbound.depAirport}</div>
                    <div className={style.airportArrow}><HiArrowLongRight /></div>
                    <div>{flight.inbound.arrAirport}</div>
                  </div>
                </div>

                <div className={style.ticket}>
                  <div>
                    <SiEthiopianairlines className={style.airlineIcon} />
                    <div className={style.airlineNameLabel}>
                      {flight.inbound.airlineName}
                    </div>
                  </div>
                  <div className={style.depDayTime}>
                    {flight.inbound.depDayFormat}
                    <br />
                    <div className={style.depTime}>
                      {flight.inbound.depTime}
                    </div>
                  </div>
                  <div className={style.takeTime}>
                    <div className={style.duringTime}><FaCircle /></div>
                    <div className={style.line}>
                      <div className={style.takeTimeFormat}>{flight.inbound.takeTimeFormat}</div>
                      <div className={style.type}>직항</div>
                    </div>
                    <div className={style.duringTime2}><FaCircle /></div>
                  </div>
                  <div className={style.arrDayTime}>
                    {flight.inbound.arrDayFormat}
                    <br />
                    <div className={style.arrTime}>
                      {flight.inbound.arrTime}
                    </div>
                  </div>
                  <div className={style.priceContainer}>
                    <FlightPrice price={flight.inbound.price} />
                  </div>
                </div>
                <div className={style.note}>
                  ※ 항공사 별로 조회좌석수가 예약완료 후의 좌석상태와 상이할 수 있음을 미리 안내해드리며, 반드시 예약완료 후의 좌석상태를 확인해주시기 바랍니다.
                </div>
              </div>
              <Box className={style.userInfo}>
                <Heading as="h2" size="md" mb="4">상품 결제 정보</Heading>
                <Flex direction="column" bg="gray.50" p="4">
                  <Flex direction="column" pr="4">
                    <Text mb="2" fontFamily="Noto Sans KR" fontSize="17px">총 항공 예상 운임</Text>
                    <Text mb="2" fontFamily="Verdana, Geneva, Tahoma, sans-serif" fontSize="12px" color="gray.700">{passengers}</Text>
                    <div>
                      <CouponDropdown
                        coupons={coupons}
                        onSelectCoupon={setSelectedCoupon}
                      />
                    </div>
                  </Flex>
                  <Flex mt={6} direction="row" justifyContent="flex-end" alignItems="flex-end">
                    <Text fontSize="30px" fontFamily="Verdana, Geneva, Tahoma, sans-serif" color="purple.600" mb="2">{discountedPrice.toLocaleString('ko-KR')}</Text>
                    <Text pl={2} pb={3} fontSize="14px" color="gray.500">원</Text>
                  </Flex>
                </Flex>
                <Button onClick={onClickPayment} colorScheme="purple" mt="4" size="lg" width="full">결제하기</Button>
              </Box>
            </Flex>
          </>
        ) : (
          <>
            <div className={style.airportInfo}>
              <div className={style.depAirportInfo}>
                <div className={style.airportIcon}><PiAirplaneTakeoffBold /></div>
                <h2>가는 항공편</h2>
                <div className={style.airports}>
                  <div>{flight.depAirport}</div>
                  <div className={style.airportArrow}><HiArrowLongRight /></div>
                  <div>{flight.arrAirport}</div>
                </div>
              </div>

              <div className={style.ticket}>
                <div>{flight.airlineName}</div>
                <div className={style.depDayTime}>{flight.depDayFormat}<br />
                  {flight.depTime}</div>
                <div className={style.takeTime}>
                  <div className={style.duringTime}><FaCircle /></div>
                  <div className={style.line}>
                    <div className={style.takeTimeFormat}>{flight.takeTimeFormat}</div>
                    <div className={style.type}>직항</div>
                  </div>
                  <div className={style.duringTime2}><FaCircle /></div>
                </div>
                <div>{flight.arrDayFormat}<br />
                  {flight.arrTime}</div>
                <div><FlightPrice price={flight.price} /></div>
              </div>
            </div>
            <div className={style.note}>
              ※ 항공사 별로 조회좌석수가 예약완료 후의 좌석상태와 상이할 수 있음을 미리 안내해드리며, 반드시 예약완료 후의 좌석상태를 확인해주시기 바랍니다.
            </div>
          </>
        )}

        <div className={style.payUserInfo}>
          <h2 className={style.boxFont}>예약자 정보</h2>
          <table className={style.reservationTable}>
            <tbody>
              <tr>
                <td><label htmlFor="buyerName">이름</label></td>
                <td>
                  <input
                    type="text"
                    id="buyerName"
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    required
                  />
                </td>
                <td><label htmlFor="buyerBirth">생년월일</label></td>
                <td>
                <input
                    type="text"
                    id="buyerBirth"
                    value={buyerBirth}
                    onChange={(e) => setBuyerBirth(e.target.value)}
                    required
                  />
                </td>
              </tr>
              <tr>
                <td><label htmlFor="buyerEmail">이메일</label></td>
                <td>
                  <input
                    type="email"
                    id="buyerEmail"
                    value={buyerEmail}
                    onChange={(e) => setBuyerEmail(e.target.value)}
                    required
                  />
                </td>
                <td><label htmlFor="buyerTel">휴대폰 번호</label></td>
                <td>
                  <input
                    type="tel"
                    id="buyerTel"
                    value={buyerTel}
                    onChange={(e) => setBuyerTel(e.target.value)}
                    required
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div className={style.note}>
              ※ 입력하신 개인정보는 안전하게 보호되며, 예약 및 결제 처리 외의 용도로는 사용되지 않습니다.
            </div>
        </div>
      </div>
    </>
  );
};

export default Reserve;