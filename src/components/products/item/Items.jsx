import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changeCurrentItems } from '../../../store/products/productsSlice'
import Item from './Item'
import style from './items.module.scss'

export default function Items({  }) {

  const items = useSelector(state => state.products.currentProducts)
  
  const dispatch = useDispatch()

  const mainCategory = useSelector(state => state.categories.mainCategory)

  useEffect(() => {
    dispatch(changeCurrentItems(mainCategory))
  }, [mainCategory])

  return (
    <main className={style.main}>
      {
        !items.length
        ?
        <h1>Товаров данной категории нет!</h1>
        :
        items.map(item => (
        <Item 
          key={item.id} 
          item={item} 
        />
      ))}
    </main>
  )
}
