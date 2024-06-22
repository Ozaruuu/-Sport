import React, { useEffect, useState } from 'react';
import { getImagemProduto, getProduto } from "../../api/ProdutoServico";
import 'bootstrap/dist/css/bootstrap.min.css';
import './ProductCard.css';
import { BiCartAdd } from "react-icons/bi";
import { adicionarProdutoAoCarrinho } from '../../api/CarrinhoServico';
import { useNavigate } from 'react-router-dom';

export default function ProductCard({ idProduto }) {
  const navigate = useNavigate();
  const [imagem, setImagem] = useState(null);
  const [produto, setProduto] = useState({
    descricao: '',
    quantidade: '',
    valor: '',
    categoria: '',
    avaliacao: '',
    urlImagem: ''
  });
  
  //Armazena True se o usuario está Logado como comprador
  const isLoggedIn = localStorage.getItem('TipoUsuario') == 'Comprador'; 

  const handleAddProduct = async (idProduto) => {
    try {
      if (isLoggedIn){
        const idComprador = localStorage.getItem('id');
        console.log(`id: ${idComprador}, idProduto: ${idProduto}`);
        await adicionarProdutoAoCarrinho(idComprador, idProduto, 1);
        navigate("/cart");
      }
      else{
        navigate("/login"); //Leva para a página de login caso não esteja logado
      }
      
    } catch (error) {
      console.log('Erro ao adicionar produto ao carrinho:', error);
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProduto(idProduto);
        const productData = response.data;
        setProduto(productData);

        const imgResponse = await getImagemProduto(productData.urlImagem);
        const imageUrl = URL.createObjectURL(imgResponse);

        setImagem(imageUrl);
        console.log(imageUrl);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProduct();
  }, [idProduto]);

  return (
    <div className="col-12 col-sm-6 col-md-4 col-lg-3 mt-4 mx-2 product-card-container">
      <div className="card product-card">
        <div className='d-flex justify-content-center'>
          <img src={imagem} alt="Imagem do produto" className='card-img-top img-fluid' />
        </div>
        <div className="card-body">
          <p className="card-text product-category">{produto.categoria}</p>
          <p className="card-text product-description">{produto.descricao}</p>
          <h5 className="card-title product-price">R$ {produto.valor}</h5>
          <button className='btn btn-add-cart w-100' onClick={() => handleAddProduct(produto.id)}>
            Adicionar<BiCartAdd size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}






























