import axios from 'axios'

const instance = axios.create({
    baseURL: 'https://react-my-burger-7ae37.firebaseio.com/'
})

export default instance