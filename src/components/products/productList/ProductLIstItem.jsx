import React from 'react'
import styles from './productLIstItem.module.scss'
import SmallButton from '../../UI/button/smallButton/SmallButton'

export default function ProductLIstItem({ item }) {
  return (
    <div className={styles.product}>
        <img src={JSON.parse(item.gallery)[0]} alt="" />
        <div className={styles.descriptios}>
            <h2>{item.name}</h2>
            <h3>{item.price}$</h3>
        </div>
        <div className={styles.buttonBlock}>
            <SmallButton>удалить</SmallButton>
            <SmallButton>изменить</SmallButton>
        </div>
    </div>
  )
}
