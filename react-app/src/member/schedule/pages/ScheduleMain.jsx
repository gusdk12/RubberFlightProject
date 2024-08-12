import React, { useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Header from '../../../general/common/Header/Header';
import style from '../CSS/ScheduleMain.module.css';
import ScheduleItem from '../component/ScheduleItem';
import { LoginContext } from '../../../general/user/contexts/LoginContextProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Stack, Checkbox } from '@chakra-ui/react';

const ScheduleMain = () => {
    const { userInfo } = useContext(LoginContext);
    const [schedules, setSchedules] = useState([]);
    const [checklists, setChecklists] = useState([]);
    const [checklistItems, setChecklistItems] = useState([]);
    const [selectedChecklistId, setSelectedChecklistId] = useState(null);

    const token = Cookies.get('accessToken');
    const navigate = useNavigate();

    useEffect(() => {
        document.body.style.backgroundColor = '#FFFFFF';
        document.body.style.overflowY = 'scroll';
    }, []);
    
    useEffect(() => {
        if (userInfo.id) {
            readAllChecklists();
            readAllSchedule();
        }
    }, [userInfo]);

    useEffect(() => {
        if (selectedChecklistId) {
            readChecklistItems(selectedChecklistId);
        }
    }, [selectedChecklistId]);

    const readAllSchedule = async () => {
        try {
            const response = await axios.get("http://localhost:8282/schedule", {
                headers: { Authorization: `Bearer ${token}` },
            });
            console.log("Schedule Response Data:", response.data); // 데이터 형식 확인
            if (Array.isArray(response.data)) {
                setSchedules(response.data);
            } else {
                console.error("예상과 다른 데이터 형식: ", response.data);
            }
        } catch (error) {
            console.error("일정 가져오기 오류: ", error);
        }
    };

    const readAllChecklists = async () => {
        try {
            const response = await axios.get(`http://localhost:8282/checklist/user/${userInfo.id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setChecklists(response.data);
            if (response.data.length > 0) {
                setSelectedChecklistId(response.data[0].id);
                readChecklistItems(response.data[0].id);
            }
        } catch (error) {
            console.error("체크리스트 가져오기 오류: ", error);
        }
    };
    const readChecklistItems = async (checklistId) => {
        try {
            const response = await axios.get(`http://localhost:8282/checklist/items/${checklistId}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (Array.isArray(response.data)) {
                // `completed` 대신 `checked`를 사용하여 상태 업데이트
                const itemsWithChecked = response.data.map(item => ({
                    ...item,
                    checked: item.checked !== undefined ? item.checked : false // 기본값 설정
                }));
                setChecklistItems(itemsWithChecked);
            } else {
                console.error("예상과 다른 데이터 형식: ", response.data);
            }
        } catch (error) {
            console.error("체크리스트 아이템 목록 가져오기 오류: ", error);
        }
    };

    const handleChecklistSelect = (checklistId) => {
        setSelectedChecklistId(checklistId);
        readChecklistItems(checklistId);
    };

    const updateChecklistItem = async (itemId, itemName, checked, checklistId) => {
        try {
            await axios.put(`http://localhost:8282/checklist/items/${itemId}`, {
                checklistId,
                itemName,
                checked
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": 'application/json'
                }
            });
    
            // 서버 업데이트 후 체크리스트 아이템 목록을 다시 읽어옵니다.
            await readChecklistItems(checklistId);
        } catch (error) {
            console.error("체크리스트 아이템 수정 오류: ", error.response ? error.response.data : error.message);
        }
    };


    const handleCheckboxChange = async (itemId, checked, itemName) => {
        try {
            // 먼저 상태를 비동기적으로 업데이트
            await updateChecklistItem(itemId, itemName, !checked, selectedChecklistId);
    
            // 상태 업데이트
            const updatedItems = checklistItems.map(item =>
                item.id === itemId ? { ...item, checked: !checked } : item
            );
    
            setChecklistItems(updatedItems);
        } catch (error) {
            console.error("체크리스트 아이템 수정 오류: ", error);
        }
    };
    
    


    const createNewSchedule = (e) => {
        e.preventDefault();

        let newSchedule = {
            title: "제목 없는 일정",
        }

        axios({
            method: "post",
            url: "http://localhost:8282/schedule",
            headers: {
                Authorization: `Bearer ${token}`,
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
                {/* 체크리스트 부분 */}
                <div id={style.checklistPart}>
                    <div className={style.partTitle}>Checklist</div>
                    <div id={style.checklistPartContainer}>
                        <div className={style.ListsColumn}>
                            {checklists.length === 0 ? (
                                <div>체크리스트가 없습니다.</div>
                            ) : (
                                checklists.map(checklist => (
                                    <div 
                                        key={checklist.id}
                                        className={style.checkList}
                                        onClick={() => handleChecklistSelect(checklist.id)}
                                    >
                                        <div className={style.checkListTitle}>{checklist.category}</div>
                                        <div className={style.checkListContent}>
                                        <Stack spacing={3} direction='column'>
                                            {checklistItems.map(item => (
                                                item.checklistId === checklist.id && (
                                                    <Checkbox
                                                        key={item.id}
                                                        size='lg'
                                                        isChecked={item.checked}
                                                        onChange={() => handleCheckboxChange(item.id, item.checked, item.itemName)}
                                                        colorScheme='blue'
                                                        sx={{
                                                            textDecoration: item.checked ? 'line-through 2px solid #a9a9a9' : 'none',
                                                            transition: 'textDecoration 0.3s ease',
                                                            color : item.checked ? 'lightgrey' : 'black',
                                                        }}
                                                    >
                                                        {item.itemName}
                                                    </Checkbox>
                                                )
                                            ))}
                                        </Stack>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* 일정 부분 */}
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

            <div id={style.footerPart}></div>
        </>
    );
};

export default ScheduleMain;
