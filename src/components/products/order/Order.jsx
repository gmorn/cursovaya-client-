import React from 'react'
import style from '../styles/components/order.module.scss'

export default function Order({item, deliteOrder}) {


  return (
    <div className={style.order}>
        <div 
            className={style.image}
            style={{backgroundImage:`url(${item.gallery[0]})`}}    
        >
        </div>
        <div className={style.contentBlock}>
            <h2>{item.name}</h2>
            <b>{item.price}$</b>
        </div>
        <img 
            className={style.deliteButton} 
            src="./images/icons/bin.png" 
            alt=""  onClick={() => deliteOrder(item)}
          />
    </div>
  )
}
