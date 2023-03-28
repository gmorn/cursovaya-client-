import React from 'react'
import { useSelector } from 'react-redux'
import Categories from '../../components/products/catedories/Categories'
import Items from '../../components/products/item/Items'
import style from './menu.module.scss'



export default function Menu(){

  const { status, error } = useSelector(state => state.products)
  
  return (
    <div className={style.menu}>

      { status === 'loading' && <h1>Loading...</h1> }
      { error && <h1>Error!</h1> }
      { status === 'resolved' && 
        <>
          <Categories/>
          <Items/>
        </>
      }
    </div>
  )
}
