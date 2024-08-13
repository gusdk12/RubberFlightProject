import React from "react";
import FullStar from "../../../assets/images/review/yellow_star.webp";
import EmptyStar from "../../../assets/images/review/grey_star.webp";
import styles from "../css/ReviewItem.module.css"

const fullStar = FullStar;
const emptyStar = EmptyStar;

// 각 별점
export const StarRating = ({ rate }) => {
  const stars = [];
  const fullStars = Math.floor(rate); // 정수 부분
  const partialStar = rate % 1; // 소수 부분
  const emptyStars = 5 - (fullStars + ((partialStar === 0) ? 0 : 1)); // 빈 별 개수 계산

  // 채워진 별 추가
  Array.from({ length: fullStars }).forEach((_, index) => {
    stars.push(<img key={`fullTotal-${index}`} src={fullStar} className="star-ratings" alt="full Star" />);
  });

  // 소수점 별 추가 (소수 부분인 경우에만)
  if (partialStar !== 0) {
    stars.push(
      <div
        key={`partialStar`}
        style={{
          width: '20px', // 전체 너비를 사용
          display: 'inline-block', // 인라인 블록으로 설정
          position: 'relative', // 자식 요소의 위치를 기준으로 설정
          overflow: 'hidden' // 넘치는 부분을 숨김
        }}
      >
        {/* 채워진 별 */}
        <img
          src={fullStar}
          className="star-ratings"
          alt="partial Star"
          style={{
            width: '20px', // 항상 고정된 크기로 설정
            position: 'absolute',
            left: 0,
            clipPath: `inset(0 ${100 - (partialStar * 100)}% 0 0)`, // 소수점 만큼만 보이게
            zIndex:2
          }} 
        />
        {/* 비어있는 별 */}
        <img
          src={emptyStar}
          className="star-ratings"
          alt="empty Star"
          style={{
            width: '20px', // 항상 고정된 크기로 설정
            position: 'absolute',
            left: 0,
            zIndex:1
          }}
        />
      </div>
    );
  }

  // 비어있는 별 추가
  Array.from({ length: emptyStars }).forEach((_, index) => {
    stars.push(<img key={`emptyTotal-${index}`} src={emptyStar} className="star-ratings" alt="empty Star" />);
  });

  return <div className={styles.starRatingsBase}>{stars}</div>;
};

// 항공사별 총 평균 (큰 별)
export const TotalStarRating = ({ rate }) => {
  const stars = [];
  const fullStars = Math.floor(rate); // 정수 부분
  const partialStar = rate % 1; // 소수 부분
  const emptyStars = 5 - (fullStars + ((partialStar === 0) ? 0 : 1)); // 빈 별 개수 계산

  // 채워진 별 추가
  Array.from({ length: fullStars }).forEach((_, index) => {
    stars.push(<img key={`fullTotal-${index}`} src={fullStar} className="star-ratings" alt="full Star" />);
  });

  // 소수점 별 추가 (소수 부분인 경우에만)
  if (partialStar !== 0) {
    stars.push(
      <div
        key={`partialStar`}
        style={{
          width: '20px', // 전체 너비를 사용
          display: 'inline-block', // 인라인 블록으로 설정
          position: 'relative', // 자식 요소의 위치를 기준으로 설정
          overflow: 'hidden' // 넘치는 부분을 숨김
        }}
      >
        {/* 채워진 별 */}
        <img
          src={fullStar}
          className="star-ratings"
          alt="partial Star"
          style={{
            width: '20px', // 항상 고정된 크기로 설정
            position: 'absolute',
            left: 0,
            clipPath: `inset(0 ${100 - (partialStar * 100)}% 0 0)`, // 소수점 만큼만 보이게
            zIndex:2
          }} 
        />
        {/* 비어있는 별 */}
        <img
          src={emptyStar}
          className="star-ratings"
          alt="empty Star"
          style={{
            width: '20px', // 항상 고정된 크기로 설정
            position: 'absolute',
            left: 0,
            zIndex:1
          }}
        />
      </div>
    );
  }

  // 비어있는 별 추가
  Array.from({ length: emptyStars }).forEach((_, index) => {
    stars.push(<img key={`emptyTotal-${index}`} src={emptyStar} className="star-ratings" alt="empty Star" />);
  });

  return <div className={styles.totalRate}>{stars}</div>;
};
