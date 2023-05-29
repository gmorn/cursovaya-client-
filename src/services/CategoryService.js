import axios from "axios"

export default class CategoryService {
    static async getCategory () {
        const response = await axios.get('http://cursovaya/category')
        return response
    }
}