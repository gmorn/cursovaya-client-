import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { addNewOrder } from '../../../store/products/OrderSlice'
import MainButton from '../../UI/button/mainButton/MainButton'
import style from './item.module.scss'

import star from '../../../icons/star.png'

export default function Item({ item }) {

  const dispatch = useDispatch()

  const [disabled, setDisabled] = useState(false)

  const orders = useSelector(state => state.orders.orders)

  const encodedObject = encodeURIComponent(JSON.stringify(item));

  const addOrder = () => {
    dispatch(addNewOrder(item))
    setDisabled(true)
  }

  return (
    <div className={style.item}>
      <Link to={`/productCart?data=${encodedObject}`}>
        <div 
          className={style.image}
          style={{backgroundImage:`url(${JSON.parse(item.gallery)[0]})`}}    
        ></div>
      </Link>

      <div className={style.content}>
        <h2>{item.name}</h2>
        <b>{item.price}$</b>
        <div className={style.ratingBlock}>
          <img src={star} alt="" />
          <p>{item.rating}</p>
        </div>
      </div>
      <MainButton onClickFunk={addOrder} disabled={disabled}>
          {
            orders.find(elem => elem === item) 
            ?
              'В корзине'
            :
              'В корзину'
          }
      </MainButton>
    </div>
  )
}
