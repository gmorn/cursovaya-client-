import React, { useEffect, useState } from 'react'
import style from './ratingStars.module.scss'

import starIcon from '../../../icons/star.png'
import hollowStar from '../../../icons/hollowStar.png'

export default function StarRating({getStars, countStars}) {
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    
    useEffect(() => {
        setRating(countStars)
    }, [countStars])

    useEffect(() => {
        getStars(rating)
        
    },[rating])
    return (
        <div className={style.starRating}>
            {[...Array(5)].map((star, index) => {
                index += 1;
                return (
                <div
                    key={index}
                    onClick={() => setRating(index)}
                    onMouseEnter={() => setHover(index)}
                    onMouseLeave={() => setHover(rating)}
                >
                    <img src={ index <= (hover || rating) ? starIcon : hollowStar } alt="" />
                </div>
                );
            })}
        </div>
    );
}