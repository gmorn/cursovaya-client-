import React, { useState } from 'react'
import styles from './AdminPanel.module.scss'
import YellowLine from '../../components/UI/line/YellowLine'
import UserList from '../../components/users/userList/UserList'
import ProductList from '../../components/products/productList/ProductList'

export default function AdminPanel() {

  const [menuState, setMenuState] = useState(false)

  return (
    <div >

      <div className={styles.headerWrapper}>
        <YellowLine/>
        <div className={styles.menu}>
          <h3 
            className={!menuState ? styles.active : ''} 
            onClick={() => setMenuState(false)}
          >Товары</h3>
          <h3 
            className={menuState ? styles.active : ''} 
            onClick={() => setMenuState(true)}
          >Пользователи</h3>
        </div>
      </div>


      <div>
        {
          !menuState
          ?
            <ProductList/>
          :
            <UserList/>

        }
      </div>

    </div>
  )
}
