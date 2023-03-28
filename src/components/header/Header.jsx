import React, { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import style from './header.module.scss'
import classNames from 'classnames'
import Orders from '../products/order/Orders'
import { useSelector } from 'react-redux'

export default function Header() {
  
    const [searchForm, setSearchForm] = useState(false)
    const [inputFocus, setInputFocus] = useState(true)
    // const [inputValue, setInputValue] = useState('')
    const [cartOpen, setCartOpen] = useState(false)
    const [logoState, setLogoSate] = useState(true)

    // useEffect(() => {
    //     setOrdersPrice(() => {
    //       let summa = 0
    //       orders.map(elem => (
    //         summa += Number(elem.price)
    //       ))
    //       return summa
    //     })
    //   }, [orders])

    const targetInput = () => {
        setInputFocus(false)
        setLogoSate(false)
    }

    const noTargetInput = () => {
        setInputFocus(true)
        setTimeout(() => {
            setLogoSate(true)
        }, 250);
    }

    const searchState = () => {
        setSearchForm(!searchForm)
    }

    const basketClose = () => {
        setCartOpen(false)
    }

    // //закрытие корззины при клике вне корзины

    const basketRef = useRef(null)
    const basketButtonRef = useRef(null)
    const basketDelite = useRef(null)

    useEffect(() => {
        if (!basketRef) return

        const hendelClick = (e) => {
            // if (basketDelite.current.contains(e.target)) return
            if (basketButtonRef.current.contains(e.target)) return
            if (!basketRef.current) return
            
            if (!basketRef.current.contains(e.target)) {
                basketClose()
            }
        }

        document.addEventListener('click', hendelClick)
        return () => {
            document.removeEventListener('click', hendelClick)
        }

    }, [basketRef])  




    // //вывод товаров в козине

    const showOrders = () => {
        return (<div>
            <Orders ref={basketDelite}/>
            {/* <p className={style.summa}>Сумма: {ordersPrice}$</p>
            <Link to='/payment'>
                <MainButton onClickFunk={() => setCartOpen(!cartOpen)}>перейти к оплате</MainButton>
            </Link> */}
            
          </div>)
    }

    const showNothing = () => {
        return (<div className={style.empty}>
            <h2>Товаров нет</h2>
        </div>)
    }

    const orders = useSelector(state => state.orders.orders)


    return (
    <header className={style.header}>
        <div className={style.headerTop}>
            <div className={style.inf}>
                <div className={style.infContent}>
                    <img src="./icons/location.png" alt="" />
                    <p>Челябинск, Проспект Победы, 25</p>
                </div>
                <div className={style.infContent}>
                    <img src="./icons/smartphone.png" alt="" />
                    <p>+7(999)033-33-35</p>
                </div>
            </div>
            
                <div className={logoState?style.logo:classNames(style.logo, style.active)}>
                <Link to="/menu">root</Link>
                </div>
            
        
            <div className={style.topMenu}>
                <div className={style.search}>
                    <img src="./icons/search.png" alt=""/>

                    <input type="text" placeholder='Поиск' 
                    // value={inputValue}
                    // onChange={(e) => {checkInput(e.target.value)}}
                    onFocus={() =>  targetInput()} onBlur={() => noTargetInput()}/>
                    
                    <div className={!inputFocus?style.close:classNames(style.close, style.active)}>
                    <img src="./icons/close.png" alt="" 
                        // onClick={() => checkInput('')}
                    />
                    </div>
                </div>
                {/* <Link to='/userPage'>
                    <div className={style.userLogoBlock}>
                        <UserLogo img={"./icons/defaultUser.png"}/>
                    </div>
                </Link> */}

                <div className={style.menuButtons}>
                    <img 
                        src="./icons/shopping-bag.png" alt="" 
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
                        <img src="./icons/close.png" alt="" />
                    </div>
                    {orders.length > 0 ?
                        showOrders(orders):
                        ~showNothing()
                    }
                </div>
            }
        </div>
    </header>
  )
}
