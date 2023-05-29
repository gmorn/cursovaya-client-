import React from 'react'
import styles from './productList.module.scss'
import { useSelector } from 'react-redux'
import ProductLIstItem from './ProductLIstItem'
import { Link } from 'react-router-dom'

export default function ProductList() {

    const products = useSelector(state => state.products.products)

    return (
        <div className={styles.productList}>
            {products.map(item => <ProductLIstItem key={item.id} item={item}/>)}
            <Link to='/newProduct'>
                <div className={styles.addNewProd}>
                    <h2>Добавить <br/>товар +</h2>
                </div>
            </Link>
        </div>
    )
}
