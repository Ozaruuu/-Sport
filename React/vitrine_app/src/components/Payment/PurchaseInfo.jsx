import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { listarProdutosDoCarrinho } from '../../api/CarrinhoServico';
import { getComprador } from '../../api/CompradorServico';
import CartProductList from '../Cart/CartProductList';
import CartItem from '../Cart/CartItem';

//Informações da compra (itens, endereço de entrega)
export default function PurchaseInfo() {
    const [produtos, setProdutos] = useState([]);
    const [comprador, setComprador] = useState([]);
    const [total, setTotal] = useState(0);

    const onChange = (event) => {
        setComprador({ ...comprador, [event.target.name]: event.target.value });
    };

    const idComprador = localStorage.getItem('id');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await listarProdutosDoCarrinho(idComprador);
                setProdutos(response.data);

                const response1 = await getComprador(idComprador);
                setComprador(response1.data);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProducts();
    }, [idComprador]);

    useEffect(() => {
        const calcularTotal = () => {
            let valorTotal = 0;

            produtos.forEach(item => {
                valorTotal += item.produto.valor * item.quantidade;
            });

            setTotal(valorTotal);
        };

        calcularTotal();
    }, [produtos]);

    const formatCurrency = (value) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
        }).format(value);
    };

    return (
        <div className='w-50 h-100'>
            <h4 className='m-3'>Confirmar Endereço de entrega: </h4>
            <input type="text" className='m-3' name='endereco' placeholder={comprador.endereco} onChange={onChange} required />
            <div className="w-100 d-flex flex-column">
                <div className="p-3">
                    <div>
                        <li className="list-group-item d-flex justify-content-between align-items-center">
                            <span>Descrição</span>
                            <span>Quantidade</span>
                            <span>Valor</span>
                        </li>
                        <hr />
                        {produtos.map((carrinho, index) => (
                            <li key={index} className="list-group-item d-flex justify-content-between align-items-center">
                                <span>{carrinho.produto.descricao}</span>
                                <span>{carrinho.quantidade}</span>
                                <span>{formatCurrency(carrinho.produto.valor)}</span>
                            </li>
                        ))}
                    </div>

                    <li className="list-group-item d-flex justify-content-between align-items-center">
                        <p className='fw-bold'>Total</p>
                        <hr />
                        <p className='fw-bold'>{formatCurrency(total)}</p>
                    </li>
                </div>
            </div>
        </div>
    );
}







