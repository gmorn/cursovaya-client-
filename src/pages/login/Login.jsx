import React, { useEffect, useState } from 'react'
import MainButton from '../../components/UI/button/mainButton/MainButton'
import FormInput from '../../components/UI/input/FormInput'
import YellowLine from '../../components/UI/line/YellowLine'
import style from './login.module.scss'
import { createUser, fetchUser } from '../../store/user/loginSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

export default function Login() {

    const dispatch = useDispatch()

    const navigate = useNavigate()

    const { status } = useSelector(state => state.user)

    const person = useSelector(state => state.user.user)

    const [ formState, setFormState ] = useState(true)

    const switchLodin = () => {
        setFormState(true)
    }
    const switchReg = () => {
        setFormState(false)
    }

    useEffect(() => {
        
    }, [])

    useEffect(() => {
        person.name && navigate('/')
        
    }, [person])

    const registration = () => {
        if (user.password === user.repPassword) {
            dispatch(createUser(user))
        }
    }

    const [ user, setUser ] = useState({name: '', password: '', repPassword: ''})

  return (
    <div className={style.login}>
        <h1>{formState?'Вход':'Регистрация'}</h1>
        {formState?
        <div className={style.loginForm}>
            <FormInput 
                placeholder={'логин'} 
                onChangeFunc={(e) => setUser({...user, name: e.target.value})}
                value={user.name}
            />
            <FormInput 
                placeholder={'пароль'}
                onChangeFunc={(e) => setUser({...user, password: e.target.value})}
                value={user.password}
            />
        </div>
        :
        <div className={style.loginForm}>
            <FormInput 
                placeholder={'придумайте логин'}
                onChangeFunc={(e) => setUser({...user, name: e.target.value})}
                value={user.name}
            />
            <FormInput 
                placeholder={'придумайте пароль'}
                onChangeFunc={(e) => setUser({...user, password: e.target.value})}
                value={user.password}
            />
            <FormInput 
                placeholder={'повторите пароль'}
                onChangeFunc={(e) => setUser({...user, repPassword: e.target.value})}
                value={user.repPassword}
            />
        </div>
        }
        <div className={style.switchBlock}>
            <MainButton onClickFunk={switchLodin}>Вход</MainButton>
            <MainButton onClickFunk={switchReg}>Регистрация</MainButton>
        </div>
        <YellowLine/>
        {
            formState ? 
                <MainButton onClickFunk={() => dispatch(fetchUser(user))}>Войти</MainButton>:
                <MainButton onClickFunk={() => registration()}>Создать</MainButton>
        }
        {
            formState ?
                status === 'rejected' && <p className={style.message}>Неверные данные</p>:
                (
                    (user.password !== user.repPassword && user.password && user.repPassword) ? <p className={style.message}>пароль не совпадают</p>:
                    status === 'rejected' && <p className={style.message}>Имя занято</p>
                )
                
        }
    
    </div>
  )
}
