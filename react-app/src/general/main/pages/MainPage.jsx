import React, { useEffect } from 'react';
import Header from '../../common/Header/Header.jsx';
import ThreeScene from '../component/ThreeScene.jsx';
import '../CSS/Main.css';

const MainPage = () => {
    useEffect(() => {
        document.body.style.overflowX = 'hidden';
    }, []);

    return (
        <>
        <Header/>
        <div className="contentpart">
            <div className="introduceMain"></div>
            <ThreeScene/>
        </div>
        </>
    );
};

export default MainPage;