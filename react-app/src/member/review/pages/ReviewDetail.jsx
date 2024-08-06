import { Flex, Grid, ModalHeader, Text } from "@chakra-ui/react";
import React from "react";
import emptyStar from "../../../assets/images/review/grey_star.webp";
import fullStar from "../../../assets/images/review/yellow_star.webp"
import { useUser } from "../../../general/user/contexts/LoginContextProvider";

// 각 별점
export const StarRating = ({rate}) => {
  const starFull = fullStar;
  const starEmpty = emptyStar;
  const stars = [];

  // 채워진 별 추가
  Array.from({length: rate}).forEach(() => {
    stars.push(<img src={starFull} className='star-ratings' alt='full Star'/>);
  });

  // 비어있는 별 추가
  Array.from({length: 5 - rate}).forEach(() => {
    stars.push(<img src={starEmpty} class='star-ratings' alt='empty Star'/>);
  });

  return <div className='star-ratings-base'>{stars}</div>
}

// 항공사별 총 평균 (큰 별)
export const TotalStarRating = ({rate}) => {
  const starFull = fullStar;
  const starEmpty = emptyStar;
  const stars = [];

  // 채워진 별 추가
  Array.from({length: rate}).forEach(() => {
    stars.push(<img src={starFull} className='star-ratings' alt='full Star'/>);
  });

  // 비어있는 별 추가
  Array.from({length: 5 - rate}).forEach(() => {
    stars.push(<img src={starEmpty} class='star-ratings' alt='empty Star'/>);
  });

  return <div className='total_rate'>{stars}</div>
}

const ReviewDetail = (props) => {

  const {
    id, 
    title,
    seat_rate,
    service_rate,
    procedure_rate,
    flightmeal_rate,
    lounge_rate,
    clean_rate,
    content,
    date,
  } = props.review;

  const { userInfo } = useUser();
  const totalRate = (seat_rate + service_rate + procedure_rate + flightmeal_rate + lounge_rate + clean_rate) / 6;

  return (
    <>
      <ModalHeader className="reviewTitle" fontSize={50}>
        "{title}"
      </ModalHeader>
      <Grid templateColumns="repeat(2, 1fr)" className="flightInfo">
        <Flex paddingLeft={10} marginBottom={5}>
          <Text fontSize={23}></Text>&nbsp;&nbsp;&nbsp;
          <TotalStarRating rate={totalRate} />
        </Flex>
        <Text marginTop={5} fontSize={18} className="userInfo">
          작성자:&nbsp;&nbsp;&nbsp;{userInfo.name}
        </Text>
      </Grid>
      <Grid templateColumns="repeat(2, 1fr)" fontSize={18} paddingLeft={10} gap={3}>
        <Text className="flightInfo">탑승일:&nbsp;&nbsp;&nbsp;</Text>
        <Text className="userInfo">작성일:&nbsp;&nbsp;&nbsp;{date}</Text>
      </Grid>
      <div className="review_body">
        <Text className="review_content" width={940} fontSize={23}>
          {content}
        </Text>
        <div className="rate_body">
          <Grid templateColumns="repeat(2, 1fr)" fontSize={20} marginLeft={50} gap={50}>
            <Flex paddingLeft={10} marginBottom={5}>
              좌석 공간 및 편안함:&nbsp;&nbsp;&nbsp;
              <StarRating rate={seat_rate} />
            </Flex>
            <Flex paddingLeft={10} marginBottom={5}>
              청결도:&nbsp;&nbsp;&nbsp;
              <StarRating rate={clean_rate} />
            </Flex>
          </Grid>
          <Grid templateColumns="repeat(2, 1fr)" fontSize={20} marginLeft={50} gap={50}>
            <Flex paddingLeft={10} marginBottom={5}>
              체크인 및 탑승:&nbsp;&nbsp;&nbsp;
              <StarRating rate={procedure_rate} />
            </Flex>
            <Flex paddingLeft={10} marginBottom={5}>
              라운지:&nbsp;&nbsp;&nbsp;
              <StarRating rate={lounge_rate} />
            </Flex>
          </Grid>
          <Grid templateColumns="repeat(2, 1fr)" fontSize={20} marginLeft={50} marginBottom={35} gap={50}>
            <Flex paddingLeft={10} marginBottom={5}>
              기내 서비스:&nbsp;&nbsp;&nbsp;
              <StarRating rate={service_rate} />
            </Flex>
            <Flex paddingLeft={10} marginBottom={5}>
              기내식 및 음료:&nbsp;&nbsp;&nbsp;
              <StarRating rate={flightmeal_rate} />
            </Flex>
          </Grid>
        </div>
      </div>
    </>
  );
};

export default ReviewDetail;
