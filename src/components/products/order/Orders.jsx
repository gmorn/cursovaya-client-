import React from 'react'
import Order from './Order'

export default function Orders({orders, deliteOrder}) {
  return (
    <div>
        {orders.map(elem => (
            <Order item={elem} key={elem.id} deliteOrder={deliteOrder}/>
        ))}
        
    </div>
  )
}
