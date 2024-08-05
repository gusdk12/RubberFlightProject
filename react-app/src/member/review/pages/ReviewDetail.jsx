import { Flex, Grid, Text } from '@chakra-ui/react';
import React from 'react';
import Star from "../img/star_32.webp";
import { useUser } from '../../../general/user/contexts/LoginContextProvider';

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

    return (
        <>
          <div>
        <span>X</span>
        <div>"{title}"</div>
        <div className="subTitle">
        <Grid templateColumns="repeat(2, 1fr)" fontSize={18}>
          <Flex>항공사:&nbsp;&nbsp;&nbsp;
          <div class="star-ratings-base">
              <img src={Star} alt="별1" />
              <img src={Star} alt="별1" />
              <img src={Star} alt="별1" />
              <img src={Star} alt="별1" />
              <img src={Star} alt="별1" />
            </div>
          </Flex>
          <Text>작성자:&nbsp;&nbsp;&nbsp;{userInfo.name}</Text>
        </Grid>
        <Grid templateColumns="repeat(2, 1fr)" fontSize={18}>
          <Text>탑승일:&nbsp;&nbsp;&nbsp;</Text>
          <Text>작성일:&nbsp;&nbsp;&nbsp;{date}</Text>
        </Grid>
        </div>
      </div>

        </>
    );
};

export default ReviewDetail;