import React from 'react';
import style from '../CSS/ScheduleMain.module.css';
import { useNavigate } from 'react-router-dom';
import { HiTrash } from "react-icons/hi";
import axios from 'axios';

const ScheduleItem = (props) => {

    const {id, title, edit_date} = props.schedule;
    
    const navigate = useNavigate();
    const editPage= () => {
        navigate(`/schedule/edit/${id}`);
    }

    const deleteSchedule = (e) => {
        e.preventDefault();
        
        if(!window.confirm("일정을 삭제하시겠습니까?")) return;

        axios({
            method: "delete",
            url: "http://localhost:8282/schedule/" + id,
        })
        .then(response => {
            const {data, status, statusText} = response;
            window.alert("삭제되었습니다")
            props.readAllSchedule();
        });
    }

    return (
        <div className={style.scheduleItem}>
            <div className={style.scheduleTitle} onClick={editPage}>{title}</div>
            <div className={style.scheduleDate}>
                {edit_date.split(" ")[0]}
                <HiTrash fontSize={'20px'} onClick={deleteSchedule}/>
            </div>
        </div>
    );
};

export default ScheduleItem;