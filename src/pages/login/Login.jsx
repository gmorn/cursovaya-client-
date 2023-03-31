import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import MainButton from '../../components/UI/button/mainButton/MainButton'
import FormInput from '../../components/UI/input/FormInput'
import YellowLine from '../../components/UI/line/YellowLine'
import style from './login.module.scss'

export default function Login() {

    const [formState, setFormState] = useState(true)

    const switchLodin = () => {
        setFormState(true)
    }


    const switchReg = () => {
        setFormState(false)
    }


  return (
    <div className={style.login}>
        <h1>{formState?'Вход':'Регистрация'}</h1>
        {formState?
        <div className={style.loginForm}>
            <FormInput placeholder={'логин'}/>
            <FormInput placeholder={'пароль'}/>
        </div>
        :
        <div className={style.loginForm}>
            <FormInput placeholder={'введите логин'}/>
            <FormInput placeholder={'введите пароль'}/>
            <FormInput placeholder={'повторите пароль'}/>
        </div>
        }
        <div className={style.switchBlock}>
            <MainButton onClickFunk={switchLodin}>вход</MainButton>
            <MainButton onClickFunk={switchReg}>регистрация</MainButton>
        </div>
        <YellowLine/>
        <Link to='/home'>
            <MainButton>{formState?'войти':'создать'}</MainButton>
        </Link>
    </div>
  )
}
