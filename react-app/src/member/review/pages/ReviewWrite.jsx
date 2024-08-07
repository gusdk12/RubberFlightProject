import React, { useContext } from "react";
import { useUser } from "../../../general/user/contexts/LoginContextProvider";
import { Box, FormControl, FormLabel, Grid, HStack, Image, Input, Radio, RadioGroup } from "@chakra-ui/react";
import MenuBar from "../../../general/common/SideMenu/MenuBar";
import Write from "../../../assets/images/review/reviewwrite.webp";

const ReviewWrite = () => {
  const { userInfo } = useUser();

  return (
    <>
      <Grid templateColumns="repeat(5, 1fr)" className="container">
        <MenuBar colSpan={2} />
        <Box colSpan={4} className="card_container">
          <div className="subject">
            <Image src={Write} className="reviewIcon" />
            &nbsp;&nbsp;나의 리뷰
          </div>
          <FormControl>
            <FormLabel>제목</FormLabel>
            <Input type="text"/>
            <FormLabel>Q. 라운지 시설과 이용은 어떠셨나요?</FormLabel>
            <RadioGroup>
              <HStack spacing='15px'>
                <Radio value="5" id="star5"/>
              </HStack>
            </RadioGroup>
          </FormControl>
        </Box>
      </Grid>
    </>
  );
};

export default ReviewWrite;
