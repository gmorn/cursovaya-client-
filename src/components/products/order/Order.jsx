import React from 'react'
import { useDispatch } from 'react-redux'
import { deliteOrder } from '../../../store/OrderSlice'
import style from './order.module.scss'

export default function Order({ item }) {

  const dispatch = useDispatch()

  return (
    <div className={style.order}>
        <div 
            className={style.image}
            style={{backgroundImage:`url(${JSON.parse(item.gallery)[0]})`}}    
        >
        </div>
        <div className={style.contentBlock}>
            <h2>{item.name}</h2>
            <b>{item.price}$</b>
        </div>
        <img 
            className={style.deliteButton} 
            src="./images/icons/bin.png" 
            alt=""  onClick={() => dispatch(deliteOrder(item.id))}
          />
    </div>
  )
}
