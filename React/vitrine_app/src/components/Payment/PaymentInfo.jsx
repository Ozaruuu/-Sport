import React, { useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { deletarProdutoDoCarrinho, listarProdutosDoCarrinho } from '../../api/CarrinhoServico';
import { alterarProduto } from '../../api/ProdutoServico';


export default function PaymentInfo() {
    const [produtos, setProdutos] = useState([]);
    const [listaProdutos, setListaProdutos] = useState([]);
    const [metodoPagamento, setMetodoPagamento] = useState('Cartao');
    const navigate = useNavigate();
    
    const idComprador = localStorage.getItem('id');

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await listarProdutosDoCarrinho(idComprador);
                setProdutos(response.data);
            } catch (error) {
                console.error(error);
            }
        };

        
        fetchProducts();
    }, [idComprador]);

    const handleChange = (event) => {
        setMetodoPagamento(event.target.value);
    };

    const handlePayment = async () => {
        // Retira do estoque da loja após confirmar o pagamento
        produtos.forEach( async (item) => {
            const id = item.produto.id;
            const produtoAlterado = item.produto;
            produtoAlterado.quantidade = produtoAlterado.quantidade - item.quantidade;
            const response = await alterarProduto(produtoAlterado);

            //Retira do Carrinho de compras após confirmar o pagamento
            const carrinhoResponse = await deletarProdutoDoCarrinho(idComprador, id);
        })

        navigate('/rate');
    }
        
    return (
        <div className='w-50 h-100'>
            <h4 className=''>Confirmar Método de Pagamento: </h4>
            <div className="w-75 border-right border-warning d-flex flex-column">
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        name="metodoPagamento"
                        value="Cartao"
                        id="creditCard"
                        checked={metodoPagamento === 'Cartao'}
                        onChange={handleChange}
                    />
                    <label >
                        Cartão de Crédito
                    </label>
                </div>
                <div className="form-check">
                    <input
                        className="form-check-input"
                        type="radio"
                        value="pix"
                        checked={metodoPagamento === 'pix'}
                        onChange={handleChange}
                    />
                    <label>
                        Pix
                    </label>
                </div>
                
                {metodoPagamento === 'Cartao' && (
                    <div className="mt-3">
                        <div className="mb-3">
                            <label className="form-label">Número do Cartão</label>
                            <input type="text" className="form-control" placeholder="1234 5678 9012 3456" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Nome no Cartão</label>
                            <input type="text" className="form-control" placeholder="Nome como está no cartão" />
                        </div>
                        <div className="mb-3">
                            <label>Data de Validade</label>
                            <input type="text" className="form-control" placeholder="MM/AA" />
                        </div>
                        <div className="mb-3">
                            <label>CVV</label>
                            <input type="text" className="form-control" placeholder="123" />
                        </div>
                    </div>
                )}
                
                {metodoPagamento === 'pix' && (
                    <div className="mt-2">
                        <p>Você será redirecionado para a tela de pagamento do Pix.</p>
                    </div>
                )}

                <div className="bottom-0 end-0 p-3">
                    <button className="btn btn-warning w-100 py-3" onClick={handlePayment}>Confirmar Compra</button>
                </div>
        </div>
        </div>
    );
    }







