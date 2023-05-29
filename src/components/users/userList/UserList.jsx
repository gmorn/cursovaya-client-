import React, { useEffect, useState } from 'react'
import styles from './UserList.module.scss'
import { useDispatch, useSelector } from 'react-redux'
import { Link, unstable_HistoryRouter } from 'react-router-dom'
import { fetchUsers } from '../../../store/user/UsersSlice'
import SmallButton from '../../UI/button/smallButton/SmallButton'
import message from '../../../icons/message-icon.png'
import cart from '../../../icons/cart-icon.png'
import UserService from '../../../services/UserService'

export default function UserList() {

  const dispatch = useDispatch()
  
  const users = useSelector(state => state.users.users)

  const [usersArr, setUsersArr] = useState([])

  const [commentsCounts, setCommentsCounts] = useState([]);
  const [productsCounts, setProductsCounts] = useState([]);

  useEffect(() => {
    dispatch(fetchUsers())
  }, []);



  useEffect(() => {

    


    const fetchCommentsCounts = async () => {
      const counts = await Promise.all(
        usersArr.map(async item => {
          const response = await UserService.getUserComments(item.id)
          return response.data.length
        })
      )
      setCommentsCounts(counts)
    }

    fetchCommentsCounts()


    const fetchProductsCounts = async () => {
      const counts = await Promise.all(
        usersArr.map(async item => {
          const response = await UserService.getHistory(item.id)
          return response.data.length;
        })
      )
      setProductsCounts(counts)
    }

    fetchProductsCounts()
    
  }, [usersArr])


  useEffect(() => setUsersArr(users), [users])

  const deleteUserFunc = (userId) => {
    
    setUsersArr(usersArr.filter(item => item.id !== userId))
    UserService.deleteUser(userId)
  }


  return (
    <div className={styles.wrapper}>
        {
          usersArr.map((item, index) => (
              <div key={item.id} className={styles.userBLock}>
                <div className={styles.userData}>
                  <div className={styles.userLogo}>
                    <img src={item.userlogo} alt="а где" />
                  </div>
                  <p>{item.name}</p>
                  <div className={styles.userInf}>
                    <img src={cart} alt="" />
                    <p>{productsCounts[index]}</p>
                    <img src={message} alt="" />
                    <p>{commentsCounts[index]}</p>
                  </div>
                </div>
                <div className={styles.buttonBlock}>
                  <SmallButton onClickFunk={() => deleteUserFunc(item.id)}>удалить пользователя</SmallButton>
                  <Link to={`/userComments?data=${JSON.stringify({id: item.id, name: item.name})}`}>
                    <SmallButton>посмотреть коментарии</SmallButton>
                  </Link>
                </div>
              </div>
          ))
        }
      {/* {users.map((item, index) => (
        <div key={item.id} className={styles.userBlock}>
          <div className={styles.userData}>
            <div className={styles.userLogo}>
              <img src={item.userlogo} alt="а где" />
            </div>
            <p>{item.name}</p>
            <div className={styles.userInf}>
              <img src={cart} alt="" />
              <p>13</p>
              <img src={message} alt="" />
              <p>{commentsCounts[index]}</p>
            </div>
          </div>
          <div className={styles.buttonBlock}>
            <SmallButton>удалить пользователя</SmallButton>
            <SmallButton>посмотреть комментарии</SmallButton>
          </div>
        </div>
      ))} */}
    </div>
  )
}
