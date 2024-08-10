import React, { useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import * as Swal from '../../../apis/alert.js';
import Header from '../../../general/common/Header/Header';
import style from '../CSS/ScheduleMain.module.css';
import ScheduleItem from '../component/ScheduleItem';
import { LoginContext } from '../../../general/user/contexts/LoginContextProvider';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ScheduleMain = () => {
    const { userInfo } = useContext(LoginContext);
    const [schedules, setSchedules] = useState([]);
    const token = Cookies.get('accessToken');

    useEffect(() => {
        document.body.style.backgroundColor = '#FFFFFF';
        document.body.style.overflowY = 'scroll';
    }, []);
    
    useEffect(()=>{
        readAllSchedule();
    }, []);

    const navigate = useNavigate();
    // useEffect(()=>{
    //     userInfo.id && id && userInfo.id != id && 
    //         Swal.alert("권한이 없습니다.", "메인 화면으로 이동합니다.", "error", () => { navigate("/") });
    // }, [userInfo.id]);

    const readAllSchedule = () => {
        axios({
            method: "get",
            url: "http://localhost:8282/schedule",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        .then(response => {
            const {data, status, statusText} = response;
            setSchedules(data);
        });
    }

    const createNewSchedule = (e) => {
        e.preventDefault();

        let newSchedule = {
            title: "제목 없는 일정",
        }

        axios({
            method: "post",
            url: "http://localhost:8282/schedule/" + userInfo.id,
            headers: {
                "Content-Type": 'application/json',
            },
            data: JSON.stringify(newSchedule), 
        })
        .then(response => {
            const {data, status, statusText} = response;
            navigate(`/schedule/edit/${data.id}`);
        });
    }

    return (
        <>
            <Header isMain={false}/>
            <div id={style.scheduleHeader}>일정과 체크리스트를 한번에 - </div>
            <div id={style.scheduleInfo}>
                나만의 체크리스트를 만들어 놓치는 물건이 없나 확인해보세요.<br/>
                함께 여행하는 가족, 친구와 함께 일정을 짤 수도 있어요.
            </div>
            
            <div id={style.contentPart}>
                <div id={style.checklistPart}>
                    <div className={style.partTitle}>Checklist</div>
                    <div id={style.checklistPartContainer}>
                        <div className={style.ListsColumn}>
                            <div className={style.checkList}>
                                <div className={style.checkListTitle}>상비약</div>
                                <div className={style.checkListContent}>배탈약<br/>감기약</div>
                            </div>
                            <div className={style.checkList}>
                                <div className={style.checkListTitle}>옷</div>
                                <div className={style.checkListContent}>드레스<br/>반바지<br/>잠옷</div>
                            </div>
                        </div>
                        <div className={style.ListsColumn}>
                            <div className={style.checkList}>
                                <div className={style.checkListTitle}>필수품</div>
                                <div className={style.checkListContent}>여권+볼펜<br/>지갑<br/>유심/포켓와이파이<br/>신분증<br/>현지화폐<br/>신용카드</div>
                            </div>
                            <div className={style.checkList}>
                                <div className={style.checkListTitle}>기타</div>
                                <div className={style.checkListContent}>우산/우비<br/>휴지<br/>지퍼백<br/>샤워기필터</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id={style.schedulePart}>
                    <div className={style.partTitle}>Schedule</div>
                    <div id={style.schedulePartContainer}>
                        <div id={style.addPart}>
                            <div id={style.addButton} onClick={createNewSchedule}><div id={style.addIcon}/></div>
                        </div>
                        <div id={style.listPart}>
                            {schedules.length === 0 ? (
                                <div style={{ color: '#546280', fontSize: '25px' }}>작성한 일정이 없습니다.</div>
                            ) : (
                                <>
                                    <div id={style.listHeader}>최근 일정 목록</div>
                                    <div id={style.listsContainer}>
                                        {schedules.map(schedule => <ScheduleItem key={schedule.id} schedule={schedule} readAllSchedule={readAllSchedule}/>)}
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div id={style.footerPart}>
            </div>
        </>
    );
};

export default ScheduleMain;