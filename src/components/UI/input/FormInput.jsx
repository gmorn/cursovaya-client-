import React from 'react'
import style from './formInput.module.scss'

export default function FormInput({placeholder, onChangeFunc}) {
  return (
    <input 
      className={style.formInput} 
      type="text" 
      onChange={() => onChangeFunc()}
      placeholder={placeholder}
    />
  )
}
