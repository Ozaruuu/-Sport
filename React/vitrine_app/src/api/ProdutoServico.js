// ProdutoServico.js
import axios from 'axios';

const API_URL = 'http://localhost:8080/produtos';
let carrinho = []; // Estado local para armazenar o carrinho

export async function salvarProduto(produto){
    return await axios.post(`${API_URL}/cadastrar`, produto);
}

export async function getImagemProduto(urlImagem){
    try {
        const response = await axios.get(urlImagem, { responseType: 'blob' });
        return response.data;
    } catch (error) {
        console.error('Erro ao obter imagem:', error);
        throw error;
    }
}

export async function listarProdutos(){
    return await axios.get(`${API_URL}/listar`);
}

export async function getProduto(id){
    return await axios.get(`${API_URL}/usar/${id}`);
}

// Retorna os produtos de uma loja específica pelo id
export async function getStoreProducts(idStore){
    return await axios.get(`${API_URL}/listar/${idStore}`);
}

export async function alterarProduto(produto){
    return await axios.put(`${API_URL}/alterar`, produto);
}

export async function updateImagem(formData){
    return await axios.put(`${API_URL}/upload`, formData);
}

export async function deletarProduto(id){
    return await axios.delete(`${API_URL}/remover/${id}`);
}

// Funções para manipular o carrinho
export function removerProdutoDoCarrinho(idProduto) {
    carrinho = carrinho.filter(item => item.id !== idProduto);
    console.log(`Produto ${idProduto} removido do carrinho. Novo carrinho:`, carrinho);
}

export function alterarQuantidadeProdutoNoCarrinho(idProduto, novaQuantidade) {
    carrinho = carrinho.map(item => {
        if (item.id === idProduto) {
            return { ...item, quantidade: novaQuantidade };
        }
        return item;
    });
    console.log(`Quantidade do produto ${idProduto} alterada para ${novaQuantidade}. Novo carrinho:`, carrinho);
}

