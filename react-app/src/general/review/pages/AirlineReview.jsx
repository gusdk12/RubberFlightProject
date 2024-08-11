import React, { useEffect, useState } from 'react';
import Header from '../../common/Header/Header';
import styles from '../css/AirlineReview.module.css';
import { Box, Flex, Spinner, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import AirlineReviewItem from '../components/AirlineReviewItem';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

const AirlineReview = () => {
  const {id} = useParams();
  const [reviews, setReviews] = useState([]);
  const [sortOrder, setSortOrder] = useState("latest");
  const [currentPage, setCurrentPage] = useState(0); // 초기 페이지 번호 설정
  const [pageSize] = useState(6); // 한 페이지에 보여줄 리뷰 개수
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading] = useState(true);
  const [flightInfos, setFlightInfos] = useState([]);
  const [airlineNames, setAirlineNames] = useState([]);

// 비행정보 불러오기
const fetchFlightInfo = async () => {
    try {
      const response = await axios.get(
        'http://localhost:8282/flightInfo/infolist'
      );
      setFlightInfos(response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching flight info:", error);
    } 
};

// 항공사별 리뷰 목록 불러오기(최신순, 별점순)
const fetchReviews = async (type, page) => {
  try {
    const response = await axios.get(
      `http://localhost:8282/airlinereview/${type}/${id}?page=${page}&size=${pageSize}`
    );
    setReviews(response.data.content); // 리뷰 목록 리스트
    setTotalPages(response.data.totalPages); // 총 페이지
  } catch (error) {
    console.error("리뷰를 가져오는 데 오류가 발생했습니다:", error);
  } finally {
    setLoading(false);
  }
};

// 저장된 항공사 이름 불러오기
const fetchAirline = async () => {
  try{
    const response = await axios.get(
      `http://localhost:8282/airlinereview/namelist`
    );
    setAirlineNames(response.data);
  } catch (error) {
    console.error("항공사 이름을 가져오는 데 오류가 발생했습니다:", error);
  } finally {
    setLoading(false);
  }
}

useEffect(() => {
  const fetchData = async () => {
    const flightInfo = await fetchFlightInfo(); // 비행정보 먼저 가져오기
    if (flightInfo) { // 유효성 체크한 후에 리뷰정보 호출
      if (sortOrder === "latest") {
        await fetchReviews("list", currentPage);
        await fetchAirline();
      } else {
        await fetchReviews("ratelist", currentPage);
        await fetchAirline();
      }
    }
  }
  fetchData();
  document.body.style.backgroundColor = "#dde6f5";
  document.body.style.overflowY = "scroll";
}, [id, currentPage, sortOrder]); // id 값이 변경될 때마다 다시 실행하기

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
          <Header isMain={false} />

          <div className={styles.container}>
            <div className={styles.reviewcontainer}>
              <div className={styles.title1}>항공사들의 이용 후기를 한 번에 -</div>
              <div className={styles.title2}>
                예약한 항공사에 대해 궁금하신가요? <br/>
                여러 사람들이 이용한 다양한 항공사들의 생생한 후기를 확인해보세요~
              </div>
              <Flex justify="center">
                <div className={styles.airlineMenu}>
                {airlineNames && (airlineNames.map((airline) =>
                  <div key={airline.id} className={styles.name}><Link to={"/review/" + airline.id}>{airline.name}</Link><hr className={styles.nameline} /></div>))}
                </div>
                <div>
                  <div className={styles.reviewBody}>
                  <Tabs variant="line" >
                    <TabList>
                      <Tab fontSize={20}  _selected={{color: "#6d9eeb", borderBottom: "2px solid #6d9eeb", fontWeight: "bold" }} onClick={handleLatestClick}>
                        최신순
                      </Tab>
                      <Tab fontSize={20} _selected={{color: "#6d9eeb", borderBottom: "2px solid #6d9eeb", fontWeight: "bold" }} onClick={handleRateClick}>
                        별점순
                      </Tab>
                    </TabList>
                  <TabPanels>
                    <TabPanel>
                      {reviews.length > 0 ? (
                        reviews.map((review) => {
                          const flightInfo = flightInfos.find((info) => info.review.id === review.id);
                          return (<AirlineReviewItem key={review.id} review={review} flightInfo={flightInfo} />);})
                      ) : (<div>작성된 리뷰가 없습니다.</div>)}
                    </TabPanel>
                    <TabPanel>
                      {reviews.length > 0 ? (
                        reviews.map((review) => {
                          const flightInfo = flightInfos.find((info) => info.review && info.review.id === review.id);
                          return (<AirlineReviewItem key={review.id} review={review} flightInfo={flightInfo}/>);})
                      ) : (
                        <div>작성된 리뷰가 없습니다.</div>
                      )}
                    </TabPanel>
                  </TabPanels>
                </Tabs>
                </div>
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
                </div>
              </Flex>
            </div>
          </div>  
        </>
    );
};

export default AirlineReview;