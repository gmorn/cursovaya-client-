import React, { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import style from './header.module.scss'
import classNames from 'classnames'
import Basket from '../products/basket/Basket'
import { useDispatch, useSelector } from 'react-redux'
import SmallButton from '../UI/button/smallButton/SmallButton'

import location from '../../icons/location.png'
import smartphone from '../../icons/smartphone.png'
import search from '../../icons/search.png'
import close from '../../icons/close.png'
import shoppingBag from '../../icons/shopping-bag.png'
import UserMenu from '../UI/menu/userMenu/UserMenu'
import { logautUser } from '../../store/user/loginSlice'

export default function Header() {
  
    const [inputFocus, setInputFocus] = useState(true)
    // const [inputValue, setInputValue] = useState('')
    const [cartOpen, setCartOpen] = useState(false)
    const [logoState, setLogoSate] = useState(true)

    const [visible, setVisible] = useState(false)

    const location = useLocation()

    const user = useSelector(state => state.user.user)

    const  dispatch = useDispatch()

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

    const basketClose = () => {
        setCartOpen(false)
    }

    const openCart = () => {
        setVisible(false)
        setCartOpen(!cartOpen)
    }

    // закрытие корзины и  при клике вне корзины

    const basketRef = useRef(null)
    const basketButtonRef = useRef(null)

    const menuRef = useRef(null)
    const menuLinkRef = useRef(null)


    useEffect(() => {

        if (!basketRef && !menuRef) return
        

        const hendelClick = (e) => {
            if (basketButtonRef.current.contains(e.target)) return
            if (menuLinkRef.current.contains(e.target)) return

            if (basketRef.current && !basketRef.current.contains(e.target)) {
                basketClose()
            } else if (menuRef.current && !menuRef.current.contains(e.target)) {
                setVisible(false)
            } else if (basketRef.current) {
                setVisible(false)
            }
        }

        document.addEventListener('mousedown', hendelClick)
        return () => {
            document.removeEventListener('mousedown', hendelClick)
        }
    })


    useEffect(() => {
        setVisible(false)
    }, [user, location])




    return (
        <header className={style.header}>
            <div className={style.headerTop}>
                <div className={style.inf}>
                    <div className={style.infContent}>
                        <img src={location} alt="" />
                        <p>Челябинск, Проспект Победы, 25</p>
                    </div>
                    <div className={style.infContent}>
                        <img src={smartphone} alt="" />
                        <p>+7(999)033-33-35</p>
                    </div>
                </div>
                
                <div className={logoState?style.logo:classNames(style.logo, style.active)}>
                    <Link to="/">root</Link>
                </div>
                
            
                <div className={style.topMenu}>
                    <div className={style.search}>
                        <img src={search} alt=""/>

                        <input type="text" placeholder='Поиск' 
                            // value={inputValue}
                            // onChange={(e) => {checkInput(e.target.value)}}
                            onFocus={() =>  targetInput()} 
                            onBlur={() => noTargetInput()}
                        />
                        
                        <div 
                            className={
                                // !inputFocus?style.close:classNames(style.close, style.active)
                                classNames(
                                    style.close,
                                    inputFocus && style.active
                                  )
                            }
                        >
                        <img src={close} alt="" 
                            // onClick={() => checkInput('')}
                        />
                        </div>
                    </div>
                    <div className={style.userBlock}>
                        {user.name ? (
                                <div 
                                    className={style.user} 
                                    onClick={() => setVisible(!visible)}
                                    ref={menuRef}
                                >
                                    <p>{user.name}</p>
                                    <img src={user.userLogo} alt='' />
                                </div>
                            ) : (
                                <Link to='/login'>
                                    <SmallButton>Войти</SmallButton>
                                </Link>
                        )}
                    </div>
                    <div className={style.userMenu} ref={menuLinkRef}>
                        <UserMenu visible={visible} >
                            <ul>
                                <Link to='/userPage'>
                                    <li>История заказов</li>
                                </Link>
                                <Link to='/userEdit'>
                                    <li>Редакировать профиль</li>
                                </Link>
                                <Link to='/'>
                                    <li onClick={() => dispatch(logautUser())}>Выйти</li>
                                </Link>
                                {
                                    user.role === 'admin' && <Link to='/adminPanel'><li>{user.role}</li></Link>
                                }
                            </ul>
                        </UserMenu>
                    </div>
             
                    <div className={style.menuButtons}>
                        <img 
                            src={shoppingBag} alt="" 
                            ref={basketButtonRef}
                            onClick={() => openCart()}
                        />
                    </div>
                </div>
                {cartOpen&&
                    <div className={style.basket} ref={basketRef}>
                        <div 
                            className={style.closeButton}
                            onClick={() => setCartOpen(!cartOpen)}
                        >
                            <img src={close} alt="" />
                        </div>
                        <Basket basketClose={basketClose}/>
                    </div>
                }
            </div>
        </header>
    )
}
