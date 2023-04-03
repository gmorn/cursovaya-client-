import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchUser } from '../../store/user/loginSlice'


export default function UserPage() {

    const dispatch = useDispatch()

    const [user, setUser] = useState({
        name: 'test',
        password: '1',
    })

    useEffect(() => {
        dispatch(fetchUser(user))
    }, [])

    return (
        <div>

        </div>
    )
}
