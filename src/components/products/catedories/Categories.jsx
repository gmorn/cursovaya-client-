import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { switchCategory, fetchCategories } from '../../../store/products/categorySlice'
import style from './categories.module.scss'

export default function Categories() {

  const categories = useSelector(state => state.categories.categories)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchCategories())
  }, [])
  

  return (
    <div className={style.category}>
      <div className={style.categories}>
        {categories.map((elem, index) => (
          <div 
            key={elem.title}
            onClick={() => dispatch(switchCategory(elem.title))}
          
          >
            {elem.name}
          </div>
        ))}
      </div>
    </div>
  )
}
