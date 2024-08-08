import React from 'react';
import style from '../CSS/ScheduleMain.module.css';
import { useNavigate } from 'react-router-dom';

const ScheduleItem = (props) => {

    const {id, title, edit_date} = props.schedule;
    
    const navigate = useNavigate();
    const editPage= () => {
        navigate(`/schedule/edit/${id}`);
    }

    return (
        <div className={style.scheduleItem} onClick={editPage}>
            <div className={style.scheduleTitle}>{title}</div>
            <div className={style.scheduleDate}>{edit_date.split(" ")[0]}</div>
        </div>
    );
};

export default ScheduleItem;