import React, { useEffect, useState } from 'react';
import style from '../CSS/ScheduleEdit.module.css';
import webSocketService from '../pages/WebSocketService';
import DateItem from './DateItem';
import TextareaAutosize from 'react-textarea-autosize';


const ScheduleEditPart = (props) => {
    const [dates, setDates] = useState([]);
    
    useEffect(() => {
        fetch(`http://localhost:8282/dates/${props.ScheduleId}`)
            .then(response => response.json())
            .then(data => setDates([...data]));
            
        webSocketService.subscribeToDates(props.ScheduleId, setDates);

    }, [props.ScheduleId]);
    
    const changeValue = (e, index) => {
        let fixedDate = [...dates];
        fixedDate[index].content = e.target.value;

        setDates([...fixedDate]);
        handleContentChange(dates);
    };
    
    const handleContentChange = (content) => {
        webSocketService.sendDates(props.ScheduleId, content);
    }

    return (
        <div id={style.editPart}>
            <div id={style.editcontainer}>
                <div id={style.adddatecontainer}>
                    <div id={style.addDate}/>
                    <div id={style.addButton}/>
                </div>
            </div>
            <div id={style.datelistcontainer}>
                {dates.map((date, index) => 
                    <div className={style.dateItem} key={index}>
                        <div className={style.dateHeader}>{date.date}</div>
                        <div className={style.dateContent}>
                            <TextareaAutosize
                                minRows={3}
                                value={date.content}
                                onChange={(e) => {changeValue(e, index)}}
                                placeholder='일정을 작성해보세요.'
                                resize="none"
                                spellCheck={false}
                                style={{
                                  width: '100%',
                                  backgroundColor: '#ffffff00',
                                  resize: "none",
                                  border: "0px",
                                  outline: 'none', // 클릭 시 outline 제거
                                }}
                            />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ScheduleEditPart;