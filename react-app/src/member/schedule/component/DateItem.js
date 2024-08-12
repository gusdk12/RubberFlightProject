import React, { useEffect } from 'react';
import style from '../CSS/ScheduleEdit.module.css';
import { Textarea } from '@chakra-ui/react'

const DateItem = (props) => {
    const {id, date, content} = props.date;

    useEffect(() => {
        props.date && console.log(id, date, content);

    }, [props.date]);


    return (
        <></>
    );
};

export default DateItem;