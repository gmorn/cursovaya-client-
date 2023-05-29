import React, { useEffect, useState } from 'react'
import styles from './CreateProductPage.module.scss'
import FormInput from '../../components/UI/input/FormInput'
import { useSelector } from 'react-redux'
import CustomSpan from '../../components/UI/span/CustomSpan'
import Dragndrop from '../../components/UI/dragndrop/Dragndrop'
import MainButton from '../../components/UI/button/mainButton/MainButton'
import ProductService from '../../services/ProductService'

export default function CreateProductPage() {

    const categories = useSelector(state => state.categories.categories)

    const [newProduct, setNewProduct] = useState({
        name: '',
        price: '',
        category: '',
        description: '',
        gallery: [],
    })

    // useEffect(() => {
    //     console.log(newProduct);
    // }, [newProduct])

    const createProduct = async () => {
        const response = await ProductService.newProduct(newProduct)
        console.log(response.data);
    }

    const newCategory = (category) => {
        setNewProduct({...newProduct, category});
    }
    const newGallery = (gallery) => {
        setNewProduct({...newProduct, gallery});
    }


    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <div className={styles.firstForm}>
                    <FormInput 
                        placeholder={'название товара'} 
                        onChangeFunc={(e) => {setNewProduct({...newProduct, name:e.target.value})}}
                        value={newProduct.name}
                    />
                    <FormInput 
                        placeholder={'цена товара'} 
                        onChangeFunc={(e) => {setNewProduct({...newProduct, price:e.target.value})}}
                        value={newProduct.price}
                    />
                    
                    <CustomSpan
                        startValue={'Выберите категорию'}
                        getValue={newCategory}
                    >
                        {categories}
                    </CustomSpan>
                </div>
                <textarea 
                    placeholder='поле для описания товара'
                    onChange={(e) => {setNewProduct({...newProduct, description:e.target.value})}}
                    value={newProduct.description}
                ></textarea>
            <Dragndrop getFiles={newGallery}/>
            </div>
            <MainButton onClickFunk={() => createProduct()}>Сохранить</MainButton>
        </div>
    )
}
