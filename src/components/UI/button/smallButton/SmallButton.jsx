import React from 'react'
import style from './SmallButton.module.scss'

export default function SmallButton({ children, onClickFunk }) {
  return (
    <button
      className={style.button}
      onClick={() => onClickFunk()}
    >
      {children}
    </button>
  )
}
