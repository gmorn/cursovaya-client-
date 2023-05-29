import React, { useEffect, useState } from 'react'
import './App.scss'
import { Route, Routes } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { fetchProducts } from '../store/products/productsSlice'
import Menu from '../pages/menu/Menu'
import Header from '../components/header/Header'
import Footer from '../components/footer/Footer'
import Login from '../pages/login/Login'
import UserPage from '../pages/user/UserPage'
import { pullUser } from '../store/user/loginSlice'
import ProductPage from '../pages/product/ProductPage'
import PaymentPage from '../pages/paymentPage.jsx/PaymentPage'
import UserEditPage from '../pages/userEdit/UserEditPage'
import AdminPanel from '../pages/adminPanel/AdminPanel'
import UserComments from '../pages/userConnemts/UserComments'
import CreateProductPage from '../pages/createProductPage/CreateProductPage'


export default function App() {
    

  
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchProducts())
    dispatch(pullUser())
  }, [dispatch])


  return (
    <div className='App'>
      <Header/>
      <Routes>
        <Route path='/' element={<Menu/>}/>
        <Route path='/userPage' element={<UserPage/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/productCart' element={<ProductPage/>}/>
        <Route path='/paymentPage' element={<PaymentPage/>}/>
        <Route path='/userEdit' element={<UserEditPage/>}/>
        <Route path='/adminPanel' element={<AdminPanel/>}/>
        <Route path='/userComments' element={<UserComments/>}/>
        <Route path='/newProduct' element={<CreateProductPage/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}
