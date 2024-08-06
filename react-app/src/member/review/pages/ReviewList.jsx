import React, { useEffect, useState } from "react";
import { Box, Grid, Image } from "@chakra-ui/react";
import axios from "axios";
import ReviewItem from "../components/ReviewItem";
import { useUser } from "../../../general/user/contexts/LoginContextProvider";
import MenuBar from "../../../general/common/SideMenu/MenuBar";
import Review from "../../../assets/images/review/review.webp";
import Header from "../../../general/common/Header/Header";
import "../css/ReviewList.css";

const ReviewList = () => {
  const { userInfo } = useUser();
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // 초기 페이지 번호 설정
  const [pageSize] = useState(3); // 한 페이지에 보여줄 리뷰 개수
  const [totalPages, setTotalPages] = useState(0);
 
  const fetchReviews = async (page) => {
    try {
      const response = await axios.get(
        `http://localhost:8282/member/review/list/${userInfo.id}?page=${page}&size=${pageSize}`
      );
      setReviews(response.data.content); // 리뷰 목록 리스트
      setTotalPages(response.data.totalPages); // 총 페이지
    } catch (error) {
      console.error("리뷰를 가져오는 데 오류가 발생했습니다:", error);
    }
  };

  useEffect(() => {
    
    if (userInfo && userInfo.id) {
      fetchReviews(currentPage);
    }
  }, [userInfo, currentPage, totalPages]); // userInfo가 변경될 때마다 호출

  // 페이지 이동 핸들러
  const handlePageChange = (page) => {
    if(page >= 0 && page <= totalPages - 1) setCurrentPage(page);
  };

  // 페이지 버튼을 생성하는 함수
  const pageButtons = (totalPages) => {
    const buttons = [];
    const totalGroups = Math.ceil(totalPages / 5); // 5개씩 그룹 

    Array.from({ length: totalGroups }).forEach((_, btnIndex) => {
      const startPage = btnIndex * 5; // 시작 페이지 번호
      const pageGroup = [];

      Array.from({ length: Math.min(5, totalPages - startPage) }).forEach(
        (_, index) => {
          const pageNumber = startPage + index; // 페이지 번호 계산
          pageGroup.push(
            <button className="page_btn" key={pageNumber} onClick={() => handlePageChange(pageNumber)} 
            disabled={pageNumber >= totalPages}> {/*유효한 페이지 번호인지 확인 */}
              {pageNumber + 1}
            </button>
          );
        }
      );

      buttons.push(
        <span key={btnIndex} className="page-group">
          {pageGroup}
        </span>
      );
    });

    return buttons;
  };

  return (
    <>
      <Header />
        <Box className="card_container">
          <div className="subject">
            <Image src={Review} className="reviewIcon" />
            &nbsp;&nbsp;나의 리뷰
          </div>
          {reviews.map((review) => (
            <ReviewItem key={review.id} review={review} />
          ))}
          
          {totalPages > 0 && (
            <Box className="pagebtn">
              <button className="page_btn prevbtn" onClick={() => handlePageChange(0)}>◀◀</button>
              <button className="page_btn prevbtn arrowLeft" onClick={() => handlePageChange(currentPage - 1)}>◀</button>
              {pageButtons(totalPages)}
              <button className="page_btn nextbtn arrowRight" onClick={() => handlePageChange(currentPage + 1)}>▶</button>
              <button className="page_btn nextbtn" onClick={() => handlePageChange(totalPages -1)}>▶▶</button>
            </Box>
          )}
        </Box>
    </>
  );
};

export default ReviewList;
