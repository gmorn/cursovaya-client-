import axios from "axios";

export default class ProductService {
    static async getProducts () {
        const response = await axios.get('http://cursovaya/getprod')
        return response
    }
    static async getProduct (productId) {
        const response = await axios.get(`http://cursovaya/product/${productId}`)
        return response
    }
    static async newProduct (product) {
        // console.log(1);
        const formData = new FormData()
        for (let i = 0; i < product.gallery.length; i++) {
            formData.append('gallery[]', product.gallery[i]);
        }
        // formData.append('gallery', product.gallery)
        formData.append('name', product.name)
        formData.append('price', product.price)
        formData.append('category', product.category)
        formData.append('description', product.description)
        const response = axios.post(`http://cursovaya/newProduct`, formData, 
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return response
    }
}



