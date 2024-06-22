import axios from 'axios';

const API_URL = 'http://localhost:8080/compradores';

export async function salvarComprador(comprador){
    return await axios.post(`${API_URL}/cadastrar`, comprador);
}

export async function getComprador(id){
    return await axios.get(`${API_URL}/usar/${id}`);
}

export async function alterarComprador(comprador){
    return await axios.put(`${API_URL}/alterar`, comprador);
}

export async function deletarComprador(id){
    return await axios.delete(`${API_URL}/remover/${id}`);
}





