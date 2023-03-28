import React from 'react'
import Categories from '../../components/products/catedories/Categories'
import Items from '../../components/products/item/Items'
import './menu.module.scss'

export default function Menu(){
  return (
    <div className='menu'>
        <Categories/>
        <Items/>
    </div>
  )
}
