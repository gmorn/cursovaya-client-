import React, { useState } from 'react'
import style from './ratingStars.module.scss'

export default function Rating({countStars}) {
    const [rating, setRating] = useState(countStars);
    const [hover, setHover] = useState(0);
    

    return (
        <div className={style.starRating}>
            {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                <div
                    key={index}
                    className={index <= (hover || rating) ? "on" : "off"}
                >
                    <img src={`./icons/${index <= (hover || rating)?'star':'hollowStar'}.png`} alt="" />
                </div>
                );
            })}
        </div>
    );
}
