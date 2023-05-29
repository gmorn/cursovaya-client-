import React from 'react'
import style from './userMenu.module.scss'

export default function UserMenu({ visible, children }) {
  
    const rootClasses = [style.userMenu]
    if (visible) {
        rootClasses.push(style.active)
    }

    
  
    return (
        <div className={rootClasses.join(' ')}>
            {children}
        </div>
    )
}
