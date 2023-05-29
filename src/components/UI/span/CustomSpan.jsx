import React, { useEffect, useState } from 'react'
import styles from './CustomSpan.module.scss'

export default function CustomSpan({ getValue, children, startValue }) {

    const [value, setValue] = useState(false)

    const [spanState, setSpanStete] = useState(false)

    const newValue = (title, index) => {
        getValue(title)

        setSpanStete(false)
        setValue(index)
    }

    return (
        <div className={styles.span}>
            <div 
                className={`${styles.spanValue} ${spanState ? styles.active : ''}`}
                onClick={() => setSpanStete(!spanState)}
            >
                {value 
                ? <>{children[value].name}</>
                : <>{startValue}</>
                }
            </div>
            <div 
                className={`${styles.spanContent} ${spanState ? styles.active : ''}`}
                >
                {children.map((item, index) => (
                    <div 
                        key={index}
                        className={styles.contentBlock}
                        onClick={() => newValue(item.title, index)}
                    >
                        <>{item.name}</>
                    </div>
                ))}
            </div>
        </div>
  )
}
