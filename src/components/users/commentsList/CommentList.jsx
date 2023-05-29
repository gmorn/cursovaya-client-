import React, { useEffect, useState } from 'react'
import styles from './CommentList.module.scss'
import { useLocation } from 'react-router-dom';
import UserService from '../../../services/UserService';
import Comment from './Comment';

export default function CommentList() {

    const location = useLocation()

    const searchParams = new URLSearchParams(location.search);
    const encodedObject = searchParams.get('data');
    const user = JSON.parse(decodeURIComponent(encodedObject));

    

    const [comments, setComments] = useState([])

    useEffect(() => {
        const getComments = async () => {
            const response = await UserService.getUserComments(user.id)
            setComments(response.data)
        }
        getComments()
    }, [])

    const deleteComment = (id) => {
        setComments(comments.filter(item => item.id !== id))
        UserService.deletecomment(id)
        
    }

    return (
        <div className={styles.container}>
            <h1>Коментарии пользователя {user.name}</h1>
            {
                comments.map(comment => (
                    <Comment 
                        key={comment.id} 
                        userComment={comment} 
                        deleteComment={deleteComment}
                    />
                ))
            }
        </div>
    )
}
