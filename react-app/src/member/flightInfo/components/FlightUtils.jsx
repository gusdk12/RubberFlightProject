// 지연 시간을 분과 초로 변환하는 함수
export const convertDelayToMinutesAndSeconds = (delayInSeconds) => {
  const minutes = Math.floor(delayInSeconds / 60);
  return { minutes };
};

// 도착 시간 기준으로 데이터 우선 순위를 결정하는 함수
export const getFlightDataPriority = (info) => {
  const isFutureData = info.timetable && info.timetable.length > 0;
  const isPastData = info.history && info.history.length > 0;

  // 과거 데이터가 존재하고, 도착 시간이 현재로부터 3일 이전인 경우
  const arrSchDate = new Date(info.flightInfo.arrSch);
  const now = new Date();
  const threeDaysAgo = new Date(now.setDate(now.getDate() - 3));

  if (isPastData && arrSchDate < threeDaysAgo) {
    return { isPastData, flightData: info.history[0] };
  }

  if (isFutureData) {
    return { isFutureData, flightData: info.timetable[0] };
  }

  // 데이터가 없을 경우
  return { flightData: null };
};

// 출발 시간과 도착 시간을 받아 총 비행 시간을 계산
export const calculateFlightDuration = (depTime, arrTime) => {
   const depDate = new Date(depTime);
   const arrDate = new Date(arrTime);
   const duration = (arrDate - depDate) / (1000 * 60);
   const hours = Math.floor(duration / 60);
   const minutes = duration % 60;
   return `${hours}시간 ${minutes}분`;
 };
 
 // 주어진 항공편 정보에 따라 상태 텍스트와 색상을 표시
 export const getStatusText = (flight) => {
   const now = new Date();
   const depDate = new Date(flight.depSch);
   const arrDate = new Date(flight.arrSch);
 
   if (flight.reserve.isended) {
     return { text: '도착', color: 'green.500' };
   } else if (now >= depDate && now <= arrDate) {
     return { text: '출발', color: 'blue.500' };
   } else {
     return { text: '마감 예정', color: '#4285f4ff' };
   }
 };
 