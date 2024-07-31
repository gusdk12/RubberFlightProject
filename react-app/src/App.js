import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './general/user/pages/Home';
import Login from './general/user/pages/Login';
import Join from './general/user/pages/Join';
import LoginContextProvider from './general/user/contexts/LoginContextProvider';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  return (
    <div>
      <ChakraProvider>
     <BrowserRouter>
       <LoginContextProvider>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
        </Routes>
      </LoginContextProvider>
     </BrowserRouter>
     </ChakraProvider>
    </div>
  );
}

export default App;
