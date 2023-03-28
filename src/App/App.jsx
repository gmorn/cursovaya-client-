import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './App.scss'
import { json } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../store/productsSlice'
import Menu from '../pages/menu/Menu'


export default function App() {
    
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])


  return (
    <div className='App'>
      <Menu/>
    </div>
  )
}
