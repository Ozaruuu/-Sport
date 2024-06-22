import React, { useEffect, useState } from 'react';
import { getImagemProduto, getProduto, removerProdutoDoCarrinho, alterarQuantidadeProdutoNoCarrinho } from "../../api/ProdutoServico";
import { alterarProdutoDoCarrinho, deletarProdutoDoCarrinho } from "../../api/CarrinhoServico";
import 'bootstrap/dist/css/bootstrap.min.css';
import { RiDeleteBin5Line } from "react-icons/ri";
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

export default function CartItem({ idProduto, quantidade, updateCart }) {
  const [imagem, setImagem] = useState(null);
  const [produto, setProduto] = useState({
    descricao: '',
    quantidade: '',
    valor: '',
    categoria: '',
    avaliacao: '',
    urlImagem: ''
  });
  
  const idComprador = localStorage.getItem('id');
  console.log(idProduto);
  console.log(idComprador);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await getProduto(idProduto);
        const productData = response.data;
        setProduto(productData);

        const imgResponse = await getImagemProduto(productData.urlImagem);
        const imageUrl = URL.createObjectURL(imgResponse);
        setImagem(imageUrl);
      } catch (error) {
        console.error(error);
      }
    };
    fetchProduct();
  }, [idProduto]);

  const handleDecreaseQuantity = async () => {
    if (quantidade > 1) {
      const response = await alterarProdutoDoCarrinho(idComprador, idProduto, quantidade - 1);
      updateCart(idProduto, quantidade - 1); // Atualizar informações na página
    }
  };

  const handleIncreaseQuantity = async () => {
    // Só aumenta a quantidade de produtos até o máximo disponível em estoque
    if (produto.quantidade > quantidade){
      const response = await alterarProdutoDoCarrinho(idComprador, idProduto, quantidade + 1);
      updateCart(idProduto, quantidade + 1);
    }
    
  };

  const handleRemoveProduct = async () => {
    const response = await deletarProdutoDoCarrinho(idComprador, idProduto);
    updateCart(idProduto);
  };


  return (
    <div className="p-3">
      <div className="border-0 rounded-0 d-flex align-items-center" style={{ width: '100%' }}>
        <div className='d-flex' style={{ height: '15%', width: '15%' }}>
          <img src={imagem} alt="Imagem do produto" className='' style={{ objectFit: 'cover', height: '100%', width: '100%' }} />
        </div>

        <div className='ms-3'>
          <h4 className="">{produto.descricao}</h4>
          <h5>R$ {produto.valor}</h5>
        </div>

        <div className='ms-auto d-flex align-items-center'>
          <button className='btn btn-light p-1 me-1' onClick={handleDecreaseQuantity}><AiOutlineMinus /></button>
          <h5 className='m-0'>{quantidade}</h5>
          <button className='btn btn-light p-1 ms-1' onClick={handleIncreaseQuantity}><AiOutlinePlus /></button>
        </div>

        <div className='ms-auto d-flex align-items-center'>
          <button className='btn text-warning p-1 rounded' onClick={handleRemoveProduct}><RiDeleteBin5Line /></button>
        </div>
      </div>
    </div>
  );
}










