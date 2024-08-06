import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import LoginContextProvider from '../general/user/contexts/LoginContextProvider';
import { ChakraProvider } from '@chakra-ui/react';
import MainPage from '../general/main/pages/MainPage';
import Login from '../general/user/pages/Login';
import Join from '../general/user/pages/Join';
import JoinAdmin from '../general/user/pages/JoinAdmin';
import Search from '../general/reserve/pages/search';
import customTheme from '../general/user/components/Join/customTheme'
import AdminPage2 from '../admin/flightAirport/pages/AdminPage2';
import SelectJoin from '../general/user/pages/SelectJoin';
import Admin from '../general/user/pages/admin';
import UserInfo from '../member/user/pages/UserInfo';
import ReviewList from '../member/review/pages/ReviewList';
import ReviewUpdate from '../member/review/pages/ReviewUpdate';
import ReviewWrite from '../member/review/pages/ReviewWrite';
import FlightInfoList from '../member/flightInfo/pages/FlightInfoList';
import FlightInfoDetail from '../member/flightInfo/pages/FlightInfoDetail';
import { FlightInfoProvider } from '../member/flightInfo/contexts/FlightInfoContext';

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
              <Route path="/admin2" element={<AdminPage2 />} />
              <Route path="/member/mypage" element={<UserInfo />}>
                <Route path="flight-info" element={<FlightInfoList />} />
                <Route path="flight-info/:flightId" element={<FlightInfoProvider><FlightInfoDetail/></FlightInfoProvider>} />
              </Route>
              <Route path='member/mypage/review' element={<ReviewList />} />
              <Route path='member/mypage/review/write' element={<ReviewWrite />} />
              <Route path='member/mypage/review/update' element={<ReviewUpdate />} />
              <Route path="/selectJoin" element={<SelectJoin />} />
              <Route path="/selectJoin" element={<SelectJoin />} />
            </Routes>
          </LoginContextProvider>
        </BrowserRouter>
      </ChakraProvider>
    </div>
  );
}

export default RubberFlightApp;
