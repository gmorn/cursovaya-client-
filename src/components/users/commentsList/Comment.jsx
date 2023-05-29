import React, { useEffect, useState } from 'react'
import styles from './Comment.module.scss'
import ProductService from '../../../services/ProductService'
import Rating from '../../UI/stars/Rating'
import SmallButton from '../../UI/button/smallButton/SmallButton'
import UserService from '../../../services/UserService'

export default function Comment({ userComment, deleteComment }) {

    const [comment, setComment] = useState(userComment)

    const [product, setProduct] = useState({})

    useEffect(() => {
        const getProduct = async () => {
            const response = await ProductService.getProduct(comment.id_prod)
        
            setProduct(response.data[0])
        }

        getProduct()
    }, [comment])    


    return (
        <div className={styles.commentBlock}>
            <div className={styles.comment}>
                <div className={styles.flex}>
                    <Rating countStars={comment.rating}/>
                    <SmallButton onClickFunk={() => deleteComment(comment.id)}>Удалить</SmallButton>
                </div>
                <p>{comment.description}</p>
            </div>
            <div className={styles.product}>
                <img src={product.gallery && JSON.parse(product.gallery)[0]} alt="" />
                <h3>{product.name}</h3>
            </div>
        </div>
    )
}
