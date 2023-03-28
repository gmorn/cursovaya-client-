import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import style from './categories.module.scss'

export default function Categories() {

  const categories = useSelector(state => state.categories.categories)

  return (
    <div className={style.category}>
      <div className={style.categories}>
        {categories.map(elem => (
          <div key={elem.title}>{elem.name}</div>
        ))}
      </div>
    </div>
  )
}
