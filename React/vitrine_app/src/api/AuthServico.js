import axios from 'axios';

const API_URL = 'http://localhost:8080/auth';

export async function login(usuario){
    return await axios.post(`${API_URL}/login`, usuario);
}

export async function register(usuario){
    return await axios.post(`${API_URL}/register`, usuario);
}






