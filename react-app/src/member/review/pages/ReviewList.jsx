import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  Heading,
  Image,
  Spinner,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";
import axios from "axios";
import { useUser } from "../../../general/user/contexts/LoginContextProvider";
import Review from "../../../assets/images/review/review.webp";
import styles from "../css/ReviewList.module.css";
import "../../../Global/font.css";
import ReviewItem from "../components/ReviewItem";

const ReviewList = () => {
  const { userInfo } = useUser();
  const [reviews, setReviews] = useState([]);
  const [sortOrder, setSortOrder] = useState("latest");
  const [currentPage, setCurrentPage] = useState(0); // 초기 페이지 번호 설정
  const [pageSize] = useState(3); // 한 페이지에 보여줄 리뷰 개수
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [flightInfos, setFlightInfos] = useState([]);

  // 비행정보 불러오기
  const fetchFlightInfo = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8282/flightInfo/list/${userInfo.id}`
      );
      setFlightInfos(response.data);
    } catch (error) {
      console.error("데이터를 가져오는 데 오류가 발생했습니다:", error);
    }
  };

  // 유저별 리뷰 목록 불러오기(최신순)
  const fetchReviews = async (page) => {
    try {
      const response = await axios.get(
        `http://localhost:8282/review/list/${userInfo.id}?page=${page}&size=${pageSize}`
      );
      setReviews(response.data.content); // 리뷰 목록 리스트
      setTotalPages(response.data.totalPages); // 총 페이지
    } catch (error) {
      console.error("리뷰를 가져오는 데 오류가 발생했습니다:", error);
    } finally {
      setLoading(false);
    }
  };

  // 유저별 리뷰 목록 불러오기(별점순)
  const fetchRateReviews = async (page) => {
    try {
      const response = await axios.get(
        `http://localhost:8282/review/ratelist/${userInfo.id}?page=${page}&size=${pageSize}`
      );
      setReviews(response.data.content); // 리뷰 목록 리스트
      setTotalPages(response.data.totalPages); // 총 페이지
    } catch (error) {
      console.error("리뷰를 가져오는 데 오류가 발생했습니다:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userInfo && userInfo.id) {
      fetchFlightInfo();
      if (sortOrder === "latest") {
        fetchReviews(currentPage);
      } else {
        fetchRateReviews(currentPage);
      }
    }
    document.body.style.backgroundColor = "#dde6f5";
    document.body.style.overflowY = "scroll";
  }, [userInfo, currentPage, sortOrder]); //  userInfo가 변경될 때마다 호출

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
      <Box p={4} className={styles.reviewlistContainer}>
        <Flex align="center" className="flight-label-container" mb={4}>
          <Image src={Review} width="30px" />
          <Heading as="h1" size="lg" ml={3}>
            나의 리뷰
          </Heading>
        </Flex>
        <Tabs variant="line" className="review-tab-container">
          <TabList>
            <Tab _selected={{color: "#6d9eeb", borderBottom: "2px solid #6d9eeb", fontWeight: "bold" }} onClick={handleLatestClick}>
              최신순
            </Tab>
            <Tab _selected={{color: "#6d9eeb", borderBottom: "2px solid #6d9eeb", fontWeight: "bold" }} onClick={handleRateClick}>
              별점순
            </Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              {reviews.length > 0 ? (
                reviews.map((review) => {
                  const flightInfo = flightInfos.find((info) => info.review.id === review.id);
                  return (<ReviewItem key={review.id} review={review} flightInfo={flightInfo} />);})
              ) : (<p>작성된 리뷰가 없습니다.</p>)}
            </TabPanel>
            <TabPanel>
              {reviews.length > 0 ? (
                reviews.map((review) => {
                  const flightInfo = flightInfos.find((info) => info.review.id === review.id);
                  return (<ReviewItem key={review.id} review={review} flightInfo={flightInfo}/>);})
              ) : (
                <p>작성된 리뷰가 없습니다.</p>
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
        {totalPages > 0 && (
          <Box className={styles.reviewPagebtn}>
            <button
              className={`${styles.reviewPagebtn} ${styles.reviewPageBtn} ${styles.reviewPrevbtn}`}
              onClick={() => handlePageChange(0)}
            >
              ◀◀
            </button>
            <button
              className={`${styles.reviewPageBtn} ${styles.reviewPrevbtn} ${styles.reviewArrowLeft}`}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              ◀
            </button>
            {pageButtons(totalPages)}
            <button
              className={`${styles.reviewPageBtn} ${styles.reviewNextbtn} ${styles.reviewArrowRight}`}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              ▶
            </button>
            <button
              className={`${styles.reviewPageBtn} ${styles.reviewNextbtn}`}
              onClick={() => handlePageChange(totalPages - 1)}
            >
              ▶▶
            </button>
          </Box>
        )}
      </Box>
    </>
  );
};

export default ReviewList;
