import React from 'react'
import style from './mainButton.module.scss'


export default function MainButton({children, onClickFunk}) {
  
  
  return (
    <div>
      <button
        className={style.button}
        
        onClick={onClickFunk ? () => onClickFunk() : () => {}}
      >
        {children}
      </button>
    </div>

  )
}
