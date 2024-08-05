import { ChevronDownIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Container,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
} from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";
import "../CSS/MenuBar.css";

const MenuBar = () => {
  return (
    <>
      <Box fontSize={25} className="menuBox">
        <Text className="menutitle">My Page</Text>
        <div className="menulist"><Link>내 정보</Link></div>
        <div className="menulist"><Link>예약 정보</Link></div>
        <div className="menulist"><Link to={'/member/mypage/review'}>리뷰 내역</Link></div>
        <div className="menulist"><Link>일정</Link></div>
        <div className="menulist"><Link>체크리스트</Link></div>
      </Box>
    </>
  );
};

export default MenuBar;
