import React, { useEffect, useState } from 'react';
import Header from '../../common/Header/Header.jsx';
import ThreeScene from '../component/ThreeScene.jsx';
import '../CSS/Main.css';
import { Box } from '@chakra-ui/react';
import { useFrame } from '@react-three/fiber';


const MainPage = () => {
    const [isAirplaneLoaded, setIsAirplaneLoaded] = useState(false);
    const [isSearhMode, setIsSearhMode] = useState(false);

    useEffect(() => {
        document.body.style.overflowX = 'hidden';
    }, []);
    useEffect(() => {
        isAirplaneLoaded && document.querySelector(".reserveButton").classList.add("showReserveClass");
        isSearhMode && document.querySelector(".reserveButton").classList.remove("showReserveClass");
        isSearhMode && document.querySelector(".searchBox").classList.add("showSeachClass");
    }, [isAirplaneLoaded, isSearhMode]);

    return (
        <>
        <Header isMain={true}/>
        <div className="contentpart">
            <ThreeScene setIsAirplaneLoaded={setIsAirplaneLoaded} isSearhMode={isSearhMode}/>
            <Box onClick={() => setIsSearhMode(true)} className="reserveButton">{/*항공권 검색하기*/}</Box>
            <Box className="searchBox">
                <div className='crossline'/>
            </Box>
        </div>
        </>
    );
};

export default MainPage;

