import React, { useEffect, useState } from 'react'
import Rating from '../../UI/stars/Rating'
import style from './comment.module.scss'
import axios from 'axios'

export default function Comment({ comment }) {

  const [user, setUser] = useState({})


  const getUser = async () => {
    const response = await axios.get(`http://cursovaya/user/${ comment.id_user }`)
    return response.data[0]
  }

  useEffect(() => {
    async function fetchData() {
      const user = await getUser();
      setUser(user);
    }
    fetchData();
  }, [])


  return (
    <div className={style.comment}>
        <div className={style.commentTitle}>
            <img src={user.userlogo} alt="" />
            <p>{user.name}</p>
            <Rating countStars={comment.Rating}/>
        </div>
        <div className={style.content}>
          <div className={style.commentDesc}>
              {comment.description}
          </div>
        </div>
    </div>
  )
}

