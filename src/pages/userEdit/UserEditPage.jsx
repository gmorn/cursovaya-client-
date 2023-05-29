import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import style from './UserEditPage.module.scss'
import FormInput from '../../components/UI/input/FormInput'
import editIcon from '../../icons/editIcon.png'
import SmallButton from '../../components/UI/button/smallButton/SmallButton'
import Mymodal from '../../components/UI/modal/MyModal'
import Dragndrop from '../../components/UI/dragndrop/Dragndrop'
import MainButton from '../../components/UI/button/mainButton/MainButton'
import UserService from '../../services/UserService'
import { createUser, fetchNewUserLogo } from '../../store/user/loginSlice'
import { paste } from '@testing-library/user-event/dist/paste'

export default function UserEditPage() {

    const user = useSelector(state => state.user.user)

    const [files, setFiles] = useState('')

    const [FormState, setFormState] = useState(false)
    const [Modal, setModal] = useState(false)

    const  dispatch = useDispatch()

    const getFiles = (newFiles) => {
        setFiles(newFiles)
    }


    const postNewUserLogo = async () => {
        const response = await UserService.newUserLogo(files[0], user.id)

        const path = response.data

        console.log(path);

        dispatch(fetchNewUserLogo({path}))

        setModal(false)

    }

    return (
        <div>
            <div className={style.userBlock}>
                <div className={style.userLogoBlock}>
                    <div className={style.editIcon} onClick={() => setFormState(setModal(true))}>
                        <img src={editIcon} alt=""/>
                    </div>
                    <div className={style.userLogo}>
                        <img src={user.userLogo} alt="ошибка" />
                    </div>
                </div>
                <div className={style.userNameBlock}>
                    <p className={style.userName}>
                        {user.name}
                        <img src={editIcon} alt="" onClick={() => setFormState(!FormState)}/>
                    </p>

                    <div className={`${style.editBlock} ${FormState && style.active}`}>
                        <FormInput
                            placeholder='введите новое имя'
                        />
                        <SmallButton>Сохранить</SmallButton>
                    </div>
                </div>
            </div>

            <Mymodal visible={Modal} setVisible={setModal}>
                <div className={style.modalContent}>
                    <Dragndrop getFiles={getFiles}/>
                    <MainButton onClickFunk={() => postNewUserLogo()}>Сохранить</MainButton>
                </div>
            </Mymodal>
        </div>
    )
}
