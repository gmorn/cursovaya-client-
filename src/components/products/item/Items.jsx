import React from 'react'
import { useSelector } from 'react-redux'
import Item from './Item'
import style from './items.module.scss'

export default function Items({  }) {

  const items = useSelector(state => state.products.products)

  return (
    <main className={style.main}>
        {items.map(item => (
            <Item 
              key={item.id} 
              item={item} 
            />
        ))}
    </main>
  )
}
