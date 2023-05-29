import React from 'react'
import { useDispatch } from 'react-redux'
import { decrementCount, deliteOrder, incrementCount } from '../../../store/products/OrderSlice'
import style from './order.module.scss'

import arrowUp from '../../../icons/arrow-up.png'
import arrowBottom from '../../../icons/arrow-bottom.png'
import bin from '../../../icons/bin.png'

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
            src={arrowUp}
            alt="" 
            onClick={() => dispatch(incrementCount(item))}
          />
          <p>{item.count}</p>
          <img 
            src={arrowBottom}
            alt=""
            onClick={() => dispatch(decrementCount(item))}
          />
        </div>
        
        <img 
          className={style.deliteButton} 
          src={bin}
          alt=""  onClick={() => dispatch(deliteOrder(item.id))}
          />


          
    </div>
  )
}
