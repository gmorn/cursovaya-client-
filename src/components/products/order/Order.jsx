import React from 'react'
import { useDispatch } from 'react-redux'
import { decrementCount, deliteOrder, incrementCount } from '../../../store/OrderSlice'
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
        </div>
        <div className={style.counter}>
          <img 
            src="./icons/arrow-up.png" 
            alt="" 
            onClick={() => dispatch(incrementCount(item))}
          />
          <p>{item.count}</p>
          <img 
            src="./icons/arrow-bottom.png" 
            alt=""
            onClick={() => dispatch(decrementCount(item))}
          />
        </div>
        
        <img 
          className={style.deliteButton} 
          src="./icons/bin.png" 
          alt=""  onClick={() => dispatch(deliteOrder(item.id))}
          />
    </div>
  )
}
