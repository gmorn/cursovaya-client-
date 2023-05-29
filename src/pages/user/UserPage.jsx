import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import HistoryItems from '../../components/products/history/historyItems/HistoryItems'
import style from './userPage.module.scss'

export default function UserPage() {

    const dispatch = useDispatch()

    const navigate = useNavigate()


    const { status } = useSelector(state => state.user)  

    const user = useSelector(state => state.user.user)

    useEffect(() => {
        navigate('/')
        
    }, [user.id])
    
    useEffect(() => {
        navigate('/userPage')
    }, [])

    return (
        <div className={style.wrapper}>
            <HistoryItems />
        </div>
    )
}
