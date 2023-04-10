import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import style from './PaymentPage.module.scss'
import Orders from '../../components/products/order/Orders'
import { useSelector } from 'react-redux'
import MainButton from '../../components/UI/button/mainButton/MainButton'
import PaymentForm from '../../components/PaymentForm/PaymentForm'

export default function PaymentPage() {

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
    <>
        

      {
        !orders.length?
          <div className={style.message}>
            <h1>корзина пуста!</h1>
            <Link to='/'>
              <MainButton>Перейти в меню</MainButton>
            </Link>
          </div>
          :
          <div className={style.paymentPage}>
            <div className={style.shopingBLock}>
              <div className={style.orderBlock}>
                <Orders/>
              </div>
                <p className={style.summa}>Сумма: {allPrice}$</p>
            </div>
            <div className={style.paymentBlock}>
                <PaymentForm/>
            </div>
          </div>
      }


    </>
  )
}
