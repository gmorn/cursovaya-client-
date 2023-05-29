import React from 'react'
import style from './mainButton.module.scss'


export default function MainButton({children, onClickFunk, disabled = false}) {
  
  
  return (
    <div>
      <button
        className={style.button}
        disabled = {disabled}
        onClick={onClickFunk ? () => onClickFunk() : () => {}}
      >
        {children}
      </button>
    </div>

  )
}

