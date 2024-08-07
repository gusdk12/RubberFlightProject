import React from "react";
import FullStar from "../../../assets/images/review/yellow_star.webp";
import EmptyStar from "../../../assets/images/review/grey_star.webp";

const fullStar = FullStar;
const emptyStar = EmptyStar;

// 각 별점
export const StarRating = ({ rate }) => {
  const stars = [];

  // 채워진 별 추가
  Array.from({ length: rate }).forEach((_, index) => {
    stars.push(<img key={`full-${index}`} src={fullStar} className="star-ratings" alt="full Star" />);
  });

  // 비어있는 별 추가
  Array.from({ length: 5 - rate }).forEach((_, index) => {
    stars.push(<img key={`empty-${index}`} src={emptyStar} className="star-ratings" alt="empty Star" />);
  });

  return <div className="star-ratings-base">{stars}</div>;
};

// 항공사별 총 평균 (큰 별)
export const TotalStarRating = ({ rate }) => {
  const stars = [];

  // 채워진 별 추가
  Array.from({ length: rate }).forEach((_, index) => {
    stars.push(<img key={`fullTotal-${index}`} src={fullStar} className="star-ratings" alt="full Star" />);
  });

  // 비어있는 별 추가
  Array.from({ length: 5 - rate }).forEach((_, index) => {
    stars.push(<img key={`emptyTotal-${index}`} src={emptyStar} className="star-ratings" alt="empty Star" />);
  });

  return <div className="total_rate">{stars}</div>;
};
