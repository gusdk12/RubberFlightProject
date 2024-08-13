import Cookies from 'js-cookie';
import React, { useEffect, useState } from "react";
import { Box, Flex, Heading, Image, Spinner, Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/react";
import axios from "axios";
import Review from "../../../assets/images/review/review.webp";
import styles from "../css/ReviewList.module.css";
import ReviewItem from "../components/ReviewItem";
import "../../../Global/font.css";

const ReviewList = () => {
  const [reviews, setReviews] = useState([]);
  const [sortOrder, setSortOrder] = useState("latest");
  const [currentPage, setCurrentPage] = useState(0); // 초기 페이지 번호 설정
  const [pageSize] = useState(3); // 한 페이지에 보여줄 리뷰 개수
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [flightInfos, setFlightInfos] = useState([]);

  // // 해당 유저 비행정보 불러오기
  // const fetchFlightInfo = async () => {
  //   const token = Cookies.get('accessToken');
  //     if (!token) {
  //       console.error("토큰을 찾을 수 없습니다.");
  //       setLoading(false);
  //       return;
  //     }

  //     try {
  //       const response = await axios.get('http://localhost:8282/flightInfo/list', {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       });
  //       setFlightInfos(response.data);
  //       return response.data;
  //     } catch (error) {
  //       console.error("Error fetching flight info:", error);
  //     } 
  // };
 
  // 해당 유저 리뷰 목록 불러오기(최신순, 별점순)
  const fetchReviewList = async (type, page) => {
    const token = Cookies.get('accessToken');
    if (!token) {
      console.error("토큰을 찾을 수 없습니다.");
      setLoading(false);
      return;
    }
    
    try {
      const response = await axios.get(
        `http://localhost:8282/review/${type}?page=${page}&size=${pageSize}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(response.data)
      setReviews(response.data.content); // 리뷰 목록 리스트
      setTotalPages(response.data.totalPages); // 총 페이지
    } catch (error) {
      console.error("리뷰를 가져오는 데 오류가 발생했습니다:", error);
    } finally {
      setLoading(false);
    }
  };

  // 첫화면 로딩
  useEffect(() => {
    if (sortOrder === "latest") {
      fetchReviewList("list", currentPage);
    } else {
      fetchReviewList("ratelist", currentPage);
    } 
    document.body.style.backgroundColor = "#dde6f5";
    document.body.style.overflowY = "scroll";
  }, [currentPage, sortOrder]);

  // 버튼 클릭 핸들러
  const handleLatestClick = () => {
    setSortOrder("latest"); // 정렬 방식을 최신순으로 설정
    setCurrentPage(0); // 페이지를 0으로 리셋
  };

  const handleRateClick = () => {
    setSortOrder("rating"); // 정렬 방식을 별점순으로 설정
    setCurrentPage(0); // 페이지를 0으로 리셋
  };

  // 페이지 이동 핸들러
  const handlePageChange = (page) => {
    if (page >= 0 && page <= totalPages - 1) setCurrentPage(page);
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
            <button className={styles.reviewPageBtn} key={pageNumber} 
            onClick={() => handlePageChange(pageNumber)} disabled={pageNumber >= totalPages}>{/*유효한 페이지 번호인지 확인 */}
              {pageNumber + 1}
            </button>
          );
        });
      buttons.push(<span key={btnIndex} className={styles.reviewPageGroup}>{pageGroup}</span>);
    });
    return buttons;
  };

  // 로딩 화면
  if (loading) {
    return (
      <Flex justify="center" align="center" height="100vh">
        <Spinner size="xl" />
      </Flex>
    );
  }

  return (
    <>
      <Box p={4}>
        <Flex align="center" mb={4}>
          <Image src={Review} width="30px" />
          <Heading as="h1" size="lg" ml={3}>나의 리뷰</Heading>
        </Flex>
        <Tabs variant="line" 
          style={{
          maxWidth: '700px',
          minWidth: '700px',
          margin: 'auto',
          width: '90%',
          marginTop: '30px',
        }}>
          <TabList>
            <Tab _selected={{color: "#6d9eeb", borderBottom: "2px solid #6d9eeb", fontWeight: "bold" }}
            onClick={handleLatestClick}>
              최신순
            </Tab>
            <Tab _selected={{color: "#6d9eeb", borderBottom: "2px solid #6d9eeb", fontWeight: "bold" }}
            onClick={handleRateClick}>
              별점순
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {reviews.map((review) => {
                  return (<ReviewItem key={review.id} review={review} />);})}
            </TabPanel>
            <TabPanel>
              {reviews.map((review) => {
                  return (<ReviewItem key={review.id} review={review} />);})}
            </TabPanel>
          </TabPanels>
        </Tabs>
        {totalPages > 0 && (
          <Box className={styles.reviewPagebtn}>
            <button className={`${styles.reviewPagebtn} ${styles.reviewPageBtn} ${styles.reviewPrevbtn}`}
              onClick={() => handlePageChange(0)}>◀◀</button>
            <button className={`${styles.reviewPageBtn} ${styles.reviewPrevbtn} ${styles.reviewArrowLeft}`}
              onClick={() => handlePageChange(currentPage - 1)}>◀</button>
            {pageButtons(totalPages)}
            <button className={`${styles.reviewPageBtn} ${styles.reviewNextbtn} ${styles.reviewArrowRight}`}
              onClick={() => handlePageChange(currentPage + 1)}>▶</button>
            <button className={`${styles.reviewPageBtn} ${styles.reviewNextbtn}`}
              onClick={() => handlePageChange(totalPages - 1)}>▶▶</button>
          </Box>
        )}
      </Box>
    </>
  );
};

export default ReviewList;
