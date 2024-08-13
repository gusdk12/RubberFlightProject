import React from "react";
import styles from "../css/ReviewWrite.module.css";

export const RateForm = ({name, changeValue}) => {
    const changeRate = (e, name) => {
        changeValue(name, Number(e.target.value));
    };

    return (
        <div className={styles.rating} id="star_rate">
              <input type="radio" name={name} value="5" id={`${name}_star5`} onChange={(e) => changeRate(e, name)}/><label htmlFor={`${name}_star5`}></label>
              <input type="radio" name={name} value="4" id={`${name}_star5`} onChange={(e) => changeRate(e, name)}/><label htmlFor={`${name}_star4`}></label>
              <input type="radio" name={name} value="3" id={`${name}_star5`} onChange={(e) => changeRate(e, name)}/><label htmlFor={`${name}_star3`}></label>
              <input type="radio" name={name} value="2" id={`${name}_star5`} onChange={(e) => changeRate(e, name)}/><label htmlFor={`${name}_star2`}></label>
              <input type="radio" name={name} value="1" id={`${name}_star5`} onChange={(e) => changeRate(e, name)}/><label htmlFor={`${name}_star1`}></label>
          </div>
    );
};

export const RateFormUpdate = ({name, rate, changeValue}) => {
    const changeRate = (e, name) => {
        changeValue(name, Number(e.target.value));
    };

    return (
        <div className={styles.rating} id="star_rate">
              <input type="radio" name={name} value="5" id={`${name}_star5`} checked={rate === 5} onChange={(e) => changeRate(e, name)}/><label htmlFor={`${name}_star5`}></label>
              <input type="radio" name={name} value="4" id={`${name}_star4`} checked={rate === 4} onChange={(e) => changeRate(e, name)}/><label htmlFor={`${name}_star4`}></label>
              <input type="radio" name={name} value="3" id={`${name}_star3`} checked={rate === 3} onChange={(e) => changeRate(e, name)}/><label htmlFor={`${name}_star3`}></label>
              <input type="radio" name={name} value="2" id={`${name}_star2`} checked={rate === 2} onChange={(e) => changeRate(e, name)}/><label htmlFor={`${name}_star2`}></label>
              <input type="radio" name={name} value="1" id={`${name}_star1`} checked={rate === 1} onChange={(e) => changeRate(e, name)}/><label htmlFor={`${name}_star1`}></label>
          </div>
    );
};

