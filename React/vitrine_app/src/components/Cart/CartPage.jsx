import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { listarProdutosDoCarrinho } from "../../api/CarrinhoServico";
import Navbar from '../../components/Navbar';
import CartInfo from './CartInfo';
import CartProductList from './CartProductList';
import { searchProduct } from '../Product/searchProductService';

export default function CartPage() {
    const navigate = useNavigate();
    const [produtos, setProdutos] = useState([]);
    const [searchText, setSearchText] = useState('');


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const idComprador = localStorage.getItem('id');
                const response = await listarProdutosDoCarrinho(idComprador);
                setProdutos(response.data);
                console.log(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProducts();
    }, []);

    const handleSearch = () => {
        navigate('/', { state: { searchText } });
    };

    const updateCartItems = (IdprodutoAtualizado, novaQuantidade) => {
        if (novaQuantidade !== undefined) {
            //Atualiza na página a quantidade do item do carrinho ao clicar
            setProdutos((prevProdutos) => 
                produtos.map((carrinho) => {
                    if(carrinho.produto.id === IdprodutoAtualizado) {
                        return {
                            ...carrinho,
                            quantidade: novaQuantidade
                        };
                    }else{
                        return carrinho
                    }}
                )
            );
        }else{
            //Remove o produto do carrinho na página
            setProdutos((prevProdutos) => 
                produtos.filter((carrinho) => carrinho.produto.id !== IdprodutoAtualizado)
              );
        }
    };

    return (
        <div style={{ marginTop: '100px' }}>
            <Navbar searchText={searchText} setSearchText={setSearchText} handleSearch={handleSearch} />
            <div className='d-flex flex-row vh-100 py-3'>
                <CartProductList 
                cartItems={produtos}
                updateCart={updateCartItems}/>

                <CartInfo cartItems={produtos} />
            </div>
        </div>
    );
}














