import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import LoginContextProvider from '../general/user/contexts/LoginContextProvider';
import { ChakraProvider } from '@chakra-ui/react';
import MainPage from '../general/main/pages/MainPage';
import Login from '../general/user/pages/Login';
import Join from '../general/user/pages/Join';
import Search from '../general/reserve/pages/search';
import CouponPage from '../admin/coupon/pages/CouponPage';
import { CouponProvider } from '../admin/coupon/contexts/CouponContext';

function RubberFlightApp() {
  return (
    <div>
      <ChakraProvider>
      <BrowserRouter>
        <LoginContextProvider>
        <CouponProvider>
        <Routes>
          <Route path="/" element={<MainPage />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route path="/search" element={<Search />} />
          <Route path="/coupons" element={<CouponPage />} /> 
        </Routes>
        <nav>
            {/* 쿠폰 페이지로 이동하는 버튼 */}
            <Link to="/coupons">
              <button style={{ margin: '10px' }}>쿠폰 페이지 이동</button>
            </Link>
          </nav>
        </CouponProvider>
      </LoginContextProvider>
      </BrowserRouter>
      </ChakraProvider>
    </div>
  );
}

export default RubberFlightApp;
