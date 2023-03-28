import React, { useEffect, useState } from 'react'
import './App.scss'
import { Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchProducts } from '../store/productsSlice'
import Menu from '../pages/menu/Menu'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'


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
      </Routes>
      <Footer/>
      
    </div>
  )
}
