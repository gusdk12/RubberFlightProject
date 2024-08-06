import React, { useEffect } from 'react';
import Header from '../../../general/common/Header/Header';
import '../CSS/ScheduleMain.css';

const ScheduleMain = () => {

    useEffect(() => {
        document.body.style.backgroundColor = '#FFFFFF';
        document.body.style.overflowY = 'scroll';
    }, []);

    return (
        <>
            <Header isMain={false}/>
            <div id='scheduleHeader'>일정과 체크리스트를 한번에 - </div>
            <div id='scheduleInfo'>
                나만의 체크리스트를 만들어 놓치는 물건이 없나 확인해보세요.<br/>
                함께 여행하는 가족, 친구와 함께 일정을 짤 수도 있어요.
            </div>
            
            <div id='contentPart'>
                <div id='checklistPart'>
                    <div className='partTitle'>Checklist</div>
                    <div id='checklistPartContainer'>
                        <div className='ListsColumn'>
                            <div className='checkList'>
                                <div className='checkListTitle'>상비약</div>
                                <div className='checkListContent'>배탈약<br/>감기약</div>
                            </div>
                            <div className='checkList'>
                                <div className='checkListTitle'>옷</div>
                                <div className='checkListContent'>드레스<br/>반바지<br/>잠옷</div>
                            </div>
                        </div>
                        <div className='ListsColumn'>
                            <div className='checkList'>
                                <div className='checkListTitle'>필수품</div>
                                <div className='checkListContent'>여권+볼펜<br/>지갑<br/>유심/포켓와이파이<br/>신분증<br/>현지화폐<br/>신용카드</div>
                            </div>
                            <div className='checkList'>
                                <div className='checkListTitle'>기타</div>
                                <div className='checkListContent'>우산/우비<br/>휴지<br/>지퍼백<br/>샤워기필터</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div id='schedulePart'>
                    <div className='partTitle'>Schedule</div>
                    <div id='schedulePartContainer'>
                        <div id='addPart'>
                            <div id='addButton'><div id='addIcon'/></div>
                        </div>
                        <div id='listPart'>
                            <div id='listHeader'>최근 일정 목록</div>
                            <div id='listsContainer'>
                                <div className='scheduleItem'>
                                    <div className='scheduleTitle'>제주도 가자!</div>
                                    <div className='scheduleDate'>2024-02-12</div>
                                </div>
                                <div className='scheduleItem'>
                                    <div className='scheduleTitle'>가족여행</div>
                                    <div className='scheduleDate'>2024-02-12</div>
                                </div>
                                <div className='scheduleItem'>
                                    <div className='scheduleTitle'>고래밥</div>
                                    <div className='scheduleDate'>2024-02-12</div>
                                </div>
                                <div className='scheduleItem'>
                                    <div className='scheduleTitle'>텀블러</div>
                                    <div className='scheduleDate'>2024-02-12</div>
                                </div>
                                <div className='scheduleItem'>
                                    <div className='scheduleTitle'>방구</div>
                                    <div className='scheduleDate'>2024-02-12</div>
                                </div>
                                <div className='scheduleItem'>
                                    <div className='scheduleTitle'>텀블러</div>
                                    <div className='scheduleDate'>2024-02-12</div>
                                </div>
                                <div className='scheduleItem'>
                                    <div className='scheduleTitle'>방구</div>
                                    <div className='scheduleDate'>2024-02-12</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div id='footerPart'>
            </div>
        </>
    );
};

export default ScheduleMain;