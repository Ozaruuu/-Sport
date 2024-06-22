import axios from 'axios';

const API_URL = 'http://localhost:8080/carrinhos';

export async function adicionarProdutoAoCarrinho(idComprador, idProduto, quantidade){
    return await axios.post(`${API_URL}/${idComprador}/add/${idProduto}/${quantidade}`);
}

export async function alterarProdutoDoCarrinho(idComprador, idProduto, novaQuantidade){
    return await axios.put(`${API_URL}/${idComprador}/alterar/${idProduto}/${novaQuantidade}`);
}

export async function listarProdutosDoCarrinho(idComprador){
    return await axios.get(`${API_URL}/listar/${idComprador}`);
}

export async function deletarProdutoDoCarrinho(idComprador, idProduto){
    return await axios.delete(`${API_URL}/${idComprador}/remover/${idProduto}`);
}





