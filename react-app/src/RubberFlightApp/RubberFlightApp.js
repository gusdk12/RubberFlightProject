import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import LoginContextProvider from '../general/user/contexts/LoginContextProvider';
import { ChakraProvider } from '@chakra-ui/react';
import MainPage from '../general/main/pages/MainPage';
import Login from '../general/user/pages/Login';
import Join from '../general/user/pages/Join';
import JoinAdmin from '../general/user/pages/JoinAdmin';
import Search from '../general/reserve/pages/search';
import Reserve from '../general/reserve/pages/reserve';
import customTheme from '../general/user/components/Join/customTheme'
import EditCA from '../admin/editCountryAirport/pages/EditCA';
import SelectJoin from '../general/user/pages/SelectJoin';
import UserInfo from '../member/user/pages/UserInfo';
import ReviewList from '../member/review/pages/ReviewList';
import ReviewUpdate from '../member/review/pages/ReviewUpdate';
import ReviewWrite from '../member/review/pages/ReviewWrite';
import ScheduleMain from '../member/schedule/pages/ScheduleMain';
import FlightInfoList from '../member/flightInfo/pages/FlightInfoList';
import FlightInfoDetail from '../member/flightInfo/pages/FlightInfoDetail';
import { FlightInfoProvider } from '../member/flightInfo/contexts/FlightInfoContext';
import CouponPage from '../admin/coupon/pages/CouponPage';
import { CouponProvider } from '../admin/coupon/contexts/CouponContext';
import LiveFlight from '../general/live/pages/LiveFlight';

function RubberFlightApp() {
  return (
    <div>
      <ChakraProvider>
        <BrowserRouter>
          <LoginContextProvider theme={customTheme}>
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/join/user" element={<Join />} />
              <Route path="/join/admin" element={<JoinAdmin />} />
              <Route path="/search" element={<Search />} />
                <Route path="/reserve/:id" element={<Reserve/>}/>
              <Route path="/admin/edit" element={<EditCA />} />
              <Route path="/schedule" element={<ScheduleMain />} />
              <Route path="/coupon" element={<CouponProvider><CouponPage/></CouponProvider>} />
              <Route path="/mypage" element={<UserInfo />}>
                <Route path="flight-info" element={<FlightInfoList />} />
                <Route path="flight-info/:flightId" element={<FlightInfoProvider><FlightInfoDetail/></FlightInfoProvider>} />
                <Route path="review" element={<ReviewList />} />
              </Route>
              <Route path="/selectJoin" element={<SelectJoin />} />
              <Route path="/selectJoin" element={<SelectJoin />} />
              <Route path="/live" element={<LiveFlight />} />
            </Routes>
          </LoginContextProvider>
        </BrowserRouter>
      </ChakraProvider>
    </div>
  );
}

export default RubberFlightApp;
