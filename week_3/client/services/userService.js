import axios from "axios";

axios.defaults.baseURL = 'http://localhost:8000/';
export const login = async data => {
    return await axios({
        method: 'post',
        url: '/auth/login',
        data: data
    });

}



