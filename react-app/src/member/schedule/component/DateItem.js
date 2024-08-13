import React, { useEffect } from 'react';
import style from '../CSS/ScheduleEdit.module.css';
import TextareaAutosize from 'react-textarea-autosize';
import 'flatpickr/dist/flatpickr.min.css';
import Flatpickr from 'react-flatpickr';
import { FaTrash } from "react-icons/fa6";

const DateItem = ({ index, dateInfo, handleChange, handleDeleteDate }) => {
    const {id, date, content} = dateInfo;

    const onInputChange = (event) => {
        handleChange(index, event.target.value, 1);
    };
    const onDateChange = (changedDate) => {
        handleChange(index, changedDate, 0);
    };
    const onDeleteClick = () => {
        handleDeleteDate(index);
    };

    return (
        <div className={style.dateItem}>
            <div className={style.dateHeader}>
                <Flatpickr
                placeholder='날짜를 선택하세요'
                        options={{ mode: "single" }}
                        value={date}
                        onChange={onDateChange}
                        className={style.dateinput}
                    />
                <div className={style.deleteButton} onClick={onDeleteClick}>
                    <FaTrash fontSize={'22px'}/>
                </div>
            </div>
            <div className={style.dateContent}>
                <TextareaAutosize
                    // minRows={3}
                    value={content}
                    onChange={onInputChange}
                    placeholder='일정을 작성해보세요.'
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
    );
};

export default DateItem;