import React from 'react'
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { addNewOrder } from '../../../store/OrderSlice'
import MainButton from '../../UI/button/mainButton/MainButton'
import style from './item.module.scss'

export default function Item({ item }) {

  const dispatch = useDispatch()

  return (
    <div className={style.item}>
      <Link to={`/productCart`}>
        <div 
          className={style.image}
          style={{backgroundImage:`url(${JSON.parse(item.gallery)[0]})`}}    
        ></div>
      </Link>

      <div className={style.content}>
        <h2>{item.name}</h2>
        <b>{item.price}$</b>
        <div className={style.ratingBlock}>
          <img src="./icons/star.png" alt="" />
          <p>{item.rating}</p>
        </div>
      </div>
      <MainButton onClickFunk={() => dispatch(addNewOrder(item))}>+ добавить</MainButton>
    </div>
  )
}
