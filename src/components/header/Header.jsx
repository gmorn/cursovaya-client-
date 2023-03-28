import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import style from './header.module.scss'
import Order from './Order'
import MainButton from './UI/button/MainButton'
import classNames from 'classnames'
import UserLogo from './UserLogo'
import Orders from './Orders'

export default function Header({inputValue, checkInput, orders, deliteOrder}) {
  
    // const [searchForm, setSearchForm] = useState(false)
    // const [inputFocus, setInputFocus] = useState(true)
    // // const [inputValue, setInputValue] = useState('')
    // const [cartOpen, setCartOpen] = useState(false)
    // const [ordersPrice, setOrdersPrice] = useState(0)
    // const [logoState, setLogoSate] = useState(true)

    // useEffect(() => {
    //     setOrdersPrice(() => {
    //       let summa = 0
    //       orders.map(elem => (
    //         summa += Number(elem.price)
    //       ))
    //       return summa
    //     })
    //   }, [orders])

    // const targetInput = () => {
    //     setInputFocus(false)
    //     setLogoSate(false)
    // }

    // const noTargetInput = () => {
    //     setInputFocus(true)
    //     setTimeout(() => {
    //         setLogoSate(true)
    //     }, 250);
    // }

    // const searchState = () => {
    //     setSearchForm(!searchForm)
    // }

    // const basketClose = () => {
    //     setCartOpen(false)
    // }

    // //закрытие корззины при клике вне корзины

    // const basketRef = useRef(null)
    // const basketButtonRef = useRef(null)
    // const basketDelite = useRef(null)

    // useEffect(() => {
    //     if (!basketRef) return

    //     const hendelClick = (e) => {
    //         if (basketDelite.current.contains(e.target)) return
    //         if (basketButtonRef.current.contains(e.target)) return
    //         if (!basketRef.current) return
            
    //         if (!basketRef.current.contains(e.target)) {
    //             basketClose()
    //         }
    //     }

    //     document.addEventListener('click', hendelClick)
    //     return () => {
    //         document.removeEventListener('click', hendelClick)
    //     }

    // }, [basketRef])  




    // //вывод товаров в козине

    // const showOrders = (orders) => {
    //     return (<div>
    //         <Orders orders={orders} deliteOrder={deliteOrder} ref={basketDelite}/>
    //         <p className={style.summa}>Сумма: {ordersPrice}$</p>
    //         <Link to='/payment'>
    //             <MainButton onClickFunk={() => setCartOpen(!cartOpen)}>перейти к оплате</MainButton>
    //         </Link>
            
    //       </div>)
    // }

    // const showNothing = () => {
    //     return (<div className={style.empty}>
    //         <h2>Товаров нет</h2>
    //     </div>)
    // }

  return (
    <header className={style.header}>
        <div className={style.headerTop}>
            <div className={style.inf}>
                <div className={style.infContent}>
                    <img src="./images/icons/location.png" alt="" />
                    <p>Челябинск, Проспект Победы, 25</p>
                </div>
                <div className={style.infContent}>
                    <img src="./images/icons/smartphone.png" alt="" />
                    <p>+7(999)033-33-35</p>
                </div>
            </div>
            
                <div className={logoState?style.logo:classNames(style.logo, style.active)}>
                <Link to="/">root</Link>
                </div>
            
        
            <div className={style.topMenu}>
                <div className={style.search} onClick={() => searchState()}>
                    <img src="./images/icons/search.png" alt=""/>

                    <input type="text" placeholder='Поиск' value={inputValue}
                    onChange={(e) => {checkInput(e.target.value)}}
                    onFocus={() =>  targetInput()} onBlur={() => noTargetInput()}/>
                    
                    <div className={!inputFocus?style.close:classNames(style.close, style.active)}>
                    <img src="./images/icons/close.png" alt="" onClick={() => checkInput('')}/>
                    </div>
                </div>
                <Link to='/userPage'>
                    <div className={style.userLogoBlock}>
                        <UserLogo img={"./images/icons/defaultUser.png"}/>
                    </div>
                </Link>

                <div className={style.menuButtons}>
                    <img src="./images/icons/love.png" alt="" />
                    <img 
                        src="./images/icons/shopping-bag.png" alt="" 
                        ref={basketButtonRef}
                        onClick={() => setCartOpen(!cartOpen)}
                    />
                </div>
            </div>
            {cartOpen&&
                <div className={style.basket} ref={basketRef}>
                    <div 
                        className={style.closeButton}
                        onClick={() => setCartOpen(!cartOpen)}
                    >
                        <img src="./images/icons/close.png" alt="" />
                    </div>
                    {orders.length > 0 ?
                        showOrders(orders):
                        showNothing()}
                </div>
            }
        </div>
        <div className={style.headerBottom}>
            
            <Link to="/menu">Меню</Link>
            <Link to="/booking">Забронировать место</Link>
            <Link to="/aboutUs">О нас</Link>
            <Link to="/login">вход/регистрация</Link>

        </div>
    </header>
  )
}
