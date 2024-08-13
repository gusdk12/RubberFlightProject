import React, { useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import Header from '../../../general/common/Header/Header';
import style from '../CSS/ScheduleMain.module.css';
import ScheduleItem from '../component/ScheduleItem';
import { LoginContext } from '../../../general/user/contexts/LoginContextProvider';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Stack, Checkbox } from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';

const ScheduleMain = () => {
    const { userInfo } = useContext(LoginContext);
    const [schedules, setSchedules] = useState([]);
    const [checklists, setChecklists] = useState([]);
    const [checklistItems, setChecklistItems] = useState([]);
    const [selectedChecklistId, setSelectedChecklistId] = useState(null);
    const [isAddingItem, setIsAddingItem] = useState(false);
    
    const token = Cookies.get('accessToken');
    const navigate = useNavigate();

    useEffect(() => {
        document.body.style.backgroundColor = '#FFFFFF';
        document.body.style.overflowY = 'scroll';
    }, []);
    
    useEffect(() => {
        if (userInfo.id) {
            readAllChecklistsAndItems();
            readAllSchedule();
        }
    }, [userInfo]);

    const readAllSchedule = async () => {
        try {
            const response = await axios.get("http://localhost:8282/schedule", {
                headers: { Authorization: `Bearer ${token}` },
            });
            if (Array.isArray(response.data)) {
                setSchedules(response.data);
            } else {
                console.error("Unexpected data format: ", response.data);
            }
        } catch (error) {
            console.error("Error fetching schedules: ", error);
        }
    };

    const readAllChecklistsAndItems = async () => {
        try {
            const checklistsResponse = await axios.get(`http://localhost:8282/checklist/user/${userInfo.id}`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setChecklists(checklistsResponse.data);
    
            // Initialize checklist items
            setChecklistItems([]);
    
            if (checklistsResponse.data.length > 0) {
                const checklistIds = checklistsResponse.data.map(checklist => checklist.id);
                const itemsPromises = checklistIds.map(checklistId =>
                    axios.get(`http://localhost:8282/checklist/items/${checklistId}`, {
                        headers: { Authorization: `Bearer ${token}` },
                    })
                );
                const itemsResponses = await Promise.all(itemsPromises);
    
                const allItems = itemsResponses.flatMap(response => response.data);
                const itemsWithChecked = allItems.map(item => ({
                    ...item,
                    checked: item.checked !== undefined ? item.checked : false // Default value
                }));
                setChecklistItems(itemsWithChecked);
            }
        } catch (error) {
            console.error("Error fetching checklists and items: ", error);
        }
    };
    
    const handleCheckboxChange = async (itemId, checked, itemName, checklistId) => {
        const newCheckedStatus = !checked;
        const updatedItems = checklistItems.map(item => 
            item.id === itemId ? { ...item, checked: newCheckedStatus } : item
        );
        setChecklistItems(updatedItems); // Update UI immediately
        
        try {
            await updateChecklistItem(itemId, itemName, newCheckedStatus, checklistId);
        } catch (error) {
            console.error("Error updating checklist item: ", error);
            // Revert the checkbox change in case of error
            readAllChecklistsAndItems(); // Re-fetch to ensure state consistency
        }
    };

    const updateChecklistItem = async (itemId, itemName, checked, checklistId) => {
        try {
            const response = await axios.put(`http://localhost:8282/checklist/items/${itemId}`, {
                itemName,
                checked,
                checklistId
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    "Content-Type": 'application/json'
                }
            });
            // console.log("Server response:", response.data);
        } catch (error) {
            console.error("Error updating checklist item:", error.response ? error.response.data : error.message);
        }
    };
    
    const createNewSchedule = (e) => {
        e.preventDefault();
        const newSchedule = { title: "제목 없는 일정" };
        axios.post("http://localhost:8282/schedule", newSchedule, {
            headers: { Authorization: `Bearer ${token}`, "Content-Type": 'application/json' }
        })
        .then(response => {
            const { data } = response;
            navigate(`/schedule/edit/${data.id}`);
        });
    };

    const handleAddItem = async (e) => {
        e.preventDefault();
        const newItemName = e.target.elements.newItemName.value;
        if (!newItemName || !selectedChecklistId) return;
    
        try {
            await axios.post(`http://localhost:8282/checklist/items/create`, {
                checklistId: selectedChecklistId,
                itemName: newItemName,
                checked: false
            }, {
                headers: { Authorization: `Bearer ${token}`, "Content-Type": 'application/json' }
            });
            readAllChecklistsAndItems(); // Refresh checklist items
        } catch (error) {
            console.error("Error adding checklist item: ", error);
        }
    };

    const handleAddIconClick = (checklistId) => {
        setSelectedChecklistId(checklistId);
        setIsAddingItem(true);
    };

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
                                    >
                                        <div className={style.checkListTitleContainer}>
                                            <span className={style.checkListTitle}>{checklist.category}</span>
                                            <AddIcon 
                                                className={style.addIcon} 
                                                boxSize={6} 
                                                onClick={() => handleAddIconClick(checklist.id)}
                                            />
                                        </div>
                                        {isAddingItem && selectedChecklistId === checklist.id && (
                                            <form onSubmit={handleAddItem} className={style.addItemForm}>
                                                <input
                                                    type="text"
                                                    name="newItemName"
                                                    placeholder="새 항목 추가"
                                                    className={style.addItemInput}
                                                />
                                                <button type="submit" className={style.addItemButton}>추가</button>
                                            </form>
                                        )}
                                        <div className={style.checkListContent}>
                                            <Stack spacing={3} direction='column'>
                                                {checklistItems
                                                    .filter(item => item.checklistId === checklist.id)
                                                    .map(item => (
                                                        <Checkbox
                                                            key={item.id}
                                                            size='lg'
                                                            isChecked={item.checked}
                                                            onChange={() => handleCheckboxChange(item.id, item.checked, item.itemName, checklist.id)}
                                                            colorScheme='blue'
                                                            sx={{
                                                                textDecoration: item.checked ? 'line-through 2px solid #a9a9a9' : 'none',
                                                                transition: 'textDecoration 0.3s ease',
                                                                color: item.checked ? 'lightgrey' : 'black',
                                                            }}
                                                        >
                                                            {item.itemName}
                                                        </Checkbox>
                                                    ))
                                                }
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
