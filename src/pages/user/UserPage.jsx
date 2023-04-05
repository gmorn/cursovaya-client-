import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUser, logautUser } from '../../store/user/loginSlice'
import SmallButton from '../../components/UI/button/smallButton/SmallButton'
import { useNavigate } from 'react-router-dom'

export default function UserPage() {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [user, setUser] = useState({
        name: 'test',
        password: '1',
    })



    const { status } = useSelector(state => state.user)  

    const person = useSelector(state => state.user.user)

    useEffect(() => {
        navigate('/')
        
    }, [person])
    
    useEffect(() => {
        // dispatch(fetchUser(user))
        navigate('/userPage')
    }, [])

    return (
        <div>
            <SmallButton onClickFunk={() => dispatch(logautUser())}>выйти</SmallButton>
        </div>
    )
}
