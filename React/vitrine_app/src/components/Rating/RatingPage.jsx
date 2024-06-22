import React, { useEffect, useState} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { listarProdutosDoCarrinho } from '../../api/CarrinhoServico';
import Navbar from '../Navbar';
import Avaliacao from './Avaliacao';
import { alterarLoja, getLoja } from '../../api/LojaServico';


export default function RatingPage() {
    const [produtos, setProdutos] = useState([]);
    const [searchText, setSearchText] = useState('');
    const [avaliacao, setAvaliacao] = useState(1);
    const navigate = useNavigate();
    
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const idComprador = localStorage.getItem('id');
                const response = await listarProdutosDoCarrinho(idComprador);
                setProdutos(response.data);

            } catch (error) {
                console.error(error);
            }
        };

        fetchProducts();
    }, []);

    const handleSearch = () => {
        navigate('/', { state: { searchText } });
    };

    const onChange = (event) => {
        setAvaliacao(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (produtos.length > 0) {
            const primeiroProduto = produtos[0];
            const idLoja = primeiroProduto.produto.idLoja;
            
            const response = await getLoja(idLoja);
            let loja = response.data;
            const avaliacaoAtual = response.data.avaliacao;
            const totalAvaliacoes = response.data.totalAvaliacoes;
            
            // Calcular a nova avaliação
            let novaAvaliacaoCalculada = ((avaliacaoAtual * totalAvaliacoes) + avaliacao) / (totalAvaliacoes + 1);

             // Limitar a nova avaliação ao máximo de 5
             novaAvaliacaoCalculada = Math.min(novaAvaliacaoCalculada, 5);


            loja = {
                ...loja,
                avaliacao: novaAvaliacaoCalculada,
                totalAvaliacoes: totalAvaliacoes + 1
            };
            const responseLoja = await alterarLoja(loja);

        }

        navigate('/');
    };
        
    return (
        <div style={{ marginTop: '100px' }}>
            <Navbar searchText={searchText} handleSearch={handleSearch}/>
            <div className='w-75 card d-flex justify-content-center mx-auto p-5'>
                <div className=''>
                    <h2>Obrigado pela compra</h2>
                    <h3>Forneça uma avaliação de 1 a 5:</h3>
                    
                    <form onSubmit={handleSubmit} className='d-flex flex-column gap-3'>
                        <input type="text" onChange={onChange} placeholder='1.5' pattern="^([1-4](\.[0-9]*)?|5(\.0*)?)$" required/>
                        <Avaliacao valor={avaliacao} tamanho={"30px"}/>
                        <button type="submit" className="btn btn-warning w-100 py-3" >Confirmar</button>
                    </form>
                </div>


                <div className="bottom-0 end-0 p-3">
                        
                </div>
            </div>
        </div>
    );
    }







