import React, { useEffect, useState } from 'react'
import style from './productPage.module.scss'
import {useLocation} from 'react-router-dom';
import MainButton from '../../components/UI/button/mainButton/MainButton';
import Mymodal from '../../components/UI/modal/MyModal';
import StarRating from '../../components/UI/stars/RatingStars';
import Comment from '../../components/products/comment/Comment';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
// import { addNewcomment, getComments } from '../../store/products/commentSlice';


export default function ProductPage() {
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const encodedObject = searchParams.get('data');
    const item = JSON.parse(decodeURIComponent(encodedObject));



    const dispatch = useDispatch()

    const person = useSelector(state => state.user.user)

    useEffect(() => {
        getComments(item.id)
    }, [])

    // const { comments, status } = useSelector(state => state.comment)

    const [comments, setComments] = useState([])

    const [mainImg, setMainImg] = useState(JSON.parse(item.gallery)[0])
    // const [formState, setFormState] = useState(false)
    const [modal, setModal] = useState(false)

    //состояния для нового коментария
    const [commDesc, setCommDesc] = useState('')
    const [stars, setStars] = useState(0)

    const [newComment, setNewComment] = useState({userId: '', prodId: '', description: '', rating: 0})

    const getComments = async (  id  ) => {
        try {
            const response = await axios.get(`http://cursovaya/comments/${id}`)
            setComments(response.data)
        } catch (error) {
            // return rejectWithValue(error.message)
        }
    }

    const addNewcomment = async (  { userId, prodId, description, rating } ) => {
        try {
            const response = await axios.post(`http://cursovaya/newcomment`, {
                userId,
                prodId,
                description,
                rating,
            })
            setComments([ ...comments, response.data ])
            // return response.data
        } catch (error) {
            // return rejectWithValue(error.message)
        }
    }

    useEffect(() => {

    },[commDesc, stars])

    const addComment = () => {
        let userId
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.startsWith('id' + '=')) {
                userId = cookie.substring('id'.length + 1) 
            }
        }
        setNewComment({
            userId,
            prodId: item.id, 
            description: commDesc,
            rating: stars
        })
        addNewcomment(newComment)
            // dispatch(addNewcomment(newComment))
    }

    // useEffect(() => {
    //     if (newComment.description) {
    //         dispatch(addNewcomment(newComment))
    //         // dispatch(getComments(item.id))
    //     }
    //     console.log(comments);
    // }, [newComment])

    useEffect(() => {
        setModal(false)
        setStars(0)
        setCommDesc('')
        getComments(item.id)
    },[comments])

    const switchMain = (image) => {
        setMainImg(image)
    }

    const getStars = (count) => {

        
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
                        <img src="./icons/star.png" alt="" />
                        <p>{item.rating}</p>
                    </div>
                    <MainButton>В корзину</MainButton>
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
                                placeholder={'напишите отзыв'} 
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
                {comments === 0?
                <h1>тут нет отзывов!</h1>
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
