import React, { useState } from "react";

export const RateForm = ({rate}) => {

    return (
        <div className="rating" id="star_rate">
              <input type="radio" name="rate" value="5" id="star5" checked={rate === 5}/><label htmlFor="star5"></label>
              <input type="radio" name="rate" value="4" id="star4" checked={rate === 4}/><label htmlFor="star4"></label>
              <input type="radio" name="rate" value="3" id="star3" checked={rate === 3}/><label htmlFor="star3"></label>
              <input type="radio" name="rate" value="2" id="star2" checked={rate === 2}/><label htmlFor="star2"></label>
              <input type="radio" name="rate" value="1" id="star1" checked={rate === 1}/><label htmlFor="star1"></label>
          </div>
    );
};