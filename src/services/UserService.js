import axios from "axios";

export default class UserService {
    static async login ( name, password ) {
        const response = await axios.post('http://cursovaya/login', {
            name,
            password,
        })
        return response
    }
    static async reg ( name, password ) {
        const response = await axios.post('http://cursovaya/reg', {
            name,
            password,
        })
        return response
    }
    static async getHistory (userId) {
        const response = await axios.get(`http://cursovaya/history/${userId}`)
        return response
    }
    static async getUsers () {
        const response = await axios.get(`http://cursovaya/users`)
        return response
    }
    static async getUserComments (userId) {
        const response = await axios.get(`http://cursovaya/userComments/${userId}`)
        return response
    }
    static async deleteUser (userId) {
        await axios.delete(`http://cursovaya/user/${userId}`)
    }
    static async deletecomment (id) {
        await axios.delete(`http://cursovaya/comment/${id}`)
    }

    static async newUserLogo (file, id) {
        const formData = new FormData()
        formData.append('file', file)
    
        const response = axios.post(`http://cursovaya/newUserLogo/${id}`, formData, 
        {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return response
    }
    
}