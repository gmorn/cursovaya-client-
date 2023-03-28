import React from 'react'
import { useSelector } from 'react-redux'
import Order from './Order'

export default function Orders({  }) {

  const orders = useSelector(state => state.orders.orders)

  return (
    <div>
        {orders.map(elem => (
            <Order item={elem} key={elem.id}/>
        ))}
        
    </div>
  )
}
