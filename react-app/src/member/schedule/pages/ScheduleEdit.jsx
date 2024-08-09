import React, { useContext, useEffect, useRef, useState } from 'react';
import webSocketService from './WebSocketService';
import style from '../CSS/ScheduleEdit.module.css';
import * as Swal from '../../../apis/alert';
import { LoginContext } from '../../../general/user/contexts/LoginContextProvider';
import { useNavigate, useParams } from 'react-router-dom';
import { Input } from '@chakra-ui/react';
import axios from 'axios';

const ScheduleEdit = () => {
    const { userInfo } = useContext(LoginContext);
    const {id} = useParams();
    const [title, setTitle] = useState([]);
    const titleRef = useRef(null);
    const titleInputRef = useRef(null);
    const titleWarningRef = useRef(null);

    console.log(userInfo);
    
    const navigate = useNavigate();
    useEffect(()=>{
        if(!userInfo.id) return;
        
        axios({
            method: "get",
            url: "http://localhost:8282/schedule/team/" + id,
        })
        .then(response => {
            const {data, status, statusText} = response;
            data.some(e => e.username === userInfo.username) 
                || Swal.alert("이 문서를 편집하거나\n열람할 권한이 없습니다.", "메인화면으로 이동합니다", "error", () => { navigate("/") });;
        });
    }, [userInfo]);

    const changeValue = (e) => {
        setTitle(e.target.value);
    };

    const handleInput = () => {
        if(title.length > 50){
            titleWarningRef.current.classList.remove(`${style.hidden}`);
            return;
        }

        titleInputRef.current.blur();
        titleInputRef.current.classList.add(`${style.hidden}`);
        titleWarningRef.current.classList.add(`${style.hidden}`);
        titleRef.current.classList.remove(`${style.hidden}`);
        handleContentChange();
    }

    useEffect(() => {
        fetch(`http://localhost:8282/title/${id}`)
            .then(response => response.json())
            .then(data => setTitle(data.title));

        webSocketService.connect((newContent) => {
            setTitle(newContent.title); 
        }, id);
    }, [id]);

    useEffect(() => {
        webSocketService.connect((newContent) => {
            setTitle(newContent.content);
        }, id);
    }, [id]);

    const handleContentChange = () => {
        webSocketService.sendContent(id, title);
    };
    
    return (
        <div id={style.contentBody}>
            <div id={style.headerPart}>
                <div id={style.backButton}/>
                <div ref={titleRef} id={style.headerTitle} onClick={(e) => {
                        titleInputRef.current.classList.remove(`${style.hidden}`);
                        titleInputRef.current.focus();
                    }}>{title}</div>
                <Input className={style.hidden} id={style.titleInput} name='title' onChange={changeValue} 
                    ref={titleInputRef} value={title || ""} onBlur={handleInput} onKeyDown={(e) => {e.key === 'Enter' && handleInput()}} />
                <div ref={titleWarningRef} id={style.titleWarning} className={style.hidden}>50자 이내로 작성해주세요.</div>
                <div id={style.headerImages}></div>
                <div id={style.headerShare}>공유</div>
            </div>
            <div id={style.editPart}>

            </div>
        </div>
    );
};

export default ScheduleEdit;