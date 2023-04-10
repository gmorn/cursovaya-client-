import React from 'react'
import style from './formInput.module.scss'

export default function FormInput({placeholder, onChangeFunc, value}) {
  return (
    <input 
      className={style.formInput} 
      type="text" 
      onChange={onChangeFunc?(e) => onChangeFunc(e): () => {}}
      placeholder={placeholder}
      value={value}
    />
  )
}
