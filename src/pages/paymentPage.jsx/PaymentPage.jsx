import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import style from './PaymentPage.module.scss'
import Orders from '../../components/products/order/Orders'
import { useDispatch, useSelector } from 'react-redux'
import MainButton from '../../components/UI/button/mainButton/MainButton'
import PaymentForm from '../../components/PaymentForm/PaymentForm'
import Mymodal from '../../components/UI/modal/MyModal'
import { deliteOrders } from '../../store/products/OrderSlice'
import axios from 'axios'

export default function PaymentPage() {

  const orders = useSelector(state => state.orders.orders)
  const dispatch = useDispatch()

  const user = useSelector(state => state.user.user)

  const [ allPrice, setAllPrice ] = useState(0)
  const [ modal, setModal ] = useState(false)

  const [ order, setOrder ] = useState({ adress: '', orders: {  }, price: '', cartNum: '', })



  const createQuery = () => {
    const query = {
      user_id: 0,
      prods: [],
      date: '',
    }

    query.user_id = user.id
    if (query.user_id === 0) return


    orders.forEach(element => {
      query.prods.push(element)
    });
    query.date = new Date()

    dispatch(deliteOrders())

    axios.post('http://cursovaya/addHistory', query)

    // console.log(query)
  }

  useEffect(() => {
    setAllPrice(0)
    let price = 0
    if (orders.length) {
      orders.forEach(element => {
        price += (element.price * element.count)
    })}
    setAllPrice(price);
    setOrder({ ...order, price, orders })
  }, [ orders ])

  useEffect(() => {
    console.log(order)
  }, [ order ])

  // useEffect(() => {
  //   if (!modal) return
  //   dispatch(deliteOrders())
  // }, [modal])


  const openModal = () => {
    setModal(true)
    console.log(order)
  }

  const getFormData = ( adress, cartNum ) => {
    setOrder({ ...order, adress, cartNum })
  }

  return (
    <>
      {
        !orders.length?
          <div className={ style.message }>
            <h1>корзина пуста!</h1>
            <Link to='/'>
              <MainButton>Перейти в меню</MainButton>
            </Link>
          </div>
          :
          <div className={ style.paymentPage }>
            <div className={ style.shopingBLock }>
              <div className={ style.orderBlock }>
                <Orders/>
              </div>
              <p className={ style.summa }>Сумма: { allPrice }$</p>
            </div>
            <div className={ style.paymentBlock }>
                <PaymentForm openModal={ openModal } getFormData={ getFormData }/>
            </div>
            <Mymodal
              visible={ modal }
              setVisible={ setModal }
            >
              <div className = { style.modalMessage }>
                <div className={style.inf}>
                  <h2>Ваш заказ:</h2>
                  {/* адрес */}
                  <p>Адрес: {order.adress}</p>
                  {/* список заказов */}
                  <p>Товары:</p>
                  <ul>
                    {
                      order.orders.length
                      &&
                      order.orders.map(item => 
                        <li key={item.id}>
                          <p>{item.name} - {item.count} - {item.count * item.price}$</p>
                        </li>
                    )}
                  </ul>
                  {/* номер карты */}
                  <p>Номере карты: {order.cartNum}</p>
                  {/* сумма заказа */}
                  <p>Общая сумма заказа: {order.price}$</p> 
                </div>
                <div className={style.buttonBlock}>
                  <Link to='/'><MainButton onClickFunk={() => createQuery()}>заказать</MainButton></Link>
                  <MainButton onClickFunk={() => setModal(false)}>изменить заказ</MainButton>
                </div>
              </div>
            </Mymodal>
          </div>
      }
    </>
  )
}
