import React from 'react'
import style from './historyItem.module.scss'

export default function HistoryItem({ item }) {
  return (
    <div className={style.item}>
        <div 
            className={style.image}
            style={{backgroundImage:`url(${JSON.parse(item.gallery)[0]})`}}    
        >
        </div>
        <div className={style.contentBlock}>
            <h2>{item.name}</h2>
            <b
                className={item.count > 1 ? style.active : ''}
            >
                {item.price}$
            </b>
            {
                item.count > 1 
                &&
                <p>{item.price * item.count}$</p>
            }
            <div className={style.count}>{item.count}</div>
        </div>
    </div>
  )
}
