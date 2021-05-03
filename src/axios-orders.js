import axios from 'axios';
const instance = axios.create({
    baseURL: 'https://todoapp-4d7ad-default-rtdb.firebaseio.com/'
});

export default instance;