import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';

import MainButton from '../../components/UI/button/mainButton/MainButton';
import Mymodal from '../../components/UI/modal/MyModal';
import StarRating from '../../components/UI/stars/RatingStars';
import Comment from '../../components/products/comment/Comment';

import { addNewOrder } from '../../store/products/OrderSlice';

import style from './productPage.module.scss'

import star from '../../icons/star.png'


export default function ProductPage() {
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const encodedObject = searchParams.get('data');
    const item = JSON.parse(decodeURIComponent(encodedObject));




    const person = useSelector(state => state.user.user)

    useEffect(() => {
        getComments(item.id)
    }, [])

    const dispatch = useDispatch()

    const [comments, setComments] = useState([])

    const [mainImg, setMainImg] = useState(JSON.parse(item.gallery)[0])
    const [modal, setModal] = useState(false)

    //состояния для нового коментария
    const [commDesc, setCommDesc] = useState('')
    const [stars, setStars] = useState(0)


    const getComments = async (  id  ) => {
        try {
            const response = await axios.get(`http://cursovaya/comments/${id}`)
            setComments(response.data)
            
        } catch ( error ) {
            console.log(error);
        }
    }

    const addNewcomment = async (  newComment ) => {
        try {
            const response = await axios.post(`http://cursovaya/newcomment`, newComment)
            setComments([ ...comments, response.data ])
            // getComments()
        } catch ( error ) {
            console.log(error);
        }
    }

    const addComment = async () => {
        let id_user
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith('id' + '=')) {
                id_user = cookie.substring('id'.length + 1) 
            }
        }
        const newComment = {
            id_user,
            id_prod: item.id, 
            description: commDesc,
            rating: stars
        }
        console.log(newComment);
        setModal(false)
        addNewcomment(newComment)
    }




    useEffect(() => {
        setStars(0)
        setCommDesc('')
    },[modal])

    const switchMain = ( image ) => {
        setMainImg(image)
    }

    const getStars = ( count ) => {
        setStars(count)
    }

    return (
        <div className={style.productCart}>
            <div className={style.aboutProduct}>
                <div className={style.gallery}>
                    <div className={style.control}>
                        <div 
                            onClick={() => switchMain(JSON.parse(item.gallery)[0])}
                            className={style.image}
                            style={{backgroundImage:`url(${JSON.parse(item.gallery)[0]})`}}    
                        ></div>
                        <div 
                            onClick={() => switchMain(JSON.parse(item.gallery)[1])}
                            className={style.image}
                            style={{backgroundImage:`url(${JSON.parse(item.gallery)[1]})`}}    
                        ></div>
                        <div 
                            onClick={() => switchMain(JSON.parse(item.gallery)[2])}
                            className={style.image}
                            style={{backgroundImage:`url(${JSON.parse(item.gallery)[2]})`}}    
                        ></div>
                    </div>
                    <div className={style.main}>
                        <div 
                            className={style.image}
                            style={{backgroundImage:`url(${mainImg})`}}    
                        ></div>
                    </div>
                </div>
                <div className={style.content}>
                    <div className={style.contentTitle}>
                        <h1>{item.name}</h1>
                        <h1>{item.price}$</h1>
                    </div>
                    <div className={style.description}><p>{item.description}</p></div>
                    <div className={style.ratingBlock}>
                        <img src={star} alt="" />
                        <p>{item.rating}</p>
                    </div>
                    <MainButton onClickFunk={() => dispatch(addNewOrder(item))}>В корзину</MainButton>
                    {
                        person.name  &&
                            <div className={style.addComments}>
                                <MainButton onClickFunk={() => setModal(true)}>Оставить отзыв</MainButton>
                            </div>
                    }
                    <Mymodal
                        visible={modal}
                        setVisible={setModal}
                    >
                        <div className={style.formContent}>
                            <div className={style.starsForm}>
                                <p>Ваша оценка:</p>
                                <StarRating getStars={getStars} countStars={stars}/>
                            </div>
                            <textarea 
                                placeholder={'Напишите отзыв'} 
                                onChange={(e) => setCommDesc(e.target.value)} 
                                value={commDesc}
                            />
                            <div className={style.button}>
                                <MainButton onClickFunk={() => addComment()}>Оставить отзыв</MainButton>
                            </div>
                        </div>
                    </Mymodal>
                </div>
            </div>
            <div className={style.comments}>
                {comments.length === 0?
                <h1>Тут нет отзывов!</h1>
                :
                <>
                    <h2>Отзывы:</h2>
                    {
                        comments.map((comment) => (
                            <Comment comment={comment} key={comment.id}/>
                        ))
                    }
                </>

                }
            </div>
        </div>
    )
}
