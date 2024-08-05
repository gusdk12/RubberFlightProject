import React, { useEffect, useState } from 'react';
// import {DatePicker, DateRangePicker} from "@nextui-org/react";
import { Box } from '@chakra-ui/react';
import Header from '../../common/Header/Header.jsx';
import ThreeScene from '../component/ThreeScene.jsx';
import '../../../Global/font.css'
import '../CSS/Main.css';

const MainPage = () => {
    const [isAirplaneLoaded, setIsAirplaneLoaded] = useState(false);
    const [isSearhMode, setIsSearhMode] = useState(false);
    const [isRoundWay, setIsRoundWay] = useState(true);

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
            <Box onClick={() => setIsSearhMode(true)} className="reserveButton">항공권 조회하기</Box>
            
            <Box className="searchBox">
                <div id='wayBox'>
                    <div id='roundway' onClick={() => setIsRoundWay(true)} className={isRoundWay ? 'active' : ''}>왕복</div> 
                    <div id='oneway' onClick={() => setIsRoundWay(false)} className={isRoundWay ? '' : 'active'}>편도</div>
                </div>
                <div id='selectBox'>
                    <div id='airportPart'>
                        <div id='depPart'>
                            <div className='airportName'>ICN</div>
                            <div className='selectArrow'/>
                        </div>
                        <div id='arrPart'>
                            <div className='airportName'>도착</div>
                            <div className='selectArrow'/>
                        </div>
                    </div>
                    <div id='datePart'>
                        {isRoundWay ? 
                            (
                                <>
                                    왕복
                                    {/* <DateRangePicker 
                                        label="일정을 선택해주세요." 
                                        className="max-w-xs" 
                                    /> */}
                                </>
                            )
                            :
                            (
                                <>
                                    편도
                                    {/* <DatePicker label="Birth date" className="max-w-[284px]" /> */}
                                </>
                            )
                        }
                    </div>
                    <div id='peoplePart'></div>
                    <div id='submitButton'>항공권 검색</div>
                </div>
            </Box>
        </div>
        </>
    );
};

export default MainPage;

