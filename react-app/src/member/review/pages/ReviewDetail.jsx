import Cookies from 'js-cookie';
import { Box, Flex, Grid, Heading, Image, Spinner } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useUser } from "../../../general/user/contexts/LoginContextProvider";
import { StarRating, TotalStarRating } from "../components/Rating";
import styles from "../css/ReviewDetail.module.css";
import axios from "axios";
import { alert, confirm } from "../../../apis/alert";
import { useNavigate, useParams } from "react-router-dom";
import Review from "../../../assets/images/review/review.webp";

const ReviewDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [review, setReview] = useState({
    title: "",
    seat_rate: "",
    service_rate: "",
    procedure_rate: "",
    flightmeal_rate: "",
    lounge_rate: "",
    clean_rate: "",
    content: "",
  });
  const [flightInfos, setFlightInfos] = useState([]);
  const [loading, setLoading] = useState(true);

  // // 비행정보 불러오기
  const fetchFlightInfo = async () => {
    const token = Cookies.get('accessToken');
      if (!token) {
        console.error("토큰을 찾을 수 없습니다.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('http://localhost:8282/flightInfo/list', {
          headers: {
            Authorization: `Bearer ${token}`,
          },  
        });
        setFlightInfos(response.data);
        return response.data; // 리뷰 정보 조회에 활용하기 위해 반환
      } catch (error) {
        console.error("Error fetching flight info:", error);
      }
    };

  const fetchReviewInfo = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8282/review/detail/` + id
      );
      setReview(response.data);
    } catch (error) {
      alert("Error", "조회 실패", "error");
    }
  };

  // 리뷰 조회하기
  useEffect (() => {
    const fetchData = async () => {
        try {
          const flightInfo = await fetchFlightInfo(); // 비행정보 먼저 가져오기
          if (flightInfo) { // 유효성 체크한 후에 리뷰정보 호출
            await fetchReviewInfo();
          }
        } catch (error) {
          console.error("데이터를 가져오는 데 오류가 발생했습니다:", error);
        } finally {
          setLoading(false); // 로딩 종료
        }
    };
    fetchData();
  }, []);

  const flightInfo = flightInfos.find((info) => info.review && info.review.id === review.id);
  const UpdateBtn = () => {
    navigate("/mypage/review/update/" + id, { state: { flightInfo } });
  };

  const ListBtn = () => {
    navigate("/mypage/review");
  };

  // 리뷰 삭제하기
  const DeleteBtn = () => {
    confirm("정말 삭제하시겠습니까?", "작성한 리뷰를 삭제합니다", "warning",
        (result) => {
        if (result.isConfirmed) {
          axios({
            method: "delete",
            url: "http://localhost:8282/review/delete/" + id,
          }).then((response) => {
            const { data, status, statusText } = response;
            if (data === 1) {
              alert("Success", "삭제 성공", "success", () =>
                navigate(`/mypage/review`)
              );
            } else {
              alert("Error", "삭제 실패", "error");
            }
          });
        }});
  };

  const totalRate = (
    (review.seat_rate +
      review.service_rate +
      review.procedure_rate +
      review.flightmeal_rate +
      review.lounge_rate +
      review.clean_rate) / 6).toFixed(1);

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
      <Box
        style={{ 
          maxWidth: '900px', minWidth: '900px',
          margin: 'auto', width: '90%',
          borderWidth: '1px', borderRadius: '8px',
          padding: '20px', marginTop: '40px',
          marginBottom: '40px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          backgroundColor: 'white'
      }}>
      <div className={styles.writedate}>작성일:&nbsp;&nbsp;&nbsp;
      {new Date(review.date).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/(\d{1,2})\.$/, '$1')}</div>
        <div className={styles.reviewtitle}>"{review.title}"</div>
        <div className={styles.airlineName}>[{flightInfo.airlineName}]</div>
          <Flex>
            <div className={styles.reviewRate}><TotalStarRating rate={totalRate} /></div>
            <div className={styles.totalRate}>({totalRate})</div>
          </Flex>
          <div className={styles.date}>
            <div className={styles.boarding}>탑승일 | DATE</div>
            <div className={styles.depSch}>{new Date(flightInfo.depSch).toLocaleDateString('ko-KR', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/(\d{1,2})\.$/, '$1')}</div>
          </div>
        <hr/>
        <div className={styles.reviewBody}>
        {review.content && <div className={styles.content}>{review.content}</div>}
          <div className={styles.rateBody}>
            <Grid templateColumns="repeat(2, 1fr)" fontSize={20} gap={50}>
              <Flex paddingLeft={10} marginBottom={5}>
                좌석 공간 및 편안함:&nbsp;&nbsp;&nbsp;
                <StarRating rate={review.seat_rate} />
              </Flex>
              <Flex paddingLeft={10} marginBottom={5}>
                청결도:&nbsp;&nbsp;&nbsp;
                <StarRating rate={review.clean_rate} />
              </Flex>
            </Grid>
            <Grid templateColumns="repeat(2, 1fr)" fontSize={20} gap={50}>
              <Flex paddingLeft={10} marginBottom={5}>
                체크인 및 탑승:&nbsp;&nbsp;&nbsp;
                <StarRating rate={review.procedure_rate} />
              </Flex>
              <Flex paddingLeft={10} marginBottom={5}>
                라운지:&nbsp;&nbsp;&nbsp;
                <StarRating rate={review.lounge_rate} />
              </Flex>
            </Grid>
            <Grid templateColumns="repeat(2, 1fr)" fontSize={20} marginBottom={35} gap={50}>
              <Flex paddingLeft={10} marginBottom={5}>
                기내 서비스:&nbsp;&nbsp;&nbsp;
                <StarRating rate={review.service_rate} />
              </Flex>
              <Flex paddingLeft={10} marginBottom={5}>
                기내식 및 음료:&nbsp;&nbsp;&nbsp;
                <StarRating rate={review.flightmeal_rate} />
              </Flex>
            </Grid>
          </div>
        </div>
        </Box>
        <div className={styles.reviewBtn}>
          <button className={`${styles.btn} ${styles.listbtn}`} onClick={ListBtn}>목록</button>
          <button className={`${styles.btn} ${styles.updatebtn}`} onClick={UpdateBtn}>수정</button>
          <button className={`${styles.btn} ${styles.deletebtn}`} onClick={DeleteBtn}>삭제</button>
        </div>
      </Box>
    </>
  );
};

export default ReviewDetail;
