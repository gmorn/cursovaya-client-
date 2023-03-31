import React, { useEffect, useState } from 'react'
import './App.scss'
import { Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchProducts } from '../store/products/productsSlice'
import Menu from '../pages/menu/Menu'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import Login from '../pages/login/Login'


export default function App() {
    
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])


  return (
    <div className='App'>

      <Header/>
      <Routes>
        <Route path='/' element={<Menu/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
      <Footer/>
      
    </div>
  )
}
