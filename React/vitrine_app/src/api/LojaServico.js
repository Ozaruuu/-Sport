import axios from 'axios';

const API_URL = 'http://localhost:8080/lojas';

export async function salvarLoja(loja) {
    return await axios.post(`${API_URL}/cadastrar`, loja);
}

export async function getLoja(id) {
    return await axios.get(`${API_URL}/usar/${id}`);
}

export async function alterarLoja(loja) {
    return await axios.put(`${API_URL}/alterar`, loja);
}

export async function deletarLoja(id) {
    return await axios.delete(`${API_URL}/remover/${id}`);
}






