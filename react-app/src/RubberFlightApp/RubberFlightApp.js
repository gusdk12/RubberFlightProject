import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import LoginContextProvider from '../general/user/contexts/LoginContextProvider';
import { ChakraProvider } from '@chakra-ui/react';
import MainPage from '../general/main/pages/MainPage';
import Login from '../general/user/pages/Login';
import Join from '../general/user/pages/Join';
import Search from '../general/reserve/pages/search';
import customTheme from '../general/user/components/Join/customTheme'
import AdminPage from '../general/admin/AdminPage';
import SelectJoin from '../general/user/pages/SelectJoin';
import Admin from '../general/user/pages/admin';

function RubberFlightApp() {
  return (
    <div>
      <ChakraProvider>
      <BrowserRouter>
        <LoginContextProvider theme={customTheme}>
        <Routes>
          <Route path="/" element={<MainPage />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/join/user" element={<Join />} />
          <Route path="/join/admin" element={<Admin />} />
          <Route path="/search" element={<Search />} />
          <Route path="/admin" element={<AdminPage/>}/>
          <Route path="/selectJoin" element={<SelectJoin/>}/>
        </Routes>
      </LoginContextProvider>
      </BrowserRouter>
      </ChakraProvider>
    </div>
  );
}

export default RubberFlightApp;
