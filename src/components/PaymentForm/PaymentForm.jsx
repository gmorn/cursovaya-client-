import React, { useEffect, useState } from 'react'
import style from './poymentForm.module.scss'
import FormInput from '../UI/input/FormInput'
import MainButton from '../UI/button/mainButton/MainButton'

export default function PaymentForm({ openModal,  getFormData}) {

    const [formData, setFormData] = useState({ adress: '', cartNum: '', })

    useEffect(() => {
        getFormData( formData.adress, formData.cartNum )
    }, [formData])

    return (
        <div className={style.paymentForm}>
            <form >
                <label>адрес доставки</label>
                <FormInput 
                    type="text" 
                    value={formData.adress}
                    onChangeFunc={e => setFormData({ ...formData, adress: e.target.value })}
                />
                <label>номер карты</label>
                <FormInput 
                    type="text" 
                    value={formData.cartNum}
                    onChangeFunc={e => setFormData({ ...formData, cartNum: e.target.value })} 
                />
                <label>имя на карте</label>
                <FormInput type="text" />
                <div className={style.flex}>
                    <div className={style.inputBlock}>
                        <label>срок действия</label>
                        <FormInput type="text" placeholder={'ГГ/ММ'}/>
                    </div>
                    <div className={style.inputBlock}>
                        <label>cvc/cvv</label>
                        <FormInput type="text" />
                    </div>
                </div>
            </form>
            <MainButton onClickFunk={() => openModal()}>Оплатить</MainButton>

        </div>
    )
}
