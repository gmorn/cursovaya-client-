import React, { Children, cloneElement, useEffect, useState } from 'react'
import style from './slider.module.scss'

const PAGE_WIDTH = 650

export default function Silder({children}) {

  const [offset, setOffset] = useState(0)
  const [pages, setPages] = useState([])

  const leftButtonCKick = () => {
    setOffset((offsetValue) => {
      const newOffset = offsetValue + PAGE_WIDTH

      return Math.min(newOffset, 0)

    })
  }
  const rightButtonCKick = () => {
    setOffset((offsetValue) => {
      const newOffset = offsetValue - PAGE_WIDTH
      const maxOffset = -(PAGE_WIDTH * (pages.length - 1))
      return Math.max(newOffset, maxOffset)
    })
  }

  useEffect(() => {
    setPages(
      Children.map(children, (child) => {
        return cloneElement(child, {
          style: {
            heigth: '100%',
            maxWidth: `${PAGE_WIDTH}px`,
            minWidth: `${PAGE_WIDTH}px`,
          }
        })
      })
    )
  }, [])

  return (
    <div className={style.sliderBlock}>
      <img src="./images/icons/leftArrow.png" alt="" onClick={() => leftButtonCKick()} />
      <div  className={style.slider}>
        <div className={style.sliderContent}>
          <div className={style.allSliderPage}
          style={{
            transform: `translateX(${offset}px)`
          }}
          >
            {pages}
          </div>
        </div>
      </div>
      <img src="./images/icons/rightArrow.png" alt="" onClick={() => rightButtonCKick()} />
      
    </div>

  )
}
