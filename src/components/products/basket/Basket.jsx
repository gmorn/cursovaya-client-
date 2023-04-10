import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import MainButton from '../../UI/button/mainButton/MainButton'
import Orders from '../order/Orders'
import style from './basket.module.scss'

export default function Basket({ basketClose }) {

    const orders = useSelector(state => state.orders.orders)
    
    const [allPrice, setAllPrice] = useState(0)

    useEffect(() => {
        setAllPrice(0)

        let price = 0
        if (orders.length) {
            orders.forEach(element => {
                price += (element.price * element.count)
            })
        }
        setAllPrice(price);
    }, [orders])
    
    return (
        <div className={style.basket}>
            {orders.length > 0 
                ?
                <>
                    <div className={style.ordersBlock}>
                        <Orders/>
                    </div>
                    <p className={style.summa}>Сумма: {allPrice}$</p>
                    <Link to='/paymentPage'>
                        <MainButton onClickFunk={() => basketClose()}>Перейти к оплате</MainButton>
                    </Link>
                </>
                :
                <div className={style.empty}>
                    <h2>Товаров нет</h2>
                </div>
            }
        </div>
    )
}
